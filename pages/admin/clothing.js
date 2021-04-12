import { useMutation, useQuery } from "@apollo/client";
import { useContext, useMemo, useState } from "react";
import { AddClothingModal } from "../../components/admin/AddClothingModal";
import { ClothingByCategory } from "../../components/admin/ClothingByCategory";
import { EditClothingModal } from "../../components/admin/EditClothingModal";
import AdminLayout from "../../layouts/AdminLayout";
import { ClothingAdminQuery } from "../../queries/clothingQueries";
import {
  AddClothingMutation,
  EditClothingMutation,
  DeleteClothingMutation,
} from "../../queries/clothingMutations";
import { uploadImg } from "../../http";
import { initializeApollo } from "../../apollo/client";
import { AuthContext } from "../../context/auth";

export default function AdminClothing() {
  const { user } = useContext(AuthContext);
  const [clothing, setClothing] = useState(null);
  const [showModal, setShowModal] = useState(""); //edit || add
  const {
    data: { allClothing },
  } = useQuery(ClothingAdminQuery);
  const [editMutation] = useMutation(EditClothingMutation);
  const [addMutation] = useMutation(AddClothingMutation);
  const [deleteMutation] = useMutation(DeleteClothingMutation);

  const getClothing = useMemo(() => {
    return allClothing.reduce((acc, cl) => {
      const clothingClone = { ...cl, categoryId: cl.categoryId._id };
      const category = acc.find((item) => item.id === cl.categoryId._id);

      category
        ? category.clothing.push(clothingClone)
        : acc.push({
            title: cl.categoryId.name,
            id: cl.categoryId._id,
            clothing: [clothingClone],
          });
      return acc;
    }, []);
  }, [allClothing]);

  const getCategories = useMemo(() => {
    return getClothing.map(({ title, id }) => ({ title, id }));
  }, [getClothing]);

  const removeImg = (idx) => {
    setClothing((prev) => {
      return {
        ...prev,
        images: clothing.images.filter((_, index) => index !== idx),
      };
    });
  };

  const editClothing = async (payload, images) => {
    if (!user) return alert("Вы не авторизированы");
    try {
      let dataImg = [];
      if (images.length) {
        dataImg = await uploadImg(images, "/clothing");
      }

      await editMutation({
        variables: {
          payload: { ...payload, images: payload.images.concat(dataImg) },
        },
        refetchQueries: [{ query: ClothingAdminQuery }],
      });

      setShowModal("");
    } catch (e) {
      console.log(e);
    }
  };

  const addClothing = async (payload, img) => {
    if (!user) return alert("Вы не авторизированы");
    try {
      const images = await uploadImg(img, "/clothing");

      addMutation({
        variables: { payload: { ...payload, images } },
        refetchQueries: [{ query: ClothingAdminQuery }],
      });

      setShowModal("");
    } catch (e) {
      console.log(e);
    }
  };

  const removeClothing = async (id) => {
    if (!user) return alert("Вы не авторизированы");
    await deleteMutation({
      variables: { id },
      refetchQueries: [{ query: ClothingAdminQuery }],
    });
  };

  return (
    <AdminLayout>
      <div className="admin-clothing">
        {showModal === "edit" && (
          <EditClothingModal
            clothing={clothing}
            categories={getCategories}
            change={(event) =>
              setClothing({
                ...clothing,
                [event.target.name]: event.target.value,
              })
            }
            save={editClothing}
            close={() => setShowModal("")}
            removeImg={removeImg}
          />
        )}

        {showModal === "add" && (
          <AddClothingModal
            categories={getCategories}
            save={addClothing}
            close={() => setShowModal("")}
          />
        )}
        <button className="btn btn-add" onClick={() => setShowModal("add")}>
          Добавить <span className="material-icons">control_point</span>
        </button>

        {getClothing.map((category, idx) => (
          <ClothingByCategory
            key={idx}
            category={category}
            select={(payload) => {
              setClothing(payload);
              setShowModal("edit");
            }}
            remove={removeClothing}
          />
        ))}
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ClothingAdminQuery,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

import { useMutation, useQuery } from "@apollo/client";
import { Category } from "../../components/admin/Category";
import AdminLayout from "../../layouts/AdminLayout";
import { CategoriesQuery } from "../../queries/categoryQueries";
import { initializeApollo } from "../../apollo/client";
import { useContext, useState } from "react";
import { AddCategoryModal } from "../../components/admin/AddCategoryModal";
import { uploadImg } from "../../http";
import {
  CategoryCreateMutation,
  CategoryDeleteMutation,
  CategoryEditMutation,
} from "../../queries/categoryMutation";
import { AuthContext } from "../../context/auth";

export default function Categories() {
  const { user } = useContext(AuthContext);
  const [isAddModal, setShowAddModal] = useState(false);
  const {
    data: { categories },
    refetch,
  } = useQuery(CategoriesQuery);
  const [editMutation] = useMutation(CategoryEditMutation);
  const [deleteMutation] = useMutation(CategoryDeleteMutation);
  const [createMutation] = useMutation(CategoryCreateMutation);

  async function changeImg(img, id) {
    if (!user) return alert("Вы не авторизированы");
    const imgUpload = await uploadImg([img]);

    editMutation({
      variables: { payload: { field: "image", value: imgUpload[0], id } },
      refetchQueries: [{ query: CategoriesQuery }],
    });
  }

  async function removeCategory(id) {
    if (!user) return alert("Вы не авторизированы");
    await deleteMutation({
      variables: { id },
    });

    refetch();
  }

  function changeTitle(value, id) {
    if (!user) return alert("Вы не авторизированы");
    editMutation({
      variables: { payload: { field: "name", value, id } },
      refetchQueries: [{ query: CategoriesQuery }],
    });
  }

  async function createCategory(title, image) {
    if (!user) return alert("Вы не авторизированы");
    const imgUpload = await uploadImg([image]);

    await createMutation({
      variables: { title, image: imgUpload[0] },
      refetchQueries: [{ query: CategoriesQuery }],
    });

    setShowAddModal(false);
  }

  return (
    <AdminLayout>
      <h3 className="title">Редактирование категорий</h3>
      <button className="btn btn-add" onClick={() => setShowAddModal(true)}>
        Добавить категорию <span className="material-icons">control_point</span>
      </button>
      <div className="admin-categories-page">
        {categories.map((cat) => (
          <Category
            key={cat._id}
            item={cat}
            changeImg={changeImg}
            removeCategory={removeCategory}
            changeTitle={changeTitle}
          />
        ))}
      </div>

      {isAddModal && (
        <AddCategoryModal
          close={() => setShowAddModal(false)}
          create={createCategory}
        />
      )}
    </AdminLayout>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: CategoriesQuery,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

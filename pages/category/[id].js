import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { initializeApollo } from "../../apollo/client";
import { ClothingByCategoryIdQuery } from "../../queries/clothingQueries";
import MainLayout from "../../layouts/MainLayout";
import { CartContext } from "../../context/cart";
import { ClothingItem } from "../../components/ClothingItem";
import { CategoryByIdQuery } from "../../queries/categoryQueries";

const ClothingCategory = () => {
  const router = useRouter();
  const { addToCart } = useContext(CartContext);
  const {
    data: { clothingByCategoryId },
  } = useQuery(ClothingByCategoryIdQuery, {
    variables: { id: router.query.id },
  });
  const {
    data: { categoryById },
  } = useQuery(CategoryByIdQuery, { variables: { id: router.query.id } });

  return (
    <MainLayout title={categoryById.name}>
      <div className="wrap category-page">
        {clothingByCategoryId.length ? (
          clothingByCategoryId.map((c) => (
            <ClothingItem
              key={c._id}
              clothing={c}
              toCart={(data) => addToCart(data)}
            />
          ))
        ) : (
          <p style={{ flexBasis: "100%", textAlign: "center" }}>
            В даной категории пока ничего нету
          </p>
        )}
      </div>
    </MainLayout>
  );
};

export async function getServerSideProps({ query }) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ClothingByCategoryIdQuery,
    variables: { id: query.id },
  });

  await apolloClient.query({
    query: CategoryByIdQuery,
    variables: { id: query.id },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default ClothingCategory;

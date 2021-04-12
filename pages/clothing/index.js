import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { initializeApollo } from "../../apollo/client";
import { ClothingQuery } from "../../queries/clothingQueries";
import { MetaPageQuery } from "../../queries/metaPageQuery";
import MainLayout from "../../layouts/MainLayout";
import { ClothingItem } from "../../components/ClothingItem";
import { CartContext } from "../../context/cart";
import { useMeta } from "../../hooks/useMeta";

const AllClothing = () => {
  const { addToCart } = useContext(CartContext);
  const { title, description } = useMeta(MetaPageQuery);
  const {
    data: { allClothing },
  } = useQuery(ClothingQuery);

  return (
    <MainLayout title={title} description={description}>
      <div className="clothing-page wrap">
        {allClothing.map((c) => (
          <ClothingItem key={c._id} clothing={c} toCart={(d) => addToCart(d)} />
        ))}
      </div>
    </MainLayout>
  );
};

export async function getServerSideProps({ resolvedUrl: path }) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ClothingQuery,
  });

  await apolloClient.query({
    query: MetaPageQuery,
    variables: { path },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default AllClothing;

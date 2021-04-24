import { useContext, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { initializeApollo } from "../../apollo/client";
import { ClothingQuery } from "../../queries/clothingQueries";
import { MetaPageQuery } from "../../queries/metaPageQuery";
import MainLayout from "../../layouts/MainLayout";
import { ClothingItem } from "../../components/ClothingItem";
import { CartContext } from "../../context/cart";
import { useMeta } from "../../hooks/useMeta";
import { SortBar } from "../../components/sortBar/SortBar";

function AllClothing() {
  const { addToCart } = useContext(CartContext);
  const [sortFields, setSortFields] = useState({ category: "", price: "" });
  const { title, description } = useMeta(MetaPageQuery);
  const {
    data: { allClothing }
  } = useQuery(ClothingQuery);

  const sortedClothing = useMemo(() => {
    let result = [...allClothing];

    if (sortFields.category) {
      result = result.filter(
        (item) => item.categoryId._id === sortFields.category
      );
    }

    if (sortFields.price === "price_low") {
      result.sort((a, b) => +a.price - +b.price);
    }

    if (sortFields.price === "price_high") {
      result.sort((a, b) => +b.price - +a.price);
    }

    return result;
  }, [allClothing, sortFields]);

  const categories = useMemo(() => {
    return allClothing.reduce((acc, item) => {
      const cat = acc.find((cat) => cat._id === item.categoryId._id);
      if (!cat) acc.push(item.categoryId);
      return acc;
    }, []);
  }, [allClothing]);

  function sortAction(event) {
    const { name, value } = event.target;
    setSortFields((prev) => {
      return { ...prev, [name]: value };
    });
  }

  return (
    <MainLayout title={title} description={description}>
      <div className="clothing-page wrap">
        <SortBar
          categories={categories}
          fields={sortFields}
          sort={sortAction}
        />

        {sortedClothing.map((c) => (
          <ClothingItem key={c._id} clothing={c} toCart={(d) => addToCart(d)} />
        ))}
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps({ resolvedUrl: path }) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ClothingQuery
  });

  await apolloClient.query({
    query: MetaPageQuery,
    variables: { path }
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    }
  };
}

export default AllClothing;

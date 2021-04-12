import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { initializeApollo } from "../apollo/client";
import { CategoriesQuery } from "../queries/categoryQueries";
import MainLayout from "../layouts/MainLayout";
import { MetaPageQuery } from "../queries/metaPageQuery";
import { useMeta } from "../hooks/useMeta";

const Index = () => {
  const router = useRouter();
  const {
    data: { categories },
  } = useQuery(CategoriesQuery);

  const { title, description } = useMeta(MetaPageQuery);

  return (
    <MainLayout title={title} description={description}>
      <div className="home wrap">
        {categories.map((c) => (
          <div
            className="home__category category"
            key={c._id}
            style={{
              backgroundImage: `url(${process.env.BASE_URL}${c.image})`,
            }}
            onClick={() =>
              router.push({
                pathname: "/category/[id]",
                query: { id: c._id },
              })
            }
          >
            <h3 className="category__title">
              {c.name}
              <br />
              <small>смотреть сейчас</small>
            </h3>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export async function getServerSideProps({ resolvedUrl: path }) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: MetaPageQuery,
    variables: { path },
  });

  await apolloClient.query({
    query: CategoriesQuery,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Index;

import { initializeApollo } from "../apollo/client";
import MainLayout from "../layouts/MainLayout";
import { MetaPageQuery } from "../queries/metaPageQuery";
import { useMeta } from "../hooks/useMeta";

export default function Contacts() {
  const { title, description } = useMeta(MetaPageQuery);

  return (
    <MainLayout title={title} description={description}>
      <div className="contacts-page wrap">
        <h2>Телефоны: &nbsp;</h2>
        <ul className="contacts-page__phones phones-list">
          <li className="phones-list__item">(098) 535 67 45</li>
          <li className="phones-list__item">(095) 325 67 45</li>
          <li className="phones-list__item">(067) 412 67 45</li>
        </ul>
        <p></p>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps({ resolvedUrl: path }) {
  const apolloClient = initializeApollo();

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

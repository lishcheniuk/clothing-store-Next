import { useMutation, useQuery } from "@apollo/client";
import { useContext } from "react";
import { initializeApollo } from "../../apollo/client";
import { Page } from "../../components/admin/Page";
import { AuthContext } from "../../context/auth";
import AdminLayout from "../../layouts/AdminLayout";
import { EditMetaPageMutation } from "../../queries/metaPageMutations";
import { AllMetaPagesQuery } from "../../queries/metaPageQuery";

export default function Statistics() {
  const { user } = useContext(AuthContext);
  const {
    data: { allMetaPages },
  } = useQuery(AllMetaPagesQuery);
  const [editMutation] = useMutation(EditMetaPageMutation);

  function editPage(payload) {
    if (!user) return alert("Вы не авторизированы");
    editMutation({
      variables: { payload },
      refetchQueries: [{ query: AllMetaPagesQuery }],
    });
  }

  return (
    <AdminLayout>
      <div className="metadata-page">
        {allMetaPages.map((page) => (
          <Page key={page._id} item={page} edit={editPage} />
        ))}
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: AllMetaPagesQuery,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

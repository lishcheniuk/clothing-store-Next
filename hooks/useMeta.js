import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export const useMeta = (Query) => {
  const router = useRouter();
  const {
    data: { metaPage },
  } = useQuery(Query, {
    variables: { path: router.asPath },
  });

  return { title: metaPage.title, description: metaPage.description };
};

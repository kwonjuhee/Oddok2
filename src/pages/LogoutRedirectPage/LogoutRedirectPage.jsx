import { useEffect } from "react";
import { Loading } from "@components/@commons";
import { useOAuthLogout } from "@hooks/@queries/user-queries";

function LogoutRedirectPage() {
  const { mutate } = useOAuthLogout();

  useEffect(() => {
    mutate();
  }, [mutate]);

  return <Loading />;
}

export default LogoutRedirectPage;

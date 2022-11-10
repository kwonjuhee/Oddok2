import React, { useEffect } from "react";
import { Loading } from "@components/@commons";
import { useOAuthLogin } from "@hooks/@queries/user-queries";

function RedirectPage() {
  const authCode = new URL(window.location.href).searchParams.get("code"); // 파라미터로 넘어온 인가코드를 가져옴
  const { mutate } = useOAuthLogin();

  useEffect(() => {
    mutate(authCode);
  }, [mutate, authCode]);

  return <Loading />;
}

export default RedirectPage;

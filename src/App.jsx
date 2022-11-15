import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loadingState } from "@recoil/loading-state";
import { ErrorModal, Loading, Toast } from "@components/@commons";
import { useToast } from "@hooks/useToast";
import Router from "./routes/Router";

function App() {
  const isLoading = useRecoilValue(loadingState);
  const { toast } = useToast();

  return (
    <BrowserRouter>
      {isLoading && <Loading />}
      {toast && <Toast />}
      <ErrorModal />
      <Router />
    </BrowserRouter>
  );
}

export default App;

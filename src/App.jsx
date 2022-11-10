import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loadingState } from "@recoil/loading-state";
import { ErrorModal, Loading } from "@components/@commons";
import Router from "./routes/Router";

function App() {
  const isLoading = useRecoilValue(loadingState);

  return (
    <BrowserRouter>
      {isLoading && <Loading />}
      <ErrorModal />
      <Router />
    </BrowserRouter>
  );
}

export default App;

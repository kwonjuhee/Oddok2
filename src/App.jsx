import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ErrorModal, Loading, Toast } from "@components/@commons";
import { useToast } from "@hooks/useToast";
import { useLoading } from "@hooks/useLoading";
import Router from "./routes/Router";

function App() {
  const { isLoading } = useLoading();
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

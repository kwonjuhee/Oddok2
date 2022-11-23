import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ErrorModal, Loading, Toast } from "@components/@commons";
import ErrorBoundary from "@components/@commons/ErrorBoundary";
import { useToast } from "@hooks/useToast";
import { useLoading } from "@hooks/useLoading";
import Router from "./routes/Router";
import ErrorPage from "./pages/error/ErrorPage";

function App() {
  const { isLoading } = useLoading();
  const { toast } = useToast();

  return (
    <BrowserRouter>
      <ErrorBoundary fallback={ErrorPage}>
        {isLoading && <Loading />}
        {toast && <Toast />}
        <ErrorModal />
        <Router />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;

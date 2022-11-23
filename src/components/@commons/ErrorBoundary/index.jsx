import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import RetryFallback from "./RetryFallback";

export default function CustomErrorBoundary({ fallback, children }) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} fallbackRender={fallback ?? RetryFallback}>
      {children}
    </ErrorBoundary>
  );
}

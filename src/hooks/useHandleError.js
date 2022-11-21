import { useRecoilState } from "recoil";
import { errorState } from "@recoil/error";

export const useHandleError = () => {
  const [error, setError] = useRecoilState(errorState);

  const clearError = () => {
    setError(null);
  };

  return { error, setError, clearError };
};

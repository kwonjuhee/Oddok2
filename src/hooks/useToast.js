import { useRecoilState } from "recoil";
import { toastState } from "@recoil/toast";

export const useToast = () => {
  const [toast, setToast] = useRecoilState(toastState);

  const displayToast = ({ message, duration, position }) => {
    setToast({ message, duration: duration ?? 2000, position });
  };

  const clearToast = () => {
    setToast(null);
  };

  return { toast, displayToast, clearToast };
};

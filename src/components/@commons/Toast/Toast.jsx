import { useEffect, useState } from "react";
import { useToast } from "@hooks/useToast";
import styles from "./Toast.module.css";

const ANIMATION_DURATION = 500;

function Toast() {
  const { toast, clearToast } = useToast();
  const [isFadeOut, setIsFadeOut] = useState(false);

  useEffect(() => {
    const fadeoutToast = setTimeout(() => {
      setIsFadeOut(true);
    }, toast.duration - ANIMATION_DURATION);

    const fireToast = setTimeout(() => {
      clearToast();
    }, toast.duration);

    return () => {
      clearTimeout(fadeoutToast);
      clearTimeout(fireToast);
    };
  }, [toast]);

  const closeToast = () => {
    setIsFadeOut(true);
    setTimeout(() => {
      clearToast();
    }, 500);
  };

  return (
    <div className={`${styles.toast} ${isFadeOut ? styles.fadeout : ""}`}>
      {toast.message}
      <button type="button" aria-label="알림 닫기" onClick={closeToast}>
        &times;
      </button>
    </div>
  );
}

export default Toast;

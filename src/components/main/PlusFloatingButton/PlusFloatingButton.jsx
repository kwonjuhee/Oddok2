import { Plus } from "@icons";
import styles from "./PlusFloatingButton.module.css";

function PlusFloatingButton({ onClick }) {
  return (
    <div className={styles.container}>
      <button type="button" onClick={onClick}>
        <Plus />
      </button>
    </div>
  );
}

export default PlusFloatingButton;

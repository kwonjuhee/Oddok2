import styles from "./RetryFallback.module.css";

export default function RetryFallback({ resetErrorBoundary, errorMessage }) {
  return (
    <div className={styles.container}>
      <span>{errorMessage ?? "데이터를 불러오지 못했습니다."}</span>
      <button type="button" onClick={resetErrorBoundary}>
        다시 시도하기
      </button>
    </div>
  );
}

import styles from "./ErrorPage.module.css";

function ErrorPage({ resetErrorBoundary }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>알 수 없는 에러가 발생했습니다.😵</div>
      <button type="button" onClick={() => resetErrorBoundary()}>
        다시 시도하기
      </button>
    </div>
  );
}

export default ErrorPage;

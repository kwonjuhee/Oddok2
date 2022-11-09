import styles from "./HashtagListSkeleton.module.css";

const widths = [105, 97, 77, 77, 97, 89, 74, 92, 109, 102, 96, 76, 86, 87, 80];

function HashtagListSkeleton() {
  return (
    <>
      {new Array(15).fill(0).map((_, i) => (
        <div className={styles.skeleton} style={{ width: widths[i] }} />
      ))}
    </>
  );
}

export default HashtagListSkeleton;

import React from "react";
import styles from "./StudyRoomCardSkeleton.module.css";

function StudyRoomCardSkeleton() {
  return (
    <div>
      <div className={styles.thumbnail}>
        <div className={styles.shimmer} />
      </div>
      <div className={styles.title}>
        <div className={styles.shimmer} />
      </div>
      <div className={styles.hashtag}>
        <div className={styles.shimmer} />
      </div>
    </div>
  );
}

export default StudyRoomCardSkeleton;

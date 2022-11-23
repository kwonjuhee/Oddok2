import { StudyRoomCardSkeleton } from "..";
import styles from "./StudyRoomCardList.module.css";

function StudyRoomCardListSkeleton() {
  return (
    <div className={styles.container}>
      {new Array(16).fill(0).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <StudyRoomCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default StudyRoomCardListSkeleton;

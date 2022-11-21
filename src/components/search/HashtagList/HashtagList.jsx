import { HashtagButton } from "@components/@commons";
import { useGetPopularHashtag } from "@hooks/@queries/hashtag";
import HashtagListSkeleton from "./HashtagListSkeleton";
import styles from "./HashtagList.module.css";

function HashtagList({ onToggle }) {
  const { popularHashtagList, isLoading } = useGetPopularHashtag();

  return (
    <div className={styles.hashtag_list}>
      {isLoading && <HashtagListSkeleton />}
      {popularHashtagList?.map((label) => (
        <HashtagButton key={label} label={label} onToggle={onToggle} />
      ))}
    </div>
  );
}

export default HashtagList;

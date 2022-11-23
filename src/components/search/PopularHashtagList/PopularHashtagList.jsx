import { HashtagButton } from "@components/@commons";
import { useGetPopularHashtag } from "@hooks/@queries/hashtag";
import PopularHashtagListSkeleton from "./PopularHashtagListSkeleton";
import styles from "./PopularHashtagList.module.css";

function PopularHashtagList({ onToggle }) {
  const { popularHashtagList, isLoading } = useGetPopularHashtag();

  return (
    <div className={styles.hashtag_list}>
      {isLoading ? (
        <PopularHashtagListSkeleton />
      ) : (
        popularHashtagList?.map((label) => <HashtagButton key={label} label={label} onToggle={onToggle} />)
      )}
    </div>
  );
}

export default PopularHashtagList;

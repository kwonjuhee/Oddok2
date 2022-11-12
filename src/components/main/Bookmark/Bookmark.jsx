import { Thumbnail } from "@components/@commons";
import { useBookmarkQuery } from "@hooks/@queries/bookmark-queries";
import styles from "./Bookmark.module.css";

function Bookmark() {
  const { isLoading, bookmarkData } = useBookmarkQuery();

  if (isLoading || !bookmarkData) return null;

  const { currentUsers, endAt, hashtags, limitUsers, name, participant, rule } = bookmarkData;

  return (
    <div className={styles.container}>
      <div className={styles.background} />
      <div className={styles.thumbnail}>
        <Thumbnail />
      </div>
      <div className={styles.detail_box}>
        <h3>{name}</h3>
        <p>
          <span className={styles.label}>해시태그</span>
          {hashtags ? (
            hashtags.map((hashtag) => (
              <span key={hashtag} className={styles.content}>
                #{hashtag}&nbsp;
              </span>
            ))
          ) : (
            <span className={styles.content}>없음</span>
          )}
        </p>
        <p>
          <span className={styles.label}>인원</span>
          <span className={styles.content}>
            {currentUsers}명 / {limitUsers}명
          </span>
        </p>
        <p>
          <span className={styles.label}>기간</span>
          <span className={styles.content}>{endAt ? `${endAt}까지` : "없음"}</span>
        </p>
        <p className={styles.content_rule}>
          <span className={styles.label}>스터디규칙</span>
          {rule ?? "없음"}
        </p>
      </div>
      <ul className={styles.ranking}>
        {participant.map(({ nickname, joinTime }, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={i} className={styles.active}>
            <div className={styles.nickname}>
              <span>{i}.&nbsp;</span>
              <span>{nickname}</span>
            </div>
            <span className={styles.time}>{`${joinTime} ~ 지금까지`}</span>
          </li>
        ))}
        {5 - participant.length > 0 &&
          new Array(5 - participant.length).fill(0).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={participant.length + i}>
              <div className={styles.nickname}>
                <span>{participant.length + i}.&nbsp;</span>
                <span>현재 스터디원</span>
              </div>
              <span className={styles.time}>없음</span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Bookmark;

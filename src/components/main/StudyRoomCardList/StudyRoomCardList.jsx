/* eslint-disable react/no-array-index-key */
import { useSearchParams } from "react-router-dom";
import { StudyRoomCard, StudyRoomCardSkeleton } from "@components/main";
import { ArrowDown } from "@icons";
import { useStudyRoomList } from "@hooks/@queries/studyroom-queries";
import StudyRoomCardListHead from "./StudyRoomCardListHead";
import styles from "./StudyRoomCardList.module.css";

function StudyRoomCardList({ tagFilter = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, studyroomListData, fetchNextPage, hasNextPage } = useStudyRoomList(searchParams, tagFilter);

  const clickMoreBtn = () => {
    fetchNextPage();
  };

  return (
    <div className={styles.container}>
      <StudyRoomCardListHead />
      <div className={styles.content}>
        <ul>
          {studyroomListData.map((studyroomData) => (
            <li key={studyroomData.id}>
              <StudyRoomCard roomData={studyroomData} />
            </li>
          ))}
          {isLoading &&
            new Array(16).fill(0).map((_, i) => (
              <li key={i}>
                <StudyRoomCardSkeleton />
              </li>
            ))}
        </ul>
        {!isLoading && studyroomListData.length === 0 && (
          <div className={styles.empty}>
            <p>찾으시는 스터디룸이 없습니다.</p>
          </div>
        )}
      </div>
      {hasNextPage && (
        <div className={styles.footer}>
          <button type="button" onClick={clickMoreBtn}>
            <span>더보기</span>
            <div className={styles.icon}>
              <ArrowDown />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

export default StudyRoomCardList;

/* eslint-disable react/no-array-index-key */
import { useSearchParams, Link, useLocation } from "react-router-dom";
import { StudyRoomCard, StudyRoomCardListSkeleton } from "@components/main";
import { ArrowDown } from "@icons";
import { useStudyRoomList } from "@hooks/@queries/studyroom";
import styles from "./StudyRoomCardList.module.css";

function StudyRoomCardList({ tagFilter = [] }) {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, studyroomListData, fetchNextPage, hasNextPage } = useStudyRoomList(searchParams, tagFilter);

  const clickMoreBtn = () => {
    fetchNextPage();
  };

  if (isLoading) {
    return <StudyRoomCardListSkeleton />;
  }

  if (studyroomListData.length === 0) {
    return (
      <div className={styles.empty}>
        <p>찾으시는 스터디룸이 없습니다.</p>
      </div>
    );
  }

  return (
    <ul className={styles.container}>
      {studyroomListData.map((studyroomData) => (
        <li key={studyroomData.id}>
          {studyroomData.isPublic ? (
            <Link to={`/studyroom/${studyroomData.id}/setting`}>
              <StudyRoomCard roomData={studyroomData} />
            </Link>
          ) : (
            <Link to={`/check-password/${studyroomData.id}`} state={{ background: location }}>
              <StudyRoomCard roomData={studyroomData} />
            </Link>
          )}
        </li>
      ))}
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
    </ul>
  );
}

export default StudyRoomCardList;

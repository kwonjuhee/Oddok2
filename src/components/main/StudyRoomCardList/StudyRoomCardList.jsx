import { useSearchParams } from "react-router-dom";
import { Dropdown } from "@components/@commons";
import { TabMenu, StudyRoomCardGrid } from "@components/main";
import { ArrowDown } from "@icons";
import { STUDY_FILTER_OPTIONS, STUDY_SORT_OPTIONS } from "@utils/constants/options";
import { useStudyRoomList } from "@hooks/@queries/studyroom-queries";
import styles from "./StudyRoomCardList.module.css";

function StudyRoomCardList({ tagFilter }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, studyroomData, fetchNextPage, hasNextPage } = useStudyRoomList(searchParams);

  const clickMoreBtn = () => {
    fetchNextPage();
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <TabMenu
          defaultValue={searchParams.get("category")}
          setCurrentCategory={(value) => {
            if (!value) searchParams.delete("category");
            else searchParams.set("category", value);
            setSearchParams(searchParams);
          }}
        />
        <div className={styles.filters}>
          <Dropdown
            options={STUDY_FILTER_OPTIONS}
            defaultValue={searchParams.get("isPublic")}
            onSelect={(value) => {
              if (!value) searchParams.delete("isPublic");
              else searchParams.set("isPublic", value);
              setSearchParams(searchParams);
            }}
          />
          <Dropdown
            options={STUDY_SORT_OPTIONS}
            defaultValue={searchParams.get("sort")}
            onSelect={(value) => {
              if (!value) searchParams.delete("sort");
              else searchParams.set("sort", value);
              setSearchParams(searchParams);
            }}
          />
        </div>
      </div>
      <StudyRoomCardGrid
        isLoading={isLoading}
        rooms={
          tagFilter?.size > 0
            ? studyroomData.filter(({ hashtags }) => hashtags.some((e) => [...tagFilter].includes(e)))
            : studyroomData
        }
      />
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

import { useSearchParams } from "react-router-dom";
import { Dropdown } from "@components/@commons";
import { TabMenu } from "@components/main";
import { STUDY_FILTER_OPTIONS, STUDY_SORT_OPTIONS } from "@utils/constants/options";
import styles from "./StudyRoomCardListHead.module.css";

export default function StudyRoomCardListHead() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectSearchParams = (param, value) => {
    setSearchParams((prev) => {
      if (value) prev.set(param, value);
      else prev.delete(param, value);
      return prev;
    });
  };

  return (
    <div className={styles.head}>
      <TabMenu
        defaultValue={searchParams.get("category")}
        setCurrentCategory={(value) => selectSearchParams("category", value)}
      />
      <div className={styles.filters}>
        <Dropdown
          options={STUDY_FILTER_OPTIONS}
          defaultValue={searchParams.get("isPublic")}
          onSelect={(value) => selectSearchParams("isPublic", value)}
        />
        <Dropdown
          options={STUDY_SORT_OPTIONS}
          defaultValue={searchParams.get("sort")}
          onSelect={(value) => selectSearchParams("sort", value)}
        />
      </div>
    </div>
  );
}

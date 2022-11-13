import { useSearchParams } from "react-router-dom";
import { Dropdown } from "@components/@commons";
import { TabMenu } from "@components/main";
import { STUDY_FILTER_OPTIONS, STUDY_SORT_OPTIONS } from "@utils/constants/options";
import styles from "./StudyRoomCardListHead.module.css";

export default function StudyRoomCardListHead() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
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
  );
}

import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { StudyRoomCardList, StudyRoomCardListHead } from "@components/main";
import ErrorBoundary from "@components/@commons/ErrorBoundary";
import { PopularHashtagList } from "@components/search";
import styles from "./SearchResult.module.css";

function SearchResult() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedHashtag, setSelectedHashtag] = useState(new Set());

  const selectTagFilters = (e) => {
    if (e.target.checked) setSelectedHashtag((prev) => new Set(prev).add(e.target.value));
    else
      setSelectedHashtag((prev) => {
        const next = new Set(prev);
        next.delete(e.target.value);
        return next;
      });
  };

  return (
    <div className={styles.container}>
      <h2>&ldquo;{searchParams.get("name") ?? `#${searchParams.get("hashtag")}`}&rdquo; 검색 결과</h2>
      <div>
        <h3>태그 필터</h3>
        <ErrorBoundary>
          <PopularHashtagList onToggle={selectTagFilters} />
        </ErrorBoundary>
      </div>
      <ErrorBoundary>
        <StudyRoomCardListHead />
        <StudyRoomCardList tagFilter={[...selectedHashtag]} />
      </ErrorBoundary>
    </div>
  );
}

export default SearchResult;

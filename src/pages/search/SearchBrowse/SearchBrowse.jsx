import React from "react";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "@components/@commons/ErrorBoundary";
import { PopularHashtagList, SearchHistory } from "@components/search";
import styles from "./SearchBrowse.module.css";

function SearchBrowse() {
  const navigate = useNavigate();

  const searchHashtag = (e) => {
    navigate({ pathname: "/search/studyroom", search: `?hashtag=${e.target.value}` });
  };

  const searchTitle = (text) => {
    navigate({ pathname: "/search/studyroom", search: `?name=${text}` });
  };

  return (
    <div className={styles.container}>
      <div>
        <h3>인기 태그</h3>
        <ErrorBoundary>
          <PopularHashtagList onToggle={searchHashtag} />
        </ErrorBoundary>
      </div>
      <SearchHistory searchTitle={searchTitle} />
    </div>
  );
}

export default SearchBrowse;

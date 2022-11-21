import React, { useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { PageLayout } from "@components/@layouts";
import { SearchBrowse, SearchResult } from "@components/search";
import { Input } from "@components/@commons";
import { useSearchHistory } from "@hooks";
import styles from "./Search.module.css";

function Search() {
  const keywordRef = useRef();
  const navigate = useNavigate();
  const { addKeyword } = useSearchHistory();

  const handleSearchKeyword = (e) => {
    e.preventDefault();
    if (keywordRef.current.value === "") return;

    addKeyword(keywordRef.current.value);
    navigate({ pathname: "/search/studyroom", search: `?name=${keywordRef.current.value}` });
    keywordRef.current.blur();
    keywordRef.current.value = "";
  };

  return (
    <PageLayout>
      <form className={styles.input_wrapper} onSubmit={handleSearchKeyword}>
        <Input ref={keywordRef} />
      </form>
      <Routes>
        <Route path="/" element={<SearchBrowse />} />
        <Route path="/studyroom" element={<SearchResult />} />
      </Routes>
    </PageLayout>
  );
}

export default Search;

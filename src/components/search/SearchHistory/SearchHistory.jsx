import React from "react";
import { useSearchHistory } from "@hooks";
import styles from "./SearchHistory.module.css";

function SearchHistory({ searchTitle }) {
  const { keywords, removeKeyword, removeKeywordAll } = useSearchHistory();

  if (keywords.length === 0) return null;

  return (
    <div>
      <div className={styles.head}>
        <h3>검색기록</h3>
        <button type="button" onClick={removeKeywordAll}>
          전체 삭제
        </button>
      </div>
      <div className={styles.content}>
        {keywords.map((keyword) => (
          <li className={styles.item} key={keyword.key}>
            <span onClick={() => searchTitle(keyword.text)}>{keyword.text}</span>
            <button type="button" onClick={() => removeKeyword(keyword.key)}>
              &times;
            </button>
          </li>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory;

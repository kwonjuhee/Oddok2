import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getPopluarHashtag } from "@api/hashtag-api";
import { HashtagButton } from "@components/@commons";
import HashtagListSkeleton from "./HashtagListSkeleton";
import styles from "./HashtagList.module.css";

function HashtagList({ onToggle }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hashtags, setHashtags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const param = searchParams.get("title");
    getPopluarHashtag(param)
      .then((response) => {
        setHashtags(response.data.hashtags);
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }, [searchParams]);

  return (
    <div className={styles.hashtag_list}>
      {isLoading && <HashtagListSkeleton />}
      {hashtags.map((label) => (
        <HashtagButton key={label} label={label} onToggle={onToggle} />
      ))}
    </div>
  );
}

export default HashtagList;

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import { useRecoilValue } from "recoil";
import { userState } from "@recoil/user";
import { Thumbnail, UserCount } from "@components/@commons";
import { Lock, Unlock, BookMark, BookMarkHeart } from "@icons";
import { useGoToPage } from "@hooks";
import { useBookmarkQuery, useAddBookmark, useDeleteBookmark } from "@hooks/@queries/bookmark";
import styles from "./StudyRoomCard.module.css";

function StudyRoomCard({ roomData }) {
  const user = useRecoilValue(userState);
  const { goToLogin } = useGoToPage();

  const { bookmarkData } = useBookmarkQuery();
  const addBookmarkMutation = useAddBookmark();
  const deleteBookmarkMutation = useDeleteBookmark();

  const onBookmarkAddBtnClick = (e) => {
    e.preventDefault();
    if (!user.isLogin) {
      goToLogin();
      return;
    }
    addBookmarkMutation.mutate(roomData.id);
  };

  const onBookmarkDeleteBtnClick = (e) => {
    e.preventDefault();
    deleteBookmarkMutation.mutate();
  };

  return (
    <div className={styles.wrapper}>
      <Thumbnail>
        {bookmarkData?.id !== roomData.id ? (
          <button type="button" className={styles.bookmark_btn} onClick={onBookmarkAddBtnClick}>
            <BookMark />
          </button>
        ) : (
          <button type="button" className={styles.bookmark_btn} onClick={onBookmarkDeleteBtnClick}>
            <BookMarkHeart />
          </button>
        )}
        <div className={styles.user_icon}>
          <UserCount number={roomData.currentUsers} />
          <span>/ {roomData.limitUsers}</span>
        </div>
      </Thumbnail>
      <div className={styles.description}>
        <div className={styles.title}>
          <span className={styles.ellipsis}>{roomData.name}</span>
          {roomData.isPublic ? <Unlock /> : <Lock />}
        </div>
        <div className={styles.ellipsis}>
          {roomData.hashtags.map((hashtag) => (
            <span key={hashtag}>#{hashtag} </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudyRoomCard;

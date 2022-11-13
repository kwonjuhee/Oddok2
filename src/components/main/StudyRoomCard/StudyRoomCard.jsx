/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import { useRecoilValue } from "recoil";
import { userState } from "@recoil/user-state";
import { PasswordModal, Thumbnail, UserCount } from "@components/@commons";
import { Lock, Unlock, BookMark, BookMarkHeart } from "@icons";
import { useModal, useGoToPage } from "@hooks";
import { useBookmarkQuery, useAddBookmark, useDeleteBookmark } from "@hooks/@queries/bookmark-queries";
import styles from "./StudyRoomCard.module.css";

function StudyRoomCard({ roomData }) {
  const user = useRecoilValue(userState);
  const { isModal, openModal, closeModal } = useModal();
  const { goToLogin, goToSetting } = useGoToPage();

  const { bookmarkData } = useBookmarkQuery();
  const addBookmarkMutation = useAddBookmark();
  const deleteBookmarkMutation = useDeleteBookmark();

  const onStudyRoomClick = () => {
    if (roomData.isPublic) {
      goToSetting(roomData.id);
    } else {
      openModal();
    }
  };

  const onBookmarkAddBtnClick = (event) => {
    event.stopPropagation();
    if (!user.isLogin) {
      goToLogin();
      return;
    }
    addBookmarkMutation.mutate(roomData.id);
  };

  const onBookmarkDeleteBtnClick = (event) => {
    event.stopPropagation();
    deleteBookmarkMutation.mutate();
  };

  return (
    <>
      {isModal && <PasswordModal roomId={roomData.id} onClose={closeModal} />}
      <div className={styles.wrapper} onClick={onStudyRoomClick}>
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
    </>
  );
}

export default StudyRoomCard;

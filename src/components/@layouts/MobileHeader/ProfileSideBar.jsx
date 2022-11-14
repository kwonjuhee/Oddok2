import React from "react";
import { Cancel, Profile, Door } from "@icons";
import { useGoToPage, useModal } from "@hooks";
import { useFetchUserInfo, useOAuthLogout } from "@hooks/@queries/user-queries";
import { NicknameEditModal } from "@components/@commons";
import styles from "./ProfileSideBar.module.css";

function ProfileSideBar({ toggleProfileSideBar }) {
  const { goToMyPage } = useGoToPage();
  const { isModal, openModal, closeModal } = useModal();
  const { nickname } = useFetchUserInfo();
  const { mutate } = useOAuthLogout();

  const clickLogoutButton = () => {
    mutate(null, {
      onSuccess: () => {
        toggleProfileSideBar();
      },
    });
  };

  return (
    <>
      {isModal && <NicknameEditModal onClose={closeModal} />}
      <aside className={styles.container}>
        <div className={styles.cancel_icon} onClick={toggleProfileSideBar}>
          <Cancel />
        </div>
        <div className={styles.info}>
          <div className={styles.profile_icon}>
            <Profile />
          </div>
          <div>
            <span className={styles.nickname}>{nickname}</span>
            <div className={styles.btns}>
              <button type="button" onClick={openModal}>
                닉네임 수정 &gt;
              </button>
              <button type="button" onClick={goToMyPage}>
                마이페이지 &gt;
              </button>
            </div>
          </div>
        </div>
        <button type="button" className={styles.logout_btn} onClick={clickLogoutButton}>
          <div className={styles.logout_icon}>
            <Door />
          </div>
          <span>로그아웃</span>
        </button>
      </aside>
    </>
  );
}

export default ProfileSideBar;

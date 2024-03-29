import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Search, Profile } from "@icons";
import { NicknameEditModal } from "@components/@commons";
import { useModal, useGoToPage, useOutSideClick } from "@hooks";
import { useFetchUserInfo } from "@hooks/@queries/user";
import ProfileMenu from "./ProfileMenu";
import styles from "./Header.module.css";

function Header() {
  const { isLogin, nickname } = useFetchUserInfo();
  const [isOpenProfileMenu, setIsOpenProfileMenu] = useState(false);
  const { isModal, openModal, closeModal } = useModal();
  const { goToSearch, goToCreate } = useGoToPage();

  const dropdownRef = useRef();
  useOutSideClick(dropdownRef, () => setIsOpenProfileMenu(false));

  const clickProfileBtn = () => setIsOpenProfileMenu((prev) => !prev);

  const clickNicknameEditBtn = () => {
    openModal();
    setIsOpenProfileMenu(false);
  };

  return (
    <>
      {isModal && <NicknameEditModal onClose={closeModal} />}
      <header className={styles.header}>
        <div className={styles.logo}>
          <a href="/">ODDOK</a>
        </div>
        <div className={styles.links}>
          <NavLink to="/" end className={({ isActive }) => `${styles.nav_link} ${isActive ? styles.active : ""}`}>
            스터디룸
          </NavLink>
          <NavLink to="/mypage" className={({ isActive }) => `${styles.nav_link} ${isActive ? styles.active : ""}`}>
            마이페이지
          </NavLink>
        </div>
        <div className={styles.menu}>
          <button type="button" onClick={goToSearch}>
            <Search />
          </button>
          <div ref={dropdownRef}>
            <button type="button" onClick={clickProfileBtn}>
              <Profile />
              <span className={styles.nickname}>{nickname}</span>
            </button>
            {isLogin && isOpenProfileMenu && <ProfileMenu clickNicknameEditBtn={clickNicknameEditBtn} />}
          </div>
          <button type="button" className={styles.study_btn} onClick={goToCreate}>
            + 새 스터디 만들기
          </button>
        </div>
      </header>
    </>
  );
}
export default Header;

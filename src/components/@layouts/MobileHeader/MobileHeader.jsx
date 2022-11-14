import React, { useState } from "react";
import { Search, Profile } from "@icons";
import { useGoToPage } from "@hooks";
import { useFetchUserInfo } from "@hooks/@queries/user-queries";
import ProfileSideBar from "./ProfileSideBar";
import styles from "./MobileHeader.module.css";

function MobileHeader() {
  const { goToSearch, goToLogin } = useGoToPage();
  const [isOpenProfileSideBar, setIsOpenProfileSideBar] = useState(false);
  const { isLogin } = useFetchUserInfo();

  const toggleProfileSideBar = () => setIsOpenProfileSideBar((prev) => !prev);

  return (
    <>
      <header className={styles.header}>
        <a href="/">ODDOK</a>
        <div className={styles.menu}>
          <button type="button" onClick={goToSearch}>
            <Search />
          </button>
          <button type="button" onClick={isLogin ? toggleProfileSideBar : goToLogin}>
            <Profile />
          </button>
        </div>
      </header>
      {isOpenProfileSideBar && <ProfileSideBar toggleProfileSideBar={toggleProfileSideBar} />}
    </>
  );
}

export default MobileHeader;

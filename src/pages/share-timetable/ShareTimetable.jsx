import React from "react";
import { CloseButton, ShareButton } from "@components/share";
import StudyHistorySection from "../mypage/StudyHistorySection/StudyHistorySection";
import styles from "./ShareTimetable.module.css";

function ShareTimetable() {
  return (
    <div className={styles.share_page}>
      <CloseButton />
      <StudyHistorySection />
      <ShareButton />
    </div>
  );
}

export default ShareTimetable;

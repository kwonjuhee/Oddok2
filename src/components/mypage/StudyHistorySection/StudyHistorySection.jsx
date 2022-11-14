import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { TimeTable } from "@components/@commons";
import { DatePicker, TimeRecordList } from "@components/mypage";
import { useTimeRecordQuery } from "@hooks/@queries/mypage-queries";
import { dateFormatting } from "@utils";
import styles from "./StudyHistorySection.module.css";

function StudyHistorySection() {
  const location = useLocation();
  const isSharePage = location.pathname === "/share/study-time";
  const [selectedDate, setSelectedDate] = useState(dateFormatting(new Date()));
  const { timeRecordList, totalStudyTime } = useTimeRecordQuery(selectedDate);

  return (
    <section>
      <h2 className={styles.heading}>공부 기록</h2>
      <div className={styles.container}>
        <div className={`${styles.left_box} ${isSharePage ? styles.share : ""}`}>
          {!isSharePage && (
            <div>
              <div className={styles.sub_heading}>날짜</div>
              <DatePicker onChange={(date) => setSelectedDate(dateFormatting(date))} />
            </div>
          )}
          <div>
            <div className={styles.sub_heading}>과목</div>
            <div className={styles.subject_box}>
              <span>
                {`${Math.floor(totalStudyTime / 1000 / 60 / 60)}시간 
                  ${Math.floor((totalStudyTime / 1000 / 60) % 60)}분 
                  ${Math.floor(totalStudyTime / 1000) % 60}초`}
              </span>
              <TimeRecordList list={timeRecordList} />
            </div>
          </div>
        </div>
        <div className={`${styles.right_box} ${isSharePage ? styles.share : ""}`}>
          <div className={styles.sub_heading}>시간표</div>
          <TimeTable timeRecordList={timeRecordList} />
        </div>
      </div>
    </section>
  );
}

export default StudyHistorySection;

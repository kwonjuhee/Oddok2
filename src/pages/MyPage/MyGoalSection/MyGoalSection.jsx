import React from "react";
import { useModal } from "@hooks";
import { Textarea } from "@components/@commons";
import { MyGoalEditModal, EditButton } from "@components/mypage";
import { useMyGoalQuery } from "@hooks/@queries/mypage";
import { getDday, dateParsing } from "@utils";
import styles from "./MyGoalSection.module.css";

function MyGoalSection() {
  const { myGoalData } = useMyGoalQuery();
  const { isModal, openModal, closeModal } = useModal();

  return (
    <>
      {isModal && <MyGoalEditModal onClose={closeModal} />}
      <section className={styles.my_goal}>
        <div className={styles.heading}>
          <div>내 목표</div>
          <EditButton onClick={openModal} />
        </div>
        <div className={styles.contents}>
          <div>
            <div className={styles.sub_heading}>디데이</div>
            <div className={styles.box}>
              <div className={styles.bold}>{myGoalData.dday ? getDday(dateParsing(myGoalData.dday)) : "D-DAY"}</div>
              <div>
                <div>{myGoalData.ddayInfo ?? "날짜를 추가하세요."}</div>
                <div>
                  {myGoalData.dday
                    ? `${new Date(myGoalData.dday).getFullYear()}. ${
                        new Date(myGoalData.dday).getMonth() + 1
                      }. ${new Date(myGoalData.dday).getDate()}`
                    : "0000. 00. 00"}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.sub_heading}>공부시간</div>
            <div className={styles.box}>
              <div className={styles.bold}>{myGoalData.targetTime ? `${myGoalData.targetTime} 시간` : "몇 시간"}</div>
              <div>/하루</div>
            </div>
          </div>
          <div className={styles.text_box}>
            <div className={styles.sub_heading}>목표</div>
            <div className={styles.text_field}>
              <Textarea
                placeholder="수정 버튼을 눌러 내 목표 또는 각오를 적어주세요."
                value={myGoalData.goal ?? ""}
                disabled
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MyGoalSection;

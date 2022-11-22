import React, { useState } from "react";
import { Modal, Calendar, Input, Dropdown, Textarea } from "@components/@commons";
import { useMyGoalQuery, useMyGoalMutation } from "@hooks/@queries/mypage";
import { dateParsing, dateFormatting } from "@utils";
import { TARGET_TIME_OPTIONS } from "@utils/constants/options";
import styles from "./MyGoalEditModal.module.css";

function MyGoalEditModal({ onClose }) {
  const { myGoalData } = useMyGoalQuery();
  const { mutate } = useMyGoalMutation();

  const [inputData, setInputData] = useState(myGoalData);

  const isValid = inputData.dday && inputData.ddayInfo;

  const selectDate = (date) => {
    setInputData((prev) => ({ ...prev, dday: dateFormatting(date) }));
  };

  const inputDdayInfo = (e) => {
    setInputData((prev) => ({ ...prev, ddayInfo: e.target.value }));
  };

  const selectTargetTime = (value) => {
    setInputData((prev) => ({ ...prev, targetTime: value }));
  };

  const inputGoal = (e) => {
    setInputData((prev) => ({ ...prev, goal: e.target.value }));
  };

  const editMyGoal = () => {
    mutate(inputData, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Modal
      title="목표 수정"
      onClose={onClose}
      onAction={{
        text: "확인",
        action: editMyGoal,
      }}
      disabled={!isValid}
    >
      <div className={styles.box}>
        <div className={styles.item}>
          <h3>디데이</h3>
          <div className={styles.dday}>
            <Calendar
              onChange={selectDate}
              placeholderText="날짜를 선택해주세요"
              defaultDate={inputData.dday ? dateParsing(inputData.dday) : null}
            />
            <Input onChange={inputDdayInfo} placeholder="디데이 제목을 입력해주세요" value={inputData.ddayInfo} />
          </div>
        </div>
        <div className={styles.item}>
          <h3>공부시간</h3>
          <div>
            <Dropdown options={TARGET_TIME_OPTIONS} onSelect={selectTargetTime} defaultValue={inputData.targetTime} />
          </div>
        </div>
        <div className={styles.item}>
          <h3>목표</h3>
          <div className={styles.textarea}>
            <Textarea onChange={inputGoal} value={inputData.goal ?? ""} />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default MyGoalEditModal;

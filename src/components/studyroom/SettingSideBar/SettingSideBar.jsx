import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Hashtag, Play, Pause } from "@icons";
import { useStudyRoomQuery, useUpdateStudyRoom } from "@hooks/@queries/studyroom-queries";
import { SettingForm } from "..";
import styles from "./SettingSideBar.module.css";

function SettingSideBar({ session, showEditBtn }) {
  const { roomId } = useParams();
  const { studyroomData } = useStudyRoomQuery(roomId);
  const { mutate } = useUpdateStudyRoom(roomId);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleSettingForm = () => setIsFormOpen((prev) => !prev);

  const updateRoomInfo = (newRoomInfo) => {
    mutate(
      { roomId, newRoomInfo },
      {
        onSuccess: () => {
          session?.signal({
            data: JSON.stringify(newRoomInfo),
            to: [],
            type: "roomDataUpdated",
          });
        },
      },
    );
  };

  return (
    <>
      {isFormOpen && <SettingForm onClose={toggleSettingForm} onUpdate={updateRoomInfo} />}
      <aside className={styles.side_box}>
        <h1>{studyroomData.name}</h1>
        <div>
          <ul className={styles.hashtags}>
            {studyroomData.hashtags?.map((hashtag) => (
              <li key={hashtag}>
                <Hashtag />
                <span>{hashtag}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className={styles.label}>스터디 기간</span>
          <div className={styles.text_field}>{studyroomData.endAt}</div>
        </div>
        <div className={styles.rule}>
          <span className={styles.label}>스터디 규칙</span>
          <div className={styles.text_field}>{studyroomData.rule ? studyroomData.rule : "없음"}</div>
        </div>
        {showEditBtn && (
          <button className={styles.button} type="submit" onClick={toggleSettingForm}>
            방 정보 수정
          </button>
        )}
      </aside>
    </>
  );
}

export default SettingSideBar;

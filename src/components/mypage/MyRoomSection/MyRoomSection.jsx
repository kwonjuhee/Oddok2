import React from "react";
import { useModal } from "@hooks";
import { MyRoom, EditButton, MyRoomEditModal } from "@components/mypage";
import { useMyRoomQuery } from "@hooks/@queries/mypage-queries";
import styles from "./MyRoomSection.module.css";

function MyRoomSection() {
  const { myRoomData } = useMyRoomQuery();
  const { isModal, openModal, closeModal } = useModal();

  return (
    <>
      {isModal && <MyRoomEditModal onClose={closeModal} />}
      <section>
        <div className={styles.heading}>
          <h2>생성 스터디룸</h2>
          {myRoomData && <EditButton onClick={openModal} />}
        </div>
        <div className={styles.sub_heading}>생성한 스터디룸</div>
        {myRoomData ? <MyRoom roomData={myRoomData} /> : <div className={styles.no_content}>없습니다.</div>}
      </section>
    </>
  );
}
export default MyRoomSection;

import React, { useState } from "react";
import { Modal } from "@components/@commons";
import { SettingForm } from "@components/studyroom";
import { MyRoom, EditButton } from "@components/mypage";
import { useMyRoomQuery, useUpdateMyRoom, useDeleteMyRoom } from "@hooks/@queries/mypage";
import styles from "./MyRoomEditModal.module.css";

function MyRoomEditModal({ onClose }) {
  const { myRoomData } = useMyRoomQuery();
  const [inputData, setInputData] = useState(myRoomData);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const updateMyRoomMutation = useUpdateMyRoom();
  const deleteMyRoomMutation = useDeleteMyRoom();

  const editMyRoomHandler = () => {
    setIsFormOpen(true);
  };

  const updateMyRoomHandler = () => {
    updateMyRoomMutation.mutate(
      { roomId: myRoomData.id, newRoomInfo: inputData },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  const deleteMyRoomHandler = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      deleteMyRoomMutation.mutate(myRoomData.id, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <div>
      {isFormOpen ? (
        <SettingForm
          roomData={myRoomData}
          onClose={() => setIsFormOpen(false)}
          onUpdate={(data) => setInputData(data)}
        />
      ) : (
        <Modal
          title="스터디룸 수정"
          onClose={onClose}
          onAction={{
            text: "확인",
            action: updateMyRoomHandler,
          }}
        >
          <div className={styles.box}>
            <h3>생성 스터디룸</h3>
            <div className={styles.item}>
              <MyRoom roomData={inputData} />
              <div className={styles.buttons}>
                <EditButton onClick={editMyRoomHandler} />
                <EditButton onClick={deleteMyRoomHandler} deleteBtn />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default MyRoomEditModal;

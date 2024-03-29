import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Input } from "@components/@commons";
import { useCheckStudyRoomPassword } from "@hooks/@queries/studyroom";
import styles from "./PasswordModal.module.css";

function PasswordModal() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [isInvalid, setIsInvalid] = useState(false);
  const inputRef = useRef();

  const { mutate } = useCheckStudyRoomPassword(roomId);

  const checkStudyRoomPassword = () => {
    mutate(inputRef.current.value, {
      onSuccess: () => {
        navigate(`/studyroom/${roomId}/setting`, { replace: true });
      },
      onError: () => {
        setIsInvalid(true);
        inputRef.current.value = "";
        inputRef.current.focus();
      },
    });
  };

  const onChangePassword = () => {
    if (isInvalid) {
      setIsInvalid(false);
    }
  };

  const onClose = () => {
    navigate(-1);
  };

  return (
    <Modal
      title="비밀번호"
      onClose={onClose}
      onAction={{
        text: "확인",
        action: checkStudyRoomPassword,
      }}
    >
      <label htmlFor="password">
        <p className={styles.content}>비공개 스터디입니다. 비밀번호를 입력해주세요.</p>
        <Input
          ref={inputRef}
          isInvalid={isInvalid}
          type="password"
          maxLength="4"
          onChange={onChangePassword}
          onEnterKeyPress={checkStudyRoomPassword}
          autoFocus
        />
      </label>
      {isInvalid && <p className={styles.error}>비밀번호를 잘못 입력했습니다. 다시 입력해주세요.</p>}
    </Modal>
  );
}

export default PasswordModal;

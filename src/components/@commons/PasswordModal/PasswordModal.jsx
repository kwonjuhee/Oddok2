import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { passwordAuthenticatedState } from "@recoil/studyroom-state";
import { Modal, Input } from "@components/@commons";
import { useInput } from "@hooks";
import { useCheckStudyRoomPassword } from "@hooks/@queries/studyroom-queries";
import styles from "./PasswordModal.module.css";

function PasswordModal() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const inputRef = useRef();
  const [isInvalid, setIsInvalid] = useState(false);
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

  const onChange = () => {
    if (isInvalid) {
      setIsInvalid(false);
    }
  };

  const onClose = () => {
    navigate(-1);
  };

  const { pressEnter } = useInput(inputRef, checkStudyRoomPassword);

  const content = (
    <>
      <label htmlFor="password">
        <p className={styles.content}>비공개 스터디입니다. 비밀번호를 입력해주세요.</p>
        <Input
          ref={inputRef}
          isInvalid={isInvalid}
          type="password"
          maxLength="4"
          onChange={onChange}
          onKeyPress={pressEnter}
        />
      </label>
      {isInvalid && <p className={styles.error}>비밀번호를 잘못 입력했습니다. 다시 입력해주세요.</p>}
    </>
  );

  return (
    <Modal
      title="비밀번호"
      content={content}
      onClose={onClose}
      onAction={{
        text: "확인",
        action: checkStudyRoomPassword,
      }}
    />
  );
}

export default PasswordModal;

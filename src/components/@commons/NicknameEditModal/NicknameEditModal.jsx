import React, { useState, useRef } from "react";
import { Modal, Input } from "@components/@commons";
import { editNickname } from "@api/user";
import { useRecoilState } from "recoil";
import { userState } from "@recoil/user";
import { useInput } from "@hooks";
import styles from "./NicknameEditModal.module.css";

function NicknameEditModal({ onClose }) {
  const [user, setUserState] = useRecoilState(userState);
  const [nickname, setNickname] = useState(user.nickname);
  const inputRef = useRef();
  const [isDisabled, setIsDisabled] = useState(false);

  const onChange = (event) => {
    event.preventDefault();
    if (!event.currentTarget.value) {
      setIsDisabled(true);
    } else if (event.currentTarget.value && isDisabled) {
      setIsDisabled(false);
    }
    setNickname(event.currentTarget.value);
  };

  const changeNickname = async (name) => {
    const response = await editNickname(name);
    setUserState((prev) => ({ ...prev, nickname: response.nickname }));
  };

  const { pressEnter } = useInput(
    inputRef,
    () => {
      changeNickname(nickname);
      onClose();
    },
    isDisabled,
  );

  return (
    <Modal
      title="닉네임 수정"
      onClose={onClose}
      onAction={{
        text: "확인",
        action: () => {
          changeNickname(nickname);
          onClose();
        },
      }}
      disabled={isDisabled}
    >
      <label htmlFor="nickname">
        <p className={styles.content}>닉네임</p>
        <Input ref={inputRef} value={nickname} maxLength="8" onChange={onChange} onKeyPress={pressEnter} />
      </label>
    </Modal>
  );
}

export default NicknameEditModal;

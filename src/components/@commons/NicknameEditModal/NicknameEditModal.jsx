import { Modal, Input } from "@components/@commons";
import { useEditNickname } from "@hooks/@queries/user";
import { useInput } from "@hooks";
import styles from "./NicknameEditModal.module.css";

function NicknameEditModal({ onClose }) {
  const [nickname, onChangeNickname] = useInput();

  const { mutate } = useEditNickname();

  const changeNickname = () => {
    mutate(nickname, { onSuccess: onClose });
  };

  return (
    <Modal
      title="닉네임 수정"
      onClose={onClose}
      onAction={{
        text: "확인",
        action: changeNickname,
      }}
      disabled={nickname.length === 0}
    >
      <label htmlFor="nickname">
        <p className={styles.content}>닉네임</p>
        <Input value={nickname} maxLength="10" onChange={onChangeNickname} onEnterKeyPress={changeNickname} autoFocus />
      </label>
    </Modal>
  );
}

export default NicknameEditModal;

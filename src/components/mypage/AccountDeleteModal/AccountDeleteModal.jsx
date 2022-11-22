import React from "react";
import { Modal } from "@components/@commons";
import { useDeleteAccount } from "@hooks/@queries/user";

function AccountDeleteModal({ onClose }) {
  const { mutate } = useDeleteAccount();

  return (
    <Modal title="계정 삭제" onClose={onClose} onAction={{ text: "삭제하기", action: mutate }}>
      ODDOK 계정을 삭제하시겠습니까?
    </Modal>
  );
}

export default AccountDeleteModal;

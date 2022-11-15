import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "@components/@commons";
import { useHandleError } from "@hooks/useHandleError";

function ErrorModal() {
  const navigate = useNavigate();
  const { error, setError, clearError } = useHandleError();

  const handleClose = () => {
    clearError();
  };

  const redirect = (path) => {
    setError(null);
    navigate(path);
  };

  if (!error) return null;

  return (
    <Modal
      title="⚠️"
      onClose={handleClose}
      onAction={{
        text: error.action?.text ?? "메인으로 이동하기",
        action: () => redirect(error.action?.path ?? "/"),
      }}
    >
      {error.message}
    </Modal>
  );
}

export default ErrorModal;

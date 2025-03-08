import React, { ReactNode } from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>{title}</h3>
        {children}

        <div className={styles.buttonContainer}>
          <button onClick={onSubmit} className={styles.submitButton}>
            Submit
          </button>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

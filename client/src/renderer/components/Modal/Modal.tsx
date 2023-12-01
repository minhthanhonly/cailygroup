import React, { ReactNode } from 'react';
import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        {children}
        <button className="btn" onClick={onClose}>
          Xác nhận
        </button>
        <button className="btn btn--orange" onClick={onClose}>
          Hủy
        </button>
      </div>
      <div onClick={onClose} className="modal-close"></div>
    </div>
  );
};

export default Modal;

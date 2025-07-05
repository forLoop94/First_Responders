import React, { ReactNode } from "react";

interface ModalProps {
  onClose?: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        {children}
        {onClose && (
          <div className="modal-action">
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

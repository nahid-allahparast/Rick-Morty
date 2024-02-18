import { XCircleIcon } from "@heroicons/react/24/outline";

const Modal = ({ children, title, open, onOpen }) => {
  if (!open) return null;
  return (
    <div>
      <div className="backdrop" onClick={() => onOpen(false)}></div>
      <div className="modal">
        <div className="modal__header">
          <h2>{title}</h2>
          <button onClick={() => onOpen(false)} className="icon">
            <XCircleIcon className="red" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;

import React, { useContext } from "react";
import { ModalContext } from "../Context/ModalContext";
import { FaTimes } from "react-icons/fa";

const Modal = ({ children }) => {
  const { showModal, setShowModal } = useContext(ModalContext);
  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 h-full w-full flex justify-center items-center z-50">
          <div
            onClick={() => setShowModal(false)}
            className=" absolute inset-0 bg-black/50"
          ></div>
          <div className="w-full max-w-5xl bg-(--color-background) p-4 rounded-md shadow-md h-auto z-50 ">
            {children}
          </div>

          <button
            onClick={() => setShowModal(false)}
            className="bg-(--color-background) z-50 absolute top-5 right-5 p-2 rounded-sm"
          >
            <FaTimes size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Modal;

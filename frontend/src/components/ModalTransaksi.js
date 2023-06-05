import React from "react";
import { createPortal } from "react-dom";
import '../App.css'

function ModalTransaksi({showModal, handleCloseModal}) {
  return (
    <>
      {showModal &&
        createPortal(
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseModal}>
                &times;
              </span>
              <p>Transaksi Berhasil</p>
              <button onClick={handleCloseModal}>OK</button>
            </div>
          </div>,
          document.getElementById("modal-root")
        )}
    </>
  );
}

export default ModalTransaksi;

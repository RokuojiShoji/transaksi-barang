import React, { useEffect, useState } from "react";
import axiosInstance from "../components/Api";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../App.css";
import * as Yup from "yup";
import Modal from "react-modal";

function Stok() {
  const [stockAmt, setStockAmt] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axiosInstance.get("/stock/item/i1").then((response) => {
      const stockAmt = response.data.itemAmount;
      setStockAmt(stockAmt);
    });
  });

  const validation = Yup.object().shape({
    itemAmount: Yup.number()
      .integer()
      .min(1, "minimal tambah stok 1")
      .required("harus diisi"),
  });

  const onSubmit = (data) => {
    const newStock = stockAmt + parseInt(data.itemAmount, 10);
    axiosInstance
      .put("/stock/item/i1", { itemAmount: newStock })
      .then(setStockAmt);

    transaction.buyAmount = parseInt(data.itemAmount, 10);

    axiosInstance.post("/transaction/add/", transaction);
    setModalOpen(true);
  };

  const initialValues = {
    itemAmount: "",
  };

  const transaction = {
    buyerName: "Koperasi BSI",
    buyAmount: "",
    buyerTypeCode: "b4",
    paymentCode: "1",
    transactionCode: "K",
    statusCode: "s3",
  };

  let errPlaceholderfield

  return (
    <div className="containerStockPage">
      <Link to="/">
        <button id="backButton" type="button">
          HOME
        </button>
      </Link>
      <div className="containerStockForm">
        <h1 style={{ color: "white" }}>
          {stockAmt && "Stok Gas : " + stockAmt}
        </h1>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validation}
        >
          <Form>
            <div className="containerStockField">
              <label id="fieldLabel">Tambah Stok : </label>
              <Field id="inputStock" name="itemAmount" placeholder={Formik.e} />
            </div>
            <button type="submit" className="button2">
              Submit
            </button>
            {/* <ErrorMessage name="itemAmount" component="span" /> */}
          </Form>
        </Formik>
      </div>
      <Modal
        isOpen={modalOpen}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(25, 25, 25, 0.75)",
          },
          content: {
            position: "absolute",
            margin: "auto",
            width: "80vw",
            height: "30vh",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "0.7rem",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        <div className="modal-content">
          <h1>Tambah Stok Berhasil!</h1>
          <button
            className="modal-exit"
            type="button"
            onClick={() => setModalOpen(false)}
          >
            V
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Stok;

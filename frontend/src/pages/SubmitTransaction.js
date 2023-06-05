import React from "react";
import { Formik, Form, Field, ErrorMessage, yupToFormErrors } from "formik";
import * as Yup from "yup";
import axiosInstance from "../components/Api";
import { useEffect, useState } from "react";
import RadioButton from "../components/RadioButton";
import { Link } from "react-router-dom";
import ModalTransaksi from "../components/ModalTransaksi";
import Modal from "react-modal";

function SubmitTransaction() {
  const notPayed = "20.000";

  const [indexTunai, setIndexTunai] = useState();
  const [indexHutang, setIndexHutang] = useState();
  const [transactions, setTransactions] = useState([]);
  const [buyerTypes, setBuyerTypes] = useState([]);
  const [itemStocks, setItemStocks] = useState();
  const [tCode, setTCode] = useState();

  const [showModalTransaction, setShowModalTransaction] = useState(false);
  const [showModalNotPayed, setShowModalNotPayed] = useState(false);

  useEffect(() => {
    axiosInstance.get("/payment/tunai").then((response) => {
      const indexTunai = response.data.paymentIndex;
      setIndexTunai(indexTunai);
    });
    axiosInstance.get("/payment/hutang").then((response) => {
      const indexHutang = response.data.paymentIndex;
      setIndexHutang(indexHutang);
    });
    axiosInstance.get("/transaction/status/s2").then((response) => {
      const newTransactions = response.data;
      if (JSON.stringify(newTransactions) !== JSON.stringify(transactions)) {
        setTransactions(newTransactions);
      }
      console.log(transactions);
    });
    axiosInstance.get("/buyer/type").then((response) => {
      const buyerTypes = response.data;
      setBuyerTypes(buyerTypes);
    });
    axiosInstance.get("/stock/item/i1").then((response) => {
      const itemStocks = response.data.itemAmount;
      setItemStocks(itemStocks);
    });
  }, [indexTunai, indexHutang, transactions]);

  const initialValues = {
    buyerName: "",
    buyAmount: "",
    buyerTypeCode: "",
    paymentCode: "",
    transactionCode: "",
    statusCode: "",
  };

  const validation = Yup.object().shape({
    buyerName: Yup.string().required("Nama pembeli harus dimasukkan"),
    buyAmount: Yup.number()
      .integer()
      .min(1, "jumlah beli minimal 1")
      .required("jumlah beli harus diisi"),
    buyerTypeCode: Yup.string().required(),
    paymentCode: Yup.string().required(),
  });

  const onSubmit = (data, { resetForm }) => {
    const indexTunaiString = indexTunai.toString();
    const indexHutangString = indexHutang.toString();
    if (data.paymentCode === "p1") {
      data.statusCode = "s1";
      data.transactionCode = "T" + indexTunaiString;
      setIndexTunai((prevState) => {
        const newIndexTunai = prevState + 1;
        axiosInstance
          .put("/payment/update/p1", {
            paymentIndex: newIndexTunai,
          })
          .then((response) => {
            console.log(response.data);
          });
      });
    } else if (data.paymentCode === "p2") {
      data.statusCode = "s2";
      data.transactionCode = "H" + indexHutangString;
      setIndexHutang((prevState) => {
        const newIndexHutang = prevState + 1;
        axiosInstance
          .put("/payment/update/p2", {
            paymentIndex: newIndexHutang,
          })
          .then((response) => {
            console.log(response.data);
          });
      });
    }

    axiosInstance.post("/transaction/add", data).then((response) => {
      console.log(response.data);
    });

    const newItemStocks = itemStocks - parseInt(data.buyAmount, 10);
    axiosInstance.put("/stock/item/i1", { itemAmount: newItemStocks });

    setShowModalTransaction(true);
    console.log(showModalTransaction);
    resetForm();

    console.log(data);
  };

  Modal.setAppElement(document.body);
  const handleCloseModalTransaction = () => {
    setShowModalTransaction(false);
  };

  const handleOpenModalNotPayed = (transactionCode) => {
    setTCode(transactionCode);
    setShowModalNotPayed(true);
  };

  const handleCloseModalNotPayed = () => {
    setShowModalNotPayed(false);
  };

  const handleCloseModalPayed = (transactionCode) => {
    updateStatus(transactionCode);
    setShowModalNotPayed(false);
  };

  const updateStatus = (transactionCode) => {
    const tCode = transactions.find(
      (t) => t.transactionCode === transactionCode
    );

    console.log(tCode.transactionCode);

    axiosInstance
      .put("/transaction/status/" + tCode.transactionCode.toString(), {
        statusCode: "s1",
      })
      .then((response) => {
        setTransactions(response.data);
        //console.log(response.data)
      });
  };

  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const optionBuyer = [
    { value: "b1", label: "Anggota" },
    { value: "b2", label: "Non-Anggota" },
    { value: "b3", label: "Mitra" },
  ];

  function handleBuyer(value) {
    setSelectedBuyer(value);
  }

  const [selectedPayment, setSelectedPayment] = useState(null);
  const optionPayment = [
    { value: "p1", label: "Tunai" },
    { value: "p2", label: "Hutang" },
  ];

  function handlePayment(value) {
    setSelectedPayment(value);
  }

  useEffect(() => {});
  return (
    <div className="containerPage">
      <Link to="/">
        <button id="backButton" type="button">
          HOME
        </button>
      </Link>
      <div className="containerForm">
        <h2 style={{ color: "white" }}>TRANSAKSI</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validation}
        >
          <Form>
            <div className="containerField">
              <label id="fieldLabel">Nama: </label>
              <ErrorMessage name="buyerName" component="span" />
              <Field id="inputTransaction" name="buyerName" placeholder="" />
            </div>
            <div className="containerField">
              <label id="fieldLabel">jumlah: </label>
              <ErrorMessage name="buyAmount" component="span" />
              <Field id="inputTransaction" name="buyAmount" placeholder="0  " />
            </div>
            <div className="containerField">
              <label id="fieldLabel">Pembeli: </label>
              <RadioButton
                options={optionBuyer}
                onValueChange={handleBuyer}
                name="buyerTypeCode"
              />
            </div>
            <div className="containerField">
              <label id="fieldLabel">Pembayaran: </label>
              <RadioButton
                options={optionPayment}
                onValueChange={handlePayment}
                name="paymentCode"
              />
            </div>
            <Field
              type="hidden"
              id="inputTransaction"
              name="transactionCode"
              placeholder=""
            />
            <Field
              type="hidden"
              id="inputTransaction"
              name="statusCode"
              placeholder=""
            />
            <button type="submit" className="button2">
              Submit
            </button>
          </Form>
        </Formik>
      </div>
      <div className="transactionListContainer">
        <h2
          style={{
            color: "white",
            textAlign: "center",
            margin: "1rem 0 1rem 0",
          }}
        >
          BELUM LUNAS
        </h2>
        <div className="transactionList">
          <div className="cellAlign">Nama Pembeli</div>
          <div className="cellAlign">Kurang Bayar</div>
        </div>
        {transactions.map((transaction) => {
          let price;
          if (buyerTypes.length > 0) {
            price =
              transaction.buyAmount *
              buyerTypes.find(
                (b) => b.buyerTypeCode === transaction.buyerTypeCode
              ).price;
          }
            return (
              <div className="transactionList">
                <div className="cellAlign">{transaction.buyerName}</div>
                <div className="cellAlign">{"Rp " + price.toString()}</div>
                <div className="containerButtonUpdate">
                  <button
                    key={transaction.transactionCode}
                    onClick={() =>
                      handleOpenModalNotPayed(transaction.transactionCode)
                    }
                    className="buttonUpdateStatus"
                  >
                    LUNAS
                  </button>
                </div>
              </div>
            );
        })}
      </div>
      <Modal
        isOpen={showModalTransaction}
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
          <h1>Transaksi Berhasil!</h1>
          <button
            className="modal-exit"
            type="button"
            onClick={handleCloseModalTransaction}
          >
            V
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={showModalNotPayed}
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
          <h1>Pembayaran sudah lunas?</h1>
          <div className="modalButtonContainer">
            <button
              id="modalPayed"
              type="button"
              onClick={() => handleCloseModalPayed(tCode)}
            >
              Ya
            </button>
            <button
              id="modalNotPayed"
              type="button"
              onClick={() => handleCloseModalNotPayed()}
            >
              Tidak
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SubmitTransaction;

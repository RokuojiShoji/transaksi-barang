import React, { useEffect, useState } from "react";
import axiosInstance from "../components/Api";
import RadioButton from "../components/RadioButton";
import { Link } from "react-router-dom";
import Divider from "../components/Divider";

function Laporan() {
  const [laporanType, setLaporanType] = useState();
  const [buyerTypes, setBuyerTypes] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [buy, setBuy] = useState([])
  const laporanTypeText = laporanType === "daily" ? "HARIAN" : "BULANAN";

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const sqlDate = currentDate.toISOString().slice(0, 10);
  const sqlMonth = currentMonth.toString().padStart(2, "0");

  const handleLaporan = (value) => {
    setLaporanType(value);
  };

  useEffect(() => {
    if (laporanType) {
      const url =
        laporanType === "daily"
          ? `/transaction/${laporanType}/${sqlDate}/s1`
          : `/transaction/${laporanType}/${sqlMonth}/s1`;
      axiosInstance.get(url).then((response) => {
        setTransactions(response.data);
        //console.log(response.data);
      });
    }
    if (laporanType) {
      const url =
        laporanType === "daily"
          ? `/transaction/${laporanType}/${sqlDate}/s3`
          : `/transaction/${laporanType}/${sqlMonth}/s3`;
      axiosInstance.get(url).then((response) => {
        setBuy(response.data);
        console.log(response.data);
      });
    }
    axiosInstance.get("/buyer/type/").then((response) => {
      setBuyerTypes(response.data);
      console.log(response.data);
    });
  }, [laporanType]);

  //////////// HITUNGAN ////////////
  const buyerTypeLookup = {};
  buyerTypes.forEach((buyertype) => {
    buyerTypeLookup[buyertype.buyerTypeCode] = buyertype.price;
  });

  // TOTAL
  let total = 0;
  transactions.forEach((transaction) => {
    const price = buyerTypeLookup[transaction.buyerTypeCode];
    total += transaction.buyAmount * price;
  });

  // HPP
  const buySum = transactions.reduce((acc, curr) => acc + curr.buyAmount, 0);

  // MARGIN
  let margin = 0;
  const buyPrice = buyerTypeLookup["b4"] * buySum;
  margin = total - buyPrice;

  // BAGI HASIL
  const bagiHasil = margin * 0.3

  // PEMBELIAN GAS
  let totalBeli = 0;
  buy.forEach((buy) => {
    const price = buyerTypeLookup[buy.buyerTypeCode];
    totalBeli += buy.buyAmount * price;
  });

  // TOTAL BEBAN
  const totalBeban = bagiHasil + totalBeli

  // LABA BERSIH 
  const labaBersih = total - totalBeban

  return (
    <div className="containerLaporan">
      <Link to="/">
        <button id="backButton" type="button">
          HOME
        </button>
      </Link>
      <div className="buttonC">
        <button
          id="button"
          onClick={() => handleLaporan("daily")}
          style={{
            backgroundColor: laporanType === "daily" ? "#343434" : "aquamarine",
            color: laporanType === "daily" ? "white" : "#343434",
          }}
        >
          HARIAN
        </button>
        <button
          id="button"
          onClick={() => handleLaporan("monthly")}
          style={{
            backgroundColor:
              laporanType === "monthly" ? "#343434" : "aquamarine",
            color: laporanType === "monthly" ? "white" : "#343434",
          }}
        >
          BULANAN
        </button>
      </div>
      {laporanType && (
        <div className="card">
          <h1 style={{margin: "1rem 0"}}>{"LAPORAN " + laporanTypeText}</h1>
          <h2>Laba Kotor</h2>
          <div className="part">
            <div className="label">HPP</div>
            <div className="value">{"Rp " + buyPrice}</div>
          </div>
          <div className="part">
            <div className="label">Margin</div>
            <div className="value">{"Rp " + margin}</div>
          </div>
          <Divider
            height="5px"
            width="100%"
            color="#ababab"
            radius="1rem"
            margin="0.5rem"
          />
          <div className="part">
            <div className="label">Total</div>
            <div className="value">{"Rp " + total}</div>
          </div>
          <Divider
            height="0"
            width="100%"
            radius="1rem"
            margin="0.4rem"
          />
          <h2>Beban</h2>
          <div className="part">
            <div className="label">Pembelian</div>
            <div className="value">{"Rp " + totalBeli}</div>
          </div>
          <div className="part">
            <div className="label">Bagi Hasil</div>
            <div className="value">{"Rp " + bagiHasil}</div>
          </div>
          <Divider
            height="5px"
            width="100%"
            color="#ababab"
            radius="1rem"
            margin="0.5rem"
          />
          <div className="part">
            <div className="label">Total</div>
            <div className="value">{"Rp " + totalBeban}</div>
          </div>
          <Divider
            height="0"
            width="100%"
            radius="1rem"
            margin="0.3rem"
          />
          <div className="part">
            <div className="label"><b>Laba Bersih</b></div>
            <div className="value">{"Rp " + labaBersih}</div>
          </div>
          <Divider
            height="0"
            width="100%"
            radius="1rem"
            margin="0.3rem"
          />
        </div>
      )}
    </div>
  );
}

export default Laporan;

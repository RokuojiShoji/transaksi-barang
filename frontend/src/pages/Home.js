import React, { PureComponent, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "../components/Api";

function Home() {
  const [itemStocks, setItemStocks] = useState();

  useEffect(() => {
    axiosInstance.get("/stock/item/i1").then((response) => {
      const itemStocks = response.data.itemAmount;
      setItemStocks(itemStocks);
    });
  });

  return (
    <div className="buttonPageContainer">
      <div className="buttonContainer">
        <Link to={"/transaksi"}>
          <button className="button1">TRANSAKSI</button>
        </Link>
      </div>
      <Link to="/laporan">
        <div className="buttonContainer">
          <button className="button1">LAPORAN</button>
        </div>
      </Link>
      <Link to="/stok">
        <div className="buttonContainer">
          <button className="button1">STOK</button>
        </div>
      </Link>
      <div className="buttonContainer">
        <h1>{itemStocks && "STOK GAS : " + itemStocks}</h1>
      </div>
    </div>
  );
}

export default Home;

import axios from "axios";
import React, { useEffect, useState } from "react";

function ListTransaction() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get("http://192.168.100.77:3001/transaction/show").then((response) => {
      const newTransactions = response.data;
      if (JSON.stringify(newTransactions) !== JSON.stringify(transactions)) {
        setTransactions(newTransactions);
        }
      console.log(transactions)
    },
    []);
  })

  return (
    <div>
      {transactions.map((transaction) => (
        <div>{transaction.buyerName}</div>
      ))}
    </div>
  );
}

export default ListTransaction;

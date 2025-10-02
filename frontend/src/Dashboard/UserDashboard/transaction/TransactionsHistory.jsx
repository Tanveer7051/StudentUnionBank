import axios from "axios";
import React ,{useEffect,useState} from "react";
function TransactionHistory() {
    const [transactions,setTransactions]=useState([]);
   
   useEffect(()=>{
    axios.get("http://localhost:8080/dashboard/history",{withCredentials:true})
    .then((res)=>{
        setTransactions(res.data.transactions);
    })
    .catch((err)=>{
        console.log("Some Error Occured",err);
    })
   },[])
   
    return ( <>
    <div>
      <h2>Transaction History</h2>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', height:"30rem", marginTop:"2rem", borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>From (Sender)</th>
            <th>To (Receiver)</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No transactions found</td>
            </tr>
          ) : (
            transactions.map(tx => (
              <tr key={tx.id}>
                <td>{new Date(tx.date).toLocaleString()}</td>
                <td>
                  {tx.from.name} <br />
                  <small>({tx.from.username})</small> <br />
                  <small>Account Number: {tx.from.accountNumber}</small>
                </td>
                <td>
                  {tx.to.name} <br />
                  <small>({tx.to.username})</small> <br />
                  <small>Acct: {tx.to.accountNumber}</small>
                </td>
                <td>{tx.amount.toLocaleString()}</td>
                <td>{tx.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </> );
}

export default TransactionHistory;
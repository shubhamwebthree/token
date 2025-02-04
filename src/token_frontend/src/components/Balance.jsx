import React, { useState } from "react"; 
import { Principal } from "@dfinity/principal"; // Import Principal for handling ICP identities
import { token_backend } from "../../../declarations/token_backend";

function Balance() {
  
  // store user input (Principal ID)
  const [inputValue, setInputValue] = useState("");

  // store the balance result
  const [balanceResult, setBalanceResult] = useState("");

  // store the token symbol
  const [symbol, setSymbol] = useState("");

  // Function to handle the "Check Balance" 
  async function handleClick() {
    const principal = Principal.fromText(inputValue); // Convert input value to Principal type

    const balance = await token_backend.balanceOf(principal); // backend function to get balance
    setBalanceResult(balance.toLocaleString()); // Format and update balance state

    setSymbol(await token_backend.getSymbol()); // Fetch and update token symbol
  }

  return (
    <div className="window">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </p>

      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>

      <p>This account has a balance of {balanceResult} {symbol} </p>
    </div>
  );
}

export default Balance;
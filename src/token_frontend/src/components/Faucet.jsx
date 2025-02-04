import React, { useState } from "react";
import { token_backend } from "../../../declarations/token_backend";

function Faucet() {

  const [isDisable,setIsDisable] = useState(false);
  const [buttonTxt,setButtonTxt] = useState("Claim");

  async function handleClick(event) {
    setIsDisable(true);
  const result =  await token_backend.payOut();
  setButtonTxt(result);
  }

  return (
    <div className="window">
      <h3>
        Faucet
      </h3>
      <label>Claim 10,000 QUAD Token to your account</label>
      <p className="trade-buttons">
        <button 
        id="btn-payout" 
        onClick={handleClick}
        disabled= {isDisable}>
          {buttonTxt}
        </button>
      </p>
    </div>
  );
}

export default Faucet;

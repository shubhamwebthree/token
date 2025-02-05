import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token_backend } from "../../../declarations/token_backend";

function Transfer() {

  // for storing recipient id and transfer amount
  const [recipientId, setRecipientId] = useState("");
  const [amount, setAmount] = useState("");

  // handle button disable status wile transfer
  const [disable, setDisable] = useState(false);

  // transaction feedback
  const [feedback, setFeedback] = useState("");

  // state to control visibility of feedback message
  const [isHidden, setHidden] = useState(true);

  // Function to handle transfer button click
  async function handleClick() {
    setHidden(true); // Hide feedback 
    setDisable(true); // Disable button to avoid multiple clicks

    const recipient = Principal.fromText(recipientId); // Convert recipient ID to Principal type
    const amountToTransfer = Number(amount); // Convert amount input to a number

    // Call backend transfer function
    const result = await token_backend.transfer(recipient, amountToTransfer);

    setFeedback(result); // Update feedback message
    setHidden(false); // Show feedback message
    setDisable(false); // renable button after transaction
  }

  return (
    <div className="window">
      <div className="transfer">
        <h3>Recipient</h3>
        <input
          type="text"
          id="transfer-to-id"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
        />
        <br />
        <h3>Amount</h3>

        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />



        {/* Transfer button */}
        <p className="trade-buttons">
          <button id="btn-transfer"
            onClick={handleClick}
            disabled={disable} >
            Transfer
          </button>
        </p>

        {/* Feedback message displayed after transfer */}
        <p hidden={isHidden}>{feedback}</p>

      </div>
    </div>
  );
}

export default Transfer; // Export the Transfer component for use in other parts of the application

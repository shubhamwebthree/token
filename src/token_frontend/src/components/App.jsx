import React from "react";
import Header from "../components/Header";
import Faucet from "../components/Faucet";
import Balance from "../components/Balance";
import Transfer from "../components/Transfer";

function App() {

  return (
    <div id="screen">
      <Header />
      <br />
      <Faucet />
      <br />
      <Balance />
      <br />
      <Transfer />
    </div>
  );
}

export default App;

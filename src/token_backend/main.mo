import Principal "mo:base/Principal"; // Import Principal for handling ICP identities
import HashMap "mo:base/HashMap"; // Import HashMap for key-value storage
import Debug "mo:base/Debug"; // Import Debug for logging

// Define an actor named Token
actor Token {

  // owner of the token  
  let owner : Principal = Principal.fromText("b57zs-xdx6a-msasx-mc54h-wvyln-dnaah-cea7x-txqcd-v6sc2-dk2ey-hae");

  // total supply of tokens
  let totalSupply : Nat = 2100000;

  // token symbol
  let symbol : Text = "QUAD";

  // hashMap for storing key-value pair pricipal and amount
  private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

  // owner has the initial total supply
  if (balances.size() < 1) {
    balances.put(owner, totalSupply);
  };

  // Function to check balance 
  public query func balanceOf(recipient : Principal) : async Nat {
    let balance : Nat = switch (balances.get(recipient)) {
      case null 0; // If no balance exists, return 0 not null
      case (?result) result; // Otherwise, return the balance
    };

    return balance;
  };

  // Function to return token symbol
  public query func getSymbol() : async Text {
    return symbol;
  };

  //Function to allow users to claim a reward if they have not claimed before
  public shared (msg) func payOut() : async Text {
    Debug.print(debug_show (msg.caller)); // Log the caller's Principal ID for debugging

    // Check if the caller already has a balance
    if (balances.get(msg.caller) == null) {
      let amount = 10000; // Define the reward amount
      let result = await transfer(msg.caller, amount); // Assign tokens to the caller
      return result;
    } else {
      return "Already Claimed"; // Prevent multiple claims
    };
  };

  // Function to transfer tokens from caller to another Principal
  public shared (msg) func transfer(recipient : Principal, amount : Nat) : async Text {
    let fromBalance = await balanceOf(msg.caller); // Get the sender's balance

    // Ensure sender has enough tokens
    if (fromBalance >= amount) {
      let newFromBalance : Nat = fromBalance - amount;
      balances.put(msg.caller, newFromBalance); // Update sender's balance

      let toBalance = await balanceOf(recipient); // Get recipient's balance
      let newToBalance = toBalance + amount;
      balances.put(recipient, newToBalance); // Update recipient's balance

      return "Success"; // Confirm transaction
    } else {
      return "Insufficient Funds"; // Reject transaction 
    }
  };

};

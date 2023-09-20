import { useState } from "react";
import { Header } from "./components/Header/Header";
import { Total } from "./components/Total/Total";
import { TransactionBoard } from "./components/TransactionBoard/TransactionBoard";
import { ChangeBills } from "./components/ChangeBills/ChangeBills";
import { initialBills, TYPES_OF_TRANSACTIONS } from "./utils/constants";

import cl from "./App.module.css";

function App() {
  const [transactionBoard, setTransactionBoard] = useState(null);
  const [currentBills, setCurrentBills] = useState(initialBills);

  return (
    <div className={cl.container}>
      <Header />
      <Total currentBills={currentBills} />

      <div className={cl.buttonsContainer}>
        <button
          onClick={() => setTransactionBoard(TYPES_OF_TRANSACTIONS.ADD_BILLS)}
          disabled={transactionBoard === TYPES_OF_TRANSACTIONS.ADD_BILLS}
        >
          Add bills
        </button>
        <button
          onClick={() =>
            setTransactionBoard(TYPES_OF_TRANSACTIONS.REMOVE_BILLS)
          }
          disabled={transactionBoard === TYPES_OF_TRANSACTIONS.REMOVE_BILLS}
        >
          Remove bills
        </button>
        <button
          onClick={() =>
            setTransactionBoard(TYPES_OF_TRANSACTIONS.CHANGE_BILLS)
          }
          disabled={transactionBoard === TYPES_OF_TRANSACTIONS.CHANGE_BILLS}
        >
          Change bills
        </button>
      </div>
      {transactionBoard === TYPES_OF_TRANSACTIONS.ADD_BILLS && (
        <TransactionBoard
          type={TYPES_OF_TRANSACTIONS.ADD_BILLS}
          setCurrentBills={setCurrentBills}
          currentBills={currentBills}
        />
      )}
      {transactionBoard === TYPES_OF_TRANSACTIONS.REMOVE_BILLS && (
        <TransactionBoard
          type={TYPES_OF_TRANSACTIONS.REMOVE_BILLS}
          setCurrentBills={setCurrentBills}
          currentBills={currentBills}
        />
      )}
      {transactionBoard === TYPES_OF_TRANSACTIONS.CHANGE_BILLS && (
        <ChangeBills
          setCurrentBills={setCurrentBills}
          currentBills={currentBills}
        />
      )}
    </div>
  );
}

export default App;

import { useState } from "react";
import { initialBills, TYPES_OF_TRANSACTIONS } from "../../utils/constants";

import cl from "./TransactionBoard.module.css";

export const TransactionBoard = ({ setCurrentBills, currentBills, type }) => {
  const [bills, setBills] = useState(initialBills);
  const [errorMessage, setErrorMessage] = useState("");
  const handleInputChange = (event, denomination) => {
    const { value } = event.target;
    if (!isNaN(value)) {
      setBills((prevBills) => ({
        ...prevBills,
        [denomination]: +value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isAllBillsValidatedForRemove = Object.keys(bills).every((key) => {
      if (bills[key] === 0) {
        return true;
      } else if (bills[key] >= 0 && currentBills[key] - bills[key] >= 0) {
        return true;
      } else return false;
    });

    for (const key in currentBills) {
      if (bills[key] > 0) {
        if (type === TYPES_OF_TRANSACTIONS.ADD_BILLS) {
          setErrorMessage("");
          currentBills[key] += +bills[key];
        } else if (type === TYPES_OF_TRANSACTIONS.REMOVE_BILLS) {
          if (isAllBillsValidatedForRemove) {
            setErrorMessage("");
            currentBills[key] -= +bills[key];
          } else
            setErrorMessage(
              `Sorry, we can not process this transaction. You don't have enough such bills`
            );
        }
      }
    }
    setCurrentBills({ ...currentBills });
  };

  const billsInputList = () => {
    return Object.keys(bills)
      .reverse()
      .map((denomination) => (
        <div key={denomination} className={cl.inputWrapper}>
          <label htmlFor={denomination}>
            {type} {denomination}$ bill ({bills[denomination]}x{denomination}=
            {denomination * bills[denomination]})
          </label>
          <input
            onChange={(e) => handleInputChange(e, denomination)}
            value={bills[denomination]}
            type='number'
            id={denomination}
            min={0}
            step={1}
            placeholder={0}
          />
        </div>
      ));
  };
  return (
    <div className={cl.container}>
      <div className={cl.title}>{type} bills</div>
      {errorMessage.length > 0 && (
        <div className={cl.error}>{errorMessage}</div>
      )}
      <form onSubmit={handleSubmit} className={cl.form}>
        {billsInputList()}
        <button
          disabled={Object.keys(bills).every((key) => {
            if (bills[key] === 0) {
              return true;
            } else return false;
          })}
          type='submit'
        >
          {type} bills
        </button>
      </form>
    </div>
  );
};

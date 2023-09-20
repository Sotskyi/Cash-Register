import { useState } from "react";

import { getChanges, parseCurrentBillsList } from "../../utils/helpers";
import { initialBills } from "../../utils/constants";

import cl from "./ChangeBills.module.css";

export const ChangeBills = ({ setCurrentBills, currentBills }) => {
  const [bills, setBills] = useState(null);
  const [data, setData] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const changedBills = getChanges(data, currentBills);
    if (changedBills) {
      const copyInitialBills = { ...initialBills };
      for (const key in changedBills) {
        if (changedBills[key] > 0) {
          copyInitialBills[key] = changedBills[key];
          currentBills[key] += -changedBills[key];
        }
      }
      setCurrentBills({ ...currentBills });
      setBills(copyInitialBills);
      setErrorMessage("");
      setSuccessMessage(
        "The transaction was successfully completed with those bills:"
      );
    } else {
      setBills(null);
      setSuccessMessage("");
      setErrorMessage("Sorry, we cannot process the change transaction");
    }
  };

  return (
    <div className={cl.container}>
      <div className={cl.title}>Change Bills</div>
      {errorMessage.length > 0 && (
        <div className={cl.error}>{errorMessage}</div>
      )}
      {successMessage.length > 0 && (
        <div className={cl.success}>
          {successMessage}
          <div style={{ fontSize: "14px" }}>{parseCurrentBillsList(bills)}</div>
        </div>
      )}
      <form onSubmit={handleSubmit} className={cl.form}>
        <div className={cl.inputWrapper}>
          <label htmlFor={"change"}>Change amount</label>
          <input
            onChange={(e) => setData(e.target.value)}
            value={data}
            type='number'
            id={"change"}
            min={0}
            pattern='[1-9.]'
            step={1}
            placeholder={0}
          />{" "}
        </div>
        <button type='submit'>Change bills</button>
      </form>
    </div>
  );
};

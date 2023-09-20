import { TotalCounter } from "./TotalCounter";
import { parseCurrentBillsList } from "../../utils/helpers";
import cl from "./Total.module.css";

export const Total = ({ currentBills }) => {
  return (
    <div className={cl.container}>
      <span className={cl.total}>
        <TotalCounter currentBills={currentBills} />
      </span>{" "}
      | {parseCurrentBillsList(currentBills)}
    </div>
  );
};

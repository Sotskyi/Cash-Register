import { useCounter } from "../../hooks/useCounter";
import { getTotalFromBills } from "../../utils/helpers";

export const TotalCounter = ({ currentBills }) => {
  const count = useCounter(0, getTotalFromBills(currentBills));
  return <span>Total: ${count}</span>;
};

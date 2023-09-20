import { useState, useEffect } from "react";

export const useCounter = (prevTotal, currentTotal) => {
  const [count, setCount] = useState(prevTotal);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentTotal > 1000) {
        setCount(currentTotal);
      } else if (count < currentTotal) {
        setCount((prevCount) => prevCount + 1);
      } else if (count > currentTotal) {
        setCount((prevCount) => prevCount - 1);
      }
    }, 1);

    return () => {
      clearInterval(timer);
    };
  }, [count, currentTotal]);

  return count;
};

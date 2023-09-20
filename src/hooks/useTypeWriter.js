import { useState, useEffect } from "react";

export const useTypeWriter = (currentString) => {
  const [displayedString, setDisplayedString] = useState("");

  useEffect(() => {
    if (currentString.length > 0) {
      let currentIndex = 0;
      setDisplayedString(currentString[0]);
      const interval = setInterval(() => {
        currentIndex++;
        if (currentIndex === currentString.length) {
          clearInterval(interval);
        } else {
          setDisplayedString((prev) => prev + currentString[currentIndex]);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [currentString]);

  return displayedString;
};

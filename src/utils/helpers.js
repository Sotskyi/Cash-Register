export const getTotalFromBills = (bills) => {
  return Object.entries(bills).reduce((accumulator, [key, value]) => {
    return accumulator + key * value;
  }, 0);
};

export const parseCurrentBillsList = (currentBills) => {
  if (currentBills) {
    const keys = Object.keys(currentBills).reverse();
    const parsedCurrentBills = keys.map(
      (key) => ` ${currentBills[key]}x${key} `
    );
    return parsedCurrentBills;
  } else return null;
};

export const getChanges = (amountRequired, limits) => {
  if (amountRequired > 0) {
    function collect(amount, nominals) {
      if (amount === 0) return {}; // success

      if (!nominals.length) return; // failure

      let currentNominal = nominals[0];
      let availableNotes = limits[currentNominal];
      let notesNeeded = Math.floor(amount / currentNominal);
      let numberOfNotes = Math.min(availableNotes, notesNeeded);

      for (let i = numberOfNotes; i >= 0; i--) {
        let result = collect(amount - i * currentNominal, nominals.slice(1));

        if (result) {
          return i ? { [currentNominal]: i, ...result } : result;
        }
      }
    }

    let nominals = Object.keys(limits)
      .map(Number)
      .sort((a, b) => b - a);

    return collect(amountRequired, nominals);
  }
};

export const formatCurrency = (amount = 0, type = "naira") => {
    // Create Intl.NumberFormat object with Nigerian currency format
    const formatter =
      type === "dollar"
        ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        })
        : new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          minimumFractionDigits: 2,
        });
  
    // Format the currency
    return formatter.format(amount);
  };
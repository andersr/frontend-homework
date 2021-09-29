export const INVALID_PRICE_ERROR = "Invalid Price Value";

export const formatPrice = (num: number) => {
  if (isNaN(Number(num))) {
    return INVALID_PRICE_ERROR;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
};

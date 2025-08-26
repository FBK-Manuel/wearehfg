// Utility functions (not React components)
export function getSymbol(code: string) {
  switch (code) {
    case "USD":
      return "$";
    case "NGN":
      return "₦";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    case "CAD":
      return "C$";
    case "PLN":
      return "zł";
    default:
      return code + " ";
  }
}

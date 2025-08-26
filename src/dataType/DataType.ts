// context api data type, Define the shape of your context data,
export type AuthContextType = {
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
};

export type CurrencyContextType = {
  currency: string;
  setCurrency: (c: string) => void;
  formatPrice: (amount: number) => string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

// context api data type, Define the shape of your context data,
export type AuthContextType = {
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
  name: string | null;
  setName: (newName: string | null) => void;
  email: string | null;
  setEmail: (newEmail: string | null) => void;
  userId: string | null;
  setUserId: (newUserId: string | null) => void;
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

export type Product = {
  id: number;
  name: string;
  image: string;
  price: string;
};

export type TodaysDealProps = {
  apiUrl?: string; // optional API endpoint
};

// Cart item type
export type CartItems = {
  id: number;
  name: string;
  price: number;
  image: string;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  availableSizes: string[];
  availableColors: string[];
};

export type WishlistItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

// ✅ Your form type
export type CheckoutFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  orderNote?: string;
  billingSameAsShipping: boolean;
  paymentMethod: "googlepay" | "swipe" | "card";
};

export type ProductCardProps = {
  id: number;
  name: string;
  price: string;
  image: string;
  sizes: string[];
  colors: string[];
};
export type ProductProps = { 
  id: number;
  name: string;
  price: string;
  image: string;
  sizes: string[];
  colors: string[];
  category: string;
};
export type itemProps = {
  id: number;
  title: string;
  price: number | string; // allow both
  image: string;
  sizes: string[];
  colors: string[];
  category?: string;
  filter_category?: string; // add this
};
export type productGridProps = {
  id: number;
  name: string;
  price: string;
  image: string;
};
export type gridProps = {
  id: number
  title: string;
  price: string;
  image: string;
}
export type replatedProductProps = {
  productId:number
}
export type productDetailsTypes = {
  id: number;
  name: string;
  price: number;
  images: string[];
  description: string;
  availability: string;
  shipping: string;
  weight: string;
  sizes: string[];
  colors: string[];
  tabs: {
    description: string[];
    information: string[];
  };
};

export interface ProductDetailsTabProps {
  key: string;
  label: string;
}

export type GridShowcaseProps = {
  useLocalData?: boolean;
};

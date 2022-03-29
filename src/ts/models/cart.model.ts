interface CartProduct {
  userId: number;
  productId: number;
  quantity: number;
  checked: boolean;
  price: number;
  discountPrice: number | null;
}

interface CartItem {
  products: CartProduct[];
  checked: boolean;
}

export interface CartDataRequest {
  cart: {
    sellers: Record<string, CartItem>;
  };
}

export interface Cart {
  sellers: Record<string, CartItem>;
  personalDiscount: number;
  sellersDiscount: number;
  totalDiscount: number;
  totalPrice: number;
  totalQuantity: number;
}

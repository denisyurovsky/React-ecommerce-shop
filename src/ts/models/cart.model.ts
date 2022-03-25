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

export interface Cart {
  sellers: Record<string, CartItem>;
  totalPrice: number;
  totalQuantity: number;
  totalDiscount: number;
}

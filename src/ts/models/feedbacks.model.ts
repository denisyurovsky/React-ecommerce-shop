export interface Feedback {
  id: number;
  userId: number;
  productId: number;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  displayedName: string;
  productName: string;
}

export interface Comment {
  userId: number;
  name: string;
  comment: string;
  rating: number;
  productId: number;
}

export interface Rating {
  productId: number;
  rating: number;
}

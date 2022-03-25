export interface Feedback {
  id: number;
  userId: number;
  productId: number;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  displayedName: string;
}

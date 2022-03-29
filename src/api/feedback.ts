import { Comment, Rating, Feedback } from '../ts/models/feedbacks.model';

import { http } from './setup';

const feedbackApi = {
  getComments(productId: number) {
    return http.get<Feedback[]>(
      `feedbacks?productId=${productId}&_sort=createdAt&_order=desc`
    );
  },
  getAllComments() {
    return http.get<Feedback[]>(`feedbacks`);
  },
  getCommentsByUserId(userId: number) {
    return http.get<Feedback[]>(
      `users/${userId}/feedbacks?displayedName_ne=Anonymous`
    );
  },
  postComment({ productId, rating, comment, name, userId }: Comment) {
    return http.post<Feedback>('feedbacks', {
      userId,
      productId,
      rating,
      comment,
      displayedName: name,
    });
  },
  setRating({ productId, rating }: Rating) {
    http.patch<Rating>(`rating`, { productId, rating });
  },
};

export default feedbackApi;

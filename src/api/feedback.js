import { http } from './setup';

export const getComments = (productId) =>
  http.get(`feedbacks?productId=${productId}&_sort=createdAt&_order=desc`);

export const getCommentsByUserId = (userId) =>
  http.get(`users/${userId}/feedbacks`);

export const postComment = ({ productId, rating, comment, name, userId }) => {
  const createdAt = new Date().toISOString();

  return http.post('feedbacks', {
    userId,
    productId,
    rating,
    comment,
    createdAt,
    displayedName: name,
  });
};

export const setRating = ({ productId, rating }) =>
  http.patch(`rating`, { productId, rating });

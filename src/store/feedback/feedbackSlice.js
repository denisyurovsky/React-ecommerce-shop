import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import {
  getComments,
  getCommentsByUserId,
  postComment,
} from '../../api/feedback';
import { FETCH } from '../../constants/constants';

const { IDLE, PENDING, FULFILLED, REJECTED } = FETCH;

export const fetchCommentsByProductId = createAsyncThunk(
  'feedback/fetchCommentsByProductId',
  async (productId) => {
    const response = await getComments(productId);

    return response.data;
  }
);

export const fetchCommentsByUserId = createAsyncThunk(
  'feedback/fetchCommentsByUserId',
  async (userId) => {
    const response = await getCommentsByUserId(userId);

    return response.data;
  }
);

export const postNewComment = createAsyncThunk(
  'feedback/postNewComment',
  async ({ productId, rating, comment, name, userId }) => {
    const response = await postComment({
      productId,
      rating,
      comment,
      name,
      userId,
    });

    return response.data;
  }
);

const feedbackAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

export const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: feedbackAdapter.getInitialState(),
  reducers: {
    clearFeedbacks: (state) => {
      state.status = IDLE;
      state.postStatus = IDLE;
      feedbackAdapter.removeAll(state);
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch comments by productId
      .addCase(fetchCommentsByProductId.pending, (state) => {
        state.status = PENDING;
      })
      .addCase(fetchCommentsByProductId.fulfilled, (state, action) => {
        state.status = FULFILLED;
        feedbackAdapter.setAll(state, action.payload);
      })
      .addCase(fetchCommentsByProductId.rejected, (state) => {
        state.status = REJECTED;
      })

      // fetch comments by userId
      .addCase(fetchCommentsByUserId.pending, (state) => {
        state.status = PENDING;
      })
      .addCase(fetchCommentsByUserId.fulfilled, (state, action) => {
        state.status = FULFILLED;
        feedbackAdapter.setAll(state, action.payload);
      })
      .addCase(fetchCommentsByUserId.rejected, (state) => {
        state.status = REJECTED;
      })

      // post new comment
      .addCase(postNewComment.pending, (state) => {
        state.postStatus = PENDING;
      })
      .addCase(postNewComment.fulfilled, (state, action) => {
        state.postStatus = FULFILLED;
        feedbackAdapter.addOne(state, action.payload);
      })
      .addCase(postNewComment.rejected, (state) => {
        state.postStatus = REJECTED;
      });
  },
});

export default feedbackSlice.reducer;
export const { selectAll: selectAllComments } = feedbackAdapter.getSelectors(
  (state) => state.feedback
);
export const { clearFeedbacks } = feedbackSlice.actions;

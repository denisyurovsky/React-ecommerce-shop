import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import feedbackApi from '../../api/feedback';
import { FetchStatus } from '../../ts/enums/enums';

export const fetchCommentsByProductId = createAsyncThunk(
  'feedback/fetchCommentsByProductId',
  async (productId) => {
    const response = await feedbackApi.getComments(productId);

    return response.data;
  }
);

export const fetchCommentsByUserId = createAsyncThunk(
  'feedback/fetchCommentsByUserId',
  async (userId) => {
    const response = await feedbackApi.getCommentsByUserId(userId);

    return response.data;
  }
);

export const postNewComment = createAsyncThunk(
  'feedback/postNewComment',
  async ({ productId, rating, comment, name, userId }) => {
    const response = await feedbackApi.postComment({
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
      state.status = FetchStatus.Idle;
      state.postStatus = FetchStatus.Idle;
      feedbackAdapter.removeAll(state);
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch comments by productId
      .addCase(fetchCommentsByProductId.pending, (state) => {
        state.status = FetchStatus.Pending;
      })
      .addCase(fetchCommentsByProductId.fulfilled, (state, action) => {
        state.status = FetchStatus.Fulfilled;
        feedbackAdapter.setAll(state, action.payload);
      })
      .addCase(fetchCommentsByProductId.rejected, (state) => {
        state.status = FetchStatus.Rejected;
      })

      // fetch comments by userId
      .addCase(fetchCommentsByUserId.pending, (state) => {
        state.status = FetchStatus.Pending;
      })
      .addCase(fetchCommentsByUserId.fulfilled, (state, action) => {
        state.status = FetchStatus.Fulfilled;
        feedbackAdapter.setAll(state, action.payload);
      })
      .addCase(fetchCommentsByUserId.rejected, (state) => {
        state.status = FetchStatus.Rejected;
      })

      // post new comment
      .addCase(postNewComment.pending, (state) => {
        state.postStatus = FetchStatus.Pending;
      })
      .addCase(postNewComment.fulfilled, (state, action) => {
        state.postStatus = FetchStatus.Fulfilled;
        feedbackAdapter.addOne(state, action.payload);
      })
      .addCase(postNewComment.rejected, (state) => {
        state.postStatus = FetchStatus.Rejected;
      });
  },
});

export default feedbackSlice.reducer;
export const { selectAll: selectAllComments } = feedbackAdapter.getSelectors(
  (state) => state.feedback
);
export const getFeedbackStatus = (state) => state.feedback.status;
export const { clearFeedbacks } = feedbackSlice.actions;

import { configureStore } from '@reduxjs/toolkit';
import { videosReducer } from './reducers/videosReducer';

export const store = configureStore({
  reducer: {
    videos: videosReducer
  }
});

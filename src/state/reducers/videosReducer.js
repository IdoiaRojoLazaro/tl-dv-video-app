import { types } from '../action_types/types';

const initialState = {
  videos: null,
  videoActive: null,
  page: 0,
  status: types.idle
};

export const videosReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setVideosLoading:
      return {
        ...state,
        status: types.loading
      };

    case types.setVideos:
      return {
        ...state,
        videos: action.payload.videos,
        total: action.payload.pagination.total,
        pageSize: action.payload.pagination.pageSize,
        status: types.completed
      };

    case types.setVideoActive:
      return {
        ...state,
        videoActive: action.payload,
        status: types.completed
      };

    case types.videoUpdated:
      return {
        ...state,
        status: types.completed,
        videos: state.videos.map((v) =>
          v.id === action.payload.id ? action.payload : v
        )
      };
    case types.videoCreated:
      return {
        ...state,
        status: types.completed,
        videos: [...state.videos, action.payload]
      };

    default:
      return state;
  }
};

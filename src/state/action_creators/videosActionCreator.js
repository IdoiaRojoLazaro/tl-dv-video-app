import { catchApiError } from '../../helpers/catchApiError';
import { fetchWithToken } from '../../helpers/fetch';
import { types } from '../action_types/types';

export const getVideos = (page) => {
  return async (dispatch) => {
    dispatch({ type: types.setVideosLoading });
    const params = true ? '' : `?page=${page}`;
    const resp = await fetchWithToken(`videos${params}`);
    const body = await resp.json();
    if (resp.status === 200) {
      const { data, meta } = body;
      dispatch({
        type: types.setVideos,
        payload: {
          videos: data,
          pagination: meta.pagination
        }
      });
    } else {
      dispatch(catchApiError(body));
    }
  };
};

export const getVideo = (id) => {
  return async (dispatch) => {
    const resp = await fetchWithToken(`videos/${id}`);
    const body = await resp.json();
    if (resp.status === 200) {
      const { data } = body;
      return data;
    } else {
      dispatch(catchApiError(body));
    }
  };
};

export const setVideoActive = (id) => ({
  type: types.setVideoActive,
  payload: id
});

export const editVideo = (id, data) => {
  return async (dispatch) => {
    const resp = await fetchWithToken(`videos/${id}`, data, 'PUT');
    const body = await resp.json();
    if (resp.status === 200) {
      const { data } = body;
      dispatch({
        type: types.videoUpdated,
        payload: data
      });
      return data;
    } else {
      dispatch(catchApiError(body));
    }
  };
};

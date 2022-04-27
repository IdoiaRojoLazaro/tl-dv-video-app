import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { getVideo } from '../state/action_creators/videosActionCreator';

import { Loading } from '../components/shared/Loading';
import { Layout } from '../layout/Layout';

export const VideoPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [video, setVideo] = useState(null);
  const navigate = useNavigate();
  const goHome = () => navigate('/');
  useEffect(() => {
    if (id) {
      dispatch(getVideo(id)).then((res) => setVideo(res.attributes));
    }
  }, [id]);

  return (
    <>
      <Layout className="video-page">
        <h1>Video {video && video.title}</h1>
        <div>
          {video === null ? (
            <Loading />
          ) : (
            <div>
              <video src={video.url} width={'100%'} height={'100%'} controls />
            </div>
          )}
          <p className="center">
            <button className="btn btn-blue" onClick={goHome}>
              Back
            </button>
          </p>
        </div>
      </Layout>
    </>
  );
};

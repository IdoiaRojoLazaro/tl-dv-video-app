import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import {
  getVideos,
  setVideoActive
} from '../state/action_creators/videosActionCreator';
import { types } from '../state/action_types/types';

import { Loading } from '../components/shared/Loading';
import { PaginationComponent } from '../components/shared/PaginationComponent';
import { Layout } from '../layout/Layout';
import { VideoEditModal } from './VideoEditPage';

import { Copy, Eye, PencilLine } from 'phosphor-react';
import '../styles/components/_tables.scss';

export const VideosPage = () => {
  const weightIcons = 'duotone';
  const sizeIcons = 16;
  const navigate = useNavigate();
  const { addToast } = useToasts();

  const [page, setPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);

  const dispatch = useDispatch();
  const { status, videos, total, pageSize } = useSelector(
    (state) => state.videos
  );

  const openVideo = (id) => navigate(`/video/${id}`);
  const handleEdit = (id) => {
    dispatch(setVideoActive(id));
    setShowEditModal(true);
  };
  const copyUrlVideo = (text) => {
    navigator.clipboard.writeText(text);
    addToast('Url successfully copied', {
      appearance: 'success',
      autoDismiss: true
    });
  };

  useEffect(() => {
    dispatch(getVideos(page));
  }, []);

  return (
    <Layout>
      <h1>Video list</h1>
      <div>
        {status === types.loading ? (
          <Loading />
        ) : (
          <div>
            <table className="table table__custom">
              <thead className="table-head">
                <tr>
                  <td>Id</td>
                  <td>Slug</td>
                  <td>Title</td>
                  <td>Url</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody className="table-body">
                {videos !== null &&
                  videos.map((v, i) => (
                    <tr key={`video-index-${i}`}>
                      <td className="pointer" onClick={() => openVideo(v.id)}>
                        {v.id}
                      </td>
                      <td className="pointer" onClick={() => openVideo(v.id)}>
                        {v.attributes.slug}
                      </td>
                      <td className="pointer" onClick={() => openVideo(v.id)}>
                        {v.attributes.title}
                      </td>
                      <td className="td-url">
                        {v.attributes.url}{' '}
                        <Copy
                          className="pointer"
                          onClick={() => copyUrlVideo(v.attributes.url)}
                        />
                      </td>
                      <td className="td-actions">
                        <button onClick={() => openVideo(v.id)}>
                          <Eye weight={weightIcons} size={sizeIcons} />
                        </button>
                        <button onClick={() => handleEdit(v.id)}>
                          <PencilLine weight={weightIcons} size={sizeIcons} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <PaginationComponent
              total={total}
              pageSize={pageSize}
              page={page}
              setPage={setPage}
            />
          </div>
        )}
      </div>
      <VideoEditModal show={showEditModal} setShow={setShowEditModal} />
    </Layout>
  );
};

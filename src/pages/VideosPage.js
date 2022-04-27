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
import { VideoNewModal } from './VideoNewPage';

export const VideosPage = () => {
  const weightIcons = 'duotone';
  const sizeIcons = 16;
  const navigate = useNavigate();
  const { addToast } = useToasts();

  const [page, setPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);

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
      <div className="flex space-between">
        <h1>Video list</h1>
        <button className="btn btn-white" onClick={() => setShowNewModal(true)}>
          Add new video
        </button>
      </div>
      <div>
        {status === types.loading ? (
          <Loading />
        ) : (
          <div className="container-table">
            <table className="table table__custom">
              <thead className="table-head">
                <tr>
                  <td>Id</td>
                  <td>Title</td>
                  <td>Slug</td>
                  <td>Url</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody className="table-body">
                {videos !== null &&
                  videos.map((v, i) => (
                    <tr key={`video-index-${i}`}>
                      <td
                        className="pointer"
                        onClick={() => openVideo(v.id)}
                        data-th="Id"
                      >
                        {v.id}
                      </td>
                      <td
                        className="pointer"
                        onClick={() => openVideo(v.id)}
                        data-th="Title"
                      >
                        {v.attributes.title}
                      </td>
                      <td
                        className="pointer"
                        onClick={() => openVideo(v.id)}
                        data-th="Slug"
                      >
                        {v.attributes.slug}
                      </td>
                      <td className="td-url" data-th="Url">
                        <span>{v.attributes.url} </span>
                        <Copy
                          className="pointer"
                          onClick={() => copyUrlVideo(v.attributes.url)}
                        />
                      </td>
                      <td className="td-actions" data-th="Actions">
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
      <VideoNewModal show={showNewModal} setShow={setShowNewModal} />
      <VideoEditModal show={showEditModal} setShow={setShowEditModal} />
    </Layout>
  );
};

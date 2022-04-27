import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import {
  editVideo,
  getVideo
} from '../state/action_creators/videosActionCreator';

import { Loading } from '../components/shared/Loading';
import ButtonSubmit from '../components/shared/ButtonSubmit';
import { FormGroup } from '../components/shared/FormGroup';

import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    minHeight: '200px',
    minWidth: '390px',
    padding: 0,
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

const initInfo = {
  title: '',
  slug: '',
  url: ''
};

export const VideoEditModal = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const { videoActive } = useSelector((state) => state.videos);

  const [loading, setLoading] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formValues, setFormValues] = useState(initInfo);

  const closeModal = () => setShow(false);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    dispatch(editVideo(videoActive, formValues)).then((_) => {
      addToast('Video successfully updated', {
        appearance: 'success',
        autoDismiss: true
      });
      setSubmitting(false);
      closeModal();
    });
  };

  useEffect(() => {
    if (videoActive) {
      dispatch(getVideo(videoActive)).then((res) => {
        const { slug, title, url } = res.attributes;
        setLoading(false);
        setFormValues({
          slug,
          title,
          url
        });
      });
    }
  }, [videoActive]);

  return (
    <div>
      <Modal
        isOpen={show}
        onRequestClose={closeModal}
        closeTimeoutMS={200}
        style={customStyles}
        overlayClassName="modal-bg"
      >
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h3>Edit video</h3>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="modal-body">
                {formValues &&
                  Object.keys(formValues).map((key, i) => (
                    <FormGroup
                      key={i}
                      name={key}
                      val={formValues[key]}
                      handleInputChange={handleInputChange}
                    />
                  ))}
              </div>
              <div className="modal-footer">
                <ButtonSubmit submitting={submitting} text="Save" />
              </div>
            </>
          )}
        </form>
      </Modal>
    </div>
  );
};

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ url, alt, onClose }) => {
  useEffect(() => {
    const closeModal = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, [onClose]);

  return (
    <div
      className={css.backdrop}
      onClick={() => {
        onClose();
      }}
    >
      <div className={css.modal}>
        <img src={url} alt={alt} />
        <button
          className={css.btn}
          onClick={() => {
            onClose();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

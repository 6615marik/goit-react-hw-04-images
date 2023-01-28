import React from 'react';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ children }) => {
  return <ul className={css.list}>{children}</ul>;
};

ImageGallery.propTypes = {
  children: PropTypes.node,
};

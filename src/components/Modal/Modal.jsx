import React, { useEffect } from 'react';
import { Overlay, ModalEl } from './Modal.styled';

export const Modal = ({ largeImageURL, alt, onClose }) => {
  const handleBackdrop = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  const handleKey = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
  });

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  });

  return (
    <Overlay onClick={handleBackdrop}>
      <ModalEl>
        <img src={largeImageURL} alt={alt} />
      </ModalEl>
    </Overlay>
  );
};

import React, { useState } from 'react';
import './styles.scss';
import { Dialog, Slide } from '@mui/material';

const EventGallery = ({ images, className }) => {
  const [open, setOpen] = useState(false);

  const clickOpenHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <div className={`event-gallery ${className || ''}`}>
      <h3 className="event-gallery__title">تصاویر</h3>
      <div className="event-gallery__images">
        {images.slice(0, 3).map(image => (
          <img key={image} className="event-gallery__img" src={image} />
        ))}
      </div>
      {images.length > 3 && (
        <p className="event-gallery__show-all-images" onClick={clickOpenHandler}>
          همه تصاویر
        </p>
      )}
      {images.length > 3 && (
        <Dialog style={{ zIndex: '1000000' }} fullScreen open={open} TransitionComponent={Transition}>
          <div className="event-gallery__all-images-go-back" onClick={closeHandler}>
            بازگشت
          </div>
          <div className="event-gallery__all-images">
            {images.map(image => (
              <img key={image} className="event-gallery__all-img" src={image.image} />
            ))}
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default EventGallery;

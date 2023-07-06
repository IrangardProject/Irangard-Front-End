import React, { useState } from 'react';
import './styles.scss';
import { Dialog, Slide } from '@mui/material';

const TourGallery = ({images, className}) => {
  const [open, setOpen] = useState(false);
  console.log("the images: " + images)

  const clickOpenHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };
  return (
    <div className={`tour-gallery ${className || ''}`}>
    <h3 className="tour-gallery__title">تصاویر</h3>
    <div className="tour-gallery__images">
      {images.slice(0, 3).map(image => (
        <img key={image} className="tour-gallery__img" src={image} />
      ))}
    </div>
    {images.length > 3 && (
      <p className="tour-gallery__show-all-images" onClick={clickOpenHandler}>
        همه تصاویر
      </p>
    )}
    {images.length > 3 && (
      <Dialog style={{ zIndex: '1000000' }} fullScreen open={open} TransitionComponent={Transition}>
        <div className="tour-gallery__all-images-go-back" onClick={closeHandler}>
          بازگشت
        </div>
        <div className="tour-gallery__all-images">
          {images.map(image => (
            <img key={image} className="tour-gallery__all-img" src={image.image} />
          ))}
        </div>
      </Dialog>
    )}
  </div>
  );
};

export default TourGallery;

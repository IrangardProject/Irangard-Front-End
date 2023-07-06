import React from 'react';
import { Dialog, Slide } from '@mui/material';
import './style.scss';

// const images = [
//   'https://media-cdn.tripadvisor.com/media/photo-s/1c/d5/ae/72/la-pizza-du-moment-avec.jpg',
//   'https://media-cdn.tripadvisor.com/media/photo-f/1b/06/74/a7/un-gourmand-apercu.jpg',
//   'https://media-cdn.tripadvisor.com/media/photo-l/1b/06/77/59/eclats-de-bufala-dop.jpg',
//   'https://media-cdn.tripadvisor.com/media/photo-f/1b/06/74/a7/un-gourmand-apercu.jpg',
//   'https://media-cdn.tripadvisor.com/media/photo-l/1b/06/77/59/eclats-de-bufala-dop.jpg',
//   'https://media-cdn.tripadvisor.com/media/photo-f/1b/06/74/a7/un-gourmand-apercu.jpg',
//   'https://media-cdn.tripadvisor.com/media/photo-l/1b/06/77/59/eclats-de-bufala-dop.jpg',
//   'https://media-cdn.tripadvisor.com/media/photo-f/1b/06/74/a7/un-gourmand-apercu.jpg',
//   'https://media-cdn.tripadvisor.com/media/photo-l/1b/06/77/59/eclats-de-bufala-dop.jpg',
// ];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PlaceGallery = ({ className, images = [] }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={`place-gallery ${className || ''}`}>
      <h3 className="place-gallery__title">تصاویر</h3>
      <div className="place-gallery__images">
        {images.slice(0, 3).map(image => (
          <img key={image} className="place-gallery__img" src={image} />
        ))}
      </div>
      {images.length > 3 && (
        <p className="place-gallery__show-all-images" onClick={handleClickOpen}>
          همه تصاویر
        </p>
      )}
      {images.length > 3 && (
        <Dialog style={{ zIndex: '1000000' }} fullScreen open={open} TransitionComponent={Transition}>
          <div className="place-gallery__all-images-go-back" onClick={handleClose}>
            بازگشت
          </div>
          <div className="place-gallery__all-images">
            {images.map(image => (
              <img key={image} className="place-gallery__all-img" src={image.image} />
            ))}
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default PlaceGallery;

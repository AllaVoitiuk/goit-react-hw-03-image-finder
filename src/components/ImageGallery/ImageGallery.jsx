import { Component } from 'react';
import PropTypes from 'prop-types';
import style from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  render() {
    const images = this.props.images;

    return (
      <ul className={style.gallery}>
        {images &&
          images.map(image => {
            return <ImageGalleryItem key={image.id} image={image} />;
          })}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ).isRequired,
};

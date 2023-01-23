import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import styles from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  render() {
    const { image } = this.props;
    return (
      <>
        <li
          className={styles.gallery_item}
          id={image.id}
          onClick={this.toggleModal}
        >
          <img
            className={styles.galleryItem_image}
            src={image.webformatURL}
            alt="text"
          />
        </li>
        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            imageURL={image.largeImageURL}
          ></Modal>
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ).isRequired,
};

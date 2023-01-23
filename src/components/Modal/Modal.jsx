import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handlePressEsc);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlePressEsc);
  }

  handlePressEsc = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleClickBackdrop = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  render() {
    const { imageURL } = this.props;
    return (
      <div
        className={styles.modal__backdrop}
        onClick={this.handleClickBackdrop}
      >
        <div className={styles.modal_content}>
          {this.props.children}
          <img src={imageURL} alt="Large_pic" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ).isRequired,
};

import styles from './Button.module.css';
import PropTypes from 'prop-types';
import { Component } from 'react';

export class Button extends Component {
  render() {
    return (
      <div>
        <button
          type="button"
          className={styles.button}
          onClick={this.props.clickLoadMore}
        >
          Load more
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  clickLoadMore: PropTypes.func.isRequired,
};

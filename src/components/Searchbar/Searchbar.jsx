import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';
import { ReactComponent as Logo } from '../../SVG/search.svg';

export class Searchbar extends Component {
  state = {
    searchValue: '',
    page: 1,
  };

  handleChange = event => {
    this.setState({ searchValue: event.target.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchValue.trim() === '') {
      alert('Введіть значення пошуку');
      return;
    }

    this.props.onSearch(this.state.searchValue);
    this.setState({ searchValue: '', page: 1 });
  };

  render() {
    const { searchValue } = this.state;

    return (
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.searchForm_button}>
            <Logo className="logo" />
            <span className={styles.searchForm_button_label}>Search</span>
          </button>

          <input
            className={styles.searchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchValue}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

import { Component } from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import styles from './ImageGallery/ImageGallery.module.css';
import { Button } from './Button/Button';
import { Loader } from 'components/Loader/Loader';
// const API_KEY = '31475177-5e18f0fae26a0bf9f0a41710d';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    searchValue: '',
    page: 1,
    loadMoreBtn: false,
    status: 'idle', //'idle', 'pending', 'resolved',
  };

  handleSearchSubmit = searchValue => {
    if (searchValue !== this.state.searchValue)
      this.setState({ searchValue, page: 1, images: [] });
  };

  LoadMore = e => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onLoadMoreBtn = loadMoreBtn => {
    console.log('onLoadMoreBtn: ' + loadMoreBtn);
    this.setState({ loadMoreBtn });
  };

  componentDidUpdate(_, prevState) {
    const searchValue = this.state.searchValue;
    const page = this.state.page;

    if (searchValue !== prevState.searchValue || page !== prevState.page) {
      //this.setState({ status: 'pending' });
      this.fetchData(page, searchValue);
    }
  }

  fetchData = async (page = 1, searchValue = '') => {
    this.setState({ status: 'pending' });
    try {
      console.log(this.state.images);
      console.log('searchValue = ' + searchValue + ' page: ' + page);
      const response = await axios.get(
        `https://pixabay.com/api/?q=${searchValue}&page=${page}&key=31475177-5e18f0fae26a0bf9f0a41710d&image_type=photo&orientation=horizontal&per_page=12`
      );
      let prevImages = this.state.images;
      let newImages = response.data.hits;
      let showMore = false;

      if (newImages.length === 12) {
        showMore = true;
      }

      this.setState({
        images: prevImages.concat(newImages),
        status: 'resolved',
        loadMoreBtn: showMore,
      });
      console.log(this.state.images);
    } catch (err) {
      console.log(err);
      this.setState({ status: 'rejected' });
    }
  };

  render() {
    const { status, error } = this.state;
    return (
      <div className={styles.app}>
        <Searchbar onSearch={this.handleSearchSubmit} />

        {status === 'idle' && (
          <div className={styles.textBlock}> Enter images name</div>
        )}
        {status === 'rejected' && <h1>{error.message}</h1>}

        <ImageGallery images={this.state.images} />
        {status === 'pending' && <Loader />}
        {/*  */}
        {this.state.loadMoreBtn && <Button clickLoadMore={this.LoadMore} />}
      </div>
    );
  }
}

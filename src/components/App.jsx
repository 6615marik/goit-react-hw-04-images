import { useEffect, useState } from 'react';
import Notiflix from 'notiflix';
import axios from 'axios';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { SearchBar } from './Searchbar/Searchbar';
import { BASE_URL, API_KEY } from 'api/api';
import { Circless } from './Loader/Loader';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';

export const App = () => {
  const [hits, setHits] = useState([]);
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [showLoadMore, setShowLoadMore] = useState(true);

  useEffect(() => {
    const getValue = () => {
      setLoading(true);
      setShowLoadMore(true);
      axios
        .get(
          `${BASE_URL}?key=${API_KEY}&q=${name}&page=${page}&image_type=photo&orientation=horizontal&per_page=12&safesearch=true`
        )
        .then(response => {
          console.log(response.data.hits);
          if (!response.data.hits.length) {
            Notiflix.Notify.failure('No images found!');
          }
          if (response.data.hits.length < 12) {
            setShowLoadMore(false);
          }
          setHits(prev => [...prev, ...response.data.hits]);
        })
        .catch(error => {
          console.error(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    if (name) getValue();
  }, [name, page]);

  const toggleModal = (largeImageURL, tags) => {
    if (!showModal) {
      console.log('rrfr');
      setShowModal(true);
      setLargeImageURL(largeImageURL);
      setTags(tags);
      return;
    }
  };

  const closeModal = () => {
    setShowModal(false);
    return;
  };

  const valueFromInput = name => {
    // console.log(name);
    setName(name);
    setPage(1);
    setHits([]);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };
  return (
    <div>
      <SearchBar onSubmitHandler={valueFromInput} />
      {loading && <Circless />}
      <ImageGallery>
        <ImageGalleryItem articles={hits} onImage={toggleModal} />
      </ImageGallery>
      {showModal && (
        <Modal onClose={closeModal} url={largeImageURL} alt={tags} />
      )}
      {hits.length > 0 && showLoadMore && <Button onButtonClick={loadMore} />}
    </div>
  );
};

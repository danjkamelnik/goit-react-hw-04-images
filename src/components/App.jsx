import React, { useEffect, useState } from 'react';
import { BASE_URL, API_KEY } from './API';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Main, Title, Error } from './App.styled';
import { Loading } from './Loader/Loader';

export const App = () => {
  const [search, setSearch] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading] = useState(false);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!search) {
      return;
    }

    const fetchFn = () => {
      setStatus('pending');

      fetch(
        `${BASE_URL}?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=15`
      )
        .then(response => response.json())
        .then(({ hits }) => setImages(images => [...images, ...hits]))
        .catch(error => {
          setError(error);
          setStatus('rejected');
        })
        .finally(() => setStatus('resolved'));
    };
    fetchFn();
  }, [search, page]);

  const onLoadMore = () => {
    setPage(page + 1);
  };

  const onSubmit = value => {
    setSearch(value);
    setPage(1);
    setImages([]);
  };

  return (
    <Main>
      <Searchbar onSubmit={onSubmit} />
      {status === 'idle' && <Title>Type something in search</Title>}
      {isLoading && <Loading />}
      {status === 'resolved' && <ImageGallery images={images} />}
      {status === 'rejected' && <Error>{error.massage}</Error>}
      {images.length !== 0 && images.length / 15 === page && (
        <Button onClick={onLoadMore} />
      )}
    </Main>
  );
};

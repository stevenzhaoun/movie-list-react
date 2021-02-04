import { useContext, useState } from 'react';
import { getMovieList } from '../apiServices';
import HomeMovieContext from '../contexts/HomeMovieContext';

const useMovieList = () => {
  const { homeMovies, setHomeMovies } = useContext(HomeMovieContext);
  const [loading, setLoading] = useState(false);

  const getMovies = (category, page) => {
    if (homeMovies[category] && homeMovies[category][page]) {
      return Promise.resolve(homeMovies[category][page]);
    } else {
      setLoading(true);
      return getMovieList(category, page).then(({ data }) => {
        const { results, total_pages } = data;
        const moviePageData = { movies: results, totalPages: total_pages }
        setHomeMovies({
          ...homeMovies,
          [category]: {
            ...homeMovies[category],
            [page]: moviePageData
          }
        });
        setLoading(false);
        return moviePageData;
      })
    }
  };

  return {
    loading,
    getMovies,

  }
};

export default useMovieList;
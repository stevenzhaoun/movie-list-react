import { Box, CircularProgress } from '@material-ui/core';
import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadHomeMoviesAction, setCategoryAction, setCurrentPageAction } from '../actions/homeMoviesActions';
import CategorySelect from '../components/CategorySelect';
import Pagination from '../components/Pagination';
import MovieList from './MovieList';

const HomeMovieList = () => {

  const dispatch = useDispatch();

  const { loading, page, category, moviesMap, totalPages } = useSelector(state => state.homeMovies);

  const hasMovies = moviesMap[category] && moviesMap[category][page];

  const movies = hasMovies ? moviesMap[category] && moviesMap[category][page] : [];

  const loadMovies = useCallback((category, page) => {
    if (hasMovies) {
      return;
    }
    dispatch(loadHomeMoviesAction(category, page));
  }, [dispatch, hasMovies]);

  useEffect(() => {
    loadMovies(category, page);
  }, [loadMovies, category, page]);

  const handleNext = () => {
    if (page === totalPages) {
      return;
    }
    const newPage = page + 1;
    dispatch(setCurrentPageAction(newPage));
    loadMovies(category, newPage);
  }

  const handlePrev = () => {
    if (page === 1) {
      return;
    }
    const newPage = page - 1;
    dispatch(setCurrentPageAction(newPage));
    loadMovies(category, newPage);
  }

  const handleCategoryChange = (category) => {
    dispatch(setCategoryAction(category));
    dispatch(setCurrentPageAction(1));
    loadMovies(category, 1);
  }

  return (
    <Box p={5}>
      <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" my={3}>
        <Box gridColumn="2/3">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        </Box>
        <Box gridColumn="3/4" display="flex" justifyContent="flex-end">
          <CategorySelect
            value={category}
            onChange={handleCategoryChange}
          />
        </Box>
      </Box>
      {loading && <Box display='flex' justifyContent="center" alignItems="center"><CircularProgress /></Box>}
      {!loading && (
        <MovieList
          movies={movies}
        />)}
    </Box>
  )
}

export default HomeMovieList

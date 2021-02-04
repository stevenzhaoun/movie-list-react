import { Box, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import CategorySelect from '../components/CategorySelect';
import Pagination from '../components/Pagination';
import useMovieList from '../hooks/useMovieList'
import MovieList from './MovieList';

const HomeMovieList = () => {
  const [movies, setMovies] = useState([]);
  const { loading, getMovies } = useMovieList();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [category, setCategory] = useState('popular');

  const loadMovies = (category, page) => {
    getMovies(category, page).then(({ movies, totalPages }) => {
      setMovies(movies);
      setTotalPages(totalPages)
    })
  }

  useEffect(() => {
    loadMovies(category, page);
  }, []);

  const handleNext = () => {
    if (page === totalPages) {
      return;
    }
    const newPage = page + 1;
    setPage(newPage);
    loadMovies(category, newPage);
  }

  const handlePrev = () => {
    if (page === 1) {
      return;
    }
    const newPage = page - 1;
    setPage(newPage);
    loadMovies(category, newPage);
  }

  const handleCategoryChange = (category) => {
    setCategory(category);
    setPage(1);
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

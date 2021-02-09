import { Box, CircularProgress, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useUser from '../hooks/useUser'
import { loadRatedMovies } from '../slices/ratedMoviesSlice'
import MovieList from './MovieList'

const RateList = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const { movies, loading } = useSelector(state => state.ratedList);
  useEffect(() => {
    if (!user) {
      return;
    }
    dispatch(loadRatedMovies());
  }, [user, dispatch]);

  return (
    <Box p={5}>
      <Typography variant={'h3'} align="center">Rated list</Typography>
      {loading && <CircularProgress />}
      {!loading && <MovieList movies={movies} />}
    </Box>
  )
}

export default RateList

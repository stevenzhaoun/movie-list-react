import { Box, CircularProgress, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import useUser from '../hooks/useUser'
import MovieList from './MovieList'
import { useDispatch, useSelector } from 'react-redux'
import { loadFavoriteMovies } from '../slices/favoriteMoviesSlice'

const FavoriteList = () => {
  const { user } = useUser();
  const dispatch = useDispatch();

  const { movies, loading, favListMap } = useSelector(state => state.favList)
  useEffect(() => {
    if (!user) {
      return;
    }
    dispatch(loadFavoriteMovies());
  }, [user, dispatch]);

  const validList = movies.filter(movie => favListMap[movie.id]);

  return (
    <Box p={5}>
      <Typography variant={'h3'} align="center">Favorite list</Typography>
      {loading && <CircularProgress />}
      {!loading && <MovieList movies={validList} />}
    </Box>
  )
}

export default FavoriteList

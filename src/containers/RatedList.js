import { Box, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { getUserMovies } from '../apiServices'
import FavoriteMovesContext from '../contexts/FavoriteMovesContext'
import RatedMoviesContext from '../contexts/RatedMoviesContext'
import useUser from '../hooks/useUser'
import MovieList from './MovieList'

const RateList = () => {
  const [movies, setMovies] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    if (!user) {
      return;
    }
    getUserMovies(user.sessionId, user.userId, 'rated').then(({ data }) => {
      const { results } = data;
      setMovies(results);
    });
  }, [user]);

  return (
    <Box p={5}>
      <Typography variant={'h3'} align="center">Rated list</Typography>
      <MovieList movies={movies} />
    </Box>
  )
}

export default RateList

import { Box, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { getUserMovies } from '../apiServices'
import FavoriteMovesContext from '../contexts/FavoriteMovesContext'
import useUser from '../hooks/useUser'
import MovieList from './MovieList'

const FavoriteList = () => {
  const [movies, setMovies] = useState([]);
  const { favListMap } = useContext(FavoriteMovesContext)
  const { user } = useUser();
  useEffect(() => {
    if (!user) {
      return;
    }
    getUserMovies(user.sessionId, user.userId, 'favorite').then(({ data }) => {
      const { results } = data;
      setMovies(results);
    });
  }, [user]);

  const validList = movies.filter(movie => favListMap[movie.id]);

  return (
    <Box p={5}>
      <Typography variant={'h3'} align="center">Favorite list</Typography>
      <MovieList movies={validList} />
    </Box>
  )
}

export default FavoriteList

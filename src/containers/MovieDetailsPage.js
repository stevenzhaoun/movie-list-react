import { Box, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getImgUrl, getMovieDetails } from '../apiServices';
import MovieDetails from '../components/MovieDetails';
import SnackBar from '../components/SnackBar';
import useSnackBar from '../hooks/useSnackBar';
import { useDispatch, useSelector } from 'react-redux';
import { rateMovieAction } from '../slices/ratedMoviesSlice';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { showMessage, ...snackBarProps } = useSnackBar();
  const { ratedListMap } = useSelector(state => state.ratedList);
  const [movie, setMovie] = useState({});
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getMovieDetails(movieId).then(({ data }) => {
      setMovie(data);
      setLoading(false);
    });
  }, [movieId, setLoading, setMovie]);


  const handleRate = (id, rating) => {
    dispatch(rateMovieAction({ rating, movieId: id })).then(() => {
      showMessage('Rated success!!');
    })
  }
  return (
    <Box p={5} display="flex" justifyContent='center' alignItems="center" mx={16}>
      {loading && <CircularProgress />}
      {!loading && (
        <MovieDetails
          id={movie.id}
          posterPath={getImgUrl(movie.poster_path)}
          title={movie.title}
          releaseDate={movie.release_date}
          overview={movie.overview}
          genres={movie.genres || []}
          movieRate={movie.vote_average}
          myRate={ratedListMap[movie.id]}
          productionCompanies={movie.production_companies || []}
          onRate={handleRate}
        />
      )}
      <SnackBar {...snackBarProps} />
    </Box>
  )
}

export default MovieDetailsPage

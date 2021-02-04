import { Box, CircularProgress } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getImgUrl, getMovieDetails, rateMovie } from '../apiServices';
import MovieDetails from '../components/MovieDetails';
import SnackBar from '../components/SnackBar';
import RatedMoviesContext from '../contexts/RatedMoviesContext';
import useSnackBar from '../hooks/useSnackBar';
import useUser from '../hooks/useUser';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { showMessage, ...snackBarProps } = useSnackBar();
  const { ratedListMap, setRatedListMap } = useContext(RatedMoviesContext);
  const [movie, setMovie] = useState({});
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getMovieDetails(movieId).then(({ data }) => {
      setMovie(data);
      setLoading(false);
    });
  }, []);


  const handleRate = (id, rating) => {
    console.log(id, rating)
    rateMovie(user.sessionId, id, rating).then(() => {
      showMessage('Rated success!!');
      setRatedListMap({
        ...ratedListMap,
        [id]: rating
      });
    });
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

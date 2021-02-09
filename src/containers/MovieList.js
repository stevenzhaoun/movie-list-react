import React from 'react'
import { useHistory } from 'react-router-dom'
import { getImgUrl } from '../apiServices'
import MovieCard from '../components/MovieCard'
import MovieGrid from '../components/MovieGrid'
import useUser from '../hooks/useUser'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFavoriteMovie } from '../slices/favoriteMoviesSlice'

const MovieList = ({
  movies
}) => {
  const { user } = useUser();
  const { favListMap } = useSelector(state => state.favList);
  const { ratedListMap } = useSelector(state => state.ratedList);
  const history = useHistory();

  const dispatch = useDispatch();

  const handleTitleClick = (id) => {
    history.push(`/movies/${id}`);
  };

  const handleToggleFavorite = (id) => {
    if (!user) {
      return;
    }
    dispatch(toggleFavoriteMovie({ isFav: !favListMap[id], movieId: id }))
  }

  return (
    <MovieGrid>
      {movies.map(movie => {
        return (
          <MovieCard
            key={movie.id}
            id={movie.id}
            imgSrc={getImgUrl(movie.poster_path)}
            title={movie.title}
            rating={movie.vote_average}
            myRating={ratedListMap[movie.id]}
            favorite={Boolean(favListMap[movie.id])}
            onToggleFavorite={handleToggleFavorite}
            onTitleClick={handleTitleClick}
          />
        )
      })}
    </MovieGrid>
  )
}

export default MovieList

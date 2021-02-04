import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { addMovieToFavorite, getImgUrl } from '../apiServices'
import MovieCard from '../components/MovieCard'
import MovieGrid from '../components/MovieGrid'
import FavoriteMovesContext from '../contexts/FavoriteMovesContext'
import useUser from '../hooks/useUser'

const MovieList = ({
  movies
}) => {
  const { user } = useUser();
  const { favListMap, setFavListMap } = useContext(FavoriteMovesContext);
  const history = useHistory();
  const handleTitleClick = (id) => {
    history.push(`/movies/${id}`);
  };

  const handleToggleFavorite = (id) => {
    if (!user) {
      return;
    }
    const { sessionId, accountId, } = user;
    addMovieToFavorite(sessionId, accountId, id, !favListMap[id]).then(() => {
      setFavListMap({
        ...favListMap,
        [id]: !favListMap[id]
      })
    })
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
            myRating={movie.rating}
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

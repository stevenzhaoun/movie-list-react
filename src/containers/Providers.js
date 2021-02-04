import React, { useState } from 'react';
import HomeMovieContext from '../contexts/HomeMovieContext';
import UserContext from '../contexts/UserContext';
import FavoriteMovesContext from '../contexts/FavoriteMovesContext';
import RatedMoviesContext from '../contexts/RatedMoviesContext';


const Providers = (props) => {
  const [homeMovies, setHomeMovies] = useState({});
  const [user, setUser] = useState(null)
  const [favListMap, setFavListMap] = useState({});
  const [ratedListMap, setRatedListMap] = useState({});
  return (
    <div>
      <HomeMovieContext.Provider value={{ homeMovies, setHomeMovies }}>
        <UserContext.Provider value={{ user, setUser }}>
          <FavoriteMovesContext.Provider value={{ favListMap, setFavListMap }}>
            <RatedMoviesContext.Provider value={{ ratedListMap, setRatedListMap }}>
              {props.children}
            </RatedMoviesContext.Provider>
          </FavoriteMovesContext.Provider>
        </UserContext.Provider>
      </HomeMovieContext.Provider>
    </div>
  )
}

export default Providers

import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import FavoriteList from './containers/FavoriteList';
import Header from './containers/Header';
import HomeMovieList from './containers/HomeMovieList';
import Login from './containers/Login';
import MovieDetailsPage from './containers/MovieDetailsPage';
import RatedList from './containers/RatedList';
import useUser from './hooks/useUser';

function App() {
  const { loadUserData } = useUser();
  useEffect(() => {
    loadUserData()
  }, []);
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/movies/:movieId" exact component={MovieDetailsPage} />
        <Route path="/rated" exact component={RatedList} />
        <Route path="/favorite" exact component={FavoriteList} />
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={HomeMovieList} />
      </Switch>
    </div>
  );
}

export default App;

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import homeMovies from './reducers/homeMoviesReducer';
import user from './slices/userSlice';
import favList from './slices/favoriteMoviesSlice';
import ratedList from './slices/ratedMoviesSlice';


const rootReducer = combineReducers({
  homeMovies,
  user,
  favList,
  ratedList
})


export const store = configureStore({
  reducer: rootReducer,
});


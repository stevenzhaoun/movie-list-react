import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserMovies } from "../apiServices";
import { addMovieToFavorite } from '../apiServices'
import { userLogout } from "./userSlice";

export const loadFavoriteMovies = createAsyncThunk(
  'loadFavorites',
  async (arg, { getState }) => {
    const { user } = getState().user;
    if (!user) {
      return;
    }
    const { results } = (await getUserMovies(user.sessionId, user.userId, 'favorite')).data;
    return results;
  }
);

const initialState = {
  loading: false,
  movies: [],
  favListMap: {}
};

const slice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const movieId = action.payload;
      if (state.favListMap[movieId]) {
        delete state.favListMap[movieId];
      } else {
        state.favListMap[movieId] = true;
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(loadFavoriteMovies.pending, state => {
      state.loading = true
    });

    builder.addCase(loadFavoriteMovies.rejected, state => {
      state.loading = false
    });

    builder.addCase(loadFavoriteMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.movies = action.payload;
      state.favListMap = action.payload.reduce((acc, movie) => {
        acc[movie.id] = true;
        return acc;
      }, {});
    });

    builder.addCase(userLogout, (state) => {
      state.movies = [];
      state.favListMap = {};
    })
  }
});

export const toggleFavoriteMovie = createAsyncThunk(
  'toggleFavoriteMovie',
  async ({ isFav, movieId }, { getState, dispatch }) => {
    const { user } = getState().user;
    if (!user) {
      return {};
    }
    dispatch(slice.actions.toggleFavorite(movieId));
    return await addMovieToFavorite(user.sessionId, user.userId, movieId, isFav)
  }
)

export default slice.reducer;
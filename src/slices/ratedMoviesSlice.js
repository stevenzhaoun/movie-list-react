import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserMovies } from "../apiServices";
import { rateMovie } from '../apiServices'
import { userLogout } from "./userSlice";

export const loadRatedMovies = createAsyncThunk(
  'loadRatedMovies',
  async (arg, { getState }) => {
    const { user } = getState().user;
    if (!user) {
      return;
    }
    const { results } = (await getUserMovies(user.sessionId, user.userId, 'rated')).data;
    return results;
  }
);

const initialState = {
  loading: false,
  movies: [],
  ratedListMap: {}
};

const slice = createSlice({
  name: 'rated',
  initialState,
  reducers: {
    addRatedMovie: (state, action) => {
      const { movieId, rating } = action.payload;
      state.ratedListMap[movieId] = rating;
    }
  },
  extraReducers: builder => {
    builder.addCase(loadRatedMovies.pending, state => {
      state.loading = true
    });

    builder.addCase(loadRatedMovies.rejected, state => {
      state.loading = false
    });

    builder.addCase(loadRatedMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.movies = action.payload;
      state.ratedListMap = action.payload.reduce((acc, movie) => {
        acc[movie.id] = movie.rating;
        return acc;
      }, {});
    });

    builder.addCase(userLogout, (state) => {
      state.movies = [];
      state.ratedListMap = {};
    });
  }
});

export const rateMovieAction = createAsyncThunk(
  'rateMovieAction',
  async ({ rating, movieId }, { getState, dispatch }) => {
    const { user } = getState().user;
    if (!user) {
      return {};
    }
    dispatch(slice.actions.addRatedMovie({ movieId, rating }));
    return await rateMovie(user.sessionId, movieId, rating);
  }
)

export default slice.reducer;
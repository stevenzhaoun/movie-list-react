import axios from 'axios';

export const IMG_SRC_BASE = `https://image.tmdb.org/t/p/w500`;
export const API_SRC_BASE = `https://api.themoviedb.org/3`;
const API_KEY = 'dae00b55c2f84ea3e6b7a5269e204c45';

export const client = axios.create({
  baseURL: API_SRC_BASE,
  params: {
    api_key: API_KEY
  },
});

export const getImgUrl = (path) => `${IMG_SRC_BASE}${path}`

export const getMovieDetails = (movieId) => {
  return client.get(`/movie/${movieId}`)
}

export const getMovieList = (category, page) => {
  return client.get(`/movie/${category}`, { params: { page } });
}

export const getUserMovies = (sessionId, accountId, listType) => {
  return client.get(`/account/${accountId}/${listType}/movies`, { params: { session_id: sessionId } });
}

export const getRequestToken = () => {
  return client.get(`/authentication/token/new`);
}

export const validateUser = (username, password, requestToken) => {
  return client.post('/authentication/token/validate_with_login', { username, password, request_token: requestToken });
}

export const getSession = (requestToken) => {
  return client.post(`/authentication/session/new`, { request_token: requestToken });
}

export const getUserAccount = (sessionId) => {
  return client.get(`/account`, { params: { session_id: sessionId } });
}

export const addMovieToFavorite = (sessionId, accountId, movieId, isFavorite) => {
  return client.post(`/account/${accountId}/favorite`, {
    media_type: "movie",
    media_id: movieId,
    favorite: isFavorite
  }, { params: { session_id: sessionId } })
};

export const rateMovie = (sessionId, movieId, rateValue) => {
  return client.post(`/movie/${movieId}/rating`, { value: rateValue }, { params: { session_id: sessionId } })
}


import { useDispatch, useSelector } from 'react-redux'
import { userLogin, userLogout, setUserInfo } from "../slices/userSlice";
import { loadRatedMovies } from "../slices/ratedMoviesSlice";
import { loadFavoriteMovies } from "../slices/favoriteMoviesSlice";
import { useCallback } from 'react';



const useUser = () => {
  const { user, loading, error } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const loadUserMovies = useCallback(() => {
    dispatch(loadRatedMovies());
    dispatch(loadFavoriteMovies());
  }, [dispatch]);

  const login = (username, password) => {
    return dispatch(userLogin({ username, password })).then(({ payload }) => {
      const userInfo = payload;
      localStorage.setItem('user', JSON.stringify(userInfo));
      return loadUserMovies(userInfo)
    });
  };

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    dispatch(userLogout());
  }, [dispatch]);

  const loadUserData = useCallback(() => {
    const userDataStr = localStorage.getItem('user');
    if (userDataStr) {
      try {
        const userInfo = JSON.parse(userDataStr);
        dispatch(setUserInfo(userInfo))
        loadUserMovies(userInfo);
      } catch (e) {
        console.log(e);
      }
    }
  }, [dispatch, loadUserMovies])

  return {
    user,
    login,
    loading,
    logout,
    loadUserData,
    error
  }
}

export default useUser;
import { useContext, useState } from "react"
import { getRequestToken, validateUser, createSession, getUserAccount, getUserMovies } from "../apiServices";
import FavoriteMovesContext from "../contexts/FavoriteMovesContext";
import RatedMoviesContext from "../contexts/RatedMoviesContext";
import UserContext from "../contexts/UserContext";



const useUser = () => {
  const { user, setUser } = useContext(UserContext);
  const { setFavListMap } = useContext(FavoriteMovesContext);
  const { setRatedListMap } = useContext(RatedMoviesContext);
  const [loading, setLoading] = useState(false)

  const loadUserMovies = (userInfo) => {
    getUserMovies(userInfo.sessionId, userInfo.userId, 'favorite').then(({ data }) => {
      const { results } = data;
      const favMap = results.reduce((acc, movie) => {
        acc[movie.id] = true
        return acc;
      }, {});
      setFavListMap(favMap);
    });

    getUserMovies(userInfo.sessionId, userInfo.userId, 'rated').then(({ data }) => {
      const { results } = data;
      const ratedMap = results.reduce((acc, movie) => {
        acc[movie.id] = movie.rating
        return acc;
      }, {});
      setRatedListMap(ratedMap);
    });
  }

  const login = (username, password) => {
    setLoading(true);
    return getRequestToken().then(({ data }) => {
      const { request_token } = data
      validateUser(username, password, request_token)
        .then(() => {
          createSession(request_token).then(({ data }) => {
            const { session_id } = data;
            getUserAccount(session_id).then(({ data }) => {
              const { id, username } = data
              const userInfo = {
                requestToken: request_token,
                sessionId: session_id,
                userId: id,
                userName: username
              }
              localStorage.setItem('user', JSON.stringify(userInfo));
              setUser(userInfo);
              setLoading(false);
              return userInfo;
            }).then((userInfo) => {
              loadUserMovies(userInfo)
            });
          })
        })
    })
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  }

  const loadUserData = () => {
    const userDataStr = localStorage.getItem('user');
    if (userDataStr) {
      try {
        const userInfo = JSON.parse(userDataStr);
        setUser(userInfo);
        loadUserMovies(userInfo);
      } catch (e) {
        console.log(e);
      }
    }
  }

  return {
    user,
    login,
    setUser,
    loading,
    logout,
    loadUserData
  }
}

export default useUser;
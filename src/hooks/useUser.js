import { useContext, useState } from "react"
import { getRequestToken, validateUser, createSession, getUserAccount } from "../apiServices";
import UserContext from "../contexts/UserContext";



const useUser = () => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false)

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
            })
          })
        })
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  }
  return {
    user,
    login,
    setUser,
    loading,
    logout
  }
}

export default useUser;
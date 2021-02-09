import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequestToken, validateUser, createSession, getUserAccount } from "../apiServices";


export const userLogin = createAsyncThunk(
  'user/login',
  ({ username, password }) => {
    return getRequestToken().then(({ data }) => {
      const { request_token } = data
      return validateUser(username, password, request_token)
        .then(() => {
          return createSession(request_token).then(({ data }) => {
            const { session_id } = data;
            return getUserAccount(session_id).then(({ data }) => {
              const { id, username } = data
              const userInfo = {
                requestToken: request_token,
                sessionId: session_id,
                userId: id,
                userName: username
              }
              return userInfo;
            });
          })
        })
    });
  }
)


const initialState = {
  user: null,
  loading: false,
  error: false,
}


const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: (state) => {
      state.user = null;
    },
    setUserInfo: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(userLogin.rejected, (state) => {
      state.loading = false;
      state.error = true;
    })

    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    });
  }
});

export const { userLogout, setUserInfo } = slice.actions

export default slice.reducer;
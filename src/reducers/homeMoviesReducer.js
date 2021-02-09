import * as homeMoviesActions from '../actions/homeMoviesActions'

const initialState = {
  loading: false,
  moviesMap: {},
  error: false,
  page: 1,
  totalPages: 1,
  category: 'popular'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case homeMoviesActions.SET_CURRENT_PAGE: {
      return {
        ...state,
        page: action.payload
      }
    }
    case homeMoviesActions.SET_CATEGORY: {
      return {
        ...state,
        category: action.payload
      }
    }
    case homeMoviesActions.LOAD_HOME_MOVIES_PENDING: {
      return {
        ...state,
        loading: true,
        error: false
      }
    }
    case homeMoviesActions.LOAD_HOME_MOVIES_REJECTED: {
      return {
        ...state,
        loading: false,
        error: true
      }
    }
    case homeMoviesActions.LOAD_HOME_MOVIES_SUCCESS: {
      const {
        category,
        page,
        movies,
        totalPages
      } = action.payload;
      return {
        ...state,
        totalPages,
        loading: false,
        moviesMap: {
          ...state.moviesMap,
          [category]: {
            ...state.moviesMap[category],
            [page]: movies
          }
        }
      }
    }
    default:
      return state
  }
};

export default reducer;
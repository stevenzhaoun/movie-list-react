import { getMovieList } from "../apiServices";

export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_CATEGORY = 'SET_CATEGORY';

export const LOAD_HOME_MOVIES_PENDING = 'LOAD_HOME_MOVIES_PENDING';
export const LOAD_HOME_MOVIES_REJECTED = 'LOAD_HOME_MOVIES_REJECTED';
export const LOAD_HOME_MOVIES_SUCCESS = 'LOAD_HOME_MOVIES_SUCCESS';

export const setCurrentPageAction = (page) => ({ type: SET_CURRENT_PAGE, payload: page });
export const setCategoryAction = (category) => ({ type: SET_CATEGORY, payload: category });


export const loadHomeMoviesPendingAction = () => ({ type: LOAD_HOME_MOVIES_PENDING });
export const loadHomeMoviesRejectedAction = () => ({ type: LOAD_HOME_MOVIES_REJECTED });

export const loadHomeMoviesSuccessAction = (category, page, movies, totalPages) => {
  return {
    type: LOAD_HOME_MOVIES_SUCCESS,
    payload: {
      category,
      page,
      movies,
      totalPages
    }
  }
};

export const loadHomeMoviesAction = (category, page) => {
  return (dispatch) => {
    dispatch(loadHomeMoviesPendingAction());
    return getMovieList(category, page).then(({ data }) => {
      const { results, total_pages } = data;
      dispatch(loadHomeMoviesSuccessAction(category, page, results, total_pages));
    }).catch((e) => {
      console.log(e)
      dispatch(loadHomeMoviesRejectedAction());
    })
  };
}
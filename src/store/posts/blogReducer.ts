import { Dispatch, AnyAction, Reducer } from "redux";
import { BlogPost } from "../../types/typesPosts";

//Тип экшенов
export const FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST"; // Состояние загрузки
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS"; //Получение данных
export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE"; // Ошибка загрузки

// Типизация экшенов
interface FetchPostsRequestAction {
  type: typeof FETCH_POSTS_REQUEST;
}

interface FetchPostsSuccessAction {
  type: typeof FETCH_POSTS_SUCCESS;
  payload: BlogPost[];
}

interface FetchPostsFailureAction {
  type: typeof FETCH_POSTS_FAILURE;
  payload: string;
}

type PostActionTypes =
  | FetchPostsRequestAction
  | FetchPostsSuccessAction
  | FetchPostsFailureAction
  | AnyAction;

// Начальное состояние - типихация
interface PostsState {
  loading: boolean;
  postsblog: BlogPost[];
  error: string | null;
}

// Начальное состояние
const initialState: PostsState = {
  loading: false,
  postsblog: [],
  error: null,
};

export const postsBlog = (
  state = initialState,
  action: PostActionTypes
): PostsState => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        postsblog: "payload" in action ? action.payload : state.postsblog,
      };
    case FETCH_POSTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Асинхронный экшен для загрузки данных
export const fetchBlog = () => {
  return async (dispatch: Dispatch<PostActionTypes>) => {
    dispatch({ type: FETCH_POSTS_REQUEST });
    try {
      const response = await fetch("http://localhost:5013/blogtest");
      const data: BlogPost[] = await response.json();
      dispatch({ type: FETCH_POSTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_POSTS_FAILURE,
        payload: "Ошибка загрузки данных",
      });
    }
  };
};

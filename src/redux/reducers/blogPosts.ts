import * as types from "../actions/types";

interface InitalStateBlogPost {
  posts: [];
  loading: boolean;
  posted: boolean;
}
export const initialState: InitalStateBlogPost = {
  posts: [],
  loading: true,
  posted: false,
};
interface Action {
  type: string;
  payload: string;
}

const blogPost = (state = initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_ALL_POST_SUCCESS: {
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    }
    case types.BLOGPOST_SUCCESS: {
      return {
        ...state,
        posts: [...state.posts, payload],
        posted: true,
      };
    }
    case types.REFRESH_SUCCESS: {
      return {
        ...state,
        posted: false,
      };
    }
    default: {
      return state;
    }
  }
};
export default blogPost;

import * as types from "../actions/types";

interface InitalStateBlogPost {
  posts: [];
  loading: boolean;
}
export const initialState: InitalStateBlogPost = {
  posts: [],
  loading: true,
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
      };
    }
    default: {
      return state;
    }
  }
};
export default blogPost;

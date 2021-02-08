import * as types from "../actions/types";
import { IBlogPost } from "./user";

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
  payload: { msg: string; deleted: IBlogPost };
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
    case types.DELETE_POST_SUCCESS: {
      const deletedId = (payload.deleted as any)._id;
      const filterPosts = state.posts.filter((post: any) => {
        return post._id !== deletedId;
      });
      return {
        ...state,
        posts: filterPosts,
      };
    }
    case types.EDIT_POST_SUCCESS: {
      const newUserPosts = state.posts.map((post: any) => {
        if (post._id === (payload as any)._id) {
          post.title = (payload as any).title;
          post.blogContent = (payload as any).blogContent;
        }
        return post;
      });
      return {
        ...state,
        posts: newUserPosts,
      };
    }
    default: {
      return state;
    }
  }
};
export default blogPost;

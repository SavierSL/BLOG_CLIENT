import { BlogPost } from "../../components/HomePage";
import * as types from "./types";
interface getUseActionType {
  type: string;
  payload: { token: string | null };
}
export const getUserAction = (token: string | null): getUseActionType => {
  return {
    type: types.GET_USER_SAGA,
    payload: { token },
  };
};

export const getUserPostsAction = (token: string | null): getUseActionType => {
  return {
    type: types.GET_USER_POSTS_SAGA,
    payload: { token },
  };
};

export const newPostUserAction = (blogPost: BlogPost) => {
  return {
    type: types.NEW_USER_POST_SAGA,
    payload: { blogPost },
  };
};

export const exitUserPost = () => {
  return {
    type: types.EXIT_USER_POST_SAGA,
  };
};

export const logOutUser = () => {
  return {
    type: types.LOG_OUT_SAGA,
  };
};

export const deletePostAction = (token: string, postID: string) => {
  return {
    type: types.DELETE_POST_SAGA,
    payload: { token, postID },
  };
};
export const refreshPosted = () => {
  return {
    type: types.REFRESH_SAGA,
  };
};

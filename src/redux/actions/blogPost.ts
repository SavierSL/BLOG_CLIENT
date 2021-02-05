import * as types from "../actions/types";

interface blogPostActionType {
  type: string;
  payload: object;
}

export const blogPostAction = (
  title: string,
  blogContent: string,
  img: unknown | null | File,
  token: string | null,
  imgType: string
): blogPostActionType => {
  return {
    type: types.BLOGPOST_SAGA,
    payload: { title, blogContent, img, token, imgType },
  };
};
export const getAllPost = () => {
  return {
    type: types.GET_ALL_POST_SAGA,
  };
};

export const getUserPost = (id: string) => {
  return {
    type: types.POST_LINK_SAGA,
    payload: { id },
  };
};

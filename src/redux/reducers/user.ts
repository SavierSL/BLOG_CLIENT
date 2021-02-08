import * as types from "../actions/types";
export interface IBlogPost extends Document {
  user: any;
  name: string;
  title: string;
  blogContent: string;
  comments?: object[];
  likes?: object[];
  date: string;
  img: string;
  imgType: string;
}
interface InitialUserState {
  user: {};
  msg: any;
  posts: [];
  loadingPosts: boolean;
  post: IBlogPost | null;
  loading: boolean;
  editPost: IBlogPost | null;
}
export const initialState: InitialUserState = {
  user: {},
  msg: "",
  posts: [],
  loadingPosts: true,
  post: null,
  loading: true,
  editPost: null,
};
interface Action {
  type: string;
  payload: any;
}

const user = (state = initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_USER_SUCCESS: {
      return {
        ...state,
        user: payload,
      };
    }
    case types.GET_USER_FAILED: {
      return {
        ...state,
        user: {},
        msg: payload,
        loading: false,
      };
    }
    case types.GET_USER_POSTS_SUCCESS: {
      return {
        ...state,
        posts: payload,
        loadingPosts: false,
      };
    }
    case types.GET_USER_POSTS_FAILED: {
      return {
        ...state,
        msg: payload,
        loadingPosts: false,
      };
    }
    case types.NEW_USER_POST_SUCCESS: {
      return {
        ...state,
        msg: payload,
        loadingPosts: false,
        posts: [...state.posts, payload],
      };
    }
    case types.POST_LINK_SUCCESS: {
      return {
        ...state,
        post: payload,
        loading: false,
      };
    }
    case types.EXIT_USER_POST_SUCESS: {
      return {
        ...state,
        loading: true,
        editPost: null,
      };
    }
    case types.DELETE_POST_SUCCESS: {
      const deletedId = payload.deleted._id;
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
        editPost: payload,
        posts: newUserPosts,
      };
    }

    default: {
      return state;
    }
  }
};
export default user;

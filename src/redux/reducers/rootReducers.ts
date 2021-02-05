import { combineReducers } from "redux";
import post from "../reducers/post";
import blogPost from "../reducers/blogPosts";
import user from "../reducers/user";

const rootReducers = combineReducers({ post, blogPost, user });
export default rootReducers;

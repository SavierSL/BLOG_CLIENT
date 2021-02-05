import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { getUserPost } from "../redux/actions/blogPost";
import { exitUserPost } from "../redux/actions/users";
import Loader from "./mincomponents/loader";

export interface UserPostProps {
  props: any;
}

const UserPost: React.FC<UserPostProps> = ({ props }) => {
  const postID = props.match.params.params_id;
  const post = useSelector((state: any) => state.user.post);
  const loading = useSelector((state: any) => state.user.loading);
  const [exit, setExit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPost(postID));
  }, []);
  const ecodeDataToImage = () => {
    if (post) {
      const converToBase64 = (img: any) => {
        const buffit = Buffer.from(img);
        post.image = `${buffit}`;
      };
      converToBase64(post.img);
    }
  };
  ecodeDataToImage();
  const handleExit = (e: any) => {
    e.preventDefault();
    dispatch(exitUserPost());
    setExit(true);
  };
  if (exit) {
    return <Redirect to="/blog-posts" />;
  }
  const blogPostContent = loading ? (
    <Loader />
  ) : (
    <div className="userPostContainer">
      <button className="primary-button" onClick={(e) => handleExit(e)}>
        BACK
      </button>
      <div className="userPostContainer__userBlogPost">
        <h1 className="userPostContainer__userBlogPost-title">
          {post && post.title}
        </h1>
        <p>{post && post.name}</p>
        <p>{post && post.date}</p>
        <div className="userPostContainer__userBlogPost-imageContainer">
          <img
            className="userPostContainer__userBlogPost-imageContainer-image"
            src={post !== null ? post.image : ""}
            alt=""
          />
        </div>

        <p className="userPostContainer__userBlogPost-content">
          {post && post.blogContent}
        </p>
      </div>
    </div>
  );
  return <>{blogPostContent}</>;
};

export default UserPost;

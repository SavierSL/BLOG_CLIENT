import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { getUserPost } from "../../redux/actions/blogPost";

export interface BlogPostProps {
  post: any;
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  const dispatch = useDispatch();
  const [clickLink, setClickLink] = useState(false);
  console.log(post._id);

  const handleBlogLink = (e: any, id: string) => {
    e.preventDefault();
    setClickLink(true);
    console.log(clickLink);
  };
  if (clickLink) {
    return <Redirect to={`user-post/${post._id}`} />;
  }
  return (
    <div
      onClick={(e) => {
        handleBlogLink(e, post._id);
      }}
      className="blogContentContainer-content"
    >
      <div className="blogContentContainer-content-box">
        <div className="blogContentContainer-content-box-color"></div>
        <div className="blogContentContainer-content-box-details">
          <h1 className="blogContentContainer-content-box-details-txt">
            {`${post.name}'s blog`}
          </h1>
        </div>
      </div>
      <img
        className="blogContentContainer-content-image"
        src={post.image}
        alt=""
      />
      <div className="blogContentContainer-content-details">
        <h1>{post.title}</h1>
      </div>
    </div>
  );
};

export default BlogPost;

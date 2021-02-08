import React, { useState } from "react";
// import CopyToClipboard from "react-copy-to-clipboard";
import { Redirect } from "react-router-dom";

export interface BlogPostProps {
  post: any;
  theme: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, theme }) => {
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
  const styleThemeT = {
    color: theme === "LIGHT" ? "#000" : "#fff",
  };
  const styleThemeB = {
    background: theme === "LIGHT" ? "#fff" : "#000",
  };
  return (
    <div
      onClick={(e) => {
        handleBlogLink(e, post._id);
      }}
      className="blogContentContainer-content"
    >
      <div style={styleThemeB} className="homeBlogContainer_blogs">
        <img
          className="homeBlogContainer_blogs-image"
          src={post.user.avatar}
          alt=""
        />
        <div className="homeBlogContainer_blogs-details">
          <p className="primary-p" style={styleThemeT}>
            {post.title} <span> - {post.user.name}</span>
          </p>

          <p className="primary-p" style={styleThemeT}>
            {post.date}
          </p>
          <p style={{ color: "#00aeef" }} className="primary-p">
            {post.user.email}
          </p>
        </div>

        <div className="homeBlogContainer_blogs-delete"></div>
      </div>
    </div>
  );
};

export default BlogPost;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../redux/actions/blogPost";

import BlogPost from "./mincomponents/blogPost";
import Loader from "./mincomponents/loader";

export interface BlogPostsProps {
  theme: string;
}

const BlogPosts: React.FC<BlogPostsProps> = ({ theme }) => {
  const blogPosts = useSelector((state: any) => state.blogPost.posts);
  const loading = useSelector((state: any) => state.blogPost.loading);

  const posts = [...blogPosts];
  const dispatch = useDispatch();

  //Get all post first if it is loading
  useEffect(() => {
    if (loading === true) dispatch(getAllPost());
  }, [dispatch, loading]);

  const postsContents = loading ? (
    <Loader />
  ) : (
    <div className="blogPostsContainer">
      <h1>Blog Posts</h1>

      <div className="blogContentContainer">
        {posts.length !== 0
          ? posts.map((post: any) => {
              return <BlogPost post={post} theme={theme} />;
            })
          : ""}
      </div>
    </div>
  );

  return <>{postsContents}</>;
};

export default BlogPosts;

// const encodeDataToImage = () => {
//   newPosts = posts.map((post: any) => {
//     if (posts.length !== 0) {
//       const convertToBase64 = (image: any) => {
//         const buffit = Buffer.from(image);
//         post.image = `${buffit}`;
//       };
//       convertToBase64(post.img.data);
//       return post;
//     }
//   });
// };
// encodeDataToImage();
// console.log(newPosts);
//   if (blogPosts.length === 1) {
//     const convertToBase64 = (image: any) => {
//       const buffit = Buffer.from(image.img.data);
//       updatedImage = `${buffit}`;
//     };
//     convertToBase64(blogPosts[0]);
//   }

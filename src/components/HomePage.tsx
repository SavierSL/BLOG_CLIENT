import { FilePond, registerPlugin } from "react-filepond";

import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FormLoader from "./mincomponents/formLoader";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blogPostAction, getUserPost } from "../redux/actions/blogPost";
import { Redirect } from "react-router-dom";

import UserPosts from "./mincomponents/userPost";
import {
  deletePostAction,
  editPostAction,
  exitUserPost,
  getUserAction,
  getUserPostsAction,
  logOutUser,
  refreshPosted,
} from "../redux/actions/users";
import { motion, useAnimation } from "framer-motion";
import EditPost from "./mincomponents/editPost";

export interface HomePageProps {
  theme: string;
}
export interface BlogPost {
  title: string;
  blogContent: string;
  img: unknown | null | string;
  imgType: string;
}
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginImageResize
);

const HomePage: React.FC<HomePageProps> = ({ theme }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const user = useSelector((state: any) => state.user.user);
  const animation = useAnimation();
  const [file, setFiles] = useState([]);
  const posts = useSelector((state: any) => state.user.posts);
  const loading = useSelector((state: any) => state.user.loadingPosts);
  const [click, setClick] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const posted = useSelector((state: any) => state.blogPost.posted);
  const [editPost, setEditPost] = useState(false);
  const [blogPost, setBlogPost] = useState<BlogPost>({
    title: "",
    blogContent: "",
    img: null,
    imgType: "",
  });
  const [createPostClick, setCreatePostClick] = useState<null | false | true>(
    null
  );
  const [vLovation, setVlocation] = useState(0);
  useEffect((): any => {
    dispatch(getUserAction(token));
    dispatch(getUserPostsAction(token));
    if (token === null) {
      return <Redirect to="/" />;
    }
    if (createPostClick) {
      animation.start("visible");
    }
    if (createPostClick === false) {
      animation.start("visible");
    }

    console.log(token);
  }, [token, dispatch, click, createPostClick, animation]);
  const { title, blogContent, img, imgType } = blogPost;
  const handleUpdateFIle = (file: any) => {
    setFiles(
      file.map((files: any) => {
        const file = files.file;
        setBlogPost({ ...blogPost, imgType: file.type });
        return file;
      })
    );
  };

  //return to frontpage if no token
  if (token === null) {
    return <Redirect to="/" />;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(blogPostAction(title, blogContent, img, token, imgType));
    setSubmitLoading(true);
    setCreatePostClick(false);
    setVlocation(-880);
    console.log(blogPost);
  };

  //turn the file to data//////////////////////////////////////////
  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      if (file.length === 1) {
        reader.readAsDataURL(file[0]);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      }
      return reader;
    });

  let updatedImage: string | unknown;
  const newImage = toBase64(file);
  const dataImage = async () => {
    const newData = await newImage;
    updatedImage = newData;
    return newData;
  };
  dataImage();
  //////////////////////////////////////////////////////////////////

  //input /////////////////////////////////////////////////////////////
  const handleInput = (e: any) => {
    e.preventDefault();
    setBlogPost({
      ...blogPost,
      [e.target.name]: e.target.value,
      img: updatedImage,
    });
  };

  //STYLES FOR LIGHT AND DARK THEME
  const styleThemeT = {
    color: theme === "LIGHT" ? "#000" : "#fff",
  };
  const styleThemeB = {
    background: theme === "LIGHT" ? "#fff" : "#000",
  };
  const styleThemeBMain = {
    background: theme === "LIGHT" ? "#f1f2f2" : "#005068",
  };

  //Delete /////////////////////////////////////////////////
  const handleDeleteButton = (e: any, postID: string) => {
    e.preventDefault();
    console.log("delete");
    dispatch(deletePostAction(token, postID));
    setClick(!click);
  };

  //EDIT POST
  const handleEditPost = (e: any, postID: string) => {
    e.preventDefault();
    setEditPost(true);
    dispatch(getUserPost(postID));
    console.log(postID);
  };
  const handleCloseEditPost = (e: any) => {
    e.preventDefault();
    setEditPost(false);
    dispatch(exitUserPost());
  };
  // MAP THE POSTS OF THE USER /////////////////////////////
  const ifLoading = loading ? (
    <h1>Getting Blog Datas</h1>
  ) : (
    <UserPosts
      styleThemeT={styleThemeT}
      styleThemeB={styleThemeB}
      user={user}
      posts={posts}
      handleDeleteButton={handleDeleteButton}
      handleEditPost={handleEditPost}
    />
  );
  const handleLogout = (e: any) => {
    e.preventDefault();
    console.log("logout");
    console.log(token);
    dispatch(logOutUser());
    setClick(!click);
  };
  const createPostVariants = {
    hidden: {
      y: -180,
      opacity: 0,
      display: "none",
    },
    visible: {
      y: vLovation,
      opacity: 1,
      display: "block",
    },
  };

  const createPostButton = (e: any) => {
    e.preventDefault();
    setCreatePostClick(true);
    setVlocation(0);
  };
  const handleClose = (e: any) => {
    e.preventDefault();
    setCreatePostClick(false);
    setVlocation(-880);
  };

  //toRemoveLoadingAndCloseTheForm
  if (posted && submitLoading) {
    setTimeout(() => {
      setSubmitLoading(false);
      dispatch(refreshPosted());
    }, 3000);

    console.log("hey");
  }
  return (
    <>
      <div className="homePage">
        <button onClick={(e) => handleLogout(e)} className="logOutBtn">
          LOG OUT
        </button>

        <h1 className="tertiary-heading">{user.name}</h1>
        <div>
          <span className="primary-span">{user.email}</span>
        </div>
        <button
          style={{ marginTop: "2rem" }}
          className="primary-button"
          onClick={(e) => createPostButton(e)}
        >
          Create Post
        </button>
        {submitLoading ? <FormLoader /> : ""}
        <div style={styleThemeBMain} className="homeBlogContainer">
          {ifLoading}
        </div>
        {editPost ? <EditPost handleCloseEditPost={handleCloseEditPost} /> : ""}
        <div className="homePage_content">
          <motion.div
            animate={animation}
            variants={createPostVariants}
            initial="hidden"
            className="homePage_createBlogContainer"
          >
            <FilePond
              files={file}
              onupdatefiles={(file) => handleUpdateFIle(file)}
              name="files"
              labelIdle='Drag  Drop your files or <span class="filepond--label-action">Browse</span>'
            />
            <div className="frontPage_form">
              <h2 style={{ color: "red" }}>
                {file.length === 0 ? "Add an image first" : ""}
              </h2>
              <form
                className="primary-form"
                action=""
                onSubmit={(e) => handleSubmit(e)}
              >
                <input
                  className="primary-form_primary-input"
                  placeholder="title"
                  onChange={(e) => handleInput(e)}
                  style={{
                    width: "80%",
                    border: `${file.length === 0 ? "solid red 1px" : ""}`,
                  }}
                  name="title"
                  type="text"
                  value={blogPost.title}
                  disabled={file.length === 0 ? true : false}
                />
                <textarea
                  className="primary-form_primary-input"
                  placeholder="Caption"
                  style={{
                    width: "100%",
                    height: "10rem",
                    border: `${file.length === 0 ? "solid red 1px" : ""}`,
                  }}
                  onChange={(e) => handleInput(e)}
                  name="blogContent"
                  value={blogPost.blogContent}
                  disabled={file.length === 0 ? true : false}
                />
              </form>
            </div>
            <button className="primary-button" onClick={(e) => handleSubmit(e)}>
              Submit
            </button>
            <button className="primary-button" onClick={(e) => handleClose(e)}>
              Close
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

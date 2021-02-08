import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { editPostAction, exitUserPost } from "../../redux/actions/users";

export interface EditPostProps {
  editPostClick: boolean | null;
  vEditLocation: number;
  setEditPostClick: React.Dispatch<React.SetStateAction<boolean | null>>;
  setVEditlocation: React.Dispatch<React.SetStateAction<number>>;
  theme: string;
}

const EditPost: React.FC<EditPostProps> = ({
  editPostClick,
  vEditLocation,
  setEditPostClick,
  setVEditlocation,
  theme,
}) => {
  const toEditPost = useSelector((state: any) => state.user.post);
  // const [firstLoad, setFirstLoad] = useState(false);
  const token = localStorage.getItem("token");
  const loading = useSelector((state: any) => state.user.loading);
  const animation = useAnimation();

  const dispatch = useDispatch();
  const [editPost, setEditPost] = useState({
    title: "",
    blogContent: "",
    img: "",
    image: "",
    _id: "",
  });
  useEffect(() => {
    if (toEditPost !== null) {
      setEditPost({
        title: toEditPost ? toEditPost.title : "",
        blogContent: toEditPost ? toEditPost.blogContent : "",
        ...toEditPost,
      });
    }
    if (editPostClick) {
      animation.start("visible");
    }
    if (editPostClick === false) {
      animation.start("visible");
    }
  }, [toEditPost, token, dispatch, editPostClick, animation]);

  const handleInputChange = (e: any) => {
    e.preventDefault();
    setEditPost({ ...editPost, [e.target.name]: e.target.value });
  };
  //Encode the data to display
  const ecodeDataToImage = () => {
    if (toEditPost) {
      const converToBase64 = (img: any) => {
        const buffit = Buffer.from(img);
        editPost.image = `${buffit}`;
      };
      converToBase64(editPost.img);
    }
  };
  ecodeDataToImage();
  const handleUpdate = (e: any) => {
    e.preventDefault();
    dispatch(editPostAction(token, editPost._id, editPost));
    setVEditlocation(-1380);
    setEditPostClick(false);
    setTimeout(() => {
      dispatch(exitUserPost());
    }, 1000);
  };
  //EDIT POST
  const handleCloseEditPost = (e: any) => {
    e.preventDefault();
    setVEditlocation(-1380);
    setEditPostClick(false);
    setTimeout(() => {
      dispatch(exitUserPost());
    }, 1000);
  };

  const createEditPostVariants = {
    hidden: {
      x: -180,
      opacity: 0,
      display: "none",
    },
    visible: {
      x: vEditLocation,
      opacity: 1,
      display: "block",
    },
  };
  //STYLES FOR LIGHT AND DARK THEME

  const styleThemeBMain = {
    background: theme === "LIGHT" ? "#f1f2f2" : "#005068",
  };
  return (
    <>
      <motion.div
        variants={createEditPostVariants}
        animate={animation}
        transition={{
          x: { type: "spring", stiffness: 80 },
        }}
        initial="hidden"
        className="editPostContainer"
        style={styleThemeBMain}
      >
        <button
          onClick={(e) => handleCloseEditPost(e)}
          className="primary-button"
          style={{ position: "absolute", right: "5rem", top: "3rem" }}
        >
          CLOSE
        </button>
        {editPost && !loading ? (
          <div className="editPostContainer_content">
            <img
              className="editPostContainer_content-image"
              src={toEditPost !== null ? editPost.image : ""}
              alt=""
            />
            <form
              className="primary-form "
              action=""
              onSubmit={(e) => handleUpdate(e)}
            >
              <input
                className="primary-form_primary-input"
                type="text"
                value={editPost.title}
                name="title"
                onChange={(e) => handleInputChange(e)}
              />
              <textarea
                className="primary-textarea"
                name="blogContent"
                value={editPost.blogContent}
                onChange={(e) => handleInputChange(e)}
                style={{ width: "80%", height: "15rem" }}
              />
              <button className="primary-button">SUBMIT</button>
            </form>
          </div>
        ) : (
          "loading"
        )}
      </motion.div>
    </>
  );
};

export default EditPost;

import { useState } from "react";
import { useSelector } from "react-redux";

export interface EditPostProps {
  handleCloseEditPost: (e: any) => void;
}

const EditPost: React.FC<EditPostProps> = ({ handleCloseEditPost }) => {
  const toEditPost = useSelector((state: any) => state.user.post);
  const loading = useSelector((state: any) => state.user.loading);

  const [editPost, setEditPost] = useState();

  console.log(toEditPost);
  return (
    <>
      <div className="editPostContainer">
        EDIT POST{" "}
        <button onClick={(e) => handleCloseEditPost(e)}> CLOSE</button>
        {toEditPost && !loading ? (
          <div className="editPostContainer_content">
            <p>{toEditPost.title}</p>
          </div>
        ) : (
          "loading"
        )}
      </div>
    </>
  );
};

export default EditPost;

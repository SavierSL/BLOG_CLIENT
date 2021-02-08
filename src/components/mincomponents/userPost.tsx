import CopyToClipboard from "react-copy-to-clipboard";
interface UserPostsProps {
  styleThemeT: { color: string };
  styleThemeB: { background: string };
  user: any;
  posts: any;
  handleDeleteButton: (e: any, postID: string) => void;
}

const UserPosts: React.FC<UserPostsProps> = ({
  styleThemeT,
  styleThemeB,
  user,
  posts,
  handleDeleteButton,
}) => {
  return (
    <>
      {posts.length === 0 ? (
        <h3 className="tertiary-heading">You do not have any blog post</h3>
      ) : (
        posts.map((post: any) => {
          // return <img style={{ height: "20rem" }} src={post.image} alt="" />;

          return (
            <div style={styleThemeB} className="homeBlogContainer_blogs">
              <img
                className="homeBlogContainer_blogs-image"
                src={user.avatar}
                alt=""
              />
              <div className="homeBlogContainer_blogs-details">
                <p className="primary-p" style={styleThemeT}>
                  {post.title} <span> - {user.name}</span>
                </p>
                <p className="primary-p" style={styleThemeT}>
                  {post.date}
                </p>
                <p style={{ color: "#00aeef" }} className="primary-p">
                  {user.email}
                </p>
              </div>
              <div className="homeBlogContainer_blogs-link">
                <p className="light-p">{`http://localhost:3000/user-post/${post._id}`}</p>
                <CopyToClipboard
                  text={`http://localhost:3000/user-post/${post._id}`}
                >
                  <button className="userposts-buttons">
                    Copy to clipboard
                  </button>
                </CopyToClipboard>
              </div>
              <div className="homeBlogContainer_blogs-delete">
                <button
                  className="userposts-buttons-r"
                  onClick={(e) => handleDeleteButton(e, post._id)}
                >
                  DELETE
                </button>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default UserPosts;

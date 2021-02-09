import { THEMES } from "./theme/types";

import { NavLink } from "react-router-dom";
import { exitUserPost, logOutUser } from "../redux/actions/users";
import { useDispatch } from "react-redux";


export interface NavProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  click: boolean;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
  clickLogIn: boolean;
}

const Nav: React.FC<NavProps> = ({
  theme,
  setTheme,
  click,
  setClick,
  clickLogIn,
}) => {
  const token = localStorage.getItem("token");

  const handleTheme = (e: any) => {
    e.preventDefault();
    theme === "LIGHT" ? setTheme(THEMES.DARK) : setTheme(THEMES.LIGHT);
  };
  const dispatch = useDispatch();
  // const [logOutBtn, setLogOutBtn] = useState(false);

  // useEffect(() => {
  //   if (isAuth) {
  //     setLogOutBtn(false);
  //   }
  // }, [isAuth, clickLogIn]);

  console.log(clickLogIn);
  const buttonStyle: any = {
    borderRadius: "1rem",
    margin: "2.5rem",
    border: "none",
    padding: "1rem",
    cursor: "pointer",
    right: "0",
    top: "0",
  };
  const buttonTheme =
    theme === "DARK" ? (
      <button
        style={buttonStyle}
        onClick={(e) => handleTheme(e)}
        className="primary-button"
      >
        light mode
      </button>
    ) : (
      <button
        style={buttonStyle}
        onClick={(e) => handleTheme(e)}
        className="primary-button"
      >
        dark mode
      </button>
    );
  const handleLogout = (e: any) => {
    e.preventDefault();
    setClick(!click);
    dispatch(logOutUser());
  };

  return (
    <>
      <div
        style={{ background: theme === "LIGHT" ? "#fff" : "#000" }}
        className="navContainer"
      >
        <div className="navContainer_navTitle">
          <h1 className="secondary-heading">
            B<span style={{ color: "#00aeef" }}>it</span>
          </h1>
          {buttonTheme}
        </div>
        <div className="navContainer_navButtons">
          <NavLink to="/home">
            {" "}
            <button
              className="primary-button"
              onClick={() => dispatch(exitUserPost())}
            >
              HOME
            </button>
          </NavLink>
          <NavLink to="/blog-posts">
            {" "}
            <button className="primary-button">BLOG POSTS </button>
          </NavLink>
          {token ? (
            <button onClick={(e) => handleLogout(e)} className="primary-button">
              LOG OUT
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;

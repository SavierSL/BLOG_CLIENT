import { THEMES } from "./theme/types";

import { NavLink } from "react-router-dom";

export interface NavProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const Nav: React.FC<NavProps> = ({ theme, setTheme }) => {
  const handleTheme = (e: any) => {
    e.preventDefault();
    theme === "LIGHT" ? setTheme(THEMES.DARK) : setTheme(THEMES.LIGHT);
  };

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
      <button style={buttonStyle} onClick={(e) => handleTheme(e)}>
        light mode
      </button>
    ) : (
      <button style={buttonStyle} onClick={(e) => handleTheme(e)}>
        dark mode
      </button>
    );

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
            <button className="primary-button">HOME</button>
          </NavLink>
          <NavLink to="/blog-posts">
            {" "}
            <button className="primary-button">BLOG POSTS </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Nav;

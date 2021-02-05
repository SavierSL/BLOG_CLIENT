import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logInAction } from "../redux/actions/logIn";
import { NavLink, Redirect } from "react-router-dom";
import Alert from "./alert/Alert";
import { removeAlertAction } from "../redux/actions/alert";
import { getAllPost } from "../redux/actions/blogPost";

export interface FrontPageProps {
  theme: any;
}
interface logInState {
  email: string;
  password: string;
}

const FrontPage: React.FC<FrontPageProps> = ({ theme }) => {
  const error = useSelector((state: any) => state.post.msg);
  const isAuth = useSelector((state: any) => state.post.isAuth);
  console.log(theme);
  const [logInInput, setLogInInput] = useState<logInState>({
    email: "",
    password: "",
  });
  useEffect(() => {
    dispatch(getAllPost());
  }, []);
  const dispatch = useDispatch();
  const handleInput = (e: any) => {
    e.preventDefault();
    dispatch(removeAlertAction());
    setLogInInput({ ...logInInput, [e.target.name]: e.target.value });
  };
  const { email, password } = logInInput;
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("submitted");
    dispatch(logInAction(email, password));
  };
  console.log(logInInput);
  if (isAuth === true) {
    return <Redirect to="/home" />;
  }

  return (
    <>
      <div className="frontPageContainer">
        <div className="frontPage">
          <div className="frontPage_content">
            <h1 className="primary-heading">
              BLOG <span style={{ color: "#00aeef" }}>IT</span>
            </h1>
            <div className="frontPage_form">
              <Alert error={error} />
              <form
                className="primary-form"
                action=""
                onSubmit={(e) => handleSubmit(e)}
              >
                <input
                  className="primary-form_primary-input"
                  placeholder="email"
                  onChange={(e) => handleInput(e)}
                  name="email"
                  type="text"
                  value={logInInput.email}
                />
                <input
                  className="primary-form_primary-input"
                  placeholder="password"
                  onChange={(e) => handleInput(e)}
                  name="password"
                  type="password"
                  value={logInInput.password}
                />
                <button className="primary-form_primary-button">LOG IN</button>
              </form>
              <h2>
                <span>You still don't have an account?</span>{" "}
                <NavLink to="/register" style={{ color: "#00aeef" }}>
                  Register
                </NavLink>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FrontPage;

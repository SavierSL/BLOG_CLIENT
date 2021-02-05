import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../redux/actions/register";
import Alert from "./alert/Alert";

export interface RegisterPageProps {}

interface regState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const RegisterPage: React.FC<RegisterPageProps> = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: any) => state.post.isAuth);
  const [regInput, setRegInput] = useState<regState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const error = useSelector((state: any) => state.post.msg);

  const { name, email, password, confirmPassword } = regInput;
  const handleRegInput = (e: any) => {
    e.preventDefault();
    setRegInput({ ...regInput, [e.target.name]: e.target.value });
    console.log(regInput);
  };
  const handleRegister = (e: any) => {
    e.preventDefault();
    if (confirmPassword === password) {
      dispatch(registerAction(name, email, password));
    } else {
      console.log("password do not match");
    }
  };
  if (isAuth === true) {
    return <Redirect to="/home" />;
  }
  console.log(isAuth);
  return (
    <>
      <div className="registerPageContainer">
        <div className="registerPage">
          <div className="registerPage_content">
            <h1 className="secondary-heading">
              BLOG <span style={{ color: "#00aeef" }}>IT</span>
            </h1>
            <h1 className="secondary-heading">
              <span style={{ color: "#00aeef" }}>SIGN UP</span>
            </h1>
            <Alert error={error} />
            <div className="registerPage_form">
              <form
                className="primary-form"
                action=""
                onSubmit={(e) => handleRegister(e)}
              >
                <input
                  className="primary-form_primary-input"
                  placeholder="name"
                  name="name"
                  type="text"
                  value={regInput.name}
                  onChange={(e) => handleRegInput(e)}
                />
                <input
                  className="primary-form_primary-input"
                  placeholder="email"
                  name="email"
                  type="text"
                  value={regInput.email}
                  onChange={(e) => handleRegInput(e)}
                />
                <input
                  className="primary-form_primary-input"
                  placeholder="password"
                  name="password"
                  type="password"
                  value={regInput.password}
                  onChange={(e) => handleRegInput(e)}
                />
                <input
                  className="primary-form_primary-input"
                  placeholder="confirm password"
                  name="confirmPassword"
                  type="password"
                  value={regInput.confirmPassword}
                  onChange={(e) => handleRegInput(e)}
                />
                <button className="primary-form_primary-button">
                  REGISTER
                </button>
                <h2>
                  <span>Already have an account?</span>{" "}
                  <NavLink to="/" style={{ color: "#00aeef" }}>
                    Sign In
                  </NavLink>
                </h2>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;

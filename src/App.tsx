import React, { useState } from "react";
import FrontPage from "../src/components/FrontPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import UserPost from "./components/UserPost";
import Nav from "./components/Nav";
import { ThemeProvider } from "styled-components";
import { getTheme } from "./components/theme/getTheme";
import { THEMES } from "./components/theme/types";
import { Theme } from "./components/theme/styles";

import BlogPosts from "./components/BlogPosts";
import Footer from "./components/Footer";

export interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [theme, setTheme] = useState<string>(THEMES.LIGHT);

  return (
    <>
      <ThemeProvider theme={getTheme(theme)}>
        <Provider store={store}>
          <Theme>
            <Router>
              <Nav theme={theme} setTheme={setTheme} />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <FrontPage theme={theme} />}
                />
                <Route exact path="/register" component={RegisterPage} />
                <Route
                  exact
                  path="/home"
                  render={() => <HomePage theme={theme} />}
                />
                <Route
                  exact
                  path="/user-post/:params_id"
                  render={(props) => <UserPost props={props} />}
                />
                <Route exact path="/blog-posts" component={BlogPosts} />
              </Switch>
              <Footer />
            </Router>
          </Theme>
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default App;

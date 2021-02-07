import { all, put, takeEvery, takeLatest } from "redux-saga/effects";
import { StringDecoder } from "string_decoder";
import * as type from "../actions/types";
const port = "https://mernstacksavierslblogapp.herokuapp.com";
// const port = "http://localhost:5000";
//login
const logInData = async (email: string, password: string) => {
  const body = { email, password };
  console.log(body);
  const token = await fetch(`${port}/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      const data = await res.json();

      return data;
    })
    .catch((error) => {
      throw error;
    });
  return token;
};
function* logInSaga(action: any) {
  const { email, password } = action.payload;
  try {
    const res = yield logInData(email, password);
    if (res.hasOwnProperty("msg")) {
      return yield put({ type: type.LOG_IN_FAILED, payload: res });
    }
    console.log(res);
    return yield put({ type: type.LOG_IN_SUCCESS, payload: res.token });
  } catch (error) {
    yield put({ type: type.LOG_IN_FAILED, payload: error });
  }
}

function* watchLogInSaga() {
  yield takeEvery(type.LOG_IN_SAGA, logInSaga);
}

//register
const registerData = async (name: string, email: string, password: string) => {
  const body = { name, email, password };
  const content = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(body),
  };
  const token = await fetch(`${port}/users/register`, content)
    .then(async (res) => {
      const data = await res.json();
      return data;
    })
    .catch((error) => {
      throw error;
    });
  console.log(token);
  return token;
};
function* registerDataSaga(action: any) {
  const { name, email, password } = action.payload;
  try {
    const res = yield registerData(name, email, password);
    if (res.hasOwnProperty("msg")) {
      return yield put({ type: type.REGISTER_FAILED, payload: res });
    }
    return yield put({ type: type.REGISTER_SUCCESS, payload: res });
  } catch (error) {
    yield put({ type: type.REGISTER_FAILED, payload: error });
  }
}
function* watchrRgisterDataSaga() {
  yield takeEvery(type.REGISTER_SAGA, registerDataSaga);
}

//BLOG POST
const blogPostData = async (
  title: string,
  blogContent: string,
  img: File,
  token: string,
  imgType: string
) => {
  console.log(img);
  const body = { title, blogContent, img, imgType };
  const content = {
    method: "POST",
    headers: { "x-auth-token": token, "Content-type": "application/json" },
    body: JSON.stringify(body),
  };
  const data = await fetch(`${port}/post/blog-post`, content)
    .then(async (res) => {
      const data = await res.json();
      return data;
    })
    .catch((error) => {
      throw error;
    });
  console.log(data);
  return data;
};
function* blogPostSaga(action: any) {
  const { title, blogContent, img, token, imgType } = action.payload;
  try {
    const res = yield blogPostData(title, blogContent, img, token, imgType);
    if (res.hasOwnProperty("msg")) {
      return yield put({ type: type.BLOGPOST_FAILED, payload: res });
    }

    const ecodeDataToImage = () => {
      if (res) {
        const converToBase64 = (img: any) => {
          const buffit = Buffer.from(img);
          res.image = `${buffit}`;
        };
        converToBase64(res.img);
      }
    };
    ecodeDataToImage();
    yield put({ type: type.NEW_USER_POST_SUCCESS, payload: res });
    return yield put({ type: type.BLOGPOST_SUCCESS, payload: res });
  } catch (error) {
    return yield put({ type: type.BLOGPOST_FAILED, payload: error });
  }
}
function* watchBlogPostSaga() {
  yield takeEvery(type.BLOGPOST_SAGA, blogPostSaga);
}

// //NEW USER POST
// function* newUserPost(action: any) {
//   const { blogPost } = action.payload;

//   try {
//     yield put({ type: type.NEW_USER_POST_SUCCESS, payload: blogPost });
//   } catch (error) {
//     yield put({ type: type.NEW_USER_POST_FAILED, payload: error });
//   }
// }
// function* watchNewUserPostSaga() {
//   yield takeEvery(type.NEW_USER_POST_SAGA, newUserPost);
// }

//GET ALL POST
const getAllPost = async () => {
  const content = { method: "GET" };
  const data = await fetch(`${port}/post/blog-posts`, content)
    .then(async (res) => {
      const data = await res.json();
      return data;
    })
    .catch((e) => {
      throw e;
    });
  return data;
};
function* getAllPostSaga() {
  try {
    const res = yield getAllPost();
    let newPosts: any[] = [];
    const encodeDataToImage = () => {
      newPosts = res.map((post: any) => {
        if (res.length !== 0) {
          const convertToBase64 = (image: any) => {
            const buffit = Buffer.from(image);
            post.image = `${buffit}`;
          };
          convertToBase64(post.img.data);
          return post;
        }
      });
    };
    encodeDataToImage();

    return yield put({ type: type.GET_ALL_POST_SUCCESS, payload: newPosts });
  } catch (error) {
    throw error;
  }
}
function* watchGetAllPostSaga() {
  yield takeLatest(type.GET_ALL_POST_SAGA, getAllPostSaga);
}

const getUserData = async (token: string) => {
  const content = {
    method: "GET",
    headers: {
      "x-auth-token": token,
    },
  };
  const data = await fetch(`${port}/users/get-user`, content)
    .then(async (res) => {
      const data = await res.json();
      return data;
    })
    .catch((e) => {
      throw e;
    });
  return data;
};

function* getUserSaga(action: any) {
  const { token } = action.payload;
  console.log(token);
  try {
    const res = yield getUserData(token);
    if (res.hasOwnProperty("msg")) {
      return yield put({ type: type.GET_USER_FAILED, payload: res });
    }
    return yield put({ type: type.GET_USER_SUCCESS, payload: res });
  } catch (error) {
    return yield put({ type: type.GET_USER_FAILED, payload: error });
  }
}
function* watchGetUserSaga() {
  yield takeEvery(type.GET_USER_SAGA, getUserSaga);
}

function* removeAlertSaga() {
  yield put({ type: type.ALERT_SAGA_REMOVE });
}
function* watchRemoveAlertSaga() {
  yield takeEvery(type.ALERT_SAGA, removeAlertSaga);
}

//GET USER POSTS
const getUserPosts = async (token: string) => {
  const content = {
    method: "GET",
    headers: {
      "x-auth-token": token,
    },
  };
  const data = await fetch(`${port}/users/user-posts`, content)
    .then(async (res) => {
      const data = await res.json();
      return data;
    })
    .catch((e) => {
      throw e;
    });
  return data;
};
function* getUserPostsSaga(action: any) {
  const { token } = action.payload;
  try {
    const res = yield getUserPosts(token);
    if (res.hasOwnProperty("msg")) {
      return yield put({ type: type.GET_USER_POSTS_FAILED, payload: res });
    }
    // let newPosts: any[] = [];
    // const encodeDataToImage = () => {
    //   newPosts = res.map((post: any) => {
    //     if (res.length !== 0) {
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
    yield put({ type: type.GET_USER_POSTS_SUCCESS, payload: res });
  } catch (error) {
    return yield put({ type: type.GET_USER_POSTS_FAILED, payload: error });
  }
}
function* watchGetUserPostsSaga() {
  yield takeEvery(type.GET_USER_POSTS_SAGA, getUserPostsSaga);
}

//GET USER POST
const getPost = async (id: string) => {
  const content = { method: "GET" };
  const data = await fetch(`${port}/post/blog-posts/${id}`, content)
    .then(async (res) => {
      const data = res.json();
      return data;
    })
    .catch((e) => {
      throw e;
    });
  return data;
};
function* getPostSaga(action: any) {
  const { id } = action.payload;
  try {
    const res = yield getPost(id);
    yield put({ type: type.POST_LINK_SUCCESS, payload: res });
  } catch (error) {
    yield put({ type: type.POST_LINK_SUCCESS, payload: error });
  }
}
function* watchGetPostSaga() {
  yield takeEvery(type.POST_LINK_SAGA, getPostSaga);
}

//exit post
function* exitUserPostSaga() {
  yield put({ type: type.EXIT_USER_POST_SUCESS });
}
function* watchExitUserPostSaga() {
  yield takeEvery(type.EXIT_USER_POST_SAGA, exitUserPostSaga);
}

//LOG OUT
function* logOutSaga() {
  try {
    yield put({ type: type.LOG_OUT_SUCCESS });
  } catch (error) {
    yield put({ type: type.LOG_OUT_FAILED });
  }
}
function* watchLogOutSaga() {
  yield takeEvery(type.LOG_OUT_SAGA, logOutSaga);
}
//DELETE POST
const deleteUserPost = async (token: string, postID: string) => {
  const content = {
    method: "DELETE",
    headers: {
      "x-auth-token": token,
    },
  };
  const data = await fetch(`${port}/post/blog-post/${postID}`, content)
    .then(async (res) => {
      const data = await res.json();
      return data;
    })
    .catch((e) => {
      throw e;
    });
  return data;
};
function* deleteUserPostSaga(action: any) {
  const { postID, token } = action.payload;
  try {
    const res = yield deleteUserPost(token, postID);
    console.log(res);

    yield put({ type: type.DELETE_POST_SUCCESS, payload: res });
  } catch (error) {
    yield put({ type: type.DELETE_POST_FAILED, payload: error });
  }
}
function* watchDeleteUserPostSaga() {
  yield takeEvery(type.DELETE_POST_SAGA, deleteUserPostSaga);
}

//REFRESH
function* refreshSaga() {
  try {
    yield put({ type: type.REFRESH_SUCCESS });
  } catch (error) {
    yield put({ type: type.REFRESH_FAILED });
  }
}
function* watchRefreshSaga() {
  yield takeEvery(type.REFRESH_SAGA, refreshSaga);
}

export default function* rootSaga() {
  yield all([
    watchLogInSaga(),
    watchrRgisterDataSaga(),
    watchRemoveAlertSaga(),
    watchBlogPostSaga(),
    watchGetAllPostSaga(),
    watchGetUserSaga(),
    watchGetUserPostsSaga(),
    watchGetPostSaga(),
    watchExitUserPostSaga(),
    watchLogOutSaga(),
    watchDeleteUserPostSaga(),
    watchRefreshSaga(),
  ]);
}

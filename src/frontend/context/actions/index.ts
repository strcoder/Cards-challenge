import axios from 'axios';

export const setError = (error: object) => ({
  type: 'SET_ERROR',
  error,
});

export const loginRequest = (payload: object) => ({
  type: 'LOGIN_REQUEST',
  payload,
});

export const logoutRequest = (payload: object) => ({
  type: 'LOGOUT_REQUEST',
  payload,
});

export const profileRequest = (profile: object) => ({
  type: 'SET_PROFILE',
  profile,
});

export const setUser = (user: object) => ({
  type: 'SET_USER',
  user,
});

export const setTheme = (theme: string) => ({
  type: 'SET_THEME',
  theme,
});

export const setLanguage = (language: string) => ({
  type: 'SET_LANGUAGE',
  language,
});

export const updateTheme = ({ theme, dispatch }: { theme: 'light' | 'dark', dispatch: Function }) => {
  try {
    document.cookie = `theme=${theme}`;
    dispatch(setTheme(theme));
  } catch (error) {
    dispatch(setError(error));
  }
};

export const updateLanguage = ({ language, dispatch }: { language: 'es' | 'en', dispatch: Function }) => {
  try {
    document.cookie = `language=${language}`;
    dispatch(setLanguage(language));
  } catch (error) {
    dispatch(setError(error));
  }
};

export const logoutUser = ({ dispatch }) => {
  try {
    document.cookie = 'token=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.location.href = '/home';
    dispatch(logoutRequest({}));
  } catch (error) {
    dispatch(setError(error));
  }
};

export const loginUser = async ({ email, password, dispatch }) => {
  try {
    const { token } = await axios({
      url: '/api/auth/sign-in',
      method: 'post',
      data: {
        email,
        password,
      },
    }).then(({ data }) => {
      document.cookie = `token=${data.data.token};path=/`;
      return data.data;
    });
    document.location.href = '/home';
    return token;
  } catch (error) {
    dispatch(setError(error));
    return null;
  }
};

export const recoverPassword = async ({ email, password, code, dispatch }) => {
  try {
    if (code && password) {
      await axios({
        method: 'PUT',
        data: { code, email, password },
        url: '/api/auth/recover-password',
      }).then(({ data }) => {
        // console.log(data);
      });
    } else {
      await axios({
        method: 'POST',
        data: { email },
        url: '/api/auth/recover-password',
      }).then(({ data }) => {
        // console.log(data);
      });
    }
    return true;
  } catch (error) {
    dispatch(setError(error));
    return false;
  }
};

export const updateUser = async ({ dispatch, token, profile }) => {
  try {
    await axios({
      method: 'PUT',
      data: { ...profile },
      url: '/api/users/@me/update',
      headers: { Authorization: `Bearer ${token}` },
    }).then(({ data }) => {
      dispatch(setUser(data.data));
    });
    return true;
  } catch (error) {
    dispatch(setError(error));
    return false;
  }
};

export const getProfile = async (dispatch, token, id) => {
  try {
    const profile = await axios({
      url: `/api/users/${id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(({ data }) => {
      dispatch(profileRequest(data.data));
      return data.data;
    });
    return profile;
  } catch (error) {
    dispatch(setError(error));
    return null;
  }
};

export const createReport = async (dispatch, token: string, content: string) => {
  try {
    await axios({
      url: '/api/reports',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        content,
      },
    });
  } catch (error) {
    dispatch(setError(error));
    throw error;
  }
};

export const getMessages = async (dispatch, token) => {
  try {
    await axios({
      url: '/api/chats/all',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(({ data }) => {
      dispatch({
        type: 'GET_CHATS',
        chats: data.data,
      });
    });
  } catch (error) {
    dispatch(setError(error));
  }
};

export const getPossibleChats = async (dispatch, token) => {
  try {
    await axios({
      url: '/api/chats/possible',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(({ data }) => {
      dispatch({
        type: 'GET_POSSIBLE_CHATS',
        possibleChats: data.data,
      });
    });
  } catch (error) {
    dispatch(setError(error));
  }
};

export const getChat = async (dispatch, token, id: string) => {
  try {
    await axios({
      url: `/api/chats/${id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(({ data }) => {
      dispatch({
        type: 'GET_CHAT',
        chat: data.data,
      });
    });
  } catch (error) {
    dispatch(setError(error));
  }
};

export const createChat = async (dispatch, token, data) => {
  try {
    return (await axios({
      url: '/api/chats/',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    }));
  } catch (error) {
    dispatch(setError(error));
    throw error;
  }
};

export const updateChat = async (dispatch, token, id, data) => {
  try {
    return (await axios({
      url: `/api/chats/${id}`,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    }));
  } catch (error) {
    dispatch(setError(error));
    throw error;
  }
};

export const createChatMessage = async (dispatch, token, { id, content, socketId }: { id: string; content: string, socketId: string }) => {
  try {
    return (await axios({
      url: `/api/chats/${id}/messages`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { socketId, content },
    }));
  } catch (error) {
    dispatch(setError(error));
    throw error;
  }
};

export const editChatMessage = async (dispatch, token, { message, chat, content, socketId }: { message: string; chat: string; content: string, socketId: string }) => {
  try {
    return (await axios({
      url: `/api/chats/${chat}/messages/${message}`,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { socketId, content },
    }));
  } catch (error) {
    dispatch(setError(error));
    throw error;
  }
};

export const deleteChatMessage = async (dispatch, token, { message, chat, socketId }: { message: string; chat: string; socketId: string }) => {
  try {
    await axios({
      url: `/api/chats/${chat}/messages/${message}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { socketId },
    });
  } catch (error) {
    dispatch(setError(error));
    throw error;
  }
};

export const markAsReaded = async (dispatch, token, id: string, socketId) => {
  try {
    return (await axios({
      url: `/api/chats/${id}/readed`,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        socketId,
      },
    }));
  } catch (error) {
    dispatch(setError(error));
    throw error;
  }
};

export const joinInstitute = async (dispatch, token, code: string) => {
  try {
    await axios({
      url: `/api/invites/i/${code}`,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      document.location.href = '/home';
    });
  } catch (error) {
    dispatch({
      type: 'SET_ERROR',
      error,
    });
    throw error;
  }
};

export const getAllNotices = async ({ dispatch, token }) => {
  try {
    await axios({
      url: '/api/notices/all',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(({ data }) => {
      dispatch({
        type: 'GET_NOTICES',
        notices: data.data,
      });
    });
  } catch (error) {
    dispatch({
      type: 'SET_ERROR',
      error,
    });
  }
};

export const getDataForId = ({ dispatch, token, array, url }) => {
  try {
    const promise = Promise.all(array.map(async (item) => {
      const { data } = await axios({
        url: `${url}/${item}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    }));
    return promise;
  } catch (error) {
    dispatch({
      type: 'SET_ERROR',
      error,
    });
    throw error;
  }
};

export const getCourses = async (dispatch, token) => {
  try {
    await axios({
      url: '/api/courses/all',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(({ data }) => {
      dispatch({
        type: 'GET_COURSES',
        courses: data.data,
      });
    });
  } catch (error) {
    dispatch({
      type: 'SET_ERROR',
      error,
    });
  }
};

export const getCoursesId = async (dispatch, token, id) => {
  try {
    await axios({
      url: `/api/courses/${id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(({ data }) => dispatch({
      type: 'GET_COURSE',
      course: data.data,
    }));
  } catch (error) {
    dispatch({
      type: 'SET_ERROR',
      error,
    });
  }
};

export const getGroup = async (dispacth, token) => {
  try {
    await axios({
      url: '/api/groups/all',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(({ data }) => dispacth({
      type: 'GET_GROUP',
      group: data.data,
    }));
  } catch (error) {
    dispacth({
      type: 'SET_ERROR',
      error,
    });
  }
};

export const getActivities = async (dispatch, token) => {
  try {
    await axios({
      url: '/api/activities/all',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => {
      dispatch({
        type: 'GET_ACTIVITIES',
        activities: data.data.data,
      });
    });
  } catch (error) {
    dispatch({
      type: 'SET_ERROR',
      error,
    });
  }
};

export const getActivity = async (dispatch, token, id) => {
  try {
    await axios({
      url: `/api/activities/${id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(({ data }) => {
      dispatch({
        type: 'GET_ACTIVITY',
        activity: data.data,
      });
    });
  } catch (error) {
    dispatch({
      type: 'SET_ERROR',
      error,
    });
  }
};

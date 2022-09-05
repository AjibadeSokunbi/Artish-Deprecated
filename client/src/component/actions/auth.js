import { AUTH, UPDATEAUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const login = (form, navigate) => async (dispatch) => {
  try {
    const { data } = await api.login(form);

    dispatch({ type: AUTH, data });
    const SignError = data.message
    console.log(SignError)
    navigate('/home');
  } catch (error) {
    console.log(error.response.data);
  }
};



export const register = (form, navigate) => async (dispatch) => {
  try {
    const { data } = await api.register(form);

    dispatch({ type: AUTH, data });

    navigate('/home');
  } catch (error) {
    console.log(error);
  }
};

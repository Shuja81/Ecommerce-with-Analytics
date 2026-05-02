/*
 *
 * ForgotPassword actions
 *
 */

import { push } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  FORGOT_PASSWORD_CHANGE,
  FORGOT_PASSWORD_RESET,
  SET_FORGOT_PASSWORD_FORM_ERRORS,
  SET_FORGOT_PASSWORD_STEP,
  SET_FORGOT_PASSWORD_LOADING
} from './constants';
import handleError from '../../utils/error';
import { allFieldsValidation } from '../../utils/validation';
import { API_URL } from '../../constants';

export const forgotPasswordChange = (name, value) => {
  const formData = {};
  formData[name] = value;

  return {
    type: FORGOT_PASSWORD_CHANGE,
    payload: formData
  };
};

export const setForgotPasswordStep = step => ({
  type: SET_FORGOT_PASSWORD_STEP,
  payload: step
});

export const setForgotPasswordLoading = payload => ({
  type: SET_FORGOT_PASSWORD_LOADING,
  payload
});

export const sendForgotPasswordCode = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        email: 'required|email'
      };

      const user = getState().forgotPassword.forgotFormData;

      const { isValid, errors } = allFieldsValidation(user, rules, {
        'required.email': 'Email is required.'
      });

      if (!isValid) {
        return dispatch({
          type: SET_FORGOT_PASSWORD_FORM_ERRORS,
          payload: errors
        });
      }

      dispatch(
        setForgotPasswordLoading({ sendingCode: true, verifyingCode: false, resettingPassword: false })
      );

      const response = await axios.post(`${API_URL}/auth/forgot/send-code`, {
        email: user.email
      });
      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(setForgotPasswordStep(2));
      }
      dispatch(success(successfulOptions));
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, dispatch, title);
    } finally {
      dispatch(
        setForgotPasswordLoading({ sendingCode: false, verifyingCode: false, resettingPassword: false })
      );
    }
  };
};

export const verifyForgotPasswordCode = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        email: 'required|email',
        code: 'required|min:6|max:6'
      };

      const user = getState().forgotPassword.forgotFormData;
      const { isValid, errors } = allFieldsValidation(user, rules, {
        'required.email': 'Email is required.',
        'required.code': 'Verification code is required.',
        'min.code': 'Verification code must be 6 digits.',
        'max.code': 'Verification code must be 6 digits.'
      });

      if (!isValid) {
        return dispatch({
          type: SET_FORGOT_PASSWORD_FORM_ERRORS,
          payload: errors
        });
      }

      dispatch(
        setForgotPasswordLoading({ sendingCode: false, verifyingCode: true, resettingPassword: false })
      );

      const response = await axios.post(`${API_URL}/auth/forgot/verify-code`, {
        email: user.email,
        code: user.code
      });

      if (response.data.success) {
        dispatch(setForgotPasswordStep(3));
        dispatch(
          success({
            title: response.data.message,
            position: 'tr',
            autoDismiss: 1
          })
        );
      }
    } catch (error) {
      handleError(error, dispatch, 'Verification failed. Please try again.');
    } finally {
      dispatch(
        setForgotPasswordLoading({ sendingCode: false, verifyingCode: false, resettingPassword: false })
      );
    }
  };
};

export const resetForgotPassword = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        email: 'required|email',
        code: 'required|min:6|max:6',
        password: 'required|min:8',
        confirmPassword: 'required|min:8|same:password'
      };

      const user = getState().forgotPassword.forgotFormData;
      const { isValid, errors } = allFieldsValidation(user, rules, {
        'required.email': 'Email is required.',
        'required.code': 'Verification code is required.',
        'required.password': 'Password is required.',
        'min.password': 'Password must be at least 8 characters.',
        'required.confirmPassword': 'Confirm password is required.',
        'same.confirmPassword': 'Passwords must match.'
      });

      if (!isValid) {
        return dispatch({
          type: SET_FORGOT_PASSWORD_FORM_ERRORS,
          payload: errors
        });
      }

      dispatch(
        setForgotPasswordLoading({ sendingCode: false, verifyingCode: false, resettingPassword: true })
      );

      const response = await axios.post(`${API_URL}/auth/forgot/reset-password`, {
        email: user.email,
        code: user.code,
        password: user.password,
        confirmPassword: user.confirmPassword
      });

      if (response.data.success) {
        dispatch(
          success({
            title: response.data.message,
            position: 'tr',
            autoDismiss: 1
          })
        );
        dispatch({ type: FORGOT_PASSWORD_RESET });
        dispatch(push('/login'));
      }
    } catch (error) {
      handleError(error, dispatch, 'Password reset failed. Please try again.');
    } finally {
      dispatch(
        setForgotPasswordLoading({ sendingCode: false, verifyingCode: false, resettingPassword: false })
      );
    }
  };
};

// Backward compatibility exports
export const forgotPassword = sendForgotPasswordCode;
export const forgotPassowrd = sendForgotPasswordCode;

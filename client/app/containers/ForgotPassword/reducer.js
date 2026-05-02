/*
 *
 * ForgotPassword reducer
 *
 */

import {
  FORGOT_PASSWORD_CHANGE,
  FORGOT_PASSWORD_RESET,
  SET_FORGOT_PASSWORD_FORM_ERRORS,
  SET_FORGOT_PASSWORD_STEP,
  SET_FORGOT_PASSWORD_LOADING
} from './constants';

const initialState = {
  forgotFormData: {
    email: '',
    code: '',
    password: '',
    confirmPassword: ''
  },
  formErrors: {},
  step: 1,
  loading: {
    sendingCode: false,
    verifyingCode: false,
    resettingPassword: false
  }
};

const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_CHANGE:
      return {
        ...state,
        forgotFormData: {
          ...state.forgotFormData,
          ...action.payload
        },
        formErrors: {
          ...state.formErrors,
          ...Object.keys(action.payload).reduce((acc, field) => {
            acc[field] = undefined;
            return acc;
          }, {})
        }
      };
    case SET_FORGOT_PASSWORD_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case SET_FORGOT_PASSWORD_STEP:
      return {
        ...state,
        step: action.payload
      };
    case SET_FORGOT_PASSWORD_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          ...action.payload
        }
      };
    case FORGOT_PASSWORD_RESET:
      return {
        ...state,
        forgotFormData: {
          email: '',
          code: '',
          password: '',
          confirmPassword: ''
        },
        formErrors: {},
        step: 1
      };
    default:
      return state;
  }
};

export default forgotPasswordReducer;

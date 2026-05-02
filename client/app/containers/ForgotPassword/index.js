/*
 *
 * ForgotPassword
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import { Redirect, Link } from 'react-router-dom';

import actions from '../../actions';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class ForgotPassword extends React.PureComponent {
  render() {
    const {
      authenticated,
      forgotFormData,
      formErrors,
      forgotPasswordChange,
      step,
      loading,
      sendForgotPasswordCode,
      verifyForgotPasswordCode,
      resetForgotPassword,
      setForgotPasswordStep
    } = this.props;

    if (authenticated) return <Redirect to='/dashboard' />;

    const handleSendCode = event => {
      event.preventDefault();
      sendForgotPasswordCode();
    };

    const handleVerifyCode = event => {
      event.preventDefault();
      verifyForgotPasswordCode();
    };

    const handleResetPassword = event => {
      event.preventDefault();
      resetForgotPassword();
    };

    return (
      <div className='auth-container forgot-password-form'>
        {(loading.sendingCode || loading.verifyingCode || loading.resettingPassword) && (
          <LoadingIndicator />
        )}

        <div className='auth-card'>
          <div className='auth-header'>
            <h2 className='auth-title'>Reset your password</h2>
            <p className='auth-subtitle'>
              Step {step} of 3 - {step === 1 ? 'Enter your email' : step === 2 ? 'Verify code' : 'Set a new password'}
            </p>
          </div>

          {step === 1 && (
            <form onSubmit={handleSendCode} className='auth-form' noValidate>
              <div className='form-group'>
                <Input
                  type={'email'}
                  error={formErrors['email']}
                  label={'Email Address'}
                  name={'email'}
                  placeholder={'user@example.com'}
                  autoComplete='email'
                  value={forgotFormData.email}
                  onInputChange={forgotPasswordChange}
                />
              </div>

              <div className='form-group'>
                <Button
                  type='submit'
                  variant='primary'
                  text={loading.sendingCode ? 'Sending code...' : 'Send Code'}
                  disabled={loading.sendingCode}
                  className='auth-submit-btn'
                />
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyCode} className='auth-form' noValidate>
              <div className='form-group'>
                <Input
                  type={'email'}
                  error={formErrors['email']}
                  label={'Email Address'}
                  name={'email'}
                  placeholder={'user@example.com'}
                  autoComplete='email'
                  value={forgotFormData.email}
                  onInputChange={forgotPasswordChange}
                />
              </div>
              <div className='form-group'>
                <Input
                  type={'text'}
                  error={formErrors['code']}
                  label={'Verification Code'}
                  name={'code'}
                  placeholder={'Enter 6-digit code'}
                  autoComplete='one-time-code'
                  value={forgotFormData.code}
                  onInputChange={forgotPasswordChange}
                />
              </div>
              <div className='form-group forgot-password-actions'>
                <Button
                  type='button'
                  variant='secondary'
                  text='Back'
                  onClick={() => setForgotPasswordStep(1)}
                />
                <Button
                  type='submit'
                  variant='primary'
                  text={loading.verifyingCode ? 'Verifying...' : 'Verify Code'}
                  disabled={loading.verifyingCode}
                />
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword} className='auth-form' noValidate>
              <div className='form-group'>
                <Input
                  type={'password'}
                  error={formErrors['password']}
                  label={'New Password'}
                  name={'password'}
                  placeholder={'At least 8 characters'}
                  autoComplete='new-password'
                  value={forgotFormData.password}
                  onInputChange={forgotPasswordChange}
                />
              </div>
              <div className='form-group'>
                <Input
                  type={'password'}
                  error={formErrors['confirmPassword']}
                  label={'Confirm Password'}
                  name={'confirmPassword'}
                  placeholder={'Re-enter your new password'}
                  autoComplete='new-password'
                  value={forgotFormData.confirmPassword}
                  onInputChange={forgotPasswordChange}
                />
              </div>
              <div className='form-group forgot-password-actions'>
                <Button
                  type='button'
                  variant='secondary'
                  text='Back'
                  onClick={() => setForgotPasswordStep(2)}
                />
                <Button
                  type='submit'
                  variant='primary'
                  text={loading.resettingPassword ? 'Resetting...' : 'Reset Password'}
                  disabled={loading.resettingPassword}
                />
              </div>
            </form>
          )}

          <div className='auth-footer'>
            <p className='auth-footer-text'>
              Remember your password?{' '}
              <Link className='auth-link' to={'/login'}>
                Back to login
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authentication.authenticated,
    forgotFormData: state.forgotPassword.forgotFormData,
    formErrors: state.forgotPassword.formErrors,
    step: state.forgotPassword.step,
    loading: state.forgotPassword.loading
  };
};

export default connect(mapStateToProps, actions)(ForgotPassword);

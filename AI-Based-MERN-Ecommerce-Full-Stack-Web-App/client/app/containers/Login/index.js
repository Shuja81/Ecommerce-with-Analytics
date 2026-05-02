/*
 *
 * Login
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import actions from '../../actions';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    };
  }

  render() {
    const {
      authenticated,
      loginFormData,
      loginChange,
      login,
      formErrors,
      isLoading,
      isSubmitting
    } = this.props;

    const { showPassword } = this.state;

    if (authenticated) return <Redirect to='/dashboard' />;

    const handleSubmit = event => {
      event.preventDefault();
      login();
    };

    const togglePasswordVisibility = () => {
      this.setState({ showPassword: !showPassword });
    };

    return (
      <div className='auth-container login-form'>
        {isLoading && <LoadingIndicator />}
        
        <div className='auth-card'>
          <div className='auth-header'>
            <span className='auth-kicker'>Welcome back</span>
            <h2 className='auth-title'>Sign In</h2>
            <p className='auth-subtitle'>
              Don't have an account?{' '}
              <Link to='/register' className='auth-link'>
                Create one
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className='auth-form'>
            {/* Email Input */}
            <div className='form-group'>
              <Input
                type={'email'}
                error={formErrors['email']}
                label={'Email Address'}
                name={'email'}
                placeholder={'user@example.com'}
                autoComplete='email'
                value={loginFormData.email}
                onInputChange={(name, value) => {
                  loginChange(name, value);
                }}
              />
            </div>

            {/* Password Input with Toggle */}
            <div className='form-group'>
              <div className='password-wrapper'>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  error={formErrors['password']}
                  label={'Password'}
                  name={'password'}
                  placeholder={'Enter your password'}
                  autoComplete='current-password'
                  value={loginFormData.password}
                  onInputChange={(name, value) => {
                    loginChange(name, value);
                  }}
                />
                <button
                  type='button'
                  className='password-toggle-btn'
                  onClick={togglePasswordVisibility}
                  aria-label='Toggle password visibility'
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className='form-footer-link'>
              <Link
                className='forgot-password-link'
                to={'/forgot-password'}
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <div className='form-group'>
              <Button
                type='submit'
                variant='primary'
                text={isSubmitting ? 'Signing in...' : 'Sign In'}
                icon={isSubmitting ? <span className='btn-spinner' aria-hidden='true' /> : null}
                iconDirection='left'
                disabled={isSubmitting}
                className='auth-submit-btn'
              />
            </div>

            {/* Footer */}
            <div className='auth-footer'>
              <p className='auth-footer-text'>
                By signing in, you agree to our{' '}
                <Link to='/terms' className='auth-link'>Terms of Service</Link> and{' '}
                <Link to='/privacy' className='auth-link'>Privacy Policy</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authentication.authenticated,
    loginFormData: state.login.loginFormData,
    formErrors: state.login.formErrors,
    isLoading: state.login.isLoading,
    isSubmitting: state.login.isSubmitting
  };
};

export default connect(mapStateToProps, actions)(Login);

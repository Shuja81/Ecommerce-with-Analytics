/*
 *
 * Signup
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import actions from '../../actions';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import Checkbox from '../../components/Common/Checkbox';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { validateEmail, validateInternationalPhone } from '../../utils/authValidators';

class Signup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      passwordStrength: 0,
      validations: {
        email: false,
        firstName: false,
        lastName: false,
        password: false,
        phone: false
      }
    };
  }

  // Password strength indicator
  calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  handleInputChange = (name, value) => {
    const { signupChange } = this.props;
    signupChange(name, value);

    // Update validations
    const validations = { ...this.state.validations };
    
    if (name === 'email') {
      validations.email = validateEmail(value);
    } else if (name === 'firstName') {
      validations.firstName = value.trim().length > 0;
    } else if (name === 'lastName') {
      validations.lastName = value.trim().length > 0;
    } else if (name === 'password') {
      validations.password = value.length >= 8;
      this.setState({ passwordStrength: this.calculatePasswordStrength(value) });
    } else if (name === 'phone') {
      validations.phone = validateInternationalPhone(value);
    }

    this.setState({ validations });
  };

  render() {
    const {
      authenticated,
      signupFormData,
      formErrors,
      isLoading,
      isSubmitting,
      isSubscribed,
      signUp,
      subscribeChange
    } = this.props;

    const { showPassword, passwordStrength, validations } = this.state;

    if (authenticated) return <Redirect to='/dashboard' />;

    const handleSubmit = event => {
      event.preventDefault();
      signUp();
    };

    const togglePasswordVisibility = () => {
      this.setState({ showPassword: !showPassword });
    };

    const getPasswordStrengthLabel = () => {
      const labels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
      return labels[passwordStrength] || 'Weak';
    };

    const getPasswordStrengthClass = () => {
      const classes = ['strength-weak', 'strength-fair', 'strength-good', 'strength-strong', 'strength-very-strong'];
      return classes[passwordStrength] || 'strength-weak';
    };

    return (
      <div className='auth-container signup-form'>
        {isLoading && <LoadingIndicator />}
        
        <div className='auth-card'>
          <div className='auth-header'>
            <span className='auth-kicker'>Create your account</span>
            <h2 className='auth-title'>Create Account</h2>
            <p className='auth-subtitle'>
              Already have an account?{' '}
              <Link to='/login' className='auth-link'>
                Sign in
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
                value={signupFormData.email}
                onInputChange={this.handleInputChange}
              />
              {signupFormData.email && validations.email && (
                <span className='validation-success'>
                  Email looks good
                </span>
              )}
            </div>

            {/* First Name Input */}
            <div className='form-group'>
              <Input
                type={'text'}
                error={formErrors['firstName']}
                label={'First Name'}
                name={'firstName'}
                placeholder={'John'}
                autoComplete='given-name'
                value={signupFormData.firstName}
                onInputChange={this.handleInputChange}
              />
            </div>

            {/* Last Name Input */}
            <div className='form-group'>
              <Input
                type={'text'}
                error={formErrors['lastName']}
                label={'Last Name'}
                name={'lastName'}
                placeholder={'Doe'}
                autoComplete='family-name'
                value={signupFormData.lastName}
                onInputChange={this.handleInputChange}
              />
            </div>

            {/* Phone Number Input */}
            <div className='form-group'>
              <Input
                type={'text'}
                error={formErrors['phone']}
                label={'Phone Number'}
                name={'phone'}
                placeholder={'+14155552671 or 03001234567'}
                autoComplete='tel'
                value={signupFormData.phone || ''}
                onInputChange={this.handleInputChange}
              />
              {signupFormData.phone && validations.phone && (
                <span className='validation-success'>
                  Phone number looks good
                </span>
              )}
              {signupFormData.phone && !validations.phone && signupFormData.phone.length > 0 && (
                <span className='validation-error'>
                  Use a valid local or international format
                </span>
              )}
            </div>

            {/* Password Input with Toggle & Strength Indicator */}
            <div className='form-group'>
              <div className='password-wrapper'>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  label={'Password'}
                  error={formErrors['password']}
                  name={'password'}
                  placeholder={'At least 8 characters'}
                  autoComplete='new-password'
                  value={signupFormData.password}
                  onInputChange={this.handleInputChange}
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
              
              {/* Password Strength Indicator */}
              {signupFormData.password && (
                <div className='password-strength-wrapper'>
                  <div className='strength-bar-container'>
                    <div className={`strength-bar ${getPasswordStrengthClass()}`}></div>
                  </div>
                  <span className={`strength-label ${getPasswordStrengthClass()}`}>
                    Strength: {getPasswordStrengthLabel()}
                  </span>
                </div>
              )}

              {/* Password Requirements */}
              <div className='password-requirements'>
                <p className='requirements-title'>Password must contain:</p>
                <ul className='requirements-list'>
                  <li className={signupFormData.password && signupFormData.password.length >= 8 ? 'met' : ''}>
                    At least 8 characters
                  </li>
                  <li className={/[A-Z]/.test(signupFormData.password) ? 'met' : ''}>
                    One uppercase letter
                  </li>
                  <li className={/[0-9]/.test(signupFormData.password) ? 'met' : ''}>
                    One number
                  </li>
                  <li className={/[^A-Za-z0-9]/.test(signupFormData.password) ? 'met' : ''}>
                    One special character
                  </li>
                </ul>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className='form-group'>
              <Checkbox
                id={'subscribe'}
                label={'Subscribe to our newsletter for exclusive deals'}
                checked={isSubscribed}
                onChange={subscribeChange}
              />
            </div>

            {/* Terms & Conditions */}
            <div className='form-group'>
              <Checkbox
                id={'terms'}
                label={
                  <>
                    I agree to the{' '}
                    <Link to='/terms' className='auth-link'>
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to='/privacy' className='auth-link'>
                      Privacy Policy
                    </Link>
                  </>
                }
                required={true}
              />
            </div>

            {/* Submit Button */}
            <div className='form-group'>
              <Button
                type='submit'
                variant='primary'
                text={isSubmitting ? 'Creating Account...' : 'Create Account'}
                icon={isSubmitting ? <span className='btn-spinner' aria-hidden='true' /> : null}
                iconDirection='left'
                disabled={isSubmitting}
                className='auth-submit-btn'
              />
            </div>

            {/* Footer */}
            <div className='auth-footer'>
              <p className='auth-footer-text'>
                Already have an account?{' '}
                <Link to='/login' className='auth-link'>
                  Sign in here
                </Link>
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
    signupFormData: state.signup.signupFormData,
    formErrors: state.signup.formErrors,
    isLoading: state.signup.isLoading,
    isSubmitting: state.signup.isSubmitting,
    isSubscribed: state.signup.isSubscribed
  };
};

export default connect(mapStateToProps, actions)(Signup);

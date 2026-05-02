# Postmark Password Reset Implementation

## Overview
This document describes the complete implementation of secure password reset functionality using Postmark email service for the MERN e-commerce application.

## Features Implemented

### 1. **Backend Endpoints**

#### POST `/api/v1/auth/forgot`
Initiates password reset process.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "If an account exists with this email, you will receive a password reset link."
}
```

**Features:**
- Email validation and format checking
- Security best practice: Always returns same message regardless of whether email exists
- Generates secure 48-byte random token (96 hex characters)
- Sets token expiration to 30 minutes
- Sends formatted HTML email via Postmark
- Clears token if email sending fails

---

#### POST `/api/v1/auth/reset/:token`
Completes password reset with new password.

**Request:**
```json
{
  "password": "NewSecurePass123!",
  "confirmPassword": "NewSecurePass123!"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Password changed successfully. Please login with your new password."
}
```

**Features:**
- Token validation and expiration checking
- Password strength requirements (minimum 8 characters)
- Password confirmation matching
- Bcrypt password hashing
- Token invalidation after use
- Sends confirmation email via Postmark
- Graceful failure handling (doesn't fail if confirmation email fails)

---

#### GET `/api/v1/auth/verify-reset-token/:token`
Verifies if reset token is valid (for frontend validation).

**Response (Valid Token):**
```json
{
  "success": true,
  "message": "Token is valid."
}
```

**Response (Invalid/Expired Token):**
```json
{
  "success": false,
  "error": "Password reset token is invalid or has expired."
}
```

---

### 2. **Postmark Email Service**

Located in: `server/services/postmark.js`

#### Methods

**`sendEmail(options)`**
Generic email sending method.

```javascript
await postmark.sendEmail({
  email: 'user@example.com',
  subject: 'Email Subject',
  htmlBody: '<html>...</html>',
  textBody: 'Plain text version'
});
```

**`sendPasswordResetEmail(options)`**
Sends formatted password reset email with reset link.

```javascript
await postmark.sendPasswordResetEmail({
  email: 'user@example.com',
  resetLink: 'https://app.com/reset-password/token123',
  userName: 'John'
});
```

**`sendPasswordResetSuccessEmail(options)`**
Sends confirmation email after successful password reset.

```javascript
await postmark.sendPasswordResetSuccessEmail({
  email: 'user@example.com',
  userName: 'John'
});
```

#### Error Handling
- **401 Unauthorized**: Invalid API token
- **422 Unprocessable Entity**: Invalid email format or configuration
- **429 Too Many Requests**: Rate limited by Postmark
- **Other Errors**: Logged with full error details

---

### 3. **Frontend Components**

#### ForgotPassword Component
**Path:** `client/app/containers/ForgotPassword/index.js`

**Features:**
- Email input form
- Real-time validation
- Error/success messaging
- Loading state
- Redirect to login on success

**Usage:**
```jsx
import ForgotPassword from "../ForgotPassword";

// In routes:
<Route path="/forgot-password" component={ForgotPassword} />
```

#### ResetPassword Component
**Path:** `client/app/containers/ResetPassword/index.js`

**Features:**
- Password and confirm password inputs
- Password visibility toggles
- Password strength meter (0-100%)
- Real-time password requirements validation
- Password match indicator
- Token verification on mount
- Loading and success states
- Graceful handling of expired tokens

**Password Requirements Display:**
- ✓ At least 8 characters
- ✓ Mix of uppercase and lowercase
- ✓ At least one number
- ✓ At least one special character

**Password Strength Levels:**
- 0-25%: Very Weak (red)
- 25-50%: Weak (orange)
- 50-75%: Fair (yellow)
- 75-100%: Good (light green)
- 100%: Very Strong (green)

---

## Configuration

### Environment Variables

Add the following to your `.env` file:

```env
# Postmark Email Configuration
POSTMARK_API_TOKEN=your_postmark_api_token_here
POSTMARK_FROM_EMAIL=noreply@yourdomain.com
POSTMARK_FROM_NAME=Your App Name

# Client Configuration
CLIENT_URL=http://localhost:3000
```

### Testing with Postmark

For testing, use the special test token:
```env
POSTMARK_API_TOKEN=POSTMARK_API_TEST
```

With test token, Postmark accepts any email address without sending actual emails.

---

## Security Features

### Password Reset Token
- **Generation**: Cryptographically secure 48-byte random bytes
- **Format**: 96-character hexadecimal string
- **Storage**: Plain text in MongoDB (suitable for one-time use tokens)
- **Expiration**: 30 minutes from generation
- **Validation**: Verified on every reset attempt
- **Invalidation**: Token cleared immediately after successful reset

### Password Hashing
- **Algorithm**: Bcrypt with salt rounds of 10
- **Implementation**: `bcryptjs` library
- **Salt**: Generated with 10 rounds (secure but reasonably fast)

### Email Security
- **HTTPS Required**: All reset links must use HTTPS
- **Domain Validation**: Postmark verifies sender domain
- **Link Expiration**: 30-minute window prevents replay attacks
- **One-Time Use**: Token invalidated after successful reset

### Best Practices Implemented
- ✅ Email enumeration prevention (same message for existing/non-existing emails)
- ✅ Rate limiting ready (add middleware as needed)
- ✅ Token expiration enforcement
- ✅ Password strength requirements
- ✅ Secure token generation
- ✅ Confirmation emails
- ✅ Proper error handling and logging

---

## Email Templates

### Password Reset Email

**Subject:** Reset Your Password - [App Name]

**HTML Body:**
```html
<p>Hi {userName},</p>

<p>We received a request to reset your password. Click the link below to create a new password:</p>

<p>
  <a href="{resetLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
    Reset Your Password
  </a>
</p>

<p>This link will expire in 30 minutes.</p>

<p>If you didn't request this, please ignore this email or contact support.</p>
```

### Password Reset Success Email

**Subject:** Your Password Has Been Reset - [App Name]

**HTML Body:**
```html
<p>Hi {userName},</p>

<p>Your password has been successfully reset.</p>

<p>If you didn't make this change or have any concerns about your account security, please contact our support team immediately.</p>
```

---

## API Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    PASSWORD RESET FLOW                          │
└─────────────────────────────────────────────────────────────────┘

1. USER REQUESTS PASSWORD RESET
   ┌──────────────────────────────────────────────────────────┐
   │ Frontend: ForgotPassword Component                       │
   │  - User enters email                                     │
   │  - POST /api/v1/auth/forgot { email }                   │
   └──────────────────────────────────────────────────────────┘
           ↓
2. BACKEND PROCESSES RESET REQUEST
   ┌──────────────────────────────────────────────────────────┐
   │ Backend: /api/v1/auth/forgot endpoint                   │
   │  - Find user by email                                   │
   │  - Generate secure reset token (48 bytes)              │
   │  - Set expiration (30 minutes)                          │
   │  - Save token to database                               │
   │  - Call postmark.sendPasswordResetEmail()              │
   └──────────────────────────────────────────────────────────┘
           ↓
3. EMAIL SERVICE SENDS RESET EMAIL
   ┌──────────────────────────────────────────────────────────┐
   │ Postmark Service: sendPasswordResetEmail()              │
   │  - Format HTML and text email bodies                    │
   │  - Create reset link with token                         │
   │  - POST to Postmark API                                 │
   │  - Handle API responses and errors                      │
   └──────────────────────────────────────────────────────────┘
           ↓
4. USER RECEIVES EMAIL
   ┌──────────────────────────────────────────────────────────┐
   │ Email: Password Reset Link                              │
   │  - User clicks link: /reset-password/{token}            │
   │  - Frontend: ResetPassword Component loads              │
   └──────────────────────────────────────────────────────────┘
           ↓
5. FRONTEND VERIFIES TOKEN
   ┌──────────────────────────────────────────────────────────┐
   │ Frontend: ResetPassword Component                       │
   │  - On mount: GET /api/v1/auth/verify-reset-token/{token}
   │  - Validates token is still valid                       │
   │  - Shows form if valid, error if expired                │
   └──────────────────────────────────────────────────────────┘
           ↓
6. USER ENTERS NEW PASSWORD
   ┌──────────────────────────────────────────────────────────┐
   │ Frontend: ResetPassword Component                       │
   │  - User enters password with strength indicator         │
   │  - Confirms password match                              │
   │  - POST /api/v1/auth/reset/{token}                     │
   │    { password, confirmPassword }                        │
   └──────────────────────────────────────────────────────────┘
           ↓
7. BACKEND VALIDATES AND RESETS PASSWORD
   ┌──────────────────────────────────────────────────────────┐
   │ Backend: /api/v1/auth/reset/:token endpoint            │
   │  - Verify token not expired                             │
   │  - Validate password requirements                       │
   │  - Check passwords match                                │
   │  - Hash new password with bcrypt                        │
   │  - Save to database                                     │
   │  - Clear reset token                                    │
   │  - Call postmark.sendPasswordResetSuccessEmail()       │
   └──────────────────────────────────────────────────────────┘
           ↓
8. CONFIRMATION EMAIL SENT
   ┌──────────────────────────────────────────────────────────┐
   │ Postmark Service: sendPasswordResetSuccessEmail()      │
   │  - Send success confirmation email                      │
   │  - Log confirmation in system                           │
   └──────────────────────────────────────────────────────────┘
           ↓
9. USER REDIRECTED TO LOGIN
   ┌──────────────────────────────────────────────────────────┐
   │ Frontend: ResetPassword Component                       │
   │  - Show success message                                 │
   │  - Redirect to /login                                   │
   │  - User can now login with new password                 │
   └──────────────────────────────────────────────────────────┘
```

---

## Error Handling

### Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `No reset token provided` | User navigated directly without token | Share reset link from email |
| `Invalid or expired reset token` | Token expired after 30 minutes | Request new password reset |
| `Passwords do not match` | Confirmation password doesn't match | Ensure both fields match |
| `Password must be at least 8 characters` | Password too short | Use longer password |
| `Failed to send reset email` | Postmark API error | Check API token and domain settings |
| `POSTMARK_API_TOKEN not configured` | Missing environment variable | Set POSTMARK_API_TOKEN in .env |

---

## Testing

### Manual Testing Checklist

#### Forgot Password Flow
- [ ] Enter valid email → Receives success message
- [ ] Enter invalid email format → Shows validation error
- [ ] Enter non-existent email → Still shows success (security feature)
- [ ] Check email inbox for reset link
- [ ] Verify reset link uses correct domain

#### Reset Password Flow
- [ ] Click reset link in email → ResetPassword component loads
- [ ] Token verification → Shows loading, then form
- [ ] Expired token → Shows error message
- [ ] Enter weak password → Strength meter shows low
- [ ] Enter strong password → All requirements met
- [ ] Password mismatch → Shows error
- [ ] Matching passwords → Form submits
- [ ] Success → Redirected to login
- [ ] Receive confirmation email
- [ ] Login with new password → Works

#### Token Security
- [ ] Same token cannot be used twice
- [ ] Token expires after 30 minutes
- [ ] Token cannot be guessed (randomness check)
- [ ] Token not visible in logs or system messages

---

## Database Schema

### User Model (MongoDB)
```javascript
{
  _id: ObjectId,
  email: String,
  password: String, // bcrypt hash
  firstName: String,
  lastName: String,
  // ... other fields ...
  
  // Password reset fields
  resetPasswordToken: String, // undefined when not in use
  resetPasswordExpires: Date,  // undefined when not in use
}
```

**Indexes Recommended:**
```javascript
db.users.createIndex({ email: 1 });
db.users.createIndex({ resetPasswordToken: 1 });
db.users.createIndex({ resetPasswordExpires: 1 });
```

---

## Performance Considerations

### Database Queries
- ✅ Email lookup indexed for fast retrieval
- ✅ Token lookups indexed for fast verification
- ✅ Minimal fields updated (only password and reset fields)

### Email Service
- ✅ Async Postmark API calls (non-blocking)
- ✅ Graceful degradation if confirmation email fails
- ✅ Proper error logging without blocking user

### Frontend
- ✅ Token verification on mount (single API call)
- ✅ Real-time password strength calculation (client-side)
- ✅ Efficient state management with React hooks

---

## Future Enhancements

### Recommended Improvements
1. **Rate Limiting**: Add middleware to limit forgot password requests per IP/email
2. **Token Hashing**: Hash tokens in database for additional security
3. **Audit Logging**: Log all password reset attempts
4. **2FA Integration**: Add two-factor authentication option
5. **Email Templates**: Use template rendering service for dynamic content
6. **Internationalization**: Support multiple languages in emails
7. **SMS Option**: Add SMS-based password reset as alternative
8. **Password History**: Prevent reuse of recent passwords

---

## Postmark Setup Guide

### 1. Create Postmark Account
1. Go to https://postmarkapp.com
2. Sign up for a free account
3. Verify your domain or sender email address

### 2. Get API Token
1. In Postmark dashboard, go to "Servers"
2. Select your server
3. Go to "API Tokens" tab
4. Copy the "Server API token"

### 3. Configure Domain
1. Go to "Sender Signatures"
2. Add your domain (recommended) or single email
3. Follow verification steps (DNS records for domain)
4. Wait for verification completion

### 4. Set Environment Variables
```env
POSTMARK_API_TOKEN=your_token_here
POSTMARK_FROM_EMAIL=noreply@yourdomain.com
POSTMARK_FROM_NAME=Your App Name
```

### 5. Test Configuration
```bash
# Test with sample data
curl -X POST https://api.postmarkapp.com/email \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'X-Postmark-Server-Token: your_token' \
  -d '{
    "From": "noreply@yourdomain.com",
    "To": "test@example.com",
    "Subject": "Test",
    "HtmlBody": "<p>Test email</p>"
  }'
```

---

## Monitoring and Analytics

### Postmark Dashboard Metrics
- Email delivery rates
- Bounce rates
- Open rates
- Click rates
- Spam complaints

### Recommended Monitoring
- Monitor failed reset attempts
- Track reset email delivery rates
- Alert on repeated failed attempts (potential abuse)
- Log password reset events for audit trail

---

## Support and Troubleshooting

### Contact Support
- **Postmark Support**: https://postmarkapp.com/support
- **Application Support**: [Your support contact]

### Common Issues
1. **Emails not delivering**: Check domain verification in Postmark
2. **Invalid API token error**: Verify token is correct and not in wrong variable
3. **Test mode emails**: Remember test token won't send real emails
4. **Rate limiting**: Postmark limits are very high; only concern if sending millions

---

## Changelog

### v1.0.0 - Initial Release
- ✅ Forgot password endpoint with secure token generation
- ✅ Reset password endpoint with expiration validation
- ✅ Postmark email service integration
- ✅ Token verification endpoint
- ✅ Frontend components (ForgotPassword, ResetPassword)
- ✅ Password strength validation and UI feedback
- ✅ Comprehensive error handling and logging

---

## Additional Resources

- [Postmark Documentation](https://postmarkapp.com/developers)
- [Bcryptjs Documentation](https://github.com/dcodeIO/bcrypt.js)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [OWASP Password Reset Best Practices](https://owasp.org/www-community/controls/Forgot_Password)

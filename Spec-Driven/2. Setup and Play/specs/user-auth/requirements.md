# User Authentication System - Requirements

## Overview

Build an email-based user authentication system enabling users to register, verify their email, log in, and reset forgotten passwords. System manages user sessions and enforces security constraints on credentials.

## Feature Goals

- Enable secure user registration with email verification
- Provide email/password login with session management
- Support password reset workflow via email
- Prevent brute force attacks and credential abuse
- Maintain audit trail of authentication events

## Scope

### In Scope
- User registration (email + password)
- Email verification workflow
- Email/password login
- Session creation and validation
- Password reset workflow
- Logout functionality
- Rate limiting on authentication endpoints
- Secure password storage (hashing)

### Out of Scope
- OAuth/SSO integration
- Multi-factor authentication (MFA)
- Social login providers
- Session revocation across devices
- Account lockout after N failed attempts

## Acceptance Criteria

### UC1: User Registration

**Given** a user with a valid email address
**When** they submit a registration form with email + password
**Then** account is created, verification email sent, user sees confirmation message
**And** new user cannot log in until email is verified

**Given** a user registers with an already-registered email
**When** registration form is submitted
**Then** system returns error: "Email already in use"

**Given** a user enters a weak password (< 8 chars)
**When** registration form is submitted
**Then** system returns error: "Password must be at least 8 characters"

### UC2: Email Verification

**Given** a user receives verification email
**When** they click the verification link (valid for 24 hours)
**Then** email is marked verified, account activated

**Given** a verification link has expired (> 24 hours old)
**When** user clicks the link
**Then** system returns error: "Link expired" and offers to resend

**Given** a user clicks "Resend Verification Email"
**When** they submit the request
**Then** new verification email sent, old links invalidated

### UC3: Login

**Given** a verified user with correct email + password
**When** they submit login form
**Then** session is created, user is authenticated, redirected to dashboard

**Given** a user enters wrong password
**When** login form is submitted
**Then** system returns error: "Invalid email or password"

**Given** a user enters email that doesn't exist
**When** login form is submitted
**Then** system returns error: "Invalid email or password" (no email enumeration)

**Given** a user makes 5 failed login attempts in 15 minutes
**When** they attempt login again
**Then** account is temporarily locked, user sees: "Too many attempts. Try again in 15 minutes."

**Given** an unverified user attempts to log in
**When** login form is submitted
**Then** system returns error: "Please verify your email first"

### UC4: Session Management

**Given** a logged-in user
**When** they make an authenticated request
**Then** session is validated, request is processed

**Given** a user's session has expired (> 7 days)
**When** they make an authenticated request
**Then** session is invalidated, user is redirected to login

**Given** a user clicks logout
**When** logout is confirmed
**Then** session is destroyed, user is redirected to login page

### UC5: Password Reset

**Given** a user who forgot their password
**When** they click "Forgot Password" and enter email
**Then** password reset email is sent, user sees confirmation

**Given** a user receives password reset email
**When** they click the reset link (valid for 1 hour)
**Then** they are taken to reset form

**Given** a user submits new password on reset form
**When** password meets requirements (≥ 8 chars)
**Then** password is updated, old session(s) invalidated, user can log in with new password

**Given** a reset link has expired (> 1 hour)
**When** user clicks the link
**Then** system returns error: "Link expired" and offers to request new reset

## Non-Functional Requirements

### Security
- Passwords hashed with bcrypt (cost factor ≥ 12)
- All auth endpoints use HTTPS
- CSRF tokens on all forms
- Email links use cryptographically secure tokens
- No sensitive data in URLs or error messages (email enumeration prevention)
- Auth endpoints rate-limited per IP

### Performance
- Login response < 500ms (p95)
- Email sent within 5 seconds of registration
- Session validation < 50ms

### Reliability
- Email delivery retry strategy (3 attempts, exponential backoff)
- Session data resilient to server restart
- Graceful degradation if email service unavailable

## Glossary

| Term | Definition |
|------|-----------|
| Verified User | User whose email address has been confirmed via link |
| Session | Authenticated connection state valid for ≤ 7 days |
| Rate Limit | Max 5 login attempts per 15 minutes per IP |
| Token | Secure random string for email links (64+ characters) |
| Hashing | One-way encryption of passwords using bcrypt |

## Assumptions

- Users have access to email accounts they register with
- System has reliable email service (SMTP or cloud provider)
- HTTP cookies or JWT used for session management (design decision pending)
- Single email per account (no multi-account registration)
- Users are primarily web-based (not mobile app specific)

## Open Questions

- Should we support "remember me" (persistent login)?
- How long should email verification links be valid? (Currently assumed 24h)
- Should we log authentication events (failed logins, resets)?
- IP-based rate limiting or email-based rate limiting for password reset?

## Success Criteria

- All acceptance criteria can be verified with automated tests
- Zero SQL injection vulnerabilities
- All passwords hashed before storage
- Email verification required before login access
- Authentication endpoints protected by rate limiting

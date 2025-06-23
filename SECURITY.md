
# Security Policy

## Supported Versions

This application follows security best practices for protecting user data and privacy.

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |

## Security Practices

### Data Protection
- All user data is encrypted in transit using HTTPS
- Sensitive information is never stored in local storage or session storage
- User authentication is handled securely through Supabase
- Row Level Security (RLS) policies ensure users can only access their own data

### Input Validation
- All user inputs are validated and sanitized
- XSS protection through proper input escaping
- SQL injection protection through parameterized queries
- File upload restrictions and validation

### Authentication & Authorization
- Secure password requirements (minimum 8 characters)
- Session management through secure cookies
- Automatic session expiration
- Protection against CSRF attacks

### Privacy
- Minimal data collection principle
- User consent for data processing
- Data export functionality for user control
- Clear privacy policy and data handling practices

### Development Security
- Environment variables for sensitive configuration
- No hardcoded secrets or API keys
- Regular dependency updates
- Code review process for security-sensitive changes

## Reporting Vulnerabilities

If you discover a security vulnerability in this application, please report it to us through one of the following methods:

1. **Email**: security@nrvii.com (if available)
2. **GitHub**: Create a private security advisory
3. **Contact Form**: Use our crisis support contact for urgent security issues

### Please include:
- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Suggested fix (if available)

### What to expect:
- Acknowledgment within 48 hours
- Regular updates on investigation progress
- Credit for responsible disclosure (if desired)
- Fix deployment within reasonable timeframe based on severity

## Security Guidelines for Users

### Account Security
- Use a strong, unique password
- Enable two-factor authentication when available
- Log out from shared devices
- Report suspicious activity immediately

### Data Privacy
- Review privacy settings regularly
- Understand what data is collected and why
- Use data export feature to maintain copies of your data
- Contact support for data deletion requests

### Safe Usage
- Only access the application through official channels
- Keep your browser and device updated
- Be cautious of phishing attempts
- Never share your login credentials

## Security Features

### Built-in Protections
- Rate limiting on authentication attempts
- Secure session management
- Input sanitization and validation
- Protection against common web vulnerabilities

### User Controls
- Data export functionality
- Privacy setting controls
- Account deletion options
- Notification preferences

### Monitoring
- Security event logging
- Unusual activity detection
- Regular security audits
- Compliance with data protection regulations

## Contact

For security-related questions or concerns:
- Crisis Support: Available 24/7 through our platform
- Help Center: Comprehensive security documentation
- Community: Security discussions and best practices

---

*This security policy is regularly reviewed and updated to maintain the highest standards of user protection and data privacy.*

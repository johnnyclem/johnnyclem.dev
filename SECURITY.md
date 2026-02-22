# Security Configuration

## Production Deployment

Before deploying to production, you MUST configure the following environment variables:

### Required Environment Variables

1. **SESSION_SECRET**: A strong, random secret for session encryption
   ```bash
   # Generate a strong secret:
   openssl rand -base64 32

   # Set in your environment:
   export SESSION_SECRET="your-generated-secret-here"
   ```

2. **ADMIN_PASSWORD**: A strong admin password
   ```bash
   # Can be plaintext (legacy) or bcrypt hashed (recommended)
   # To hash a password:
   npx -y bcrypt-cli hash "your-secure-password"

   export ADMIN_PASSWORD="$2a$12$hashed-password-here"
   ```

3. **DATABASE_URL**: PostgreSQL connection string

## Security Features

### Authentication
- **Password Hashing**: bcrypt with 12 salt rounds for secure password storage
- **Session-based authentication** using express-session
- **HttpOnly cookies** to prevent XSS attacks
- **SameSite='lax' cookies** for CSRF protection
- **Session regeneration on login** to prevent fixation attacks
- **Rate limiting**: Maximum 5 login attempts per 15 minutes per IP

### Input Validation & Sanitization
- **Schema validation** on all CRUD operations using Zod
- **HTML sanitization** for blog content using DOMPurify to prevent XSS
- **Magic number validation** for file uploads (verifies actual file content)
- **File type restrictions**: SVG blocked, only safe raster images allowed (JPEG, PNG, GIF, WebP)
- **File size limits**: 5MB maximum upload size
- **Upload rate limiting**: 20 uploads per hour per IP

### Data Protection
- **Graceful shutdown** handling - properly closes database connections
- **Error handling** - Internal errors logged server-side, generic messages sent to clients
- **Type-safe database operations** with Drizzle ORM (SQL injection protection)

### Authorization
- **requireAdmin middleware** protects all mutating routes (POST, PATCH, DELETE)
- **Session-based access control**
- **Automatic session expiration** after 24 hours

## File Upload Security

The file upload system includes multiple layers of protection:

1. **Extension validation** - Only allows .jpg, .jpeg, .png, .gif, .webp
2. **MIME type validation** - Verifies the reported MIME type
3. **Magic number validation** - Reads file header bytes to verify actual content
4. **SVG blocking** - SVG files are blocked due to XSS risks
5. **Size limits** - 5MB maximum file size
6. **Rate limiting** - 20 uploads per hour maximum

## Security Recommendations

1. **Use HTTPS in production** - Secure cookie flag is automatically set in production mode
2. **Hash admin passwords** - Use bcrypt instead of plaintext passwords
3. **Set strong secrets** - Never use default values for SESSION_SECRET or ADMIN_PASSWORD
4. **Regular updates** - Keep all dependencies up to date (`npm audit fix`)
5. **Monitor access** - Review server logs for unauthorized access attempts
6. **Backup data** - Regularly backup your PostgreSQL database
7. **Rotate secrets** - Periodically change SESSION_SECRET and ADMIN_PASSWORD

## Development vs Production

| Feature | Development | Production |
|---------|-------------|------------|
| SESSION_SECRET | Falls back to default (insecure) | **Required** - fails if not set |
| ADMIN_PASSWORD | **Required** | **Required** |
| Cookie secure flag | Disabled | Enabled (requires HTTPS) |
| Error messages | Detailed | Generic (internal details hidden) |

## Known Limitations

This is a single-admin portfolio management system designed for personal use. For multi-user or enterprise applications, consider:

- Using a proper auth provider (OAuth, SAML, etc.)
- Implementing role-based access control (RBAC)
- Adding comprehensive audit logging
- Adding two-factor authentication (2FA)
- Implementing Content Security Policy (CSP) headers
- Adding security headers (HSTS, X-Frame-Options, etc.)

## Security Audit Checklist

Before deploying to production, verify:

- [ ] SESSION_SECRET is set to a strong random value
- [ ] ADMIN_PASSWORD is set (preferably bcrypt hashed)
- [ ] DATABASE_URL is configured
- [ ] HTTPS is enabled
- [ ] `.env` file is NOT committed to git (check `.gitignore`)
- [ ] File upload directory has proper permissions
- [ ] Dependencies are up to date (`npm audit`)

## Reporting Security Issues

If you discover a security vulnerability, please:

1. Do not open a public issue
2. Email the maintainer directly
3. Allow reasonable time for a fix before public disclosure

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

2. **ADMIN_PASSWORD**: A strong admin password (not the default "admin123")
   ```bash
   export ADMIN_PASSWORD="your-strong-password-here"
   ```

## Security Features

### Authentication
- Session-based authentication using express-session
- HttpOnly cookies to prevent XSS attacks
- SameSite='lax' cookies for CSRF protection
- Session regeneration on login to prevent fixation attacks
- Server-side password validation

### Data Validation
- Schema validation on all CRUD operations using Zod
- Partial schema validation for PATCH requests
- Type-safe database operations with Drizzle ORM

### Authorization
- requireAdmin middleware protects all mutating routes (POST, PATCH, DELETE)
- Session-based access control
- Automatic session expiration after 24 hours

## Security Recommendations

1. **Use HTTPS in production** - The secure cookie flag is automatically set in production mode
2. **Set strong secrets** - Never use default values for SESSION_SECRET or ADMIN_PASSWORD
3. **Regular updates** - Keep all dependencies up to date
4. **Monitor access** - Review server logs for unauthorized access attempts
5. **Backup data** - Regularly backup your PostgreSQL database

## Development vs Production

- Development mode uses default secrets (insecure, for convenience only)
- Production mode requires explicit environment variables
- Production cookies are marked as secure (requires HTTPS)

## Limitations

This is a single-admin portfolio management system designed for personal use. For multi-user or enterprise applications, consider:
- Using Replit Auth or OAuth providers
- Implementing role-based access control
- Adding audit logging
- Implementing rate limiting
- Adding two-factor authentication

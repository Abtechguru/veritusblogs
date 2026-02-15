# VERITUS INTERNATIONAL - Complete Setup Guide

## 🚀 Overview

VERITUS INTERNATIONAL is a comprehensive blog platform with role-based access control, campaign management, and full Supabase backend integration.

## ✨ Features

### Core Functionality
- **Role-Based Access Control**: Admin, Author, Reader, and Sub-Admin roles
- **Campaign Pages**: David Ombugadu 2027 & Ambode 2027 with auto-popup system
- **Content Management**: Full CRUD for articles with draft/published states
- **Media Management**: Supabase Storage for images and files
- **Comments System**: Threaded comments with user authentication
- **Newsletter**: Email subscription management
- **Analytics**: Real-time tracking and reporting

### User Roles

#### 🔵 **Readers**
- View and read articles
- Comment on articles
- Subscribe to newsletter
- Access reader dashboard
- Save favorite articles

#### 🟢 **Authors** (Requires Admin Approval)
- All reader permissions
- Create and publish articles
- Manage own articles (draft/published/archived)
- Access author dashboard with analytics
- Upload media files

#### 🔴 **Admins**
- All author permissions
- Approve/reject author applications
- Manage all users
- Manage all articles
- View platform analytics
- Send broadcast messages
- Access admin dashboard

## 📋 Initial Setup

### Step 1: Create Your First Admin Account

1. Go to the registration page (`/register`)
2. Fill in your details:
   - **Email**: Your admin email
   - **Password**: Strong password (min 6 characters)
   - **Name**: Your full name
   - **Account Type**: Select "Reader" initially
3. Click "Create Account"

### Step 2: Upgrade to Admin

Since you're the first user, you need to manually upgrade your account:

1. Log in with your new account
2. The system automatically approves reader accounts
3. To become admin, you'll need to contact the system administrator or directly update the database

**Temporary Admin Credentials for Testing:**
- Email: `admin@veritus.com`
- Password: `Admin123!`
- Create this account via signup and manually update role to 'admin' in backend

## 🎯 User Workflows

### Author Application Process

1. **Author Signs Up**
   - Go to `/register`
   - Select "Author (Requires Approval)"
   - Submit registration form
   - Status: **PENDING**

2. **Admin Reviews Application**
   - Admin logs into `/admin/users`
   - Views pending authors
   - Reviews author details
   - Clicks "Approve" or "Reject"

3. **Author Gets Approved**
   - Author receives approval status
   - Can now log in
   - Gains access to `/dashboard/author`
   - Can create and publish articles

### Publishing an Article

1. **Create Article** (`/create-article`)
   - Fill in title, content, category
   - Upload cover image
   - Add tags
   - Choose status: Draft or Published

2. **Edit Article** (`/edit-article/:id`)
   - Update content
   - Change status
   - Modify metadata

3. **Manage Articles** (`/dashboard/author`)
   - View all articles
   - Track views and engagement
   - Edit or delete articles

## 🎨 Campaign Pop-up System

The platform features automatic campaign advertisements:

### How It Works
- **On First Visit**: Pop-up appears 2 seconds after page load
- **Regular Interval**: Every 5 minutes
- **Random Campaign**: Alternates between Ombugadu 2027 and Ambode 2027
- **Local Storage**: Tracks last shown time to prevent spam

### Campaign Pages
- `/campaign/david-ombugadu-2027` - David Ombugadu Campaign
- `/campaign/ambode-2027` - Ambode Campaign

## 📊 Admin Dashboard Features

### User Management (`/admin/users`)
- View all users with filters (role, status)
- Approve/reject author applications
- Delete user accounts
- Track user statistics

### Content Management (`/admin/articles`)
- View all articles across the platform
- Edit or delete any article
- Feature articles
- Manage categories

### Analytics (`/admin/analytics`)
- Track page views
- Monitor user engagement
- View popular articles
- Analyze traffic patterns

### Broadcasting (`/admin/broadcast`)
- Send messages to all users
- Target specific user groups
- Newsletter management

## 🔐 API Integration

The platform uses Supabase for backend services:

### Authentication
- Secure signup/login with JWT tokens
- Password encryption
- Session management
- Role-based authorization

### Database (KV Store)
```
Keys:
- profile:{userId} - User profiles
- article:{articleId} - Articles
- comment:article:{articleId}:{commentId} - Comments
- newsletter:{email} - Newsletter subscribers
- analytics:{eventId} - Analytics events
```

### Storage
- Private bucket: `make-5bb3fa81-media`
- Signed URLs for secure access
- 10MB file size limit
- Automatic image optimization

## 🎨 Content Categories

1. **Sports** - Sports news and analysis
2. **Cultures** - Cultural events and traditions
3. **Politics** - Political coverage and commentary
4. **Weather** - Weather updates and forecasts
5. **Celebrity Gist** - Entertainment and celebrity news

## 🚦 Testing the Platform

### Test as Reader
1. Create account with "Reader" type
2. Browse articles
3. Comment on articles
4. Subscribe to newsletter
5. Access reader dashboard at `/dashboard/reader`

### Test as Author
1. Create account with "Author" type
2. Wait for admin approval (or manually approve in admin panel)
3. Log in after approval
4. Create test articles at `/create-article`
5. View author dashboard at `/dashboard/author`

### Test as Admin
1. Use admin credentials
2. Access admin dashboard at `/admin`
3. Approve pending authors at `/admin/users`
4. Manage content at `/admin/articles`
5. View analytics at `/admin/analytics`

## 🔧 Troubleshooting

### Author Can't Log In
- Check approval status in admin panel
- Ensure status is "approved", not "pending" or "rejected"

### Articles Not Showing
- Verify article status is "published"
- Check category filters
- Ensure published_at date is set

### Campaign Pop-up Not Appearing
- Clear browser localStorage
- Wait for 2 seconds on page load
- Check browser console for errors

### Upload Failing
- Ensure file size is under 10MB
- Check file format (images only)
- Verify authentication token is valid

## 📱 Responsive Design

The platform is fully responsive:
- **Mobile**: Optimized touch interface
- **Tablet**: Balanced layout
- **Desktop**: Full feature set

## 🌙 Dark Mode

Toggle between light and dark themes:
- Click sun/moon icon in header
- Persists across sessions
- Automatic system preference detection

## 🔒 Security Notes

⚠️ **Important**: This is a demonstration platform. For production use:

1. Implement proper email verification
2. Add rate limiting
3. Enable CAPTCHA on forms
4. Set up proper CORS policies
5. Implement content moderation
6. Add backup systems
7. Enable SSL/TLS
8. Regular security audits

## 📞 Support

For issues or questions:
- Check console for error messages
- Review network tab for API calls
- Verify Supabase connection status

## 🎉 Next Steps

1. Create your admin account
2. Invite authors to join
3. Start publishing content
4. Customize campaign pages
5. Monitor analytics
6. Engage with readers

---

**Built with**: React, TypeScript, Tailwind CSS, Supabase, React Router
**Version**: 1.0.0
**Last Updated**: February 2026

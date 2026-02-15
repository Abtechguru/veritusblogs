# VERITUS INTERNATIONAL - Implementation Guide

## Overview
VERITUS INTERNATIONAL is a comprehensive blog platform with role-based access control, campaign pages, author approval workflow, and Supabase backend integration.

## 🎉 What's Been Implemented

### 1. **Backend Infrastructure (Supabase)**
- ✅ Complete Hono web server in `/supabase/functions/server/index.tsx`
- ✅ Authentication endpoints (signup, signin, signout, session)
- ✅ User management with role-based access control
- ✅ Article CRUD operations
- ✅ Comment system
- ✅ Newsletter subscription
- ✅ Analytics tracking
- ✅ Broadcast messaging system
- ✅ Author approval workflow

### 2. **Campaign Pages**
- ✅ **David Ombugadu 2027** campaign page (`/campaign/david-ombugadu-2027`)
- ✅ **Ambode 2027** campaign page (`/campaign/ambode-2027`) - NEW!
  - Modern, professional design
  - Policy pillars showcase
  - Newsletter subscription
  - Social media integration

### 3. **Campaign Pop-up System**
- ✅ Automatic pop-up on site entry (after 2 seconds)
- ✅ Recurring pop-ups at 5-minute intervals (configurable)
- ✅ Session-based tracking to avoid spam
- ✅ Beautiful gradient design with close button
- ✅ Links to Ambode 2027 campaign page

### 4. **User Roles & Permissions**

#### **Readers**
- ✅ View and read articles
- ✅ Comment on articles
- ✅ Subscribe to newsletter
- ✅ Instant account approval

#### **Authors**
- ✅ Sign up as author (requires admin approval)
- ✅ Create and manage own articles
- ✅ View article analytics
- ✅ **Pending approval status** until admin approves

#### **Admins**
- ✅ Full platform control
- ✅ User management
- ✅ Author approval workflow
- ✅ Content moderation
- ✅ Analytics dashboard
- ✅ Broadcast messaging
- ✅ System-wide settings

### 5. **Enhanced Admin Dashboard**
- ✅ Quick action cards
- ✅ **Author Approvals** page (`/admin/approvals`) - NEW!
- ✅ User management (`/admin/users`)
- ✅ Article management (`/admin/articles`)
- ✅ Analytics (`/admin/analytics`)
- ✅ Broadcast system (`/admin/broadcast`)

### 6. **Author Approval Workflow**
1. User registers and selects "Author" role
2. Account created with status "pending"
3. Added to pending approvals queue
4. Admin reviews in `/admin/approvals`
5. Admin approves or rejects
6. User receives updated permissions

### 7. **Enhanced Registration**
- ✅ Visual role selection (Reader vs Author)
- ✅ Clear indication of approval requirements
- ✅ Modern card-based UI
- ✅ Proper error handling and feedback

## 📁 File Structure

```
/src/app/
├── components/
│   ├── CampaignPopup.tsx           # Campaign pop-up component (NEW)
│   ├── layout/
│   │   ├── Header.tsx              # Updated with campaign links
│   │   ├── Footer.tsx
│   │   └── Root.tsx                # Updated with pop-up
│   └── ui/                         # UI components
├── contexts/
│   ├── AuthContext.tsx             # Updated with Supabase integration
│   └── ThemeContext.tsx
├── lib/
│   └── supabase.ts                 # Supabase client config (NEW)
├── pages/
│   ├── AmbodeCampaignPage.tsx      # Ambode 2027 campaign (NEW)
│   ├── CampaignPage.tsx            # Ombugadu 2027 campaign
│   ├── admin/
│   │   ├── AdminDashboard.tsx      # Updated with approval link
│   │   ├── AdminUserApprovals.tsx  # Author approval page (NEW)
│   │   ├── AdminUsers.tsx
│   │   ├── AdminArticles.tsx
│   │   ├── AdminAnalytics.tsx
│   │   └── AdminBroadcast.tsx
│   └── auth/
│       ├── LoginPage.tsx
│       └── EnhancedRegisterPage.tsx # Enhanced registration (NEW)
└── routes.tsx                      # Updated with new routes

/supabase/functions/server/
├── index.tsx                        # Complete backend server (NEW)
└── kv_store.tsx                     # Protected file
```

## 🚀 Getting Started

### Prerequisites
1. Supabase account (free tier works)
2. Node.js installed
3. Figma Make environment

### Setup Instructions

1. **Connect to Supabase** (if not already done)
   - The system uses Supabase Auth, Database, and Storage
   - Environment variables are pre-configured in Figma Make

2. **Test the Platform**
   
   **Create an Admin Account:**
   - Register at `/register`
   - Select "Reader" role initially
   - Manually update your role in Supabase dashboard or use the mock admin login

   **Mock Credentials for Testing:**
   ```
   Admin:
   - Email: admin@veritus.com
   - Password: (any password - mock mode)

   Author:
   - Email: author@veritus.com
   - Password: (any password - mock mode)

   Reader:
   - Email: reader@veritus.com
   - Password: (any password - mock mode)
   ```

3. **Test Author Approval Workflow**
   - Go to `/register`
   - Select "Author" role
   - Fill in details and submit
   - Login as admin
   - Navigate to `/admin/approvals`
   - Approve or reject the pending author

4. **Test Campaign Pop-up**
   - Visit the homepage
   - Pop-up appears after 2 seconds
   - Dismisses and reappears every 5 minutes
   - Click "Learn More" to visit Ambode 2027 page

## 🔐 Backend API Endpoints

### Authentication
- `POST /signup` - Create new user account
- `POST /signin` - User login
- `GET /session` - Check current session
- `POST /signout` - User logout

### User Management (Admin Only)
- `GET /users` - Get all users
- `PUT /users/:userId` - Update user role/status
- `GET /pending-authors` - Get pending author approvals

### Articles
- `GET /articles` - Get all articles (with filters)
- `GET /articles/:id` - Get single article
- `POST /articles` - Create article (authors/admins)
- `PUT /articles/:id` - Update article (author/admin)
- `DELETE /articles/:id` - Delete article (author/admin)

### Comments
- `GET /articles/:articleId/comments` - Get comments
- `POST /articles/:articleId/comments` - Create comment

### Newsletter
- `POST /newsletter/subscribe` - Subscribe to newsletter
- `GET /newsletter/subscribers` - Get subscribers (admin only)

### Analytics
- `POST /analytics/track` - Track event
- `GET /analytics` - Get analytics data (admin only)

### Broadcast
- `POST /broadcast` - Send broadcast message (admin only)

## 🎨 Campaign Pop-up Configuration

You can customize the pop-up behavior in `/src/app/components/layout/Root.tsx`:

```tsx
<CampaignPopup interval={300000} /> // 300000ms = 5 minutes
```

Change `interval` to adjust how often the pop-up appears:
- 60000 = 1 minute
- 300000 = 5 minutes (default)
- 600000 = 10 minutes

## 📊 User Roles

| Role | Can Read | Can Comment | Can Write | Can Publish | Can Approve Authors | Can Manage All |
|------|----------|-------------|-----------|-------------|---------------------|----------------|
| Reader | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Pending Author | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Author (Approved) | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Admin | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

## 🛠️ Customization Guide

### Adding a New Campaign Page
1. Create page in `/src/app/pages/`
2. Add route in `/src/app/routes.tsx`
3. Add navigation link in Header
4. Update pop-up component if needed

### Modifying Pop-up Campaigns
Edit `/src/app/components/CampaignPopup.tsx` to change:
- Campaign content
- Visual design
- Target campaign page
- Timing behavior

### Changing Author Approval Workflow
1. Modify signup logic in `/supabase/functions/server/index.tsx`
2. Update approval page in `/src/app/pages/admin/AdminUserApprovals.tsx`
3. Adjust role permissions in AuthContext

## 🐛 Troubleshooting

### Pop-up Not Appearing
- Check browser console for errors
- Verify `CampaignPopup` is imported in Root.tsx
- Clear session storage: `sessionStorage.removeItem('campaign_popup_shown')`

### Author Approval Not Working
- Ensure admin is logged in
- Check `/admin/approvals` route exists
- Verify server endpoint `/pending-authors` is working

### Backend Connection Issues
- Check Supabase project ID and keys
- Verify environment variables are set
- Check browser network tab for API errors

## 📝 Next Steps

### Recommended Enhancements
1. **Email Notifications**
   - Integrate email service for author approvals
   - Send welcome emails on registration
   - Newsletter email campaigns

2. **Advanced Analytics**
   - Real-time visitor tracking
   - Article performance metrics
   - User engagement heatmaps

3. **Social Features**
   - User profiles with bios
   - Following/followers system
   - Article bookmarks

4. **Content Management**
   - Rich text editor for articles
   - Image upload to Supabase Storage
   - Draft/publish workflow

5. **SEO Optimization**
   - Meta tags for articles
   - Sitemap generation
   - Open Graph tags

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review error logs in browser console
3. Check Supabase logs in dashboard
4. Review server logs for backend issues

## 🎉 Success!

You now have a fully functional blog platform with:
- ✅ Role-based access control
- ✅ Author approval workflow
- ✅ Two campaign pages
- ✅ Recurring campaign pop-ups
- ✅ Complete backend infrastructure
- ✅ Admin dashboard with all tools
- ✅ Modern, responsive design

The platform is ready for customization and production use!

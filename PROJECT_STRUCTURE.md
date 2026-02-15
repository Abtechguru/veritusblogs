# VERITUS INTERNATIONAL - Blog Platform

A comprehensive, modern blog platform built with React, TypeScript, and Tailwind CSS.

## 🎯 Project Overview

VERITUS INTERNATIONAL is a full-featured blog platform with role-based access control, rich content management, and a premium user experience. This frontend implementation includes mock data and demonstrates the complete UI/UX without requiring backend infrastructure.

## ✨ Key Features

### Public Features
- **Welcome Landing Page**: Engaging hero section with featured articles
- **Article Browsing**: Browse articles by category or search
- **Detailed Article Views**: Full article pages with comments section
- **Category Pages**: Dedicated pages for Sports, Cultures, Politics, Weather, and Celebrity Gist
- **Campaign Page**: Special feature page for "David Ombugadu 2027"
- **Responsive Design**: Mobile-first approach with dark/light mode support
- **Newsletter Subscription**: Email subscription system in footer

### User Features
- **Authentication**: Login and registration pages
- **User Profiles**: Customizable user profiles with avatars and bios
- **Role-Based Access**: Reader, Author, and Admin roles
- **Article Comments**: Interactive commenting system

### Author Features
- **Article Creation**: Rich article editor with category selection
- **Article Management**: Create, edit, and manage own articles
- **Media Support**: Cover image integration

### Admin Features
- **Admin Dashboard**: Comprehensive overview with stats and quick actions
- **User Management**: View all users, manage roles, promote to Sub-Admin
- **Article Management**: Full control over all platform content
- **Analytics**: Detailed performance metrics with charts
- **Broadcast System**: Send system-wide announcements to all users

## 📁 Project Structure

```
src/app/
├── App.tsx                      # Main app component with providers
├── routes.tsx                   # React Router configuration
├── components/
│   ├── layout/
│   │   ├── Root.tsx            # Root layout with header/footer
│   │   ├── Header.tsx          # Navigation header
│   │   └── Footer.tsx          # Footer with newsletter
│   └── ui/                     # Reusable UI components (shadcn/ui)
├── contexts/
│   ├── AuthContext.tsx         # Authentication state management
│   └── ThemeContext.tsx        # Dark/light mode management
├── data/
│   └── mockData.ts            # Mock articles, comments, categories
└── pages/
    ├── HomePage.tsx            # Landing page
    ├── ArticleListPage.tsx     # All articles with filters
    ├── ArticleDetailPage.tsx   # Single article view
    ├── CategoryPage.tsx        # Category-specific articles
    ├── CampaignPage.tsx        # David Ombugadu 2027 campaign
    ├── AuthorPage.tsx          # Author profile with articles
    ├── ProfilePage.tsx         # User profile management
    ├── CreateArticlePage.tsx   # Article creation form
    ├── EditArticlePage.tsx     # Article editing form
    ├── NotFoundPage.tsx        # 404 error page
    ├── auth/
    │   ├── LoginPage.tsx       # Login form
    │   └── RegisterPage.tsx    # Registration form
    └── admin/
        ├── AdminDashboard.tsx  # Admin overview
        ├── AdminUsers.tsx      # User management
        ├── AdminArticles.tsx   # Article management
        ├── AdminAnalytics.tsx  # Platform analytics
        └── AdminBroadcast.tsx  # Broadcast system
```

## 🚀 Getting Started

### Demo Accounts

The platform includes three demo accounts for testing different roles:

- **Admin**: `admin@veritus.com` (any password)
  - Full platform control
  - User and article management
  - Analytics and broadcasting

- **Author**: `author@veritus.com` (any password)
  - Create and manage articles
  - Comment on articles

- **Reader**: `reader@veritus.com` (any password)
  - Read articles
  - Post comments
  - Subscribe to newsletter

### Navigation

- **Home**: Landing page with featured articles
- **Articles**: Browse all articles with search and filters
- **Categories**: Navigate to specific content categories
- **Ombugadu 2027**: Campaign page with policy information
- **Profile**: Manage your account (when logged in)
- **Admin**: Access admin dashboard (admin only)

## 🎨 Features Detail

### Dark Mode
Toggle between light and dark themes using the sun/moon icon in the header. Preference is saved to localStorage.

### Role-Based Access
- **Readers**: Can view content, comment, and subscribe
- **Authors**: Can create and manage their own articles
- **Sub-Admins**: Can moderate content and manage users
- **Admins**: Full platform control including analytics and broadcasting

### Mock Data
The platform uses mock data to demonstrate functionality:
- 6 sample articles across different categories
- Multiple users with different roles
- Sample comments and engagement metrics
- Analytics data for charts

### Responsive Design
- Mobile-first approach
- Hamburger menu on small screens
- Flexible grid layouts
- Touch-friendly interactions

## 🔧 Technical Implementation

### State Management
- **AuthContext**: Manages user authentication state and localStorage persistence
- **ThemeContext**: Handles dark/light mode with localStorage persistence
- React Router for navigation state

### Styling
- Tailwind CSS v4 for utility-first styling
- Custom theme with CSS variables for colors
- Dark mode support through Tailwind's dark variant
- Radix UI components for accessibility

### Components
- shadcn/ui component library
- Lucide React for icons
- Motion (Framer Motion) for animations
- Recharts for analytics visualizations

## 📝 Notes

### Production Considerations
This is a frontend prototype. For production use, you would need to:

1. **Backend Integration**: Connect to Supabase or another backend
2. **Real Authentication**: Implement proper auth with JWT/sessions
3. **Database**: Store articles, users, and comments in a database
4. **File Upload**: Implement image upload to Supabase Storage
5. **Email Service**: Integrate SendGrid, Resend, or similar for newsletters
6. **Rich Text Editor**: Add a WYSIWYG editor for article creation
7. **Security**: Implement RLS policies, rate limiting, and input validation
8. **SEO**: Add proper meta tags, sitemaps, and structured data
9. **Analytics**: Integrate real analytics tracking
10. **Performance**: Add caching, CDN, and optimization

### Mock Data Location
All mock data is located in `/src/app/data/mockData.ts` and can be easily replaced with API calls.

### Customization
- Colors and themes: Edit `/src/styles/theme.css`
- Categories: Modify the `categories` array in `mockData.ts`
- User roles: Extend the `UserRole` type in `AuthContext.tsx`

## 🙏 Credits

- UI components based on shadcn/ui
- Icons by Lucide
- Sample images from Unsplash API
- Built with React, TypeScript, and Tailwind CSS

# VERITUS INTERNATIONAL - Quick Reference Card

## 🚀 Quick Start

### Create Admin Account
1. Visit `/register`
2. Fill in details, select "Reader"
3. Create account
4. Manually upgrade to admin (see docs)

### Create Author Account  
1. Visit `/register`
2. Select "Author (Requires Approval)"
3. Submit registration
4. Wait for admin approval

### Create Reader Account
1. Visit `/register`
2. Select "Reader"
3. Auto-approved ✅

---

## 🔑 Test Accounts

```
Admin:
- Email: admin@veritus.com
- Password: Admin123!

Author:
- Email: author@veritus.com
- Password: Author123!

Reader:
- Email: reader@veritus.com
- Password: Reader123!
```

---

## 📍 Important URLs

### Public
```
/                                   → Homepage
/articles                           → All articles
/category/sports                    → Sports category
/campaign/david-ombugadu-2027       → Ombugadu campaign
/campaign/ambode-2027               → Ambode campaign
```

### Auth
```
/login                              → Login page
/register                           → Registration
/profile                            → User profile
```

### Dashboards
```
/admin                              → Admin dashboard
/admin/users                        → User management
/admin/articles                     → Article management
/dashboard/author                   → Author dashboard
/dashboard/reader                   → Reader dashboard
```

---

## 🎯 Common Tasks

### Approve an Author
```
1. Login as admin
2. Go to /admin/users
3. Find pending author
4. Click "..." menu → Approve
```

### Create an Article
```
1. Login as author/admin
2. Click user menu → Write Article
3. Fill in form
4. Click "Create Article"
```

### Publish a Draft
```
1. Go to /dashboard/author
2. Find draft article
3. Click edit icon
4. Change status to "Published"
5. Save
```

### View Campaign Pop-up
```
1. Open site in incognito
2. Wait 2 seconds
3. Pop-up appears
OR
4. Clear localStorage:
   localStorage.removeItem('veritus_last_campaign_popup')
```

---

## 🎨 User Roles Matrix

| Can Do | Reader | Author | Admin |
|--------|--------|--------|-------|
| View content | ✅ | ✅ | ✅ |
| Comment | ✅ | ✅ | ✅ |
| Create articles | ❌ | ✅ | ✅ |
| Approve authors | ❌ | ❌ | ✅ |
| Manage all users | ❌ | ❌ | ✅ |

---

## 🔧 Troubleshooting

### Can't Login
- Check email/password
- Verify account is approved (for authors)
- Clear browser cache

### Article Not Showing
- Check status is "published"
- Verify published date is set
- Check correct category

### Upload Failed
- File must be under 10MB
- Must be logged in
- Use image formats only

### Pop-up Not Showing
- Clear localStorage
- Wait 2 seconds
- Check incognito mode

---

## 📱 Keyboard Shortcuts

```
/ → Focus search (coming soon)
N → New article (when logged in as author)
ESC → Close modals
```

---

## 🎯 API Quick Reference

### Base URL
```
https://{PROJECT_ID}.supabase.co/functions/v1/make-server-5bb3fa81
```

### Common Endpoints
```
POST /auth/signup           → Register user
POST /auth/signin           → Login
GET  /auth/session          → Get current session
POST /auth/signout          → Logout

GET  /articles              → List articles
POST /articles              → Create article
GET  /articles/:id          → Get article
PUT  /articles/:id          → Update article
DELETE /articles/:id        → Delete article

GET  /admin/users           → List users (admin)
POST /admin/users/:id/status → Update user status
```

---

## 🎨 Categories

```
sports          → Sports
cultures        → Cultures  
politics        → Politics
weather         → Weather
celebrity-gist  → Celebrity Gist
```

---

## 📊 Dashboard Stats

### Admin
- Total users
- Pending approvals
- Total articles
- System health

### Author
- Total articles
- Published count
- Draft count
- Total views

### Reader
- Reading streak
- Articles read
- Saved articles

---

## 🔗 Campaign Links

```
Ombugadu 2027:  /campaign/david-ombugadu-2027
Ambode 2027:    /campaign/ambode-2027
```

---

## 💡 Pro Tips

1. **Clear localStorage** to reset pop-up timer
2. **Use incognito mode** for testing
3. **Check console** for detailed errors
4. **View network tab** for API debugging
5. **Test responsive** on actual devices

---

## 🚨 Common Error Messages

```
"Account pending approval"
→ Author not yet approved by admin

"Unauthorized"
→ Login required or invalid token

"Forbidden"
→ Insufficient permissions

"Not found"
→ Resource doesn't exist

"Internal server error"
→ Check Supabase connection
```

---

## 📞 Getting Help

1. Check **SETUP_GUIDE.md**
2. Review **TESTING_GUIDE.md**
3. See **FEATURES.md**
4. Read **PROJECT_SUMMARY.md**
5. Check browser console
6. Review network requests

---

## ⚡ Quick Commands

### Reset Pop-up
```javascript
localStorage.removeItem('veritus_last_campaign_popup');
location.reload();
```

### Check Auth Status
```javascript
console.log(localStorage.getItem('veritus_token'));
```

### View User Data
```javascript
// In browser console (when logged in)
console.log(JSON.parse(localStorage.getItem('veritus_user')));
```

---

## 🎯 Test Checklist

- [ ] Register as reader
- [ ] Register as author
- [ ] Login as admin
- [ ] Approve author
- [ ] Create article
- [ ] Publish article
- [ ] View campaign pages
- [ ] See pop-up
- [ ] Toggle theme
- [ ] Test on mobile

---

## 📋 Feature Status

```
✅ Authentication
✅ User Management
✅ Article Management
✅ Campaign Pages
✅ Campaign Pop-ups
✅ Admin Dashboard
✅ Author Dashboard
✅ Reader Dashboard
✅ Comment System
✅ Newsletter
✅ Analytics
✅ Dark Mode
✅ Responsive Design
```

---

## 🎨 Theme Toggle

**Light Mode** ☀️
- Click moon icon in header
- System default

**Dark Mode** 🌙
- Click sun icon in header
- Persists in localStorage

---

## 📱 Mobile Menu

Tap hamburger icon (≡) to open:
- All navigation links
- Campaign pages
- User menu
- Theme toggle

---

## ⚙️ Environment

```
Frontend: React + TypeScript
Backend: Supabase
Database: KV Store
Storage: Supabase Storage
Auth: Supabase Auth
```

---

**Quick Reference Version**: 1.0.0
**Last Updated**: February 13, 2026

---

## 🎉 You're Ready!

Start exploring VERITUS INTERNATIONAL now! 🚀

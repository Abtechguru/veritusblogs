# VERITUS INTERNATIONAL - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Check Your Installation
Your platform is already built and ready! All files are in place.

### Step 2: Test the Campaign Pop-up
1. Open your site
2. Wait 2 seconds
3. ✅ You should see the Ambode 2027 campaign pop-up!

### Step 3: Explore Campaign Pages
- Click "Ambode 2027" in navigation
- Click "Ombugadu 2027" in navigation
- Both pages are live and ready!

### Step 4: Create Your First Admin Account

**Option A: Using Mock Login (Testing Only)**
```
Email: admin@veritus.com
Password: (any password)
```
This works for quick testing without backend setup.

**Option B: Real Account (Production)**
1. Connect to Supabase (if not already done)
2. Go to `/register`
3. Create account as Reader
4. In Supabase dashboard, manually change your role to 'admin'
5. Login with your new credentials

### Step 5: Test Author Approval Workflow

1. **Create an Author Account:**
   - Go to `/register`
   - Select "Author" role (purple card)
   - Fill in details
   - Submit

2. **Approve as Admin:**
   - Login as admin
   - Go to `/admin/approvals`
   - Click "Approve" on your pending author
   - Done! 🎉

3. **Create an Article:**
   - Login as the approved author
   - Click user menu → "Write Article"
   - Create your first article!

## 📝 Quick Reference

### Important URLs
- Homepage: `/`
- Ambode Campaign: `/campaign/ambode-2027`
- Ombugadu Campaign: `/campaign/david-ombugadu-2027`
- Register: `/register`
- Login: `/login`
- Admin Dashboard: `/admin`
- Author Approvals: `/admin/approvals`

### Default Roles
- **Reader**: Read articles, comment, subscribe
- **Author (Pending)**: Waiting for approval
- **Author (Approved)**: Can create articles
- **Admin**: Full control

### Campaign Pop-up Settings
- First appearance: 2 seconds after page load
- Recurring: Every 5 minutes (300,000ms)
- Customize in: `/src/app/components/layout/Root.tsx`

```tsx
<CampaignPopup interval={300000} /> // Change this value
```

**Timing Examples:**
- 10 seconds: `10000`
- 1 minute: `60000`
- 5 minutes: `300000` (default)
- 10 minutes: `600000`

## 🎨 Customization Quick Tips

### Change Campaign Pop-up Content
Edit: `/src/app/components/CampaignPopup.tsx`

### Add New Campaign Page
1. Create file in `/src/app/pages/`
2. Add route in `/src/app/routes.tsx`
3. Add link in `/src/app/components/layout/Header.tsx`

### Modify Admin Dashboard
Edit: `/src/app/pages/admin/AdminDashboard.tsx`

### Update Theme Colors
Edit: `/src/styles/theme.css`

## 🔧 Configuration

### Pop-up Behavior
```tsx
// File: /src/app/components/layout/Root.tsx
<CampaignPopup interval={300000} />
```

### Backend API URL
```ts
// File: /src/app/lib/supabase.ts
export const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-5bb3fa81`;
```

## 🐛 Troubleshooting

### Pop-up Not Showing?
```javascript
// Run in browser console:
sessionStorage.removeItem('campaign_popup_shown');
// Then refresh
```

### Can't Login?
1. Check if Supabase is connected
2. Try mock credentials: `admin@veritus.com`
3. Check browser console for errors

### Backend Not Working?
1. Verify Supabase project is active
2. Check environment variables
3. Review server logs

## 📚 Documentation

- **Full Implementation Details**: `/IMPLEMENTATION_GUIDE.md`
- **All Features**: `/FEATURES_SUMMARY.md`
- **Testing Guide**: `/TESTING_GUIDE.md`

## ✅ Pre-Launch Checklist

Before going live:

- [ ] Test campaign pop-up
- [ ] Verify both campaign pages load
- [ ] Test author sign-up and approval
- [ ] Test reader sign-up
- [ ] Verify admin dashboard access
- [ ] Test on mobile device
- [ ] Test in dark mode
- [ ] Connect to Supabase (if not done)
- [ ] Set up admin account
- [ ] Review and approve first authors

## 🎉 You're Ready!

Your VERITUS INTERNATIONAL platform is fully functional with:

✅ Two campaign pages (Ambode 2027, Ombugadu 2027)  
✅ Smart campaign pop-up system  
✅ Author approval workflow  
✅ Complete admin dashboard  
✅ Role-based access control  
✅ Supabase backend integration  
✅ Responsive design  
✅ Dark mode support  

**Start exploring and building your content!**

## 🤝 Need Help?

1. Check `/TESTING_GUIDE.md` for detailed testing instructions
2. Review `/IMPLEMENTATION_GUIDE.md` for technical details
3. See `/FEATURES_SUMMARY.md` for complete feature list
4. Check browser console for error messages
5. Review Supabase logs for backend issues

## 🚀 Next Steps

1. **Customize Content**
   - Update campaign page content
   - Add your own articles
   - Upload brand images

2. **Invite Authors**
   - Share registration link
   - Approve new authors
   - Guide them through article creation

3. **Engage Readers**
   - Promote newsletter subscriptions
   - Share campaign pages on social media
   - Encourage comments and engagement

4. **Monitor Analytics**
   - Check admin dashboard regularly
   - Review user growth
   - Track article performance

**Happy Publishing! 🎊**

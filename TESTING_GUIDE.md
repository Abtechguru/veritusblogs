# VERITUS INTERNATIONAL - Testing Guide

## 🧪 How to Test All New Features

### 1. Test Campaign Pop-up

**Steps:**
1. Open the site in a new browser or clear session storage
2. Wait 2 seconds
3. ✅ **Expected**: Pop-up appears with Ambode 2027 campaign
4. Click "Learn More"
5. ✅ **Expected**: Navigates to `/campaign/ambode-2027`
6. Go back to homepage
7. Wait 5 minutes (or change interval in code to 10 seconds for quick testing)
8. ✅ **Expected**: Pop-up appears again

**To Test Quickly:**
Edit `/src/app/components/layout/Root.tsx`:
```tsx
<CampaignPopup interval={10000} /> // 10 seconds instead of 5 minutes
```

**To Reset Pop-up:**
Open browser console and run:
```javascript
sessionStorage.removeItem('campaign_popup_shown');
```
Refresh the page and pop-up will appear after 2 seconds.

---

### 2. Test Ambode 2027 Campaign Page

**Steps:**
1. Navigate to `/campaign/ambode-2027` or click "Ambode 2027" in header
2. ✅ **Expected**: Beautiful campaign page loads
3. Scroll through all sections:
   - Hero with campaign slogan ✅
   - Vision statement with stats ✅
   - 6 Policy pillars in cards ✅
   - Proven track record achievements ✅
   - Newsletter subscription form ✅
   - Social media icons ✅
4. Enter email in newsletter form and click Subscribe
5. ✅ **Expected**: Toast notification "Subscribed to campaign updates!"

---

### 3. Test Author Sign-up and Approval

**Part A: Sign Up as Author**

1. Go to `/register`
2. ✅ **Expected**: See two role cards (Reader and Author)
3. Click "Author" card
4. ✅ **Expected**: Yellow warning appears about approval requirement
5. Fill in:
   - Name: Test Author
   - Email: testauthor@example.com
   - Password: password123
   - Confirm Password: password123
6. Click "Create Account"
7. ✅ **Expected**: 
   - Toast: "Author account created! Awaiting admin approval."
   - Toast: "You will receive an email once your account is approved."
   - Redirect to `/login`

**Part B: View Pending Request as Admin**

1. Login as admin (or switch to admin account)
2. Go to `/admin/approvals`
3. ✅ **Expected**: See "Test Author" in pending approvals table
4. ✅ **Expected**: Status badge shows "Pending" with clock icon

**Part C: Approve the Author**

1. Click "Approve" button next to "Test Author"
2. ✅ **Expected**: Confirmation dialog appears
3. Click "Approve" in dialog
4. ✅ **Expected**: 
   - Toast: "Test Author approved as author!"
   - User disappears from pending list
5. Logout and login as Test Author
6. ✅ **Expected**: Can now access "Write Article" in user menu

**Part D: Test Rejection** (Optional)

1. Create another author account
2. As admin, go to `/admin/approvals`
3. Click "Reject" button
4. ✅ **Expected**: Rejection confirmation dialog
5. Click "Reject"
6. ✅ **Expected**: 
   - Toast: "User's author request rejected"
   - User removed from pending list
   - User role changed to "reader"

---

### 4. Test Reader Sign-up (Quick Access)

**Steps:**
1. Go to `/register`
2. Select "Reader" card (should be selected by default)
3. Fill in details:
   - Name: Test Reader
   - Email: testreader@example.com
   - Password: password123
   - Confirm Password: password123
4. Click "Create Account"
5. ✅ **Expected**:
   - Toast: "Account created successfully!"
   - Redirect to `/login`
6. Login with credentials
7. ✅ **Expected**: 
   - Successful login
   - Can read articles
   - Can comment (if implemented)
   - Cannot create articles

---

### 5. Test Admin Dashboard Enhancements

**Steps:**
1. Login as admin
2. Go to `/admin` (Admin Dashboard)
3. ✅ **Expected**: See 5 quick action cards:
   - Manage Users
   - **Author Approvals** (NEW)
   - Manage Articles
   - View Analytics
   - Send Broadcast
4. Click "Author Approvals" card
5. ✅ **Expected**: Navigate to `/admin/approvals`
6. ✅ **Expected**: See pending author requests (if any)

---

### 6. Test Navigation Updates

**Steps:**
1. Check desktop navigation bar
2. ✅ **Expected**: See both campaign links:
   - "Ombugadu 2027"
   - "Ambode 2027"
3. Click "Ambode 2027"
4. ✅ **Expected**: Navigate to Ambode campaign page
5. Click "Ombugadu 2027"
6. ✅ **Expected**: Navigate to Ombugadu campaign page

**Mobile:**
1. Resize browser to mobile width (< 1024px)
2. Click hamburger menu (☰)
3. ✅ **Expected**: Mobile menu opens
4. ✅ **Expected**: See both campaign links in menu
5. Click either campaign link
6. ✅ **Expected**: Navigate to campaign page and menu closes

---

### 7. Test Backend Integration

**Prerequisites:** Supabase must be connected

**Part A: User Authentication**

1. Go to `/register`
2. Create new account (reader or author)
3. Open browser DevTools → Network tab
4. ✅ **Expected**: See POST request to `/signup` endpoint
5. ✅ **Expected**: 200 OK response
6. Go to `/login`
7. Login with created account
8. ✅ **Expected**: See POST request to `/signin` endpoint
9. ✅ **Expected**: Session token in response

**Part B: Author Approval API**

1. Login as admin
2. Go to `/admin/approvals`
3. Open DevTools → Network tab
4. ✅ **Expected**: See GET request to `/pending-authors`
5. Click "Approve" on a pending author
6. ✅ **Expected**: See PUT request to `/users/{userId}`
7. ✅ **Expected**: Request body contains `{ role: 'author', status: 'approved' }`

**Part C: Newsletter Subscription**

1. Go to `/campaign/ambode-2027`
2. Scroll to newsletter form
3. Enter email: test@example.com
4. Click Subscribe
5. Open DevTools → Network tab
6. ✅ **Expected**: See POST request to `/newsletter/subscribe`
7. ✅ **Expected**: 200 OK response
8. ✅ **Expected**: Toast notification appears

---

### 8. Test Dark Mode Compatibility

**Steps:**
1. Toggle dark mode (sun/moon icon in header)
2. Visit all pages:
   - Homepage
   - Campaign pages (both)
   - Admin dashboard
   - Registration page
   - Login page
3. ✅ **Expected**: All pages render correctly in dark mode
4. Check campaign pop-up in dark mode
5. ✅ **Expected**: Readable text, proper contrast

---

### 9. Test Responsive Design

**Mobile (< 640px):**
1. Resize browser to 375px width (iPhone size)
2. Visit Ambode 2027 campaign page
3. ✅ **Expected**: 
   - Policy pillars stack vertically
   - Buttons are full-width
   - Text is readable
   - No horizontal scroll
4. Test registration page
5. ✅ **Expected**: Role cards stack vertically

**Tablet (640px - 1024px):**
1. Resize to 768px width (iPad size)
2. Visit campaign page
3. ✅ **Expected**: 2-column policy grid
4. Test pop-up
5. ✅ **Expected**: Proper sizing and spacing

**Desktop (> 1024px):**
1. Full browser width
2. ✅ **Expected**: 
   - 3-column policy grid
   - Side-by-side buttons
   - Full navigation bar

---

### 10. Test Error Handling

**Invalid Registration:**
1. Go to `/register`
2. Try to submit with:
   - Passwords don't match
   - ✅ **Expected**: Toast error "Passwords do not match"
   - Password < 6 characters
   - ✅ **Expected**: Toast error "Password must be at least 6 characters"
   - Empty fields
   - ✅ **Expected**: HTML5 validation prevents submit

**Invalid Login:**
1. Go to `/login`
2. Enter incorrect credentials
3. ✅ **Expected**: Toast error "Login failed. Please check your credentials."

**Unauthorized Access:**
1. Logout
2. Try to access `/admin`
3. ✅ **Expected**: Redirect to homepage

---

## 🐛 Common Issues and Fixes

### Pop-up Not Appearing
**Issue:** Pop-up doesn't show after 2 seconds  
**Fix:** 
```javascript
// In browser console:
sessionStorage.clear();
// Then refresh page
```

### Author Can't Create Articles After Approval
**Issue:** Approved author doesn't see "Write Article" option  
**Fix:** 
1. Logout completely
2. Clear browser cache
3. Login again
4. Check role in user menu

### Backend Errors (401 Unauthorized)
**Issue:** API requests failing  
**Fix:**
1. Check if logged in
2. Verify Supabase is connected
3. Check browser console for error details
4. Verify environment variables are set

### Campaign Page Images Not Loading
**Issue:** Placeholder images not working  
**Fix:**
- Images are using Unsplash URLs (should work)
- If blocked, replace with local images
- Check network connectivity

---

## ✅ Testing Checklist

Use this checklist to verify all features:

### Campaign System
- [ ] Pop-up appears on site entry (2 seconds)
- [ ] Pop-up can be dismissed
- [ ] Pop-up reappears after interval
- [ ] "Learn More" navigates to campaign page
- [ ] Ambode 2027 page loads correctly
- [ ] All sections visible and styled
- [ ] Newsletter subscription works
- [ ] Social icons present

### Author Approval
- [ ] Can sign up as author
- [ ] Approval notice shows
- [ ] Account created with pending status
- [ ] Admin sees pending request
- [ ] Admin can approve
- [ ] Admin can reject
- [ ] Approved author can create articles
- [ ] Rejected author cannot create articles

### User Roles
- [ ] Reader signup works
- [ ] Author signup works
- [ ] Admin can access admin dashboard
- [ ] Author can write articles (post-approval)
- [ ] Reader can only read

### Navigation
- [ ] Both campaign links in desktop nav
- [ ] Both campaign links in mobile menu
- [ ] Mobile menu opens/closes
- [ ] Navigation responsive

### UI/UX
- [ ] Dark mode works everywhere
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop
- [ ] Animations smooth
- [ ] Toast notifications appear
- [ ] Loading states show

### Backend
- [ ] Signup API works
- [ ] Login API works
- [ ] Session persists
- [ ] Author approval API works
- [ ] Newsletter API works
- [ ] Analytics tracked (if tested)

---

## 📊 Test Data

Use these test accounts:

### Admin Account (for testing)
```
Email: admin@veritus.com
Password: admin123
Role: admin
```

### Test Readers
```
Email: reader1@test.com
Password: test123
Role: reader

Email: reader2@test.com
Password: test123
Role: reader
```

### Test Authors (pending approval)
```
Email: author1@test.com
Password: test123
Role: pending-author

Email: author2@test.com
Password: test123
Role: pending-author
```

---

## 🎯 Priority Testing Order

1. **Campaign Pop-up** (most visible feature)
2. **Ambode 2027 Campaign Page** (new content)
3. **Author Sign-up Flow** (critical workflow)
4. **Admin Approvals** (core admin feature)
5. **Navigation** (user experience)
6. **Responsive Design** (mobile users)
7. **Backend Integration** (functionality)
8. **Dark Mode** (accessibility)
9. **Error Handling** (edge cases)

---

## 🎉 Success Criteria

✅ All features working  
✅ No console errors  
✅ Responsive on all devices  
✅ Dark mode compatible  
✅ Smooth animations  
✅ Clear user feedback (toasts)  
✅ Secure authentication  
✅ Proper role permissions  

**If all checked, your platform is production-ready!**

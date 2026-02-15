# 🗄️ Database Setup Guide - Production Ready

## Overview
This guide will help you set up the Supabase database for the Veritus Blogs campaign system. All mock data has been removed and the application now uses real-time data from Supabase.

---

## 📋 Prerequisites

1. **Supabase Project**: You need an active Supabase project
2. **Database Access**: Admin access to run SQL migrations
3. **Environment Variables**: Properly configured Supabase credentials

---

## 🚀 Quick Setup

### Step 1: Run the Migration

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `supabase/migrations/001_campaign_tables.sql`
4. Paste and run the SQL script

This will create:
- ✅ `campaign_donations` table
- ✅ `campaign_signups` table
- ✅ Indexes for performance
- ✅ Row Level Security (RLS) policies
- ✅ Automatic timestamp triggers

### Step 2: Verify Tables

Run this query to verify tables were created:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('campaign_donations', 'campaign_signups');
```

You should see both tables listed.

---

## 📊 Database Schema

### `campaign_donations` Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `name` | TEXT | Donor's full name |
| `amount` | DECIMAL(10,2) | Donation amount in USD |
| `message` | TEXT | Optional message from donor |
| `timestamp` | TIMESTAMPTZ | When donation was made |
| `campaign_id` | TEXT | Campaign identifier (e.g., 'david-ombugadu-2027') |
| `created_at` | TIMESTAMPTZ | Record creation time |
| `updated_at` | TIMESTAMPTZ | Last update time (auto-updated) |

**Indexes:**
- `idx_campaign_donations_campaign_id` - Fast filtering by campaign
- `idx_campaign_donations_timestamp` - Fast sorting by time

### `campaign_signups` Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `first_name` | TEXT | Volunteer's first name |
| `last_name` | TEXT | Volunteer's last name |
| `email` | TEXT | Contact email |
| `message` | TEXT | Optional message |
| `type` | TEXT | 'volunteer' or 'supporter' |
| `campaign_id` | TEXT | Campaign identifier |
| `created_at` | TIMESTAMPTZ | Record creation time |
| `updated_at` | TIMESTAMPTZ | Last update time (auto-updated) |

**Indexes:**
- `idx_campaign_signups_campaign_id` - Fast filtering by campaign
- `idx_campaign_signups_email` - Fast email lookups

---

## 🔒 Security (Row Level Security)

### Public Access Policies

**Donations:**
- ✅ **Read**: Anyone can view donations (transparency)
- ✅ **Insert**: Anyone can add donations (public contributions)
- ❌ **Update/Delete**: Only authenticated users (admin protection)

**Signups:**
- ✅ **Read**: Anyone can view signups (transparency)
- ✅ **Insert**: Anyone can sign up (public registration)
- ❌ **Update/Delete**: Only authenticated users (admin protection)

### Why This Design?

1. **Transparency**: Public can see all donations and supporters
2. **Security**: Only admins can modify/delete records
3. **Trust**: Real-time public feed builds credibility
4. **Compliance**: Audit trail for all transactions

---

## 🔧 API Integration

### Campaign Service Methods

#### 1. Get Donations
```typescript
// Get all donations for a campaign
const donations = await campaignService.getDonators('david-ombugadu-2027');

// Get all donations (all campaigns)
const allDonations = await campaignService.getDonators();
```

#### 2. Get Total Donations
```typescript
// Get total for specific campaign
const total = await campaignService.getTotalDonations('david-ombugadu-2027');

// Get total for all campaigns
const grandTotal = await campaignService.getTotalDonations();
```

#### 3. Add Donation
```typescript
await campaignService.addDonation({
    name: 'John Doe',
    amount: 100.00,
    message: 'Supporting the vision!',
    campaign_id: 'david-ombugadu-2027'
});
```

#### 4. Sign Up Volunteer
```typescript
await campaignService.signUpVolunteer({
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane@example.com',
    type: 'volunteer',
    message: 'Ready to help!',
    campaign_id: 'david-ombugadu-2027'
});
```

---

## 📱 Real-Time Updates

The application automatically refreshes donation data:

- **HomePage**: Every 30 seconds
- **DonationSection**: Every 10 seconds

This creates a "live feed" effect showing recent contributions.

---

## 🎯 Campaign IDs

Currently supported campaigns:

1. **David Ombugadu 2027**: `david-ombugadu-2027`
2. **Ambode 2027**: `ambode-2027`

To add a new campaign, simply use a new `campaign_id` when creating donations/signups.

---

## 🧪 Testing

### Test Donation Flow

1. Go to campaign page
2. Enter donation amount
3. Click "Proceed to PayPal"
4. Complete PayPal payment
5. Verify donation appears in:
   - Recent Contributions feed
   - Total donation counter
   - Supabase database

### Verify in Database

```sql
-- Check recent donations
SELECT * FROM campaign_donations 
ORDER BY timestamp DESC 
LIMIT 10;

-- Check total by campaign
SELECT 
    campaign_id,
    COUNT(*) as donation_count,
    SUM(amount) as total_amount
FROM campaign_donations
GROUP BY campaign_id;

-- Check recent signups
SELECT * FROM campaign_signups
ORDER BY created_at DESC
LIMIT 10;
```

---

## 🔍 Monitoring & Analytics

### Useful Queries

**Top Donors:**
```sql
SELECT name, amount, timestamp
FROM campaign_donations
WHERE campaign_id = 'david-ombugadu-2027'
ORDER BY amount DESC
LIMIT 10;
```

**Donation Timeline:**
```sql
SELECT 
    DATE(timestamp) as date,
    COUNT(*) as donations,
    SUM(amount) as total
FROM campaign_donations
WHERE campaign_id = 'david-ombugadu-2027'
GROUP BY DATE(timestamp)
ORDER BY date DESC;
```

**Volunteer Stats:**
```sql
SELECT 
    type,
    COUNT(*) as count
FROM campaign_signups
WHERE campaign_id = 'david-ombugadu-2027'
GROUP BY type;
```

---

## 🚨 Troubleshooting

### Issue: Donations not appearing

**Check:**
1. Supabase connection is working
2. RLS policies are enabled
3. Campaign ID matches exactly
4. Browser console for errors

**Solution:**
```typescript
// Test connection
const { data, error } = await supabase
    .from('campaign_donations')
    .select('count');
    
if (error) console.error('Connection error:', error);
```

### Issue: "Failed to add donation"

**Check:**
1. Amount is greater than 0
2. Name is not empty
3. PayPal transaction completed
4. Network connectivity

**Solution:**
Check browser console and Supabase logs for detailed error messages.

### Issue: Total not updating

**Check:**
1. Auto-refresh interval is running
2. Component is mounted
3. Campaign ID is correct

**Solution:**
```typescript
// Manual refresh
const total = await campaignService.getTotalDonations('david-ombugadu-2027');
setTotalDonations(total);
```

---

## 📈 Performance Optimization

### Indexes

All critical queries are indexed:
- Campaign ID lookups: O(log n)
- Timestamp sorting: O(log n)
- Email lookups: O(log n)

### Caching Strategy

Consider implementing:
1. **Client-side caching**: Cache totals for 30 seconds
2. **CDN caching**: Cache public donation lists
3. **Database caching**: Use Supabase's built-in caching

---

## 🔐 Admin Access

### View All Data

Admins can access the Supabase dashboard to:
- View all donations
- Export data to CSV
- Generate reports
- Manage signups
- Monitor real-time activity

### Backup Strategy

**Recommended:**
1. Daily automated backups (Supabase Pro)
2. Weekly manual exports
3. Point-in-time recovery enabled

---

## 🎉 What Changed from Mock Data

### Before (Mock Data):
- ❌ Hardcoded donations in code
- ❌ localStorage for persistence
- ❌ No real-time updates
- ❌ Lost data on browser clear
- ❌ No admin visibility

### After (Production Ready):
- ✅ Real Supabase database
- ✅ Persistent across all users
- ✅ Real-time updates every 10-30s
- ✅ Full admin dashboard
- ✅ Audit trails and analytics
- ✅ Scalable to millions of records

---

## 📚 Next Steps

1. **Run the migration** in Supabase
2. **Test donation flow** end-to-end
3. **Verify data** in Supabase dashboard
4. **Monitor performance** in production
5. **Set up backups** and monitoring
6. **Configure alerts** for large donations

---

## 🆘 Support

If you encounter issues:

1. Check Supabase logs
2. Review browser console
3. Verify RLS policies
4. Test with Supabase SQL Editor
5. Check network requests in DevTools

---

**Database Version**: 1.0.0  
**Last Updated**: February 15, 2026  
**Status**: ✅ Production Ready

---

## 🎯 Summary

✅ **Mock data removed**  
✅ **Real Supabase integration**  
✅ **PayPal donations tracked**  
✅ **Real-time updates**  
✅ **Secure RLS policies**  
✅ **Admin dashboard ready**  
✅ **Scalable architecture**  

**Your campaign platform is now production-ready!** 🚀

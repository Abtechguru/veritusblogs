# Gamification & Community Features Guide

## Overview
Complete guide to the gamification system, Africa Wise Words, Weekly Topics, Leaderboards, and Activity Tracking features in VERITUS INTERNATIONAL.

---

## 🎮 Features Implemented

### 1. **Africa Wise Words** (Flash Display Feature)
A beautiful floating widget that displays African proverbs, tales, and wisdom with moral lessons.

#### Features:
- **100+ African proverbs** from countries including:
  - Nigeria (Igbo, Yoruba, Hausa)
  - Ghana (Ashanti, Akan)
  - Kenya (Maasai, Kikuyu)
  - South Africa (Zulu)
  - Ethiopia, Tanzania, Rwanda, Egypt, Congo, Mali, Senegal, Zimbabwe, and more

#### Display Behavior:
- Appears automatically after 5 seconds on first visit
- Shows new wisdom every 3 minutes
- Auto-hides after 15 seconds
- Tracked per day (won't spam same day)
- Session storage prevents repetition

#### Design:
- Fixed bottom-right position
- Gradient amber/orange theme
- Animated sparkles icon
- Decorative pattern overlay
- "Next Wisdom" button for manual browsing
- Close button for dismissal

#### Categories:
- **Proverbs**: Traditional sayings
- **Tales**: Story-based wisdom
- **Sayings**: Common expressions

---

### 2. **Gamification System** (XP & Leveling)

#### XP Rewards:
- **Read Article**: +5 XP
- **Post Comment**: +10 XP
- **Share Article**: +15 XP
- **Like/React**: +2 XP
- **Weekly Topic Contribution**: +25 XP
- **Daily Login**: +10 XP

#### Level System:
- **Level 1** (Beginner): 0-99 XP
- **Level 2**: 100-249 XP
- **Level 3** (Intermediate): 250-499 XP
- **Level 4**: 500-999 XP
- **Level 5** (Advanced): 1000-1999 XP
- **Level 6**: 2000-3499 XP
- **Level 7** (Expert): 3500-5499 XP
- **Level 8**: 5500-7999 XP
- **Level 9**: 8000-11999 XP
- **Level 10** (Legend): 12000+ XP

#### Features:
- **Total XP**: Lifetime accumulated points
- **Weekly XP**: Resets every 7 days
- **Achievements**: Unlockable badges (future expansion)
- **Rank Display**: Weekly and all-time rankings

---

### 3. **Leaderboard Page** (`/leaderboard`)

#### Two Leaderboard Types:
1. **Weekly Top 50**: Based on weekly XP (resets every 7 days)
2. **All-Time Top 50**: Based on total lifetime XP

#### Features:
- **Medal System**: 
  - 🥇 Gold medal for 1st place
  - 🥈 Silver medal for 2nd place
  - 🥉 Bronze medal for 3rd place
  - Highlighted background for top 3
  
- **User Stats Card**: Shows logged-in user's:
  - Current level and badge
  - Total XP and weekly XP
  - Weekly ranking (if in top 10)
  
- **XP Earning Guide**: Sidebar showing all ways to earn XP

- **Recent Activities**: Last 5 community activities

#### Responsive Design:
- Mobile: Single column, stacked cards
- Tablet: 2-column grid
- Desktop: 3-column grid with sidebar

---

### 4. **Weekly Topic Page** (`/weekly-topic`)

#### Purpose:
Community discussion platform where users contribute to weekly topics and earn XP.

#### Features:
- **Active Topic Display**:
  - Title and description
  - Time remaining countdown
  - Contribution count
  - Category badge

- **Contribution System**:
  - Minimum 50 characters
  - Earn +25 XP per contribution
  - Like system for popular contributions
  - View count tracking

- **Sorting Options**:
  - **Most Popular**: Sorted by likes
  - **Most Recent**: Sorted by date

- **Weekly Leaderboard Sidebar**:
  - Top 10 readers this week
  - Real-time XP display
  - Direct ranking visualization

#### Contribution Card:
- Author avatar and name
- Timestamp
- Full content with formatting
- Like button (heart icon)
- View count
- Top 3 rank badges (#1, #2, #3)

---

### 5. **Recent Activities Component**

#### Displays:
- Last 10 (configurable) community activities
- Activity types with color-coded badges:
  - 📖 Read Article (blue)
  - 💬 Comment (green)
  - 🏆 Weekly Topic Contribution (purple)
  - 🔗 Share (orange)
  - ❤️ Reaction (pink)

#### Information Shown:
- User avatar and name
- Activity description
- XP earned
- Time elapsed ("2 hours ago", etc.)

#### Features:
- Real-time updates
- Smooth animations
- Hover effects
- Loading states

---

## 🔧 Technical Implementation

### Frontend Components:

1. **AfricaWiseWords.tsx**
   - Location: `/src/app/components/AfricaWiseWords.tsx`
   - Uses Motion for animations
   - Session/local storage for tracking
   - Auto-show/hide logic

2. **RecentActivities.tsx**
   - Location: `/src/app/components/RecentActivities.tsx`
   - Connects to GamificationContext
   - Real-time activity feed
   - Configurable limit prop

3. **LeaderboardPage.tsx**
   - Location: `/src/app/pages/LeaderboardPage.tsx`
   - Dual leaderboard tabs
   - User stats integration
   - Responsive medal system

4. **WeeklyTopicPage.tsx**
   - Location: `/src/app/pages/WeeklyTopicPage.tsx`
   - Contribution form with validation
   - Like/unlike functionality
   - Sorting and filtering

### Context & State Management:

**GamificationContext.tsx**
- Provides gamification data to entire app
- API integration for XP, leaderboards, activities
- `addActivity()` function for tracking user actions
- `refreshData()` for manual updates

### Backend API Endpoints:

#### Gamification:
- `GET /gamification/user-xp` - Get user XP profile
- `GET /gamification/leaderboard` - Get weekly & all-time leaderboards
- `GET /gamification/activities` - Get recent activities
- `POST /gamification/add-activity` - Add activity and award XP

#### Weekly Topics:
- `GET /weekly-topic/current` - Get active weekly topic
- `GET /weekly-topic/contributions` - Get all contributions
- `POST /weekly-topic/contribute` - Submit contribution
- `POST /weekly-topic/like` - Like/unlike contribution
- `POST /weekly-topic/create` - Create new topic (admin only)

### Data Storage (KV Store):

**Keys Used:**
- `xp:{userId}` - User XP profiles
- `activity:{activityId}` - Activity records
- `weekly-topic:{topicId}` - Weekly topics
- `contribution:{contributionId}` - User contributions
- `like:{userId}:{contributionId}` - Like records

---

## 📱 Responsive Design

### Mobile (< 768px):
- Single column layouts
- Stacked leaderboard entries
- Full-width contribution cards
- Compact Africa Wise Words popup
- Touch-optimized buttons (44px minimum)

### Tablet (768px - 1023px):
- 2-column grids
- Side-by-side leaderboards
- Larger text and spacing
- Medium-sized popups

### Desktop (1024px+):
- 3-column layouts with sidebar
- Large leaderboard tables
- Full navigation visible
- Optimal reading widths
- Hover effects active

---

## 🎨 Visual Design

### Color Schemes:

**Leaderboards:**
- Gradient header: Yellow → Orange → Red
- Top 3 background: Yellow-50 to Orange-50
- Medals: Gold, Silver, Bronze gradients

**Weekly Topics:**
- Gradient header: Purple → Blue
- Contribution cards: White/Gray-50
- Like button: Red on active
- Badges: Blue, Green, Purple

**Africa Wise Words:**
- Background: Amber-50 → Orange-50 → Yellow-50
- Header: Amber-600 → Orange-600
- Border: Amber-400
- Text: Serif italic for proverbs

### Animations:
- Fade in + slide up for entries
- Rotating sparkles icon
- Scale animation for popups
- Smooth hover transitions
- Loading skeletons

---

## 🚀 Usage Examples

### Award XP to User:
```typescript
import { useGamification, XP_REWARDS } from '../contexts/GamificationContext';

const { addActivity } = useGamification();

// When user reads article
await addActivity(
  'read_article', 
  'Read: How to Build Better Apps',
  XP_REWARDS.READ_ARTICLE
);

// When user comments
await addActivity(
  'comment',
  'Commented on article about React',
  XP_REWARDS.COMMENT
);
```

### Display Recent Activities:
```typescript
import { RecentActivities } from '../components/RecentActivities';

// Show last 10 activities
<RecentActivities limit={10} />

// Show last 5 activities
<RecentActivities limit={5} />
```

### Get Random Africa Wise Word:
```typescript
import { getRandomWiseWord } from '../data/africaWiseWords';

const wisdom = getRandomWiseWord();
console.log(wisdom.text); // Proverb text
console.log(wisdom.origin); // Country/tribe
console.log(wisdom.moralLesson); // Life lesson
console.log(wisdom.category); // proverb | tale | saying
```

---

## 🔐 Permissions

### Public (No Auth):
- View leaderboards
- View weekly topics
- View contributions
- See recent activities
- Receive Africa Wise Words

### Logged-In Users:
- Earn XP
- Submit contributions
- Like contributions
- Track personal progress
- Compete in rankings

### Admin Only:
- Create weekly topics
- View all analytics
- Manage user XP (future)

---

## 📊 Analytics & Tracking

### Tracked Metrics:
- User XP progression
- Activity type distribution
- Weekly engagement rates
- Contribution counts
- Like patterns
- Leaderboard movements

### Future Enhancements:
- Achievement system
- Streak tracking
- Custom badges
- Referral rewards
- Seasonal events
- Team competitions

---

## 🐛 Error Handling

### Frontend:
- Loading states for all API calls
- Error toasts for failed actions
- Graceful fallbacks for missing data
- Form validation for contributions
- Network error retry logic

### Backend:
- Detailed error logging
- Proper status codes
- Error messages in responses
- Input validation
- Auth verification

---

## 🎯 Best Practices

1. **Always award XP** when users interact meaningfully
2. **Track activities** for community visibility
3. **Validate contributions** before submission (50 char minimum)
4. **Reset weekly XP** every 7 days automatically
5. **Cache leaderboard data** for performance
6. **Animate UI changes** for better UX
7. **Show loading states** during data fetching
8. **Handle errors gracefully** with user-friendly messages

---

## 📝 Admin Tasks

### Create Weekly Topic:
```bash
POST /make-server-5bb3fa81/weekly-topic/create
{
  "title": "What Makes Great Leadership?",
  "description": "Share your thoughts on leadership qualities",
  "category": "politics",
  "duration": 7
}
```

### Monitor Leaderboards:
- Check weekly rankings every Monday
- Celebrate top contributors
- Feature outstanding contributions
- Announce winners in newsletter

---

## 🌟 Key Features Summary

✅ **100+ African Proverbs** with moral lessons  
✅ **Complete XP System** with 10 levels  
✅ **Weekly & All-Time Leaderboards** (top 50)  
✅ **Weekly Discussion Topics** with contributions  
✅ **Real-Time Activity Feed** for community  
✅ **Like System** for popular contributions  
✅ **Responsive Design** across all devices  
✅ **Gamification Context** for app-wide tracking  
✅ **Admin Tools** for topic management  
✅ **Full Backend API** with 8 new endpoints  

---

## 🎉 Conclusion

The VERITUS INTERNATIONAL platform now has a complete gamification and community engagement system that:
- Encourages user participation through XP rewards
- Celebrates African wisdom and culture
- Fosters community discussion and contribution
- Tracks and displays user achievements
- Provides competitive leaderboards
- Creates sticky, engaging user experiences

All features are production-ready, fully responsive, and integrated with the existing backend infrastructure!

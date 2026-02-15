import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Create Supabase client for server-side operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Middleware to verify authentication
async function verifyAuth(authHeader: string | null) {
  if (!authHeader) return null;
  
  const token = authHeader.split(' ')[1];
  if (!token) return null;

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return null;

  // Get user profile from KV store
  const userProfile = await kv.get(`user:${user.id}`);
  return userProfile ? { ...user, ...userProfile } : user;
}

// Health check endpoint
app.get("/make-server-5bb3fa81/health", (c) => {
  return c.json({ status: "ok" });
});

// ==================== AUTH ENDPOINTS ====================

// User signup (creates pending author or approved reader)
app.post("/make-server-5bb3fa81/signup", async (c) => {
  try {
    const { email, password, name, role } = await c.req.json();

    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm email since email server hasn't been configured
      email_confirm: true
    });

    if (error) {
      console.log(`Signup error: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    // Create user profile in KV store
    const userProfile = {
      id: data.user!.id,
      email,
      name,
      role: role === 'author' ? 'pending-author' : 'reader',
      status: role === 'author' ? 'pending' : 'approved',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      bio: '',
      createdAt: new Date().toISOString(),
    };

    await kv.set(`user:${data.user!.id}`, userProfile);

    // If author, add to pending approvals
    if (role === 'author') {
      await kv.set(`pending-author:${data.user!.id}`, {
        userId: data.user!.id,
        email,
        name,
        requestedAt: new Date().toISOString(),
      });
    }

    return c.json({ 
      user: userProfile,
      message: role === 'author' ? 'Author account pending approval' : 'Account created successfully'
    });
  } catch (error: any) {
    console.log(`Signup exception: ${error.message}`);
    return c.json({ error: 'Signup failed' }, 500);
  }
});

// User signin
app.post("/make-server-5bb3fa81/signin", async (c) => {
  try {
    const { email, password } = await c.req.json();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log(`Signin error: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    // Get user profile
    const userProfile = await kv.get(`user:${data.user.id}`);

    return c.json({ 
      session: data.session,
      user: userProfile || {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name || email.split('@')[0],
        role: 'reader',
        status: 'approved'
      }
    });
  } catch (error: any) {
    console.log(`Signin exception: ${error.message}`);
    return c.json({ error: 'Signin failed' }, 500);
  }
});

// Get current user session
app.get("/make-server-5bb3fa81/session", async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    return c.json({ user });
  } catch (error: any) {
    console.log(`Session check exception: ${error.message}`);
    return c.json({ error: 'Session check failed' }, 500);
  }
});

// Signout
app.post("/make-server-5bb3fa81/signout", async (c) => {
  try {
    const token = c.req.header('Authorization')?.split(' ')[1];
    if (token) {
      await supabase.auth.admin.signOut(token);
    }
    return c.json({ success: true });
  } catch (error: any) {
    console.log(`Signout exception: ${error.message}`);
    return c.json({ error: 'Signout failed' }, 500);
  }
});

// ==================== USER MANAGEMENT ENDPOINTS ====================

// Get all users (admin only)
app.get("/make-server-5bb3fa81/users", async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user || user.role !== 'admin') {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const users = await kv.getByPrefix('user:');
    return c.json({ users });
  } catch (error: any) {
    console.log(`Get users error: ${error.message}`);
    return c.json({ error: 'Failed to fetch users' }, 500);
  }
});

// Update user role/status (admin only)
app.put("/make-server-5bb3fa81/users/:userId", async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user || user.role !== 'admin') {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userId = c.req.param('userId');
    const { role, status } = await c.req.json();

    const userProfile = await kv.get(`user:${userId}`);
    if (!userProfile) {
      return c.json({ error: 'User not found' }, 404);
    }

    const updatedProfile = { ...userProfile, role, status };
    await kv.set(`user:${userId}`, updatedProfile);

    // If approving an author, remove from pending
    if (role === 'author' && status === 'approved') {
      await kv.del(`pending-author:${userId}`);
    }

    return c.json({ user: updatedProfile });
  } catch (error: any) {
    console.log(`Update user error: ${error.message}`);
    return c.json({ error: 'Failed to update user' }, 500);
  }
});

// Get pending author approvals (admin only)
app.get("/make-server-5bb3fa81/pending-authors", async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user || user.role !== 'admin') {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const pendingAuthors = await kv.getByPrefix('pending-author:');
    return c.json({ pendingAuthors });
  } catch (error: any) {
    console.log(`Get pending authors error: ${error.message}`);
    return c.json({ error: 'Failed to fetch pending authors' }, 500);
  }
});

// ==================== ARTICLE ENDPOINTS ====================

// Get all articles (with optional filters)
app.get("/make-server-5bb3fa81/articles", async (c) => {
  try {
    const category = c.req.query('category');
    const featured = c.req.query('featured');
    const authorId = c.req.query('authorId');

    let articles = await kv.getByPrefix('article:');

    // Apply filters
    if (category) {
      articles = articles.filter((a: any) => a.category === category);
    }
    if (featured) {
      articles = articles.filter((a: any) => a.featured === (featured === 'true'));
    }
    if (authorId) {
      articles = articles.filter((a: any) => a.authorId === authorId);
    }

    // Sort by publishedAt (newest first)
    articles.sort((a: any, b: any) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return c.json({ articles });
  } catch (error: any) {
    console.log(`Get articles error: ${error.message}`);
    return c.json({ error: 'Failed to fetch articles' }, 500);
  }
});

// Get single article
app.get("/make-server-5bb3fa81/articles/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const article = await kv.get(`article:${id}`);

    if (!article) {
      return c.json({ error: 'Article not found' }, 404);
    }

    // Increment view count
    article.views = (article.views || 0) + 1;
    await kv.set(`article:${id}`, article);

    return c.json({ article });
  } catch (error: any) {
    console.log(`Get article error: ${error.message}`);
    return c.json({ error: 'Failed to fetch article' }, 500);
  }
});

// Create article (authors and admins only)
app.post("/make-server-5bb3fa81/articles", async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user || (user.role !== 'author' && user.role !== 'admin')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    if (user.status !== 'approved') {
      return c.json({ error: 'Account not approved yet' }, 403);
    }

    const articleData = await c.req.json();
    const articleId = crypto.randomUUID();

    const article = {
      id: articleId,
      ...articleData,
      authorId: user.id,
      authorName: user.name,
      authorAvatar: user.avatar,
      publishedAt: new Date().toISOString(),
      views: 0,
      slug: articleData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    };

    await kv.set(`article:${articleId}`, article);

    return c.json({ article });
  } catch (error: any) {
    console.log(`Create article error: ${error.message}`);
    return c.json({ error: 'Failed to create article' }, 500);
  }
});

// Update article (author or admin only)
app.put("/make-server-5bb3fa81/articles/:id", async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const id = c.req.param('id');
    const article = await kv.get(`article:${id}`);

    if (!article) {
      return c.json({ error: 'Article not found' }, 404);
    }

    // Check permissions
    if (user.role !== 'admin' && article.authorId !== user.id) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const updates = await c.req.json();
    const updatedArticle = { 
      ...article, 
      ...updates,
      slug: updates.title ? updates.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : article.slug
    };

    await kv.set(`article:${id}`, updatedArticle);

    return c.json({ article: updatedArticle });
  } catch (error: any) {
    console.log(`Update article error: ${error.message}`);
    return c.json({ error: 'Failed to update article' }, 500);
  }
});

// Delete article (author or admin only)
app.delete("/make-server-5bb3fa81/articles/:id", async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const id = c.req.param('id');
    const article = await kv.get(`article:${id}`);

    if (!article) {
      return c.json({ error: 'Article not found' }, 404);
    }

    // Check permissions
    if (user.role !== 'admin' && article.authorId !== user.id) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    await kv.del(`article:${id}`);

    return c.json({ success: true });
  } catch (error: any) {
    console.log(`Delete article error: ${error.message}`);
    return c.json({ error: 'Failed to delete article' }, 500);
  }
});

// ==================== COMMENT ENDPOINTS ====================

// Get comments for an article
app.get("/make-server-5bb3fa81/articles/:articleId/comments", async (c) => {
  try {
    const articleId = c.req.param('articleId');
    const comments = await kv.getByPrefix(`comment:${articleId}:`);

    return c.json({ comments });
  } catch (error: any) {
    console.log(`Get comments error: ${error.message}`);
    return c.json({ error: 'Failed to fetch comments' }, 500);
  }
});

// Create comment (authenticated users only)
app.post("/make-server-5bb3fa81/articles/:articleId/comments", async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const articleId = c.req.param('articleId');
    const { content, parentId } = await c.req.json();
    
    const commentId = crypto.randomUUID();
    const comment = {
      id: commentId,
      articleId,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      content,
      parentId: parentId || null,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`comment:${articleId}:${commentId}`, comment);

    return c.json({ comment });
  } catch (error: any) {
    console.log(`Create comment error: ${error.message}`);
    return c.json({ error: 'Failed to create comment' }, 500);
  }
});

// ==================== NEWSLETTER ENDPOINTS ====================

// Subscribe to newsletter
app.post("/make-server-5bb3fa81/newsletter/subscribe", async (c) => {
  try {
    const { email } = await c.req.json();
    
    const subscriptionId = crypto.randomUUID();
    const subscription = {
      id: subscriptionId,
      email,
      subscribedAt: new Date().toISOString(),
    };

    await kv.set(`newsletter:${email}`, subscription);

    return c.json({ success: true, message: 'Subscribed successfully' });
  } catch (error: any) {
    console.log(`Newsletter subscribe error: ${error.message}`);
    return c.json({ error: 'Failed to subscribe' }, 500);
  }
});

// Get all newsletter subscribers (admin only)
app.get("/make-server-5bb3fa81/newsletter/subscribers", async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user || user.role !== 'admin') {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const subscribers = await kv.getByPrefix('newsletter:');

    return c.json({ subscribers });
  } catch (error: any) {
    console.log(`Get subscribers error: ${error.message}`);
    return c.json({ error: 'Failed to fetch subscribers' }, 500);
  }
});

// Send broadcast email (admin only)
app.post("/make-server-5bb3fa81/broadcast", async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user || user.role !== 'admin') {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { subject, message, recipients } = await c.req.json();

    // In production, this would integrate with an email service
    // For now, we'll just log the broadcast
    const broadcast = {
      id: crypto.randomUUID(),
      subject,
      message,
      recipients,
      sentAt: new Date().toISOString(),
      sentBy: user.id,
    };

    await kv.set(`broadcast:${broadcast.id}`, broadcast);

    return c.json({ 
      success: true, 
      message: 'Broadcast sent successfully',
      broadcast 
    });
  } catch (error: any) {
    console.log(`Broadcast error: ${error.message}`);
    return c.json({ error: 'Failed to send broadcast' }, 500);
  }
});

// ==================== ANALYTICS ENDPOINTS ====================

// Track analytics event
app.post("/make-server-5bb3fa81/analytics/track", async (c) => {
  try {
    const { event, data } = await c.req.json();
    
    const analyticsId = crypto.randomUUID();
    const analytics = {
      id: analyticsId,
      event,
      data,
      timestamp: new Date().toISOString(),
    };

    await kv.set(`analytics:${new Date().toISOString()}:${analyticsId}`, analytics);

    return c.json({ success: true });
  } catch (error: any) {
    console.log(`Analytics track error: ${error.message}`);
    return c.json({ error: 'Failed to track event' }, 500);
  }
});

// Get analytics (admin only)
app.get("/make-server-5bb3fa81/analytics", async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user || user.role !== 'admin') {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const events = await kv.getByPrefix('analytics:');

    return c.json({ events });
  } catch (error: any) {
    console.log(`Get analytics error: ${error.message}`);
    return c.json({ error: 'Failed to fetch analytics' }, 500);
  }
});

// ====================  GAMIFICATION ENDPOINTS ====================

// Get user XP and stats
app.get("/make-server-5bb3fa81/gamification/user-xp", async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Get or create user XP profile
    let userXP = await kv.get(`xp:${user.id}`);
    
    if (!userXP) {
      userXP = {
        userId: user.id,
        userName: user.name,
        avatar: user.avatar,
        totalXP: 0,
        weeklyXP: 0,
        level: 1,
        achievements: [],
        lastWeekReset: new Date().toISOString(),
      };
      await kv.set(`xp:${user.id}`, userXP);
    }

    // Calculate weekly rank
    const allUsers = await kv.getByPrefix('xp:');
    const sortedByWeeklyXP = allUsers.sort((a, b) => (b.weeklyXP || 0) - (a.weeklyXP || 0));
    const weeklyRank = sortedByWeeklyXP.findIndex(u => u.userId === user.id) + 1;

    return c.json({ userXP: { ...userXP, weeklyRank } });
  } catch (error: any) {
    console.log(`Get user XP error: ${error.message}`);
    return c.json({ error: 'Failed to fetch user XP' }, 500);
  }
});

// Get leaderboards
app.get("/make-server-5bb3fa81/gamification/leaderboard", async (c) => {
  try {
    const allUsers = await kv.getByPrefix('xp:');

    // Weekly leaderboard
    const weekly = allUsers
      .sort((a, b) => (b.weeklyXP || 0) - (a.weeklyXP || 0))
      .slice(0, 50);

    // All-time leaderboard
    const allTime = allUsers
      .sort((a, b) => (b.totalXP || 0) - (a.totalXP || 0))
      .slice(0, 50);

    return c.json({ weekly, allTime });
  } catch (error: any) {
    console.log(`Get leaderboard error: ${error.message}`);
    return c.json({ error: 'Failed to fetch leaderboard' }, 500);
  }
});

// Get recent activities
app.get("/make-server-5bb3fa81/gamification/activities", async (c) => {
  try {
    const activities = await kv.getByPrefix('activity:');
    const sorted = activities.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ).slice(0, 50);

    return c.json({ activities: sorted });
  } catch (error: any) {
    console.log(`Get activities error: ${error.message}`);
    return c.json({ error: 'Failed to fetch activities' }, 500);
  }
});

// Add activity and award XP
app.post("/make-server-5bb3fa81/gamification/add-activity", async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { type, description, xpAmount } = await c.req.json();

    // Update user XP
    let userXP = await kv.get(`xp:${user.id}`);
    if (!userXP) {
      userXP = {
        userId: user.id,
        userName: user.name,
        avatar: user.avatar,
        totalXP: 0,
        weeklyXP: 0,
        level: 1,
        achievements: [],
        lastWeekReset: new Date().toISOString(),
      };
    }

    // Check if week has passed and reset weekly XP
    const lastReset = new Date(userXP.lastWeekReset);
    const now = new Date();
    const daysDiff = (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24);
    
    if (daysDiff >= 7) {
      userXP.weeklyXP = 0;
      userXP.lastWeekReset = now.toISOString();
    }

    userXP.totalXP += xpAmount;
    userXP.weeklyXP += xpAmount;

    // Calculate new level
    const getLevelFromXP = (xp: number): number => {
      if (xp < 100) return 1;
      if (xp < 250) return 2;
      if (xp < 500) return 3;
      if (xp < 1000) return 4;
      if (xp < 2000) return 5;
      if (xp < 3500) return 6;
      if (xp < 5500) return 7;
      if (xp < 8000) return 8;
      if (xp < 12000) return 9;
      return 10;
    };

    userXP.level = getLevelFromXP(userXP.totalXP);
    await kv.set(`xp:${user.id}`, userXP);

    // Create activity record
    const activity = {
      id: crypto.randomUUID(),
      userId: user.id,
      userName: user.name,
      avatar: user.avatar,
      type,
      description,
      xpEarned: xpAmount,
      timestamp: new Date().toISOString(),
    };

    await kv.set(`activity:${activity.id}`, activity);

    return c.json({ success: true, userXP, activity });
  } catch (error: any) {
    console.log(`Add activity error: ${error.message}`);
    return c.json({ error: 'Failed to add activity' }, 500);
  }
});

// ==================== WEEKLY TOPIC ENDPOINTS ====================

// Get current active weekly topic
app.get("/make-server-5bb3fa81/weekly-topic/current", async (c) => {
  try {
    const topics = await kv.getByPrefix('weekly-topic:');
    const now = new Date();
    
    // Find active topic
    const activeTopic = topics.find(topic => {
      const start = new Date(topic.startDate);
      const end = new Date(topic.endDate);
      return now >= start && now <= end && topic.isActive;
    });

    return c.json({ topic: activeTopic || null });
  } catch (error: any) {
    console.log(`Get current topic error: ${error.message}`);
    return c.json({ error: 'Failed to fetch current topic' }, 500);
  }
});

// Get contributions for current topic
app.get("/make-server-5bb3fa81/weekly-topic/contributions", async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    const contributions = await kv.getByPrefix('contribution:');

    // Add hasLiked field if user is logged in
    if (user) {
      const userLikes = await kv.getByPrefix(`like:${user.id}:`);
      const likedContributionIds = new Set(userLikes.map(like => like.contributionId));
      
      contributions.forEach(contrib => {
        contrib.hasLiked = likedContributionIds.has(contrib.id);
      });
    }

    return c.json({ contributions });
  } catch (error: any) {
    console.log(`Get contributions error: ${error.message}`);
    return c.json({ error: 'Failed to fetch contributions' }, 500);
  }
});

// Submit contribution to weekly topic
app.post("/make-server-5bb3fa81/weekly-topic/contribute", async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { topicId, content } = await c.req.json();

    if (!content || content.length < 50) {
      return c.json({ error: 'Contribution must be at least 50 characters' }, 400);
    }

    // Check if topic exists and is active
    const topic = await kv.get(`weekly-topic:${topicId}`);
    if (!topic || !topic.isActive) {
      return c.json({ error: 'Topic not found or inactive' }, 404);
    }

    // Create contribution
    const contribution = {
      id: crypto.randomUUID(),
      topicId,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      content,
      likes: 0,
      views: 0,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`contribution:${contribution.id}`, contribution);

    return c.json({ success: true, contribution });
  } catch (error: any) {
    console.log(`Submit contribution error: ${error.message}`);
    return c.json({ error: 'Failed to submit contribution' }, 500);
  }
});

// Like a contribution
app.post("/make-server-5bb3fa81/weekly-topic/like", async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { contributionId } = await c.req.json();

    // Check if already liked
    const existingLike = await kv.get(`like:${user.id}:${contributionId}`);
    
    if (existingLike) {
      // Unlike - remove like
      await kv.del(`like:${user.id}:${contributionId}`);
      
      const contribution = await kv.get(`contribution:${contributionId}`);
      if (contribution) {
        contribution.likes = Math.max(0, (contribution.likes || 0) - 1);
        await kv.set(`contribution:${contributionId}`, contribution);
      }
    } else {
      // Like - add like
      await kv.set(`like:${user.id}:${contributionId}`, {
        userId: user.id,
        contributionId,
        createdAt: new Date().toISOString(),
      });
      
      const contribution = await kv.get(`contribution:${contributionId}`);
      if (contribution) {
        contribution.likes = (contribution.likes || 0) + 1;
        await kv.set(`contribution:${contributionId}`, contribution);
      }
    }

    return c.json({ success: true });
  } catch (error: any) {
    console.log(`Like contribution error: ${error.message}`);
    return c.json({ error: 'Failed to like contribution' }, 500);
  }
});

// Create weekly topic (admin only)
app.post("/make-server-5bb3fa81/weekly-topic/create", async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user || user.role !== 'admin') {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { title, description, category, duration } = await c.req.json();

    const now = new Date();
    const endDate = new Date(now.getTime() + (duration || 7) * 24 * 60 * 60 * 1000);

    const topic = {
      id: crypto.randomUUID(),
      title,
      description,
      category: category || 'general',
      startDate: now.toISOString(),
      endDate: endDate.toISOString(),
      isActive: true,
      createdBy: user.id,
    };

    await kv.set(`weekly-topic:${topic.id}`, topic);

    return c.json({ success: true, topic });
  } catch (error: any) {
    console.log(`Create topic error: ${error.message}`);
    return c.json({ error: 'Failed to create topic' }, 500);
  }
});

// ==================== STORIES ENDPOINTS ====================

// Get all active stories (grouped by user)
app.get("/make-server-5bb3fa81/stories", async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    const allStories = await kv.getByPrefix('story:');
    const now = new Date();

    // Filter out expired stories
    const activeStories = allStories.filter(story => {
      const expiresAt = new Date(story.expiresAt);
      return now < expiresAt;
    });

    // If no stories exist, create sample stories for demo
    if (activeStories.length === 0) {
      const sampleStories = [
        // POLITICS STORIES
        {
          id: 'story-politics-1',
          userId: 'politics-analyst-1',
          userName: 'Political Desk',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=politics1',
          mediaUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=500',
          mediaType: 'image',
          caption: '🗳️ Election updates from Abuja - Historic voter turnout',
          category: 'politics',
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          views: 245,
        },
        {
          id: 'story-politics-2',
          userId: 'politics-analyst-1',
          userName: 'Political Desk',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=politics1',
          mediaUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=500',
          mediaType: 'image',
          caption: '📊 New policy announcement impacts millions',
          category: 'politics',
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 23 * 60 * 60 * 1000).toISOString(),
          views: 189,
        },
        {
          id: 'story-politics-3',
          userId: 'politics-analyst-2',
          userName: 'Senate Watch',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=senate',
          mediaUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500',
          mediaType: 'image',
          caption: '⚖️ Constitutional reform debate heats up',
          category: 'politics',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(),
          views: 156,
        },
        
        // SPORTS STORIES
        {
          id: 'story-sports-1',
          userId: 'sports-desk-1',
          userName: 'Sports Central',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sports1',
          mediaUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500',
          mediaType: 'image',
          caption: '⚽ Super Eagles score last-minute winner!',
          category: 'sports',
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          views: 892,
        },
        {
          id: 'story-sports-2',
          userId: 'sports-desk-1',
          userName: 'Sports Central',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sports1',
          mediaUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500',
          mediaType: 'image',
          caption: '🏃‍♂️ Marathon champion breaks national record',
          category: 'sports',
          createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 23.5 * 60 * 60 * 1000).toISOString(),
          views: 567,
        },
        {
          id: 'story-sports-3',
          userId: 'basketball-zone',
          userName: 'Basketball Zone',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=basketball',
          mediaUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500',
          mediaType: 'image',
          caption: '🏀 Championship finals tonight - Who will win?',
          category: 'sports',
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 23 * 60 * 60 * 1000).toISOString(),
          views: 423,
        },
        {
          id: 'story-sports-4',
          userId: 'tennis-world',
          userName: 'Tennis World',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tennis',
          mediaUrl: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=500',
          mediaType: 'image',
          caption: '🎾 Grand Slam update: African star advances!',
          category: 'sports',
          createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 21 * 60 * 60 * 1000).toISOString(),
          views: 298,
        },

        // CULTURE STORIES
        {
          id: 'story-culture-1',
          userId: 'culture-hub-1',
          userName: 'Culture Hub',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=culture1',
          mediaUrl: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=500',
          mediaType: 'image',
          caption: '🎭 Traditional festival celebrates heritage',
          category: 'culture',
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          views: 678,
        },
        {
          id: 'story-culture-2',
          userId: 'culture-hub-1',
          userName: 'Culture Hub',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=culture1',
          mediaUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500',
          mediaType: 'image',
          caption: '🥁 Drumming ceremony honors ancestors',
          category: 'culture',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(),
          views: 445,
        },
        {
          id: 'story-culture-3',
          userId: 'african-arts',
          userName: 'African Arts',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arts',
          mediaUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=500',
          mediaType: 'image',
          caption: '🎨 Contemporary African art exhibition opens',
          category: 'culture',
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000).toISOString(),
          views: 523,
        },
        {
          id: 'story-culture-4',
          userId: 'fashion-africa',
          userName: 'Fashion Africa',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fashion',
          mediaUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500',
          mediaType: 'image',
          caption: '👗 Fashion Week showcases bold new designs',
          category: 'culture',
          createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 19 * 60 * 60 * 1000).toISOString(),
          views: 834,
        },

        // WEATHER STORIES
        {
          id: 'story-weather-1',
          userId: 'weather-team',
          userName: 'Weather Alert',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=weather',
          mediaUrl: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=500',
          mediaType: 'image',
          caption: '🌧️ Heavy rainfall expected this weekend',
          category: 'weather',
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          views: 1245,
        },
        {
          id: 'story-weather-2',
          userId: 'weather-team',
          userName: 'Weather Alert',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=weather',
          mediaUrl: 'https://images.unsplash.com/photo-1601134467661-3d775b999c8b?w=500',
          mediaType: 'image',
          caption: '☀️ Sunny days ahead - Perfect for outdoor activities',
          category: 'weather',
          createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 21 * 60 * 60 * 1000).toISOString(),
          views: 987,
        },
        {
          id: 'story-weather-3',
          userId: 'climate-watch',
          userName: 'Climate Watch',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=climate',
          mediaUrl: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=500',
          mediaType: 'image',
          caption: '🌪️ Storm warning issued for coastal regions',
          category: 'weather',
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 23 * 60 * 60 * 1000).toISOString(),
          views: 2134,
        },

        // CELEBRITY STORIES
        {
          id: 'story-celeb-1',
          userId: 'entertainment-buzz',
          userName: 'Entertainment Buzz',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=celeb1',
          mediaUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500',
          mediaType: 'image',
          caption: '🎬 Nollywood star wins international award!',
          category: 'celebrity',
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          views: 3456,
        },
        {
          id: 'story-celeb-2',
          userId: 'entertainment-buzz',
          userName: 'Entertainment Buzz',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=celeb1',
          mediaUrl: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=500',
          mediaType: 'image',
          caption: '🎤 Music legend announces comeback tour',
          category: 'celebrity',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(),
          views: 2789,
        },
        {
          id: 'story-celeb-3',
          userId: 'afrobeats-news',
          userName: 'Afrobeats News',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=afrobeats',
          mediaUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500',
          mediaType: 'image',
          caption: '🎵 New album drops - Already trending!',
          category: 'celebrity',
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000).toISOString(),
          views: 4123,
        },
        {
          id: 'story-celeb-4',
          userId: 'celebrity-insider',
          userName: 'Celebrity Insider',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=insider',
          mediaUrl: 'https://images.unsplash.com/photo-1445810694374-0a94739e4a03?w=500',
          mediaType: 'image',
          caption: '💍 Celebrity couple announces engagement',
          category: 'celebrity',
          createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
          views: 5678,
        },

        // WEEKLY TOPICS STORIES
        {
          id: 'story-weekly-1',
          userId: 'weekly-topics',
          userName: 'Weekly Topics',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=weekly',
          mediaUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500',
          mediaType: 'image',
          caption: '📰 This Week: Climate Action in Africa',
          category: 'weekly-topics',
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          views: 1567,
        },
        {
          id: 'story-weekly-2',
          userId: 'weekly-topics',
          userName: 'Weekly Topics',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=weekly',
          mediaUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500',
          mediaType: 'image',
          caption: '💼 Entrepreneurship Spotlight: Tech Startups',
          category: 'weekly-topics',
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 23 * 60 * 60 * 1000).toISOString(),
          views: 1234,
        },
        {
          id: 'story-weekly-3',
          userId: 'discussion-forum',
          userName: 'Discussion Forum',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=forum',
          mediaUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500',
          mediaType: 'image',
          caption: '🗣️ Community voices: Education reform debate',
          category: 'weekly-topics',
          createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 21 * 60 * 60 * 1000).toISOString(),
          views: 987,
        },

        // GENERAL ARTICLES STORIES
        {
          id: 'story-article-1',
          userId: 'news-desk',
          userName: 'News Desk',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=news1',
          mediaUrl: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=500',
          mediaType: 'image',
          caption: '📱 Tech innovation transforming education',
          category: 'articles',
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          views: 876,
        },
        {
          id: 'story-article-2',
          userId: 'news-desk',
          userName: 'News Desk',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=news1',
          mediaUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=500',
          mediaType: 'image',
          caption: '🏥 Healthcare breakthrough: New treatment available',
          category: 'articles',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(),
          views: 654,
        },
        {
          id: 'story-article-3',
          userId: 'investigative-team',
          userName: 'Investigative Team',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=investigative',
          mediaUrl: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=500',
          mediaType: 'image',
          caption: '🔍 Special report: Infrastructure development',
          category: 'articles',
          createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 19 * 60 * 60 * 1000).toISOString(),
          views: 543,
        },
        {
          id: 'story-article-4',
          userId: 'business-watch',
          userName: 'Business Watch',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=business',
          mediaUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500',
          mediaType: 'image',
          caption: '📊 Economic growth reaches new milestone',
          category: 'articles',
          createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 17 * 60 * 60 * 1000).toISOString(),
          views: 789,
        },

        // REELS-RELATED STORIES
        {
          id: 'story-reel-1',
          userId: 'viral-reels',
          userName: 'Viral Reels',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=viral',
          mediaUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500',
          mediaType: 'image',
          caption: '🎥 Behind the scenes: Today\'s viral reel',
          category: 'reels',
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          views: 6789,
        },
        {
          id: 'story-reel-2',
          userId: 'viral-reels',
          userName: 'Viral Reels',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=viral',
          mediaUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500',
          mediaType: 'image',
          caption: '🔥 Trending now: Dance challenge goes viral',
          category: 'reels',
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 23 * 60 * 60 * 1000).toISOString(),
          views: 8934,
        },
        {
          id: 'story-reel-3',
          userId: 'comedy-central',
          userName: 'Comedy Central',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=comedy',
          mediaUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500',
          mediaType: 'image',
          caption: '😂 Comedy sketch breaking records',
          category: 'reels',
          createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 21 * 60 * 60 * 1000).toISOString(),
          views: 7654,
        },

        // MORE DIVERSE CONTENT
        {
          id: 'story-tech-1',
          userId: 'tech-today',
          userName: 'Tech Today',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech',
          mediaUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500',
          mediaType: 'image',
          caption: '💻 AI revolution: What it means for Africa',
          category: 'articles',
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000).toISOString(),
          views: 1876,
        },
        {
          id: 'story-food-1',
          userId: 'foodie-central',
          userName: 'Foodie Central',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=food',
          mediaUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500',
          mediaType: 'image',
          caption: '🍲 Traditional cuisine making global waves',
          category: 'culture',
          createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
          views: 2345,
        },
        {
          id: 'story-travel-1',
          userId: 'travel-africa',
          userName: 'Travel Africa',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=travel',
          mediaUrl: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=500',
          mediaType: 'image',
          caption: '✈️ Hidden gems: Must-visit destinations',
          category: 'culture',
          createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 16 * 60 * 60 * 1000).toISOString(),
          views: 3456,
        },
        {
          id: 'story-health-1',
          userId: 'health-wellness',
          userName: 'Health & Wellness',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=health',
          mediaUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500',
          mediaType: 'image',
          caption: '🏃‍♀️ Fitness tips for busy professionals',
          category: 'articles',
          createdAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 15 * 60 * 60 * 1000).toISOString(),
          views: 1654,
        },
        {
          id: 'story-environment-1',
          userId: 'green-planet',
          userName: 'Green Planet',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=green',
          mediaUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500',
          mediaType: 'image',
          caption: '🌍 Conservation success: Wildlife population rebounds',
          category: 'articles',
          createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 14 * 60 * 60 * 1000).toISOString(),
          views: 2987,
        },
        {
          id: 'story-education-1',
          userId: 'edu-insights',
          userName: 'Education Insights',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=education',
          mediaUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500',
          mediaType: 'image',
          caption: '📚 Scholarship opportunities for 2026',
          category: 'articles',
          createdAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 13 * 60 * 60 * 1000).toISOString(),
          views: 4321,
        },
        {
          id: 'story-music-1',
          userId: 'music-nation',
          userName: 'Music Nation',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=music',
          mediaUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500',
          mediaType: 'image',
          caption: '🎸 Music festival lineup announced - Epic!',
          category: 'celebrity',
          createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
          views: 5432,
        },
      ];
      
      for (const story of sampleStories) {
        await kv.set(`story:${story.id}`, story);
      }
      activeStories.push(...sampleStories);
    }

    // Group stories by user
    const groupedStories: any = {};
    activeStories.forEach(story => {
      if (!groupedStories[story.userId]) {
        groupedStories[story.userId] = {
          userId: story.userId,
          userName: story.userName,
          userAvatar: story.userAvatar,
          stories: [],
          hasViewed: false,
        };
      }
      groupedStories[story.userId].stories.push(story);
    });

    // Check if user has viewed each group
    if (user) {
      const viewedStories = await kv.getByPrefix(`story-view:${user.id}:`);
      const viewedUserIds = new Set(viewedStories.map(v => v.storyUserId));
      
      Object.keys(groupedStories).forEach(userId => {
        groupedStories[userId].hasViewed = viewedUserIds.has(userId);
      });
    }

    const storyGroups = Object.values(groupedStories);

    return c.json({ storyGroups });
  } catch (error: any) {
    console.log(`Get stories error: ${error.message}`);
    return c.json({ error: 'Failed to fetch stories' }, 500);
  }
});

// Create story (authenticated users)
app.post("/make-server-5bb3fa81/stories/create", async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { mediaUrl, mediaType, caption } = await c.req.json();

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours

    const story = {
      id: crypto.randomUUID(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      mediaUrl,
      mediaType: mediaType || 'image',
      caption: caption || '',
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      views: 0,
    };

    await kv.set(`story:${story.id}`, story);

    return c.json({ success: true, story });
  } catch (error: any) {
    console.log(`Create story error: ${error.message}`);
    return c.json({ error: 'Failed to create story' }, 500);
  }
});

// View story
app.post("/make-server-5bb3fa81/stories/:storyId/view", async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const storyId = c.req.param('storyId');
    const story = await kv.get(`story:${storyId}`);

    if (!story) {
      return c.json({ error: 'Story not found' }, 404);
    }

    // Increment views
    story.views = (story.views || 0) + 1;
    await kv.set(`story:${storyId}`, story);

    // Mark as viewed by user
    await kv.set(`story-view:${user.id}:${story.userId}`, {
      userId: user.id,
      storyUserId: story.userId,
      viewedAt: new Date().toISOString(),
    });

    return c.json({ success: true });
  } catch (error: any) {
    console.log(`View story error: ${error.message}`);
    return c.json({ error: 'Failed to record view' }, 500);
  }
});

// ==================== REELS ENDPOINTS ====================

// Get all reels
app.get("/make-server-5bb3fa81/reels", async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    const allReels = await kv.getByPrefix('reel:');

    // If no reels exist, create sample reels for demo
    if (allReels.length === 0) {
      const sampleReels = [
        {
          id: 'reel-1',
          userId: 'demo-user-1',
          userName: 'John Doe',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          thumbnailUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500',
          caption: 'Amazing content from Lagos! Check this out 🔥',
          category: 'entertainment',
          likes: 1234,
          comments: 56,
          shares: 23,
          views: 5678,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'reel-2',
          userId: 'demo-user-2',
          userName: 'Jane Smith',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          thumbnailUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500',
          caption: 'Exploring the beauty of Nigeria 🇳🇬',
          category: 'travel',
          likes: 890,
          comments: 34,
          shares: 12,
          views: 3456,
          createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'reel-3',
          userId: 'demo-user-3',
          userName: 'Mike Johnson',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          thumbnailUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500',
          caption: 'Tech innovation in Africa! 💡',
          category: 'technology',
          likes: 567,
          comments: 23,
          shares: 8,
          views: 2345,
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
      ];
      
      for (const reel of sampleReels) {
        await kv.set(`reel:${reel.id}`, reel);
      }
      allReels.push(...sampleReels);
    }

    // Sort by creation date (newest first)
    const sortedReels = allReels.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Add hasLiked and hasSaved fields if user is logged in
    if (user) {
      const userLikes = await kv.getByPrefix(`reel-like:${user.id}:`);
      const userSaves = await kv.getByPrefix(`reel-save:${user.id}:`);
      
      const likedReelIds = new Set(userLikes.map(like => like.reelId));
      const savedReelIds = new Set(userSaves.map(save => save.reelId));

      sortedReels.forEach(reel => {
        reel.hasLiked = likedReelIds.has(reel.id);
        reel.hasSaved = savedReelIds.has(reel.id);
      });
    }

    return c.json({ reels: sortedReels });
  } catch (error: any) {
    console.log(`Get reels error: ${error.message}`);
    return c.json({ error: 'Failed to fetch reels' }, 500);
  }
});

// Create reel (authenticated users)
app.post("/make-server-5bb3fa81/reels/create", async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { videoUrl, thumbnailUrl, caption, category } = await c.req.json();

    const reel = {
      id: crypto.randomUUID(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      videoUrl,
      thumbnailUrl: thumbnailUrl || '',
      caption: caption || '',
      category: category || 'general',
      likes: 0,
      comments: 0,
      shares: 0,
      views: 0,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`reel:${reel.id}`, reel);

    return c.json({ success: true, reel });
  } catch (error: any) {
    console.log(`Create reel error: ${error.message}`);
    return c.json({ error: 'Failed to create reel' }, 500);
  }
});

// View reel
app.post("/make-server-5bb3fa81/reels/:reelId/view", async (c) => {
  try {
    const reelId = c.req.param('reelId');
    const reel = await kv.get(`reel:${reelId}`);

    if (!reel) {
      return c.json({ error: 'Reel not found' }, 404);
    }

    reel.views = (reel.views || 0) + 1;
    await kv.set(`reel:${reelId}`, reel);

    return c.json({ success: true });
  } catch (error: any) {
    console.log(`View reel error: ${error.message}`);
    return c.json({ error: 'Failed to record view' }, 500);
  }
});

// Like reel
app.post("/make-server-5bb3fa81/reels/:reelId/like", async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const reelId = c.req.param('reelId');
    const existingLike = await kv.get(`reel-like:${user.id}:${reelId}`);

    if (existingLike) {
      // Unlike
      await kv.del(`reel-like:${user.id}:${reelId}`);
      const reel = await kv.get(`reel:${reelId}`);
      if (reel) {
        reel.likes = Math.max(0, (reel.likes || 0) - 1);
        await kv.set(`reel:${reelId}`, reel);
      }
    } else {
      // Like
      await kv.set(`reel-like:${user.id}:${reelId}`, {
        userId: user.id,
        reelId,
        createdAt: new Date().toISOString(),
      });
      const reel = await kv.get(`reel:${reelId}`);
      if (reel) {
        reel.likes = (reel.likes || 0) + 1;
        await kv.set(`reel:${reelId}`, reel);
      }
    }

    return c.json({ success: true });
  } catch (error: any) {
    console.log(`Like reel error: ${error.message}`);
    return c.json({ error: 'Failed to like reel' }, 500);
  }
});

// Save reel
app.post("/make-server-5bb3fa81/reels/:reelId/save", async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const reelId = c.req.param('reelId');
    const existingSave = await kv.get(`reel-save:${user.id}:${reelId}`);

    if (existingSave) {
      // Unsave
      await kv.del(`reel-save:${user.id}:${reelId}`);
    } else {
      // Save
      await kv.set(`reel-save:${user.id}:${reelId}`, {
        userId: user.id,
        reelId,
        savedAt: new Date().toISOString(),
      });
    }

    return c.json({ success: true });
  } catch (error: any) {
    console.log(`Save reel error: ${error.message}`);
    return c.json({ error: 'Failed to save reel' }, 500);
  }
});

Deno.serve(app.fetch);
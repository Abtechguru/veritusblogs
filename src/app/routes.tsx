import { createBrowserRouter } from "react-router";
import { Root } from "./components/layout/Root";
import { AdminLayout } from "./components/layout/AdminLayout";
import { HomePage } from "./pages/HomePage";
import { ArticleListPage } from "./pages/ArticleListPage";
import { ArticleDetailPage } from "./pages/ArticleDetailPage";
import { CategoryPage } from "./pages/CategoryPage";
import { CampaignPage } from "./pages/CampaignPage";
import { AmbodeCampaignPage } from "./pages/AmbodeCampaignPage";
import { AuthorPage } from "./pages/AuthorPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { EnhancedRegisterPage } from "./pages/auth/EnhancedRegisterPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AdminLoginPage } from "./pages/auth/AdminLoginPage";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminUsers } from "./pages/admin/AdminUsers";
import { AdminUserApprovals } from "./pages/admin/AdminUserApprovals";
import { AdminArticles } from "./pages/admin/AdminArticles";
import { AdminAnalytics } from "./pages/admin/AdminAnalytics";
import { AdminBroadcast } from "./pages/admin/AdminBroadcast";
import { AdminComments } from "./pages/admin/AdminComments";
import { AdminSupport } from "./pages/admin/AdminSupport";
import { AdminStories } from "./pages/admin/AdminStories";
import { AdminReels } from "./pages/admin/AdminReels";
import { AdminWiseWords } from "./pages/admin/AdminWiseWords";
import { AdminSponsored } from "./pages/admin/AdminSponsored";
import { AdminAuthors } from "./pages/admin/AdminAuthors";
import { CreateArticlePage } from "./pages/CreateArticlePage";
import { EditArticlePage } from "./pages/EditArticlePage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { WeeklyTopicPage } from "./pages/WeeklyTopicPage";
import { ReelsPage } from "./pages/ReelsPage";
import { NotFoundPage } from "./pages/NotFoundPage";

import { TagPage } from "./pages/TagPage";

export const router = createBrowserRouter([
  {
    path: "/admin/login",
    Component: AdminLoginPage,
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "articles", Component: AdminArticles },
      { path: "sponsored", Component: AdminSponsored },
      { path: "authors", Component: AdminAuthors },
      { path: "users", Component: AdminUsers },
      { path: "comments", Component: AdminComments },
      { path: "support", Component: AdminSupport },
      { path: "reels", Component: AdminReels },
      { path: "stories", Component: AdminStories },
      { path: "wise-words", Component: AdminWiseWords },
      { path: "analytics", Component: AdminAnalytics },
      { path: "broadcast", Component: AdminBroadcast },
      { path: "approvals", Component: AdminUserApprovals },
    ]
  },
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "articles", Component: ArticleListPage },
      { path: "articles/:id", Component: ArticleDetailPage },
      { path: "category/:category", Component: CategoryPage },
      { path: "tag/:tag", Component: TagPage },
      { path: "campaign/david-ombugadu-2027", Component: CampaignPage },
      { path: "campaign/ambode-2027", Component: AmbodeCampaignPage },
      { path: "author/:authorId", Component: AuthorPage },
      { path: "leaderboard", Component: LeaderboardPage },
      { path: "weekly-topic", Component: WeeklyTopicPage },
      { path: "reels", Component: ReelsPage },
      { path: "login", Component: LoginPage },
      { path: "register", Component: EnhancedRegisterPage },
      { path: "profile", Component: ProfilePage },
      { path: "create-article", Component: CreateArticlePage },
      { path: "edit-article/:id", Component: EditArticlePage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
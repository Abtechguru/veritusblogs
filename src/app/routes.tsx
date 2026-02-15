import { createBrowserRouter } from "react-router";
import { Root } from "./components/layout/Root";

// Standard components that are small or needed immediately
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";

// Lazy-loaded layouts and heavy pages
const AdminLayout = () => import("./components/layout/AdminLayout").then(m => ({ Component: m.AdminLayout }));

export const router = createBrowserRouter([
  {
    path: "/admin/login",
    lazy: () => import("./pages/auth/AdminLoginPage").then(m => ({ Component: m.AdminLoginPage })),
  },
  {
    path: "/admin",
    lazy: AdminLayout,
    children: [
      { index: true, lazy: () => import("./pages/admin/AdminDashboard").then(m => ({ Component: m.AdminDashboard })) },
      { path: "articles", lazy: () => import("./pages/admin/AdminArticles").then(m => ({ Component: m.AdminArticles })) },
      { path: "sponsored", lazy: () => import("./pages/admin/AdminSponsored").then(m => ({ Component: m.AdminSponsored })) },
      { path: "authors", lazy: () => import("./pages/admin/AdminAuthors").then(m => ({ Component: m.AdminAuthors })) },
      { path: "users", lazy: () => import("./pages/admin/AdminUsers").then(m => ({ Component: m.AdminUsers })) },
      { path: "comments", lazy: () => import("./pages/admin/AdminComments").then(m => ({ Component: m.AdminComments })) },
      { path: "support", lazy: () => import("./pages/admin/AdminSupport").then(m => ({ Component: m.AdminSupport })) },
      { path: "reels", lazy: () => import("./pages/admin/AdminReels").then(m => ({ Component: m.AdminReels })) },
      { path: "stories", lazy: () => import("./pages/admin/AdminStories").then(m => ({ Component: m.AdminStories })) },
      { path: "wise-words", lazy: () => import("./pages/admin/AdminWiseWords").then(m => ({ Component: m.AdminWiseWords })) },
      { path: "analytics", lazy: () => import("./pages/admin/AdminAnalytics").then(m => ({ Component: m.AdminAnalytics })) },
      { path: "broadcast", lazy: () => import("./pages/admin/AdminBroadcast").then(m => ({ Component: m.AdminBroadcast })) },
      { path: "approvals", lazy: () => import("./pages/admin/AdminUserApprovals").then(m => ({ Component: m.AdminUserApprovals })) },
    ]
  },
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "articles", lazy: () => import("./pages/ArticleListPage").then(m => ({ Component: m.ArticleListPage })) },
      { path: "articles/:id", lazy: () => import("./pages/ArticleDetailPage").then(m => ({ Component: m.ArticleDetailPage })) },
      { path: "category/:category", lazy: () => import("./pages/CategoryPage").then(m => ({ Component: m.CategoryPage })) },
      { path: "tag/:tag", lazy: () => import("./pages/TagPage").then(m => ({ Component: m.TagPage })) },
      { path: "campaign/david-ombugadu-2027", lazy: () => import("./pages/CampaignPage").then(m => ({ Component: m.CampaignPage })) },
      { path: "campaign/ambode-2027", lazy: () => import("./pages/AmbodeCampaignPage").then(m => ({ Component: m.AmbodeCampaignPage })) },
      { path: "author/:authorId", lazy: () => import("./pages/AuthorPage").then(m => ({ Component: m.AuthorPage })) },
      { path: "leaderboard", lazy: () => import("./pages/LeaderboardPage").then(m => ({ Component: m.LeaderboardPage })) },
      { path: "weekly-topic", lazy: () => import("./pages/WeeklyTopicPage").then(m => ({ Component: m.WeeklyTopicPage })) },
      { path: "reels", lazy: () => import("./pages/ReelsPage").then(m => ({ Component: m.ReelsPage })) },
      { path: "login", lazy: () => import("./pages/auth/LoginPage").then(m => ({ Component: m.LoginPage })) },
      { path: "register", lazy: () => import("./pages/auth/EnhancedRegisterPage").then(m => ({ Component: m.EnhancedRegisterPage })) },
      { path: "profile", lazy: () => import("./pages/ProfilePage").then(m => ({ Component: m.ProfilePage })) },
      { path: "create-article", lazy: () => import("./pages/CreateArticlePage").then(m => ({ Component: m.CreateArticlePage })) },
      { path: "edit-article/:id", lazy: () => import("./pages/EditArticlePage").then(m => ({ Component: m.EditArticlePage })) },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
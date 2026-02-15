# 🗞️ Veritus Blogs | Premium News & Campaign Platform

Veritus Blogs is a high-fidelity, state-of-the-art digital publishing and campaign management platform. Built with a focus on premium aesthetics, dynamic user engagement, and production-ready financial integrations, it serves as a powerful hub for journalistic excellence and political advocacy.

---

## ✨ Premium Features

### � Advanced Color & Background System (NEW!)
- **4 Theme Modes**: Light (Dawn), Dark (Midnight), Sepia (Vintage), High Contrast (Accessible)
- **Dynamic Backgrounds**: Animated gradient orbs with mouse-following effects
- **Color Psychology**: Royal Indigo primary + Warm Amber accent palettes
- **Theme Switcher**: Floating action button with time-based auto-detection
- **Glassmorphism**: Premium blur effects on cards and navigation
- **Accessibility**: WCAG AA/AAA compliant with reduced motion support

### �🏢 Intelligent Home Page
- **Dynamic Billboard Carousel**: An auto-playing, high-impact scroller for sponsored campaigns powered by **Embla Carousel**.
- **Real-Time Donation Tracking**: A live-updating contribution counter that tracks community support for featured candidates.
- **Editorial Excellence**: Curated "Featured Stories" and categories designed with micro-animations and glassmorphism.

### 📖 Immersive Article Experience
- **Smart Reading Progress**: A dynamic progress bar that anchors the reader's journey.
- **Interactive Table of Contents**: Automatically generated navigation for long-form content.
- **Engagement Metrics**: Live views, likes, and comment counts synchronized with a centralized mock database (ready for Supabase).
- **Social Integration**: Floating share bars and interactive tooltips for seamless distribution.
- **Reading-Optimized Backgrounds**: Subtle textures and warm tones reduce eye strain

### 🗳️ Campaign & Donation System
- **Candidate Hubs**: Dedicated, high-fidelity landing pages for political candidates (e.g., David Ombugadu, Akinwunmi Ambode).
- **PayPal Integration**: A fully functional, production-ready payment flow using the official **PayPal JavaScript SDK**.
- **Contribution Feed**: A live feed of recent supporters, fostering community transparency and trust.

### 🛡️ Robust Admin Dashboard
- **Secure Authentication**: Protected routes with a premium admin login experience.
- **Activity Logging**: Comprehensive audit trails for system transparency and security.
- **Content Management**: Advanced Rich Text editing and user management capabilities.

---

## 🛠️ Technology Stack

| Role | Technology |
|---|---|
| **Core** | React 18 / TypeScript |
| **Styling** | Tailwind CSS (Premium Glassmorphism & Animations) |
| **Transitions** | Framer Motion (motion/react) |
| **Carousel** | Embla Carousel & Autoplay |
| **Payments** | PayPal (Official SDK) |
| **Backend** | Supabase (Integration-ready) |
| **Icons** | Lucide React |
| **Notifications** | Sonner |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) 

### Installation

1.  **Clone the repository**:
    ```bash
    git clone [repository-url]
    cd veritus-blogs
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**:
    Create a `.env` file in the root directory and add your Supabase/PayPal credentials:
    ```env
    VITE_SUPABASE_URL=your_url
    VITE_SUPABASE_ANON_KEY=your_key
    ```

4.  **Launch the development server**:
    ```bash
    npm run dev
    ```

---

## 📂 Project Structure

- `src/app/pages`: Core page components (Home, ArticleDetail, Admin).
- `src/app/components`: Reusable UI elements, layouts, and feature-specific components.
- `src/app/services`: Business logic and API integrations (Campaigns, Activity Logs).
- `src/app/data`: Centralized store for mock data and initial state.
- `src/styles`: Global CSS and Tailwind configuration.

---

## 🎨 Design Philosophy
Veritus Blogs follows a **Premium-First** design language:
- **HSL Color Palettes**: Carefully curated tones for eye-comfort and professional feel.
- **Glassmorphism**: Subtle blur effects and border-glows for depth.
- **Micro-interactions**: Hover-states and entrance animations that make the UI feel alive.

---

## 📚 Documentation

### Premium Color & Background System
- **[COLOR-BACKGROUND-SYSTEM-GUIDE.md](./COLOR-BACKGROUND-SYSTEM-GUIDE.md)** - Comprehensive 400+ line guide covering:
  - Complete color palette reference
  - Theme system documentation
  - Component usage examples
  - Accessibility guidelines
  - Performance optimization tips
  
- **[PREMIUM-COLOR-SYSTEM-SUMMARY.md](./PREMIUM-COLOR-SYSTEM-SUMMARY.md)** - Quick reference for:
  - Implementation checklist
  - Usage examples
  - File structure
  - Quick troubleshooting

- **[COLOR-QUICK-REFERENCE.md](./COLOR-QUICK-REFERENCE.md)** - Developer cheat sheet:
  - Color swatches
  - CSS variables
  - Common patterns
  - Component classes

- **[PREMIUM-COLOR-SYSTEM-COMPLETE.md](./PREMIUM-COLOR-SYSTEM-COMPLETE.md)** - Complete transformation overview:
  - All features documented
  - Integration guide
  - Expected impact metrics
  - Next steps

---

*Built with ❤️ by the Veritus Development Team.*
# MSport Design System Implementation Guide

## 🎨 Overview

This project now uses the **MSport Design System** - a modern, high-energy design language featuring:
- **Primary Color**: MSport Orange (#F15A24)
- **Secondary Color**: True Black (#000000)
- **Accent Color**: Electric Blue (#2563EB)
- **WCAG AA/AAA Compliance**: All color combinations meet accessibility standards
- **Responsive Typography**: Fluid scaling from mobile (320px) to 4K (2560px+)
- **Touch-Friendly**: 48px mobile, 44px desktop minimum touch targets

---

## 🚀 Quick Start

### Using the Design System

The design system is automatically loaded via `src/styles/index.css`. All CSS custom properties and utility classes are available globally.

### Basic Usage Examples

```tsx
// Primary Button (MSport Orange)
<button className="btn btn-primary">
  Get Started
</button>

// Secondary Button (Black)
<button className="btn btn-secondary">
  Learn More
</button>

// Card with MSport styling
<div className="card">
  <h3 className="card-title">Welcome</h3>
  <p className="card-description">
    Experience the energy of MSport
  </p>
</div>

// Gradient Text
<h1 className="text-gradient-msport">
  VERITUS INTERNATIONAL
</h1>

// Hero Section with Overlay
<div className="hero-overlay">
  <h1 className="text-display text-shadow-strong">
    Transform Africa
  </h1>
</div>
```

---

## 🎨 Color Palette

### Light Mode (Default)

| Usage | Variable | Hex | Use Case |
|-------|----------|-----|----------|
| **Primary** | `--color-primary` | #F15A24 | Buttons, CTAs, brand elements |
| **Primary Dark** | `--color-primary-dark` | #C2410C | Orange text on light backgrounds |
| **Secondary** | `--color-secondary` | #000000 | Bold accents, secondary buttons |
| **Accent** | `--color-accent` | #2563EB | Links, highlights |
| **Success** | `--color-success` | #16A34A | Success messages |
| **Warning** | `--color-warning` | #D97706 | Warnings |
| **Destructive** | `--color-destructive` | #DC2626 | Errors, delete actions |

### Dark Mode

Dark mode automatically adjusts colors for optimal contrast:
- Primary becomes **Soft Orange** (#F9A87C)
- Secondary becomes **Near White** (#E5E5E5)
- Background becomes **Dark Gray** (#121216)

Enable dark mode by adding `data-theme="dark"` to the `<html>` or `<body>` tag.

---

## 📝 Typography

### Responsive Headings

All headings use `clamp()` for fluid responsive scaling:

```tsx
<h1>Scales from 28px to 48px</h1>
<h2>Scales from 24px to 36px</h2>
<h3>Scales from 20px to 30px</h3>
<h4>Scales from 18px to 24px</h4>
<h5>Scales from 16px to 20px</h5>
```

### Display Text (Hero)

```tsx
<h1 className="text-display">
  Massive Hero Headline
</h1>
// Scales from 32px to 60px
```

### Body Text

```tsx
<p>Standard body text (16px minimum)</p>
<p className="text-large">Large body text (18px)</p>
<p className="text-small">Small text (14px)</p>
<p className="text-caption">Caption text (14px, muted)</p>
```

### Font Weights

```tsx
<span className="font-normal">Normal (400)</span>
<span className="font-medium">Medium (500)</span>
<span className="font-semibold">Semibold (600)</span>
<span className="font-bold">Bold (700)</span>
<span className="font-extrabold">Extrabold (800)</span>
```

---

## 🔘 Buttons

### Button Variants

```tsx
// Primary (MSport Orange)
<button className="btn btn-primary">Primary</button>

// Secondary (Black)
<button className="btn btn-secondary">Secondary</button>

// Outline
<button className="btn btn-outline">Outline</button>

// Ghost
<button className="btn btn-ghost">Ghost</button>

// Destructive
<button className="btn btn-destructive">Delete</button>
```

### Button Sizes

```tsx
<button className="btn btn-sm">Small</button>
<button className="btn">Default</button>
<button className="btn btn-lg">Large</button>
```

### Accessibility Features

All buttons automatically include:
- ✅ Minimum 44px height (desktop), 48px (mobile)
- ✅ 2px focus ring with burnt orange color
- ✅ Keyboard navigation support
- ✅ Hover and active states

---

## 📋 Forms

### Input Fields

```tsx
<div>
  <label htmlFor="email">Email Address</label>
  <input
    type="email"
    id="email"
    placeholder="you@example.com"
  />
</div>
```

### Features

- ✅ 16px font size (prevents mobile zoom)
- ✅ 48px minimum height on mobile
- ✅ Accessible focus states
- ✅ Proper label association

### Textarea

```tsx
<div>
  <label htmlFor="message">Message</label>
  <textarea
    id="message"
    placeholder="Your message..."
  />
</div>
```

---

## 🃏 Cards

### Basic Card

```tsx
<div className="card">
  <h3 className="card-title">Card Title</h3>
  <p className="card-description">
    Supporting text goes here
  </p>
  <p>Main content...</p>
</div>
```

### Features

- ✅ Automatic hover effects (lift + shadow)
- ✅ 24px padding
- ✅ 12px border radius
- ✅ Responsive scaling

---

## 🎯 Accessibility Features

### Focus Indicators

All interactive elements have visible focus indicators:
- 2px burnt orange outline
- 2px offset for clarity
- Automatic on keyboard navigation

### Skip to Main Content

```tsx
<a href="#main" className="skip-to-main">
  Skip to main content
</a>

<main id="main">
  {/* Your content */}
</main>
```

### Screen Reader Only Text

```tsx
<span className="sr-only">
  This text is only for screen readers
</span>
```

### Reduced Motion

The system automatically respects `prefers-reduced-motion`:

```tsx
// Animations are disabled for users who prefer reduced motion
// No code changes needed - handled automatically
```

---

## 🎨 Utility Classes

### Text Colors

```tsx
<p className="text-primary">MSport Orange text</p>
<p className="text-secondary">Black text</p>
<p className="text-accent">Blue text</p>
<p className="text-muted">Muted gray text</p>
<p className="text-success">Green text</p>
<p className="text-warning">Orange warning text</p>
<p className="text-destructive">Red error text</p>
```

### Background Colors

```tsx
<div className="bg-primary">Orange background</div>
<div className="bg-secondary">Black background</div>
<div className="bg-accent">Blue background</div>
<div className="bg-muted">Light gray background</div>
<div className="bg-card">Card background</div>
```

### Gradient Text

```tsx
<h1 className="text-gradient-msport">
  MSport Orange Gradient
</h1>

<h1 className="text-gradient-energy">
  Energy Gradient (Orange → Blue → Black)
</h1>
```

### Text Shadows (for Hero Sections)

```tsx
<h1 className="text-shadow">
  Subtle shadow
</h1>

<h1 className="text-shadow-strong">
  Strong shadow for images
</h1>
```

### Tailwind Custom Classes

```tsx
<button className="bg-msport-orange">Orange Button</button>
<button className="bg-msport-black">Black Button</button>
<p className="text-msport-orange">Orange Text</p>
<div className="touch-target">Touch-friendly element</div>
```

---

## 📱 Responsive Design

### Breakpoints

| Name | Width | Device |
|------|-------|--------|
| xs | 320px | Small phones |
| sm | 375px | Phones |
| md | 768px | Tablets |
| lg | 1024px | Laptops |
| xl | 1280px | Desktops |
| 2xl | 1536px | Large screens |
| 4k | 2560px | 4K displays |

### Container

```tsx
<div className="container">
  {/* Automatically responsive with max-width */}
</div>
```

### Responsive Utilities

```tsx
<div className="hidden-mobile">
  Only visible on desktop
</div>

<div className="hidden-desktop">
  Only visible on mobile
</div>
```

### Grid System

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div className="card">Card 1</div>
  <div className="card">Card 2</div>
  <div className="card">Card 3</div>
</div>
```

---

## 🎨 CSS Custom Properties

### Using Variables in Your CSS

```css
.custom-element {
  color: var(--color-primary);
  background: var(--color-background);
  font-size: var(--text-lg);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
}
```

### Available Variables

**Colors:**
- `--color-primary`, `--color-primary-dark`, `--color-primary-foreground`
- `--color-secondary`, `--color-secondary-foreground`
- `--color-accent`, `--color-accent-foreground`
- `--color-success`, `--color-warning`, `--color-destructive`
- `--color-background`, `--color-foreground`
- `--color-muted`, `--color-muted-foreground`
- `--color-border`, `--color-input`, `--color-ring`

**Typography:**
- `--font-sans`, `--font-mono`
- `--text-xs` through `--text-6xl`
- `--font-normal` through `--font-extrabold`
- `--leading-tight` through `--leading-loose`

**Spacing:**
- `--space-0` through `--space-24`

**Border Radius:**
- `--radius-none` through `--radius-full`

---

## 🌟 Best Practices

### 1. Always Use Semantic HTML

```tsx
// ✅ Good
<header>
  <nav>
    <a href="/">Home</a>
  </nav>
</header>

// ❌ Bad
<div>
  <div>
    <span onClick={...}>Home</span>
  </div>
</div>
```

### 2. Maintain Heading Hierarchy

```tsx
// ✅ Good
<h1>Page Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>

// ❌ Bad
<h1>Page Title</h1>
<h3>Section</h3> {/* Skipped h2 */}
```

### 3. Use Proper Labels

```tsx
// ✅ Good
<label htmlFor="name">Name</label>
<input id="name" type="text" />

// ❌ Bad
<input type="text" placeholder="Name" />
```

### 4. Provide Alt Text

```tsx
// ✅ Good
<img src="logo.png" alt="VERITUS INTERNATIONAL logo" />

// ❌ Bad
<img src="logo.png" />
```

### 5. Use MSport Colors Correctly

```tsx
// ✅ Good - Orange background with white text
<button className="bg-primary text-white">
  Click Me
</button>

// ✅ Good - Orange text on white background (using darker shade)
<p className="text-primary">
  Orange text
</p>

// ❌ Bad - Primary orange text on white (contrast too low)
<p style={{ color: '#F15A24' }}>
  Hard to read
</p>
```

---

## 🧪 Testing Checklist

### Accessibility

- [ ] All interactive elements have min 44px touch targets
- [ ] Focus indicators are visible on all interactive elements
- [ ] All images have alt text
- [ ] All forms have proper labels
- [ ] Heading hierarchy is correct (no skipped levels)
- [ ] Color contrast meets WCAG AA minimum (4.5:1 for text)
- [ ] Site works with keyboard navigation only
- [ ] Screen reader announces content correctly

### Responsive

- [ ] Test at 320px (smallest mobile)
- [ ] Test at 375px (iPhone)
- [ ] Test at 768px (tablet)
- [ ] Test at 1024px (desktop)
- [ ] Test at 1920px (large desktop)
- [ ] Test at 2560px (4K)
- [ ] Touch targets are 48px on mobile
- [ ] Text is readable at all sizes

### Browser Testing

- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## 📚 Resources

### Design Tokens
- **File**: `design-tokens.json`
- Contains all color values, typography scales, and spacing

### Theme CSS
- **File**: `src/styles/theme.css`
- Complete CSS implementation with all utilities

### Color Contrast Checker
- https://webaim.org/resources/contrastchecker/

### WCAG Guidelines
- https://www.w3.org/WAI/WCAG21/quickref/

---

## 🎓 Examples

### Hero Section

```tsx
<section className="relative min-h-screen flex items-center justify-center">
  <div className="hero-overlay absolute inset-0" />
  <div className="relative z-10 container text-center">
    <h1 className="text-display text-shadow-strong text-white mb-6">
      Transform Africa
    </h1>
    <p className="text-large text-white text-shadow mb-8">
      Leadership development for the next generation
    </p>
    <button className="btn btn-primary btn-lg">
      Get Started
    </button>
  </div>
</section>
```

### Feature Cards

```tsx
<div className="container">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="card">
      <h3 className="card-title">Innovation</h3>
      <p className="card-description">
        Cutting-edge solutions
      </p>
      <button className="btn btn-outline">Learn More</button>
    </div>
    {/* More cards... */}
  </div>
</div>
```

### Form Example

```tsx
<form className="max-w-md mx-auto">
  <div className="mb-4">
    <label htmlFor="email">Email</label>
    <input
      type="email"
      id="email"
      placeholder="you@example.com"
    />
  </div>
  
  <div className="mb-4">
    <label htmlFor="message">Message</label>
    <textarea
      id="message"
      placeholder="Your message..."
    />
  </div>
  
  <button type="submit" className="btn btn-primary w-full">
    Send Message
  </button>
</form>
```

---

## 🎉 You're All Set!

The MSport design system is now fully integrated into your project. Start building beautiful, accessible, and user-friendly interfaces with confidence!

For questions or issues, refer to the design tokens file or the theme CSS for implementation details.

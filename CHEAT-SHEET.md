# MSport Design System - Cheat Sheet

## 🎨 Colors

```tsx
// Text Colors
<p className="text-primary">Orange text (#C2410C)</p>
<p className="text-secondary">Black text</p>
<p className="text-accent">Blue text</p>
<p className="text-muted">Gray text</p>

// Backgrounds
<div className="bg-primary">Orange background</div>
<div className="bg-secondary">Black background</div>
<div className="bg-accent">Blue background</div>
<div className="bg-muted">Light gray background</div>

// Tailwind Custom
<button className="bg-msport-orange">Orange</button>
<button className="bg-msport-black">Black</button>
<p className="text-msport-orange">Orange text</p>
```

## 🔘 Buttons

```tsx
<button className="btn btn-primary">Primary</button>
<button className="btn btn-secondary">Secondary</button>
<button className="btn btn-outline">Outline</button>
<button className="btn btn-ghost">Ghost</button>
<button className="btn btn-destructive">Delete</button>

// Sizes
<button className="btn btn-sm">Small</button>
<button className="btn">Default</button>
<button className="btn btn-lg">Large</button>
```

## 📝 Typography

```tsx
// Headings (auto-responsive with clamp)
<h1>28px-48px</h1>
<h2>24px-36px</h2>
<h3>20px-30px</h3>
<h4>18px-24px</h4>
<h5>16px-20px</h5>

// Display (Hero)
<h1 className="text-display">32px-60px</h1>

// Body
<p>16px body text</p>
<p className="text-large">18px</p>
<p className="text-small">14px</p>
<p className="text-caption">14px muted</p>

// Weights
<span className="font-normal">400</span>
<span className="font-medium">500</span>
<span className="font-semibold">600</span>
<span className="font-bold">700</span>
<span className="font-extrabold">800</span>
```

## 🃏 Cards

```tsx
<div className="card">
  <h3 className="card-title">Title</h3>
  <p className="card-description">Description</p>
  <p>Content...</p>
</div>
```

## 📋 Forms

```tsx
<div>
  <label htmlFor="email">Email</label>
  <input type="email" id="email" />
</div>

<div>
  <label htmlFor="message">Message</label>
  <textarea id="message" />
</div>
```

## 🎨 Gradients

```tsx
// MSport Orange Gradient
<h1 className="text-gradient-msport">
  Orange Gradient
</h1>

// Energy Gradient (Orange → Blue → Black)
<h1 className="text-gradient-energy">
  Energy Gradient
</h1>

// Hero Overlay
<div className="hero-overlay">
  Dark gradient for images
</div>
```

## 🌟 Text Effects

```tsx
// Shadows
<h1 className="text-shadow">Subtle shadow</h1>
<h1 className="text-shadow-strong">Strong shadow</h1>

// Alignment
<p className="text-left">Left</p>
<p className="text-center">Center</p>
<p className="text-right">Right</p>
```

## 📐 Layout

```tsx
// Container
<div className="container">
  Auto-responsive max-width
</div>

// Flex
<div className="flex items-center justify-between gap-4">
  Flex layout
</div>

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

## 📱 Responsive

```tsx
// Hide on mobile
<div className="hidden-mobile">Desktop only</div>

// Hide on desktop
<div className="hidden-desktop">Mobile only</div>

// Responsive grid
<div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Responsive columns
</div>
```

## ♿ Accessibility

```tsx
// Skip to main
<a href="#main" className="skip-to-main">
  Skip to main content
</a>
<main id="main">Content</main>

// Screen reader only
<span className="sr-only">
  Screen reader text
</span>

// Touch targets (auto on buttons/inputs)
<div className="touch-target">
  48px mobile, 44px desktop
</div>
```

## 🎯 CSS Variables

```css
/* Colors */
var(--color-primary)              /* #F15A24 */
var(--color-primary-dark)         /* #C2410C */
var(--color-secondary)            /* #000000 */
var(--color-accent)               /* #2563EB */

/* Typography */
var(--text-base)                  /* 16px */
var(--text-lg)                    /* 18px */
var(--text-2xl)                   /* 24px */

/* Spacing */
var(--space-2)                    /* 8px */
var(--space-4)                    /* 16px */
var(--space-6)                    /* 24px */

/* Radius */
var(--radius-lg)                  /* 8px */
var(--radius-xl)                  /* 12px */
```

## 🌓 Dark Mode

```tsx
// Enable dark mode
<html data-theme="dark">
  {/* Entire app switches */}
</html>

// Or on specific element
<div data-theme="dark">
  Dark mode section
</div>
```

## 🎨 Hex Colors

```
Primary Orange:    #F15A24
Burnt Orange:      #C2410C (for text)
True Black:        #000000
Electric Blue:     #2563EB
Sport Green:       #16A34A
Caution Orange:    #D97706
Alert Red:         #DC2626

Dark Mode:
Soft Orange:       #F9A87C
Near White:        #E5E5E5
Light Blue:        #7AA2F7
```

## ✅ Quick Checks

```
✓ Body text: 16px minimum
✓ Touch targets: 48px mobile, 44px desktop
✓ Focus ring: 2px #C2410C
✓ Contrast: 4.5:1 minimum (AA)
✓ Orange text: Use #C2410C not #F15A24
✓ Labels: Always with inputs
✓ Alt text: On all images
```

## 🚀 Common Patterns

### Hero Section
```tsx
<section className="relative min-h-screen flex items-center justify-center">
  <div className="hero-overlay absolute inset-0" />
  <div className="relative z-10 container text-center">
    <h1 className="text-display text-shadow-strong text-white">
      Hero Title
    </h1>
    <button className="btn btn-primary btn-lg">CTA</button>
  </div>
</section>
```

### Feature Grid
```tsx
<div className="container">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="card">
      <h3 className="card-title">Feature 1</h3>
      <p>Description...</p>
    </div>
    {/* More cards */}
  </div>
</div>
```

### Form
```tsx
<form className="max-w-md mx-auto">
  <div className="mb-4">
    <label htmlFor="email">Email</label>
    <input type="email" id="email" />
  </div>
  <button type="submit" className="btn btn-primary w-full">
    Submit
  </button>
</form>
```

---

**Quick Reference** | **Version 3.0.0** | **WCAG AA/AAA**

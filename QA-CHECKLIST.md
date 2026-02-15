# VERITUS INTERNATIONAL - QA Testing Checklist

## Overview
This checklist ensures typography, color accessibility, and legibility are properly implemented across all devices (320px to 4K).

---

## 1. Typography Testing

### Desktop (1024px+)
- [ ] Body text is exactly **16px** (1rem)
- [ ] H1 displays at **48-60px** range
- [ ] H2 displays at **36-48px** range
- [ ] H3 displays at **30-36px** range
- [ ] All headings use proper bold weight (700-800)
- [ ] Body text line-height is **1.625** (relaxed)
- [ ] Links have visible underline on hover
- [ ] No text is smaller than 14px

### Mobile (375px)
- [ ] Body text is exactly **16px** (prevents zoom)
- [ ] H1 displays at **32px** minimum
- [ ] H2 displays at **28px** minimum
- [ ] Small text (captions) is minimum **14px**
- [ ] Line-height is minimum **1.5** for readability
- [ ] Text doesn't overflow containers
- [ ] No horizontal scrolling occurs

### Extra Small (320px)
- [ ] Base font size is **15px** (slightly smaller but readable)
- [ ] All text remains legible
- [ ] Touch targets remain **48px minimum**
- [ ] Spacing accommodates small screen

### 4K (2560px+)
- [ ] Base font size scales to **18px**
- [ ] Content max-width is **1920px** (no ultra-wide strain)
- [ ] Text remains sharp and crisp
- [ ] Spacing scales proportionally

---

## 2. Color Contrast Testing

### Light Mode
- [ ] Background: Pure white `#FFFFFF`
- [ ] Body text: `#17171A` - **14.8:1 contrast** ✅ AAA
- [ ] Secondary text: `#64646A` - **7.05:1 contrast** ✅ AAA
- [ ] Primary purple: `#7C3AED` - **4.58:1 contrast** ✅ AA
- [ ] Secondary blue: `#1D4ED8` - **4.56:1 contrast** ✅ AA
- [ ] Accent pink: `#DB2777` - **4.51:1 contrast** ✅ AA
- [ ] Success green: `#0F9F6E` - **4.52:1 contrast** ✅ AA
- [ ] Warning amber: `#D97706` - **4.53:1 contrast** ✅ AA
- [ ] Error red: `#E11D48` - **4.64:1 contrast** ✅ AA
- [ ] Borders are visible: `#E3E3E6`

### Dark Mode
- [ ] Background: Dark gray `#121216` (not pure black)
- [ ] Body text: `#F2F2F2` - **12.63:1 contrast** ✅ AAA
- [ ] Secondary text: `#A3A3A8` - **8.59:1 contrast** ✅ AAA
- [ ] Primary purple: `#A78BFA` - **7.2:1 contrast** ✅ AAA
- [ ] Secondary blue: `#60A5FA` - **6.8:1 contrast** ✅ AAA
- [ ] Accent pink: `#F472B6` - **6.5:1 contrast** ✅ AAA
- [ ] All colors are sufficiently bright
- [ ] Borders are visible: `#313136`

### Text on Images
- [ ] Hero text has text-shadow or overlay
- [ ] Campaign banners have overlay gradient
- [ ] Stories/Reels text has dark overlay background
- [ ] All text on images is readable in both modes
- [ ] Overlays use `rgba(0,0,0,0.75)` minimum opacity

---

## 3. Touch Target Testing

### Mobile (<768px)
- [ ] All buttons: **48×48px minimum**
- [ ] Navigation links: **48px tall minimum**
- [ ] Form inputs: **48px tall minimum**
- [ ] Icon buttons: **48×48px minimum**
- [ ] Checkbox/radio: **48×48px clickable area**
- [ ] Close buttons in modals: **48×48px**
- [ ] Story avatars (clickable): **80×80px**
- [ ] Minimum **8px spacing** between touch targets

### Desktop (≥768px)
- [ ] All buttons: **44×44px minimum**
- [ ] Navigation links: **44px tall minimum**
- [ ] Form inputs: **44px tall minimum**
- [ ] Icon buttons: **44×44px minimum**

---

## 4. Focus & Keyboard Testing

### Focus Indicators
- [ ] All interactive elements show **2px purple outline** on focus
- [ ] Outline has **2px offset** from element
- [ ] Focus is visible on ALL elements (buttons, links, inputs)
- [ ] Focus is only visible for keyboard (not mouse clicks)
- [ ] Focus ring is rounded `border-radius: 4px`
- [ ] Focus color contrasts with background (purple `#7C3AED`)

### Keyboard Navigation
- [ ] `Tab` moves forward through all interactive elements
- [ ] `Shift+Tab` moves backward
- [ ] Tab order is logical (follows visual flow)
- [ ] "Skip to main content" link appears on first Tab
- [ ] `Enter` activates buttons and links
- [ ] `Space` activates buttons
- [ ] `Esc` closes modals and dropdowns
- [ ] Arrow keys work in carousels/sliders
- [ ] No keyboard traps (can Tab out of all components)

### Modal Focus Trap
- [ ] Tab cycles only within open modal
- [ ] Shift+Tab cycles backward within modal
- [ ] Esc closes modal
- [ ] Focus returns to trigger element on close
- [ ] First focusable element receives focus on open

---

## 5. Screen Reader Testing

### Semantic HTML
- [ ] Headings follow hierarchy (H1 > H2 > H3, no skipping)
- [ ] Landmarks used: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`
- [ ] Buttons use `<button>` (not `<div>` with click handlers)
- [ ] Links use `<a href>` for navigation
- [ ] Forms use proper `<label>` + `<input>` associations
- [ ] Lists use `<ul>`, `<ol>`, `<li>` elements

### ARIA Labels
- [ ] Icon-only buttons have `aria-label`
- [ ] Modals have `role="dialog"` and `aria-modal="true"`
- [ ] Modals have `aria-labelledby` pointing to title
- [ ] Modals have `aria-describedby` pointing to description
- [ ] Live regions use `role="status"` or `role="alert"`
- [ ] Dynamic content updates have `aria-live="polite"` or `"assertive"`
- [ ] Decorative icons have `aria-hidden="true"`
- [ ] Current page in nav has `aria-current="page"`

### Alt Text
- [ ] All informative images have descriptive alt text
- [ ] Alt text describes image content, not "image of..."
- [ ] Decorative images have `alt=""` AND `aria-hidden="true"`
- [ ] Complex images (charts) have detailed descriptions
- [ ] Avatar images have alt with user's name

### Form Accessibility
- [ ] All inputs have associated `<label>` elements
- [ ] Labels use `for` attribute matching input `id`
- [ ] Required fields have `aria-required="true"`
- [ ] Invalid fields have `aria-invalid="true"`
- [ ] Error messages have `role="alert"`
- [ ] Hint text uses `aria-describedby`
- [ ] Field errors are announced to screen readers

---

## 6. Responsive Testing

### Breakpoints to Test
- [ ] **320px** - iPhone SE (portrait)
- [ ] **375px** - iPhone 13/14 (portrait)
- [ ] **414px** - iPhone 14 Pro Max (portrait)
- [ ] **768px** - iPad (portrait)
- [ ] **1024px** - iPad (landscape) / Small laptop
- [ ] **1280px** - Laptop
- [ ] **1536px** - Large desktop
- [ ] **1920px** - Full HD
- [ ] **2560px** - 4K / QHD

### Visual Checks at Each Breakpoint
- [ ] No horizontal scrolling
- [ ] Text is readable (not too small or too large)
- [ ] Images scale appropriately
- [ ] Buttons fit properly
- [ ] Navigation is usable
- [ ] Forms are easy to fill out
- [ ] Modals fit on screen
- [ ] Cards display in proper grid (1, 2, 3, or 4 columns)
- [ ] Spacing looks balanced
- [ ] No overlapping content

---

## 7. Component-Specific Testing

### Header/Navigation
- [ ] Logo is visible and properly sized
- [ ] Desktop nav shows all links (≥1024px)
- [ ] Mobile nav shows hamburger menu (<1024px)
- [ ] Nav links have adequate padding (48px tall on mobile)
- [ ] Active nav link is visually distinct (bold + color)
- [ ] Header is sticky and stays at top on scroll
- [ ] Header has glassmorphism effect (backdrop-blur)
- [ ] Dark mode toggle works and is labeled

### Hero Section
- [ ] Text is readable on background image
- [ ] Text has shadow or overlay for contrast
- [ ] Heading is large and impactful (48-60px)
- [ ] CTA buttons are prominent and properly sized
- [ ] Background animation is subtle (prefers-reduced-motion safe)
- [ ] Content is centered on mobile, left-aligned on desktop

### Cards
- [ ] Title is prominent (H4, 20-30px)
- [ ] Body text is 16px minimum
- [ ] Meta text (author, date) is 14px, muted color
- [ ] Images have 16:9 aspect ratio
- [ ] Cards have hover effect (lift + shadow)
- [ ] Clickable area includes entire card
- [ ] Cards display in grid (responsive columns)

### Buttons
- [ ] Primary button has gradient or solid primary color
- [ ] Text is white with good contrast
- [ ] Hover state shows brightness increase + lift
- [ ] Active state shows scale down
- [ ] Focus shows purple outline ring
- [ ] Disabled state is 40% opacity + not clickable
- [ ] Minimum size is 48×48px (mobile) or 44×44px (desktop)

### Form Inputs
- [ ] Label is above input, 14px, medium weight
- [ ] Input text is 16px (prevents mobile zoom)
- [ ] Placeholder text has sufficient contrast
- [ ] Border is visible (1px, increases to 2px on focus)
- [ ] Focus shows purple outline ring
- [ ] Error state shows red border + error message
- [ ] Error messages are announced to screen readers

### Modals/Dialogs
- [ ] Overlay is dark enough (`rgba(0,0,0,0.75)`)
- [ ] Modal content has white/card background
- [ ] Title is large and clear (H3, 24-36px)
- [ ] Close button is 48×48px minimum
- [ ] Close button is in top-right corner
- [ ] Esc key closes modal
- [ ] Click outside closes modal (optional)
- [ ] Focus is trapped within modal
- [ ] Modal is centered on screen

### Campaign Popups
- [ ] Gradient background is vibrant but readable
- [ ] Text has strong shadow for visibility
- [ ] Close button is 48×48px and easily accessible
- [ ] CTA button is prominent and full-width on mobile
- [ ] Popup is 40% smaller on mobile (max 360px wide)
- [ ] Session storage prevents re-showing
- [ ] Campaigns alternate (Ambode ↔ Ombugadu)
- [ ] Popup appears 5 seconds after page load

### Stories
- [ ] Story rings are 80×80px
- [ ] Unviewed stories have gradient ring
- [ ] Viewed stories have gray ring
- [ ] Click opens fullscreen story viewer
- [ ] Progress bars show at top of viewer
- [ ] User name and avatar shown at top
- [ ] Close button (X) in top-right
- [ ] Previous/Next buttons work
- [ ] Tap left/right to navigate
- [ ] Story auto-advances after 5 seconds

### Reels
- [ ] Video is 9:16 aspect ratio (vertical)
- [ ] Interaction panel on right side (like/comment/share)
- [ ] Icons are 40×40px minimum
- [ ] Caption at bottom with dark overlay
- [ ] Swipe up/down to navigate between reels
- [ ] Play/pause on tap
- [ ] Mute button visible and accessible

### Leaderboard
- [ ] User avatars are 40×40px, rounded
- [ ] Rank badges are visible (gold/silver/bronze)
- [ ] User names are readable (16px, semibold)
- [ ] XP counts are visible (14px, muted)
- [ ] Rows have hover effect
- [ ] Current user row is highlighted

### Toast Notifications
- [ ] Position: top-right (desktop), bottom-center (mobile)
- [ ] Success: green background, check icon
- [ ] Error: red background, X icon
- [ ] Warning: amber background, alert icon
- [ ] Info: blue background, info icon
- [ ] Text is readable on colored backgrounds
- [ ] Auto-dismiss after 4 seconds
- [ ] Close button (X) is accessible
- [ ] Multiple toasts stack properly

---

## 8. Animation & Motion Testing

### Reduced Motion Preference
- [ ] Set OS to "Reduce motion" / "prefers-reduced-motion: reduce"
- [ ] All animations are disabled or instant
- [ ] Background animations stop
- [ ] Gradient shifts stop
- [ ] Transitions are instant (<0.01ms)
- [ ] Functionality still works (just no motion)
- [ ] Scroll behavior is `auto` (not smooth)

### Animations (When Motion is Allowed)
- [ ] Background gradients shift slowly (30s cycle)
- [ ] Hover effects are smooth (200-300ms)
- [ ] Page transitions are smooth
- [ ] Carousel/slider animations are smooth
- [ ] Loading spinners rotate smoothly
- [ ] No janky or stuttering animations
- [ ] Animations don't distract from content

---

## 9. Browser Testing

### Desktop Browsers
- [ ] **Chrome** (latest) - All features work
- [ ] **Firefox** (latest) - All features work
- [ ] **Safari** (latest) - All features work
- [ ] **Edge** (latest) - All features work

### Mobile Browsers
- [ ] **Mobile Safari** (iOS) - All features work
- [ ] **Chrome Mobile** (Android) - All features work
- [ ] **Samsung Internet** - All features work

### Specific Browser Checks
- [ ] Gradients render correctly
- [ ] Backdrop-filter (glassmorphism) works or has fallback
- [ ] Focus-visible works (no focus on mouse click)
- [ ] Sticky positioning works (header)
- [ ] Flexbox and Grid layouts work
- [ ] CSS custom properties (variables) work

---

## 10. Performance Testing

### Lighthouse Scores (Chrome DevTools)
- [ ] **Performance:** 80+ (green)
- [ ] **Accessibility:** 90+ (green)
- [ ] **Best Practices:** 90+ (green)
- [ ] **SEO:** 90+ (green)

### Load Times
- [ ] First Contentful Paint (FCP): < 1.8s
- [ ] Largest Contentful Paint (LCP): < 2.5s
- [ ] Time to Interactive (TTI): < 3.8s
- [ ] Cumulative Layout Shift (CLS): < 0.1

### Asset Optimization
- [ ] No custom web fonts (using system fonts)
- [ ] Images are lazy-loaded
- [ ] Images have proper srcset for responsive sizes
- [ ] Critical CSS is inlined
- [ ] No render-blocking resources
- [ ] Animations use GPU-accelerated properties (transform, opacity)

---

## 11. Dark Mode Testing

### Visual Checks
- [ ] Toggle between light and dark mode works
- [ ] All text is readable in dark mode
- [ ] Colors are sufficiently bright (not too dark)
- [ ] Images have proper contrast
- [ ] Borders are visible
- [ ] Cards have distinct backgrounds
- [ ] Modals have proper overlay
- [ ] Form inputs are visible
- [ ] Buttons have good contrast

### Contrast Checks
- [ ] Body text: **12.63:1** (AAA)
- [ ] Secondary text: **8.59:1** (AAA)
- [ ] All brand colors meet AA minimum (4.5:1)
- [ ] Background is not pure black (reduces eye strain)

---

## 12. Final Checks

### Content
- [ ] All text is in proper English (no Lorem Ipsum)
- [ ] Headings are concise and descriptive
- [ ] Links describe their destination
- [ ] Button labels are action-oriented ("Submit", not "Click here")
- [ ] Error messages are helpful and specific
- [ ] Success messages confirm the action taken

### Consistency
- [ ] Typography is consistent across all pages
- [ ] Colors are used consistently (primary for CTAs, etc.)
- [ ] Spacing is uniform (using design tokens)
- [ ] Border radius is consistent
- [ ] Button styles are consistent
- [ ] Form styles are consistent
- [ ] Card styles are consistent

### Edge Cases
- [ ] Very long text doesn't break layout
- [ ] Very short text doesn't look awkward
- [ ] Missing images have placeholders
- [ ] Empty states are designed (no data)
- [ ] Loading states are designed
- [ ] Error states are designed
- [ ] Offline state is handled

---

## Testing Tools

### Contrast Checkers
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colorable](https://colorable.jxnblk.com/)
- Chrome DevTools: Inspect element > Contrast ratio

### Screen Readers
- **Windows:** NVDA (free), JAWS (paid)
- **Mac:** VoiceOver (built-in)
- **iOS:** VoiceOver (built-in)
- **Android:** TalkBack (built-in)

### Browser DevTools
- **Chrome DevTools:** Lighthouse, Device Mode, Accessibility Tree
- **Firefox DevTools:** Accessibility Inspector
- **Safari DevTools:** Accessibility Audit

### Browser Extensions
- **axe DevTools** - Accessibility testing
- **WAVE** - Web accessibility evaluation
- **Lighthouse** - Performance and accessibility

---

## Sign-Off

### Typography ✅
- [ ] All text meets minimum size requirements
- [ ] All text is readable across devices
- [ ] Font scaling is smooth and responsive

### Color Accessibility ✅
- [ ] All colors meet WCAG AA minimum
- [ ] Body text meets WCAG AAA
- [ ] Dark mode is fully accessible

### Touch Targets ✅
- [ ] All interactive elements meet minimum sizes
- [ ] Adequate spacing between targets

### Keyboard Navigation ✅
- [ ] All elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] No keyboard traps

### Screen Reader ✅
- [ ] Semantic HTML used throughout
- [ ] ARIA labels added where needed
- [ ] All images have proper alt text

### Responsive ✅
- [ ] Tested on all breakpoints (320px - 4K)
- [ ] No horizontal scrolling
- [ ] Content adapts properly

### Performance ✅
- [ ] Lighthouse scores are 80+
- [ ] Load times are acceptable
- [ ] Animations are optimized

---

**Tested By:** _________________  
**Date:** _________________  
**Browser/Device:** _________________  
**Pass/Fail:** _________________  
**Notes:** _________________

# Zaideu UI Kit Documentation

Comprehensive design system based on open-design.ai aesthetic principles.

## Philosophy

**Dark-first, tech-forward, minimal**

The design system is built around:
- Calm, collected, adult interface
- Function over decoration
- Clear visual hierarchy
- Generous white space
- Smooth, purposeful animations

## Quick Start

### Import the entire UI Kit

```scss
@use '@/shared/styles/ui-kit' as ui;

.myComponent {
  @extend .buttonPrimary;
  @extend .buttonMd;
}
```

### Import design system only

```scss
@use '@/shared/styles/design-system' as ds;

.myComponent {
  background: ds.color(surface-default);
  padding: ds.spacing(4);
  border-radius: ds.radius(lg);
  @include ds.smooth-transition(background);
}
```

## Foundation

### Colors

```scss
// Background hierarchy
ds.color(background-primary)    // #0a0a0a - Main background
ds.color(background-secondary)  // #111111 - Sections
ds.color(background-tertiary)   // #1a1a1a - Cards
ds.color(background-elevated)   // #1f1f1f - Modals

// Surfaces
ds.color(surface-default)       // rgba(255, 255, 255, 0.03)
ds.color(surface-hover)         // rgba(255, 255, 255, 0.06)
ds.color(surface-active)        // rgba(255, 255, 255, 0.09)

// Text
ds.color(text-primary)          // #ffffff
ds.color(text-secondary)        // #a3a3a3
ds.color(text-tertiary)         // #666666
ds.color(text-disabled)         // #404040

// Accent (vibrant green)
ds.color(accent-primary)        // #7bed9f
ds.color(accent-primary-hover)  // #6dd98d
ds.color(accent-primary-active) // #5ec77b

// Status colors
ds.color(status-active)         // #7bed9f - Project is active
ds.color(status-slow)           // #ffa502 - Project slowing
ds.color(status-stalled)        // #ff6348 - Project stalled
ds.color(status-revival)        // #70a1ff - Project revival
ds.color(status-completed)      // #95afc0 - Completed
ds.color(status-archived)       // #747d8c - Archived

// Semantic
ds.color(success)               // #2ed573
ds.color(warning)               // #ffa502
ds.color(error)                 // #ff4757
ds.color(info)                  // #5352ed

// Borders
ds.color(border-default)        // rgba(255, 255, 255, 0.08)
ds.color(border-hover)          // rgba(255, 255, 255, 0.12)
ds.color(border-focus)          // #7bed9f
```

### Typography

```scss
// Mixins
@include ds.heading-1;  // 60px, bold, tight line-height
@include ds.heading-2;  // 36px, bold
@include ds.heading-3;  // 30px, semibold
@include ds.heading-4;  // 24px, semibold
@include ds.body-large; // 18px, regular
@include ds.body-base;  // 16px, regular
@include ds.body-small; // 14px, regular
@include ds.caption;    // 12px, regular, secondary color

// Font weights
map-get(ds.$font-weight, regular)   // 400
map-get(ds.$font-weight, medium)    // 500
map-get(ds.$font-weight, semibold)  // 600
map-get(ds.$font-weight, bold)      // 700

// Font sizes
map-get(ds.$font-size, xs)   // 12px
map-get(ds.$font-size, sm)   // 14px
map-get(ds.$font-size, base) // 16px
map-get(ds.$font-size, lg)   // 18px
map-get(ds.$font-size, xl)   // 20px
map-get(ds.$font-size, 2xl)  // 24px
// ... up to 7xl (72px)
```

### Spacing

```scss
ds.spacing(0)   // 0
ds.spacing(1)   // 4px
ds.spacing(2)   // 8px
ds.spacing(3)   // 12px
ds.spacing(4)   // 16px
ds.spacing(5)   // 20px
ds.spacing(6)   // 24px
ds.spacing(8)   // 32px
ds.spacing(10)  // 40px
ds.spacing(12)  // 48px
ds.spacing(16)  // 64px
ds.spacing(20)  // 80px
ds.spacing(24)  // 96px
ds.spacing(32)  // 128px
```

### Border Radius

```scss
ds.radius(none)  // 0
ds.radius(sm)    // 4px
ds.radius(base)  // 8px
ds.radius(md)    // 12px
ds.radius(lg)    // 16px
ds.radius(xl)    // 24px
ds.radius(2xl)   // 32px
ds.radius(full)  // 9999px (pill)
```

### Shadows & Glows

```scss
ds.shadow(sm)    // Subtle shadow
ds.shadow(base)  // Default shadow
ds.shadow(md)    // Medium shadow
ds.shadow(lg)    // Large shadow
ds.shadow(xl)    // Extra large shadow

ds.glow(accent-sm) // Small accent glow
ds.glow(accent-md) // Medium accent glow
ds.glow(accent-lg) // Large accent glow
```

### Breakpoints

```scss
@include ds.respond-to(sm)  // >= 640px
@include ds.respond-to(md)  // >= 768px
@include ds.respond-to(lg)  // >= 1024px
@include ds.respond-to(xl)  // >= 1280px
@include ds.respond-to(2xl) // >= 1536px
```

### Transitions

```scss
ds.transition(fast)   // 150ms
ds.transition(base)   // 200ms
ds.transition(slow)   // 300ms
ds.transition(smooth) // 500ms

@include ds.smooth-transition(background, color, border-color);
```

## Components

### Buttons

**Variants:**
- `.buttonPrimary` - Main CTA (accent green)
- `.buttonSecondary` - Outlined style
- `.buttonTertiary` - Subtle ghost
- `.buttonDestructive` - Dangerous actions
- `.buttonGhost` - Minimal
- `.buttonLink` - Link-styled

**Sizes:**
- `.buttonSm` - 32px height
- `.buttonMd` - 40px height
- `.buttonLg` - 48px height
- `.buttonIcon` - Square aspect ratio

**States:**
- `:hover` - Automatic
- `:active` - Scale down effect
- `:disabled` - Opacity 0.5
- `.buttonLoading` - Spinner state

```html
<button class="buttonPrimary buttonMd">
  Create Project
</button>
```

### Badges & Status

**Status Badges (Project Health):**
- `.statusActive` - Green
- `.statusSlow` - Orange
- `.statusStalled` - Red
- `.statusRevival` - Blue
- `.statusCompleted` - Gray
- `.statusArchived` - Muted gray

**Semantic Badges:**
- `.badgeSuccess`
- `.badgeWarning`
- `.badgeError`
- `.badgeInfo`

**Tags (Technologies, Roles):**
- `.tag` - Default tag
- `.tagInteractive` - Clickable
- `.tagSelected` - Selected state
- `.tagRemovable` - With remove button

**Role Badges:**
- `.roleFrontend` - Green tint
- `.roleBackend` - Blue tint
- `.roleDesigner` - Pink tint
- `.roleManager` - Orange tint
- `.roleDevOps` - Purple tint

```html
<span class="statusBadge statusActive">Active</span>
<span class="tag">TypeScript</span>
<span class="roleBadge roleFrontend">Frontend Developer</span>
```

### Cards

**Base Card:**
```scss
.myCard {
  @include ds.card-base; // Hover effects included
  padding: ds.spacing(6);
}
```

**Project Card:**
- `.projectCard` - Main project card
- `.projectCardActive` - Active state
- `.projectCardSlow` - Slowing state
- `.projectCardStalled` - Stalled state
- `.projectCardRevival` - Revival state
- `.projectCardCritical` - Needs help

**Task Card:**
- `.taskCard` - Base task card
- `.taskCardAvailable` - Can be taken
- `.taskCardInProgress` - In progress
- `.taskCardUnderReview` - Under review
- `.taskCardCompleted` - Done
- `.taskCardOverdue` - Past deadline

**Commitment Card:**
- `.commitmentCard` - User commitment
- `.commitmentCardUrgent` - Deadline soon
- `.commitmentCardCritical` - Overdue

**Activity Card:**
- `.activityCard` - Activity feed item

**Health Card:**
- `.healthCard` - Project health dashboard

### Forms

**Input Fields:**
```html
<div class="formField">
  <label class="formLabel formLabelRequired">Project Name</label>
  <input type="text" class="input inputMd" />
  <span class="formHelperText">Choose a clear name</span>
</div>
```

**Variants:**
- `.input` - Text input
- `.textarea` - Multiline input
- `.select` - Dropdown select
- `.searchInput` - Search with icon

**Sizes:**
- `.inputSm` - 32px height
- `.inputMd` - 40px height (default)
- `.inputLg` - 48px height

**States:**
- `.inputError` - Error state
- `.formFieldSuccess` - Success state

**Other Controls:**
- `.checkbox` - Checkbox
- `.radio` - Radio button
- `.switch` - Toggle switch
- `.inputGroup` - Input with addons

### Layout

**Containers:**
```scss
.container        // Max-width 1280px, centered
.containerFluid   // Full width with padding
.containerNarrow  // Max-width 768px
```

**Grid:**
```scss
.grid             // Base grid
.gridCols2        // 2 columns
.gridCols3        // 3 columns
.gridResponsive   // 1→2→3 columns
```

**Flex Utilities:**
```scss
.flex             // display: flex
.flexCol          // flex-direction: column
.flexCenter       // Center both axes
.flexBetween      // Space between
```

**Stack (vertical/horizontal spacing):**
```scss
.stack .stackMd   // Vertical stack, 16px gap
.stackHorizontal  // Horizontal stack
```

**Page Layout:**
```scss
.pageLayout       // Full page structure
.pageHeader       // Sticky header
.pageMain         // Main content
.pageFooter       // Footer
```

**Sidebar Layout:**
```scss
.sidebarLayout    // Auto-responsive sidebar
.sidebar          // Sticky sidebar
.sidebarContent   // Main content area
```

**Empty State:**
```scss
.emptyState       // Centered empty state
.emptyStateIcon   // Icon
.emptyStateTitle  // Title
.emptyStateDescription // Description
```

### Progress & Indicators

**Progress Bar:**
```html
<div class="progressBar progressBarMd">
  <div class="progressBarFill" style="width: 65%"></div>
</div>
```

**Variants:**
- `.progressBarSm` / `.progressBarMd` / `.progressBarLg`
- `.progressBarSuccess` / `.progressBarWarning` / `.progressBarError`
- `.progressBarAnimated` - Shimmer effect

**Health Indicator (circular):**
```html
<div class="healthIndicator">
  <svg class="healthIndicatorSvg">
    <!-- SVG markup -->
  </svg>
  <div class="healthIndicatorValue">85</div>
</div>
```

**Timeline:**
```html
<div class="timeline">
  <div class="timelineItem">
    <div class="timelineItemMarker timelineItemMarkerActive">
      <!-- Icon -->
    </div>
    <div class="timelineItemContent">
      <h4 class="timelineItemTitle">Task completed</h4>
      <p class="timelineItemDescription">User finished the task</p>
      <span class="timelineItemTimestamp">2 hours ago</span>
    </div>
  </div>
</div>
```

**Stepper (Wizard):**
```html
<div class="stepper">
  <div class="stepperStep stepperStepCompleted">
    <div class="stepperStepMarker">1</div>
    <span class="stepperStepLabel">Idea</span>
  </div>
  <div class="stepperConnector stepperConnectorActive"></div>
  <div class="stepperStep stepperStepActive">
    <div class="stepperStepMarker">2</div>
    <span class="stepperStepLabel">Team</span>
  </div>
  <div class="stepperConnector"></div>
  <div class="stepperStep">
    <div class="stepperStepMarker">3</div>
    <span class="stepperStepLabel">Tasks</span>
  </div>
</div>
```

**Avatar:**
```html
<div class="avatar avatarMd">
  <img src="..." class="avatarImage" />
</div>

<div class="avatar avatarMd avatarWithStatus">
  <img src="..." class="avatarImage" />
  <div class="avatarStatusIndicator avatarStatusOnline"></div>
</div>
```

**Avatar Stack:**
```html
<div class="avatarStack">
  <div class="avatar avatarSm">...</div>
  <div class="avatar avatarSm">...</div>
  <div class="avatar avatarSm">...</div>
  <div class="avatarStackMore avatarSm">+5</div>
</div>
```

**Skeleton Loader:**
```html
<div class="skeleton skeletonText"></div>
<div class="skeleton skeletonCircle" style="width: 40px"></div>
<div class="skeleton skeletonRectangle" style="height: 200px"></div>
```

**Spinner:**
```html
<div class="spinner spinnerMd"></div>
```

## Utility Mixins

```scss
@include ds.truncate;              // Text ellipsis
@include ds.line-clamp(3);         // Limit to 3 lines
@include ds.hide-scrollbar;        // Hide scrollbar
@include ds.custom-scrollbar;      // Styled scrollbar
@include ds.card-base;             // Card with hover
@include ds.focus-ring;            // Keyboard focus
@include ds.disabled-state;        // Disabled opacity
@include ds.loading-state;         // Loading overlay
```

## Best Practices

### Color Usage
- Use `accent-primary` for main CTAs only
- Status colors are for project/task states, not decoration
- Prefer subtle surface colors over heavy backgrounds
- Text hierarchy: primary → secondary → tertiary

### Spacing
- Use consistent spacing scale (4, 8, 12, 16, 24, 32...)
- Generous gaps between sections (48px+)
- Card padding: 20-24px minimum

### Typography
- Clear hierarchy: large headings, readable body
- Line height: tight for headings, relaxed for body
- No excessive bold text
- Caption for metadata only

### Motion
- Keep transitions under 300ms
- Use smooth easing (cubic-bezier)
- Animate only transform, opacity, background
- Avoid complex animations without purpose

### Responsive
- Mobile-first approach
- Stack on mobile, grid on desktop
- Touch-friendly sizes (min 40px)
- Readable text at all sizes

## Anti-Patterns (What NOT to Do)

❌ Acid gradients and neon colors  
❌ Glassmorphism for decoration  
❌ Heavy shadows everywhere  
❌ Gamification badges  
❌ Visual noise and decorative elements  
❌ Complex animations without meaning  
❌ Mixing too many colors  
❌ Breaking the spacing scale  

## File Structure

```
src/shared/styles/
├── design-system.scss      # Foundation (colors, typography, spacing)
├── ui-kit.scss             # Main export (import this)
└── components/
    ├── badges.scss         # Status badges, tags, roles
    ├── buttons.scss        # All button variants
    ├── cards.scss          # Project, task, commitment cards
    ├── forms.scss          # Inputs, checkboxes, selects
    ├── layout.scss         # Containers, grids, page layouts
    └── indicators.scss     # Progress, avatars, loaders
```

## Support

For questions or contributions, refer to the main project documentation.

---

**Design Philosophy:** Calm, focused, honest. We don't sell dreams — we give a place to work on them.

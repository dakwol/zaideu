# Zaideu Design System & UI Kit

Complete design system based on **open-design.ai** aesthetic principles.

## 🎨 Design Philosophy

> "We don't sell dreams — we give a place to work on them."

**Character:** Calm, focused, adult, tech-forward, minimal

**Principles:**
- Dark-first aesthetic with vibrant accent
- Function over decoration
- Clear visual hierarchy
- Generous spacing for breathing room
- Purposeful, smooth animations
- Status colors that support, not punish

## 📦 What's Included

### Foundation
- **Colors** - Dark palette with vibrant green accent (#7bed9f)
- **Typography** - Humanist sans-serif system with 8-level scale
- **Spacing** - 8px-based consistent scale (4px → 128px)
- **Border Radius** - 7 sizes from subtle to pill
- **Shadows & Glows** - Subtle depth with accent glows
- **Transitions** - Smooth 150-500ms animations

### Components
- **Buttons** - 6 variants × 3 sizes × multiple states
- **Badges & Tags** - Status, semantic, role, and tech tags
- **Cards** - Project, Task, Commitment, Activity, Health
- **Forms** - Inputs, Textarea, Select, Checkbox, Radio, Switch
- **Layout** - Containers, Grids, Flex utilities, Page structures
- **Indicators** - Progress bars, Health circles, Timeline, Stepper, Avatars, Skeletons, Spinners

## 🚀 Quick Start

### Import Everything

```scss
@use '@/shared/styles/ui-kit' as ui;

.myComponent {
  @extend .buttonPrimary;
  @extend .buttonMd;
}
```

### Or Use Design System Directly

```scss
@use '@/shared/styles/design-system' as ds;

.myComponent {
  background: ds.color(surface-default);
  padding: ds.spacing(4);
  border-radius: ds.radius(lg);
  @include ds.smooth-transition(background);
  @include ds.card-base;
}
```

## 📖 Documentation

Full documentation available in [`docs/UI_KIT.md`](./UI_KIT.md)

### Key Colors

```scss
// Backgrounds
ds.color(background-primary)    // #0a0a0a
ds.color(surface-default)       // rgba(255,255,255,0.03)

// Text
ds.color(text-primary)          // #ffffff
ds.color(text-secondary)        // #a3a3a3

// Accent (vibrant green)
ds.color(accent-primary)        // #7bed9f

// Status (project health)
ds.color(status-active)         // Green - active
ds.color(status-slow)           // Orange - slowing
ds.color(status-stalled)        // Red - stalled
ds.color(status-revival)        // Blue - revival
```

### Common Patterns

**Card with hover:**
```scss
.myCard {
  @include ds.card-base;
  padding: ds.spacing(6);
}
```

**Smooth transition:**
```scss
@include ds.smooth-transition(background, border-color, transform);
```

**Text truncation:**
```scss
@include ds.truncate;           // Single line
@include ds.line-clamp(3);      // 3 lines max
```

**Responsive:**
```scss
@include ds.respond-to(md) {
  // >= 768px styles
}
```

## 🎯 Component Examples

### Button
```html
<button class="buttonPrimary buttonMd">
  Create Project
</button>
```

### Status Badge
```html
<span class="statusBadge statusActive">Active</span>
<span class="statusBadge statusSlow">Slowing</span>
```

### Project Card
```html
<div class="projectCard projectCardActive">
  <div class="projectCardHeader">
    <h3 class="projectCardTitle">Project Name</h3>
    <span class="statusBadge statusActive">Active</span>
  </div>
  <p class="projectCardDescription">Project description here...</p>
  <div class="projectCardFooter">
    <!-- Footer content -->
  </div>
</div>
```

### Form Field
```html
<div class="formField">
  <label class="formLabel formLabelRequired">Project Name</label>
  <input type="text" class="input inputMd" placeholder="Enter name..." />
  <span class="formHelperText">Choose a clear, descriptive name</span>
</div>
```

### Progress Bar
```html
<div class="progressBar progressBarMd">
  <div class="progressBarFill" style="width: 65%"></div>
</div>
```

## 📁 File Structure

```
src/shared/styles/
├── design-system.scss          # Foundation layer (import this for tokens)
├── ui-kit.scss                 # Complete UI Kit (import this for everything)
└── components/
    ├── badges.scss             # Status badges, tags, roles
    ├── buttons.scss            # All button variants & states
    ├── cards.scss              # Project, task, commitment cards
    ├── forms.scss              # Inputs, selects, checkboxes
    ├── layout.scss             # Containers, grids, utilities
    └── indicators.scss         # Progress, avatars, loaders
```

## 🎨 Design Tokens

### Spacing Scale
```
0, 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px, 128px
```

### Typography Scale
```
xs(12px), sm(14px), base(16px), lg(18px), xl(20px), 
2xl(24px), 3xl(30px), 4xl(36px), 5xl(48px), 6xl(60px), 7xl(72px)
```

### Border Radius
```
none(0), sm(4px), base(8px), md(12px), lg(16px), xl(24px), 2xl(32px), full(pill)
```

### Breakpoints
```
sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px)
```

## ✨ Best Practices

### DO ✅
- Use accent color (`#7bed9f`) for primary CTAs only
- Follow spacing scale consistently (4, 8, 12, 16, 24...)
- Generous gaps between sections (48px+)
- Clear typography hierarchy
- Smooth transitions under 300ms
- Status colors for functional feedback

### DON'T ❌
- Acid gradients and neon colors
- Glassmorphism for decoration
- Heavy shadows everywhere
- Gamification badges
- Visual noise
- Complex animations without purpose
- Breaking the spacing scale

## 🎯 Status Colors Usage

Status colors communicate **project health**, not user judgment:

- **Active** (Green) - Project is moving forward
- **Slow** (Orange) - Activity decreased, normal phase
- **Stalled** (Red) - Needs attention, no shame
- **Revival** (Blue) - Coming back, supportive tone
- **Completed** (Gray) - Finished successfully
- **Archived** (Muted) - Closed, preserved for reference

**Tone:** Supportive, not punishing. "Project slowed" not "You abandoned it."

## 🔧 Integration with Project

This UI Kit is designed for the **Zaideu** ("За Идею") platform:
- React + TypeScript
- SCSS Modules
- Feature-Sliced Design architecture
- Dark-first with light theme support planned

## 📚 Related Documentation

- [`AI_ENGINEERING_GUIDE.md`](../AI_ENGINEERING_GUIDE.md) - Full project overview & guidelines
- [`UI_KIT.md`](./UI_KIT.md) - Detailed component documentation
- [`design-system.scss`](../src/shared/styles/design-system.scss) - Design tokens source

## 🤝 Contributing

When adding new components:
1. Follow existing naming patterns
2. Include all states (default, hover, active, focus, disabled, loading, error)
3. Use design tokens, not hardcoded values
4. Add responsive behavior where needed
5. Document in `UI_KIT.md`

## 📄 License

Part of the Zaideu project.

---

**Design inspired by:** open-design.ai  
**Built for:** Collaborative project completion  
**Philosophy:** Calm, focused work over hype and gamification

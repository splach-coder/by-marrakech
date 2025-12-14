# ByMarrakech Design System - Quick Reference

## 🎨 Colors

### Tailwind Classes

#### Primary (Red/Maroon)
```tsx
bg-primary          // #912B2B
bg-primary-dark     // #8B2626
bg-primary-light    // #A63838
text-primary        // Text color
border-primary      // Border color
```

#### Secondary (Tan/Gold)
```tsx
bg-secondary        // #BFA77B
bg-secondary-light  // #C8BBA8
bg-secondary-dark   // #A68F66
text-secondary
hover:bg-secondary
```

#### Background (Cream/Beige)
```tsx
bg-background           // #F8F6F2 (main)
bg-background-light     // #FFFFFF
bg-background-cream     // #EAE4D9
bg-background-cream-dark // #EBE8E0
```

#### Text Colors
```tsx
text-text-primary    // #3B2F2F (darkest)
text-text-secondary  // #4A3F35
text-text-tertiary   // #5A4A42 (lighter)
text-text-light      // #6B5A52
```

#### Borders
```tsx
border-border        // #E8E3D8
border-border-light  // #F0EDE5
border-border-dark   // #C8BBA8
```

## 📝 Typography

### Font Families
```tsx
font-sans      // Tahoma, Inter, sans-serif (default)
font-tahoma    // Tahoma, sans-serif
```

### Font Sizes
```tsx
text-xs    // 0.75rem (12px)
text-sm    // 0.875rem (14px)
text-base  // 1rem (16px)
text-lg    // 1.125rem (18px)
text-xl    // 1.25rem (20px)
text-2xl   // 1.5rem (24px)
text-3xl   // 1.875rem (30px)
text-4xl   // 2.25rem (36px)
text-5xl   // 3rem (48px)
text-6xl   // 3.75rem (60px)
text-7xl   // 4.5rem (72px)

// Special sizes
text-hero     // 4rem (64px) with tight leading
text-hero-sm  // 3rem (48px) with tight leading
```

### Font Weights
```tsx
font-light     // 300
font-normal    // 400
font-medium    // 500
font-semibold  // 600
font-bold      // 700
```

### Letter Spacing
```tsx
tracking-normal      // default
tracking-wide        // 0.025em
tracking-wider       // 0.05em
tracking-widest      // 0.1em
tracking-extra-wide  // 0.15em (custom)
```

## 🎭 Common Patterns

### Buttons

#### Primary Button
```tsx
<button className="px-8 py-4 bg-white text-text-primary uppercase tracking-widest text-sm font-medium hover:bg-secondary hover:text-white transition-all">
  Click Me
</button>
```

#### Secondary Button
```tsx
<button className="px-8 py-4 border-2 border-white text-white uppercase tracking-widest text-sm font-medium hover:bg-white hover:text-text-primary transition-all">
  Learn More
</button>
```

#### Icon Button
```tsx
<button className="p-3 bg-background-cream rounded-full text-text-primary hover:bg-secondary hover:text-white transition-all hover:scale-110">
  <Icon className="w-5 h-5" />
</button>
```

### Links
```tsx
<a className="text-text-tertiary hover:text-secondary transition-colors">
  Navigation Link
</a>
```

### Cards
```tsx
<div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-8">
  <h3 className="text-xl font-semibold mb-4 text-text-primary">Title</h3>
  <p className="text-text-tertiary leading-relaxed">Content</p>
</div>
```

### Sections
```tsx
<section className="py-16 md:py-24 bg-background">
  <div className="container-custom">
    {/* Content */}
  </div>
</section>
```

### Headings
```tsx
// Page Title
<h1 className="text-4xl md:text-6xl font-light text-text-primary mb-6">
  Page Title
</h1>

// Section Title  
<h2 className="text-3xl md:text-5xl font-light text-text-primary mb-6">
  Section Title
</h2>

// Card Title
<h3 className="text-xl font-semibold mb-4 text-text-primary">
  Card Title
</h3>
```

## 📐 Spacing

### Container
```tsx
<div className="container-custom">
  // Responsive max-width container with padding
</div>
```

### Common Spacing Values
```tsx
// Padding
p-4    // 1rem
p-6    // 1.5rem
p-8    // 2rem
p-12   // 3rem
p-16   // 4rem

// Margin
m-4, mb-4, mt-4, mx-4, my-4  // Same as padding

// Gap (for flex/grid)
gap-4, gap-6, gap-8
```

### Section Padding
```tsx
// Mobile
py-12   // 3rem top/bottom

// Desktop  
md:py-16  // 4rem top/bottom
md:py-24  // 6rem top/bottom
```

## 🎬 Animations

### Transitions
```tsx
transition-all        // All properties
transition-colors     // Color transitions
transition-transform  // Transform transitions
transition-shadow     // Shadow transitions

duration-150   // 150ms (default)
duration-300   // 300ms (hover effects)
```

### Hover Effects
```tsx
// Scale up
hover:scale-105
hover:scale-110

// Shadow
hover:shadow-md
hover:shadow-lg

// Transform
hover:-translate-y-1
```

### Custom Animations
```tsx
animate-slow-zoom  // 20s infinite alternate zoom
```

## 🔲 Grids

### Common Grid Layouts
```tsx
// 1 column mobile, 2 desktop
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">

// 1 column mobile, 3 desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

// 12 column system
<div className="grid grid-cols-1 md:grid-cols-12 gap-8">
  <div className="md:col-span-4">Column 1</div>
  <div className="md:col-span-4">Column 2</div>
  <div className="md:col-span-4">Column 3</div>
</div>
```

## 📱 Responsive Design

### Breakpoint Prefixes
```tsx
sm:   // 640px and up
md:   // 768px and up
lg:   // 1024px and up
xl:   // 1280px and up
2xl:  // 1536px and up
```

### Common Responsive Patterns
```tsx
// Hide on mobile
<div className="hidden md:block">Desktop only</div>

// Show only on mobile
<div className="md:hidden">Mobile only</div>

// Responsive text size
<h1 className="text-4xl md:text-6xl lg:text-7xl">

// Responsive padding
<div className="px-4 md:px-6 lg:px-8">

// Responsive flex direction
<div className="flex flex-col md:flex-row">
```

## 🎯 Component Examples

### Feature Card
```tsx
<div className="text-center p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
  <div className="w-16 h-16 mx-auto mb-6 bg-secondary/10 rounded-full flex items-center justify-center">
    <Icon className="w-8 h-8 text-secondary" />
  </div>
  <h3 className="text-xl font-semibold mb-4 text-text-primary">
    Feature Title
  </h3>
  <p className="text-text-tertiary leading-relaxed">
    Feature description goes here.
  </p>
</div>
```

### Section Header
```tsx
<div className="text-center mb-12">
  <p className="text-secondary text-sm uppercase tracking-wider mb-4">
    Section Label
  </p>
  <h2 className="text-3xl md:text-5xl font-light text-text-primary mb-6">
    Section Title
  </h2>
  <p className="text-lg text-text-tertiary max-w-2xl mx-auto">
    Section description
  </p>
</div>
```

### CTA Section
```tsx
<section className="py-16 md:py-24 bg-primary text-white">
  <div className="container-custom text-center">
    <h2 className="text-3xl md:text-5xl font-light mb-6">
      Ready to Get Started?
    </h2>
    <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
      Description text
    </p>
    <a href="#" className="inline-block px-8 py-4 bg-white text-primary uppercase tracking-widest text-sm font-medium hover:bg-secondary hover:text-white transition-all">
      Call to Action
    </a>
  </div>
</section>
```

## 💡 Tips

1. **Always use design tokens**: Don't hardcode colors or spacing
2. **Mobile-first**: Start with mobile styles, add responsive breakpoints
3. **Consistent spacing**: Use the 4px base scale (p-4, p-6, p-8, etc.)
4. **Typography hierarchy**: Use proper heading levels and sizes
5. **Hover states**: Add transitions for better UX
6. **Accessibility**: Include ARIA labels and proper contrast

## 🔧 CSS Variables

If you need to use CSS variables directly:

```css
.custom-element {
  background-color: var(--color-primary);
  color: var(--color-text-primary);
  padding: var(--spacing-md);
  font-size: var(--font-size-lg);
}
```

Available variables are defined in `src/app/globals.css`.
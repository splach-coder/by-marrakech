# ByMarrakech Website

A modern, multilingual website for ByMarrakech travel agency built with Next.js 15, TypeScript, Tailwind CSS, and Sanity CMS.

## 🎨 Design System

### Color Palette

```css
/* Primary Colors */
--color-primary: #912B2B;        /* Deep red/maroon */
--color-primary-dark: #8B2626;
--color-primary-light: #A63838;

/* Secondary Colors */
--color-secondary: #BFA77B;      /* Tan/gold */
--color-secondary-light: #C8BBA8;
--color-secondary-dark: #A68F66;

/* Background Colors */
--color-bg: #F8F6F2;             /* Cream */
--color-bg-cream: #EAE4D9;
--color-bg-cream-dark: #EBE8E0;

/* Text Colors */
--color-text-primary: #3B2F2F;   /* Dark brown */
--color-text-secondary: #4A3F35;
--color-text-tertiary: #5A4A42;
```

### Typography

- **Font Family**: Tahoma (primary), Inter (fallback), Sans-serif
- **Font Weights**: Light (300), Normal (400), Medium (500), Semibold (600), Bold (700)

## 📁 Project Structure

```
bymarrakech/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── components/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Hero.tsx
│   │   │   │   └── LanguageSwitcher.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── globals.css
│   ├── i18n/
│   │   ├── navigation.ts
│   │   ├── request.ts
│   │   └── routing.ts
│   └── middleware.ts
├── messages/
│   ├── en.json
│   └── fr.json
├── public/
│   ├── fonts/
│   │   └── tahoma.ttf
│   ├── images/
│   └── logo.png
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Sanity account (for CMS)

### Installation

1. **Clone and install dependencies**

```bash
npm install
```

2. **Set up environment variables**

Create a `.env.local` file:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Google Analytics
NEXT_PUBLIC_GA_ID=your_ga_id
```

3. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🎯 Key Features

### Implemented

- ✅ Multilingual support (EN/FR) with next-intl
- ✅ Responsive design with Tailwind CSS
- ✅ Modern typography and color system
- ✅ Reusable component architecture
- ✅ Header with sticky navigation
- ✅ Footer with social links and newsletter
- ✅ Hero section with parallax effect
- ✅ Smooth animations with Framer Motion
- ✅ SEO optimized
- ✅ Google Analytics integration

### To Be Implemented

- ⏳ Sanity CMS integration for content
- ⏳ Additional pages (About, Marrakech, Contact)
- ⏳ Tours and experiences listing
- ⏳ Booking system
- ⏳ Image gallery
- ⏳ Testimonials section
- ⏳ Blog/Journal

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **CMS**: Sanity
- **Internationalization**: next-intl
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Analytics**: Google Analytics 4

## 🎨 Using the Design System

### Colors in Tailwind

```tsx
// Primary colors
<div className="bg-primary text-white">
<div className="bg-primary-dark">
<div className="bg-primary-light">

// Secondary colors
<div className="bg-secondary">
<div className="hover:bg-secondary-light">

// Background colors
<div className="bg-background">
<div className="bg-background-cream">

// Text colors
<div className="text-text-primary">
<div className="text-text-secondary">
```

### Using CSS Variables

```css
.custom-element {
  background-color: var(--color-primary);
  color: var(--color-text-primary);
  padding: var(--spacing-md);
  font-size: var(--font-size-lg);
}
```

### Typography Classes

```tsx
// Headings
<h1 className="text-4xl md:text-6xl font-light">
<h2 className="text-3xl md:text-5xl font-light">
<h3 className="text-2xl md:text-4xl font-medium">

// Body text
<p className="text-base text-text-tertiary leading-relaxed">

// Uppercase tracking
<span className="text-sm uppercase tracking-wider">
<span className="text-xs uppercase tracking-widest">
```

## 📝 Component Usage

### Header

```tsx
import Header from './components/Header';

<Header locale={locale} translations={translations} />
```

### Footer

```tsx
import Footer from './components/Footer';

<Footer />
```

### Hero

```tsx
import Hero from './components/Hero';

<Hero
  title="Your Title"
  subtitle="Your Subtitle"
  ctaPrimary="Button Text"
  backgroundImage="/path/to/image.jpg"
/>
```

## 🌍 Adding New Languages

1. Create a new JSON file in `messages/` (e.g., `es.json`)
2. Update `src/i18n/routing.ts` to include the new locale
3. Add translations following the existing structure

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Configuration Files

### tailwind.config.ts
- Custom color palette
- Typography extensions
- Animation keyframes
- Spacing scale

### next.config.ts
- TypeScript configuration
- Image optimization
- i18n routing

### tsconfig.json
- TypeScript compiler options
- Path aliases

## 📄 License

© 2025 ByMarrakech. All rights reserved.

## 🤝 Support

For support, email hello@bymarrakech.com or visit our contact page.
# Project Structure

This Next.js project has been properly structured with reusable components for maintainability.

## Directory Structure

```
my-app/
├── app/
│   ├── about/
│   │   └── page.tsx          # About page
│   ├── layout.tsx             # Root layout with CSS imports
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── components/
│   ├── ChatPopup.tsx          # Chat popup widget
│   ├── Footer.tsx             # Site footer (reusable)
│   ├── Header.tsx             # Site header with navigation (reusable)
│   ├── MobileNav.tsx          # Mobile navigation menu
│   ├── PageHeader.tsx         # Page header with breadcrumbs (reusable)
│   ├── PageWrapper.tsx        # Main wrapper with all common elements
│   ├── Preloader.tsx          # Loading animation
│   ├── Scripts.tsx            # All JavaScript files
│   ├── ScrollToTop.tsx        # Scroll to top button
│   ├── SearchPopup.tsx        # Search popup
│   └── Sidebar.tsx            # Sidebar widget
└── public/
    └── assets/                # All static assets (CSS, JS, images, fonts)
```

## Component Architecture

### PageWrapper Component
The `PageWrapper` component wraps all pages and includes:
- Custom cursor elements
- Preloader
- Chat popup
- Sidebar
- Header (navigation)
- Footer
- Mobile navigation
- Search popup
- Scroll to top button
- All JavaScript files

### Layout Hierarchy
```
layout.tsx (Root Layout)
  └── PageWrapper
      ├── Header (reusable)
      ├── {children} (page content)
      └── Footer (reusable)
```

## Creating New Pages

To create a new page:

1. Create a new folder in `app/` directory
2. Add a `page.tsx` file
3. Import `PageHeader` component if needed
4. The page will automatically have Header, Footer, and all common elements

Example:
```tsx
import PageHeader from '@/components/PageHeader';

export default function NewPage() {
  return (
    <>
      <PageHeader 
        title="Page Title" 
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Page Title' }
        ]} 
      />
      
      {/* Your page content here */}
    </>
  );
}
```

## Reusable Components

### Header
- Located at: `components/Header.tsx`
- Contains: Top bar with contact info, main navigation, logo, call-to-action buttons
- Used automatically on all pages via PageWrapper

### Footer
- Located at: `components/Footer.tsx`
- Contains: About section, quick links, services, contact info, copyright
- Used automatically on all pages via PageWrapper

### PageHeader
- Located at: `components/PageHeader.tsx`
- Props: `title` (string), `breadcrumbs` (array)
- Use for internal pages to show page title and breadcrumb navigation

## Available Pages

- **Home**: http://localhost:3001/
- **About**: http://localhost:3001/about

## Assets

All assets are in the `public/assets/` folder:
- CSS files: `/assets/css/`
- JavaScript files: `/assets/js/`
- Images: `/assets/images/`
- Fonts: `/assets/fonts/`

## Scripts Loading Order

Scripts are loaded in this order (see `components/Scripts.tsx`):
1. GSAP libraries (beforeInteractive)
2. jQuery and other dependencies (afterInteractive)
3. Custom scripts (afterInteractive)

## Notes

- All HTML `class` attributes converted to `className` for React
- All `href` attributes using Next.js `Link` component for client-side navigation
- All asset paths use `/assets/` prefix (public folder)
- TypeScript path alias `@/` configured for cleaner imports

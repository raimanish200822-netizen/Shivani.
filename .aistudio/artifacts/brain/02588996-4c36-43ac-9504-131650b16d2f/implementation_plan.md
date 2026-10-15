# Implementation Plan - Mobile Responsive Admin Panel & Category Product Population

## Objective
1. Optimize the Admin Panel (`AdminLayout.tsx`, `AdminPanel.tsx`, and associated views) so it is fully responsive, touch-friendly, and easy to use on mobile phones (with a mobile bottom navigation bar / collapsible menu drawer).
2. Ensure all product categories (including "Apparel & Uniform Printing" and "Stamps, Badges & ID Solutions") have products properly populated and synced with Firestore real-time listeners.

## Proposed Changes

### 1. Mobile Responsive Admin Panel (`src/admin/AdminLayout.tsx`)
- Add a sticky bottom mobile navigation bar or collapsible sliding drawer for mobile screens (`block lg:hidden`).
- Ensure all admin tables, cards, and modal views scale gracefully on smaller mobile viewports without horizontal clipping.
- Add touch-optimized buttons and spacing.

### 2. Firestore Products & Categories Sync (`src/context/AdminContext.tsx` & `src/data/products.ts`)
- Ensure fallback initializers for products and categories populate Firestore with all 8 categories and their respective products on initial load.
- Verify real-time `onSnapshot` listeners correctly update products and categories across all public views.

## Verification Plan
- Compile and lint the app (`compile_applet`, `lint_applet`).
- Verify responsive layout on mobile viewports.

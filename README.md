# Image Gallery

A responsive image gallery with category filters and an accessible lightbox viewer, built with plain HTML, CSS and JavaScript for the CodeAlpha Frontend Development Internship (Task 1).

**Live demo:** https://muby65.github.io/CodeAlpha_ImageGallery/

## Features

- Masonry layout that adapts from 3 columns on desktop to 2 on tablets and phones
- Category filters (All, Nature, City, Animals) with a live "Showing X of Y photos" status
- Lightbox viewer with previous/next buttons, arrow-key navigation, swipe on touch screens and an "image 3 of 9" counter
- Lightbox navigation follows the active filter and wraps around at the ends
- Hover and focus effects with smooth transitions (turned off for users who prefer reduced motion)
- Accessible: native `<dialog>` for focus trapping and Escape-to-close, real buttons for every photo, descriptive alt text, visible focus outlines
- Fast: small responsive thumbnails with `srcset`; full-size photos load only when opened in the lightbox

## Built with

HTML5, CSS3 (custom properties, multi-column layout, media queries) and vanilla JavaScript. No frameworks or libraries.

## Run locally

1. Clone the repository
2. Open the folder in VS Code and start Live Server on `index.html` (or open `index.html` directly in a browser)

## Project structure

```
CodeAlpha_ImageGallery/
├── index.html
├── css/style.css
├── js/script.js
├── images/            full-size photos (shown in the lightbox)
│   ├── thumbs/        800px thumbnails
│   └── thumbs-sm/     480px thumbnails for small screens
├── favicon.svg
└── README.md
```

## Lighthouse (mobile)

Accessibility 100 · Best Practices 100 · SEO 100 · Performance 85 (local run, simulated slow 4G)

## Credits

Photos from [Unsplash](https://unsplash.com). Built by Mubarak Muhammad Teina.

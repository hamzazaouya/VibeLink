# Font Setup Documentation - VibeLink

## Overview

VibeLink uses two main font families:

- **Roboto**: A modern, clean sans-serif font perfect for body text and UI elements
- **Pacifico**: A fun, handwritten-style font perfect for branding and decorative elements

## Font Loading

Fonts are loaded via Google Fonts in `index.html`:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Pacifico&display=swap"
  rel="stylesheet"
/>
```

## Tailwind Configuration

Both fonts are configured in `tailwind.config.js`:

```javascript
fontFamily: {
  sans: ["Roboto", "Inter", "system-ui", "sans-serif"],
  display: ["Pacifico", "cursive"],
  roboto: ["Roboto", "sans-serif"],
  pacifico: ["Pacifico", "cursive"],
}
```

## CSS Utility Classes

Custom CSS classes are available in `index.css`:

### Generic Font Classes

- `.font-roboto` - Applies Roboto font
- `.font-pacifico` - Applies Pacifico font
- `.brand-title` - Pacifico with optimized styling for brand elements
- `.body-text` - Roboto with optimized styling for body text

### Roboto Weight Variations

- `.roboto-thin` - Weight 100
- `.roboto-light` - Weight 300
- `.roboto-regular` - Weight 400
- `.roboto-medium` - Weight 500
- `.roboto-bold` - Weight 700
- `.roboto-black` - Weight 900

## Usage Examples

### Using Tailwind Classes

```jsx
{/* Primary sans-serif (Roboto) */}
<p className="font-sans">This uses Roboto as the primary font</p>

{/* Display font (Pacifico) */}
<h1 className="font-display">Brand Title</h1>

{/* Explicit font families */}
<p className="font-roboto">Explicit Roboto</p>
<h2 className="font-pacifico">Explicit Pacifico</h2>
```

### Using Custom CSS Classes

```jsx
{/* Brand styling */}
<h1 className="brand-title text-4xl text-accent-pink">VibeLink</h1>

{/* Body text */}
<p className="body-text">This is optimized body text using Roboto</p>

{/* Roboto weight variations */}
<h2 className="roboto-bold text-xl">Bold Heading</h2>
<p className="roboto-light">Light body text</p>
<span className="roboto-medium">Medium weight text</span>
```

## Best Practices

### When to Use Pacifico

- Brand names and logos
- Hero section titles
- Decorative headings
- Fun, casual elements
- Call-to-action buttons (sparingly)

### When to Use Roboto

- Body text and paragraphs
- Navigation menus
- Form labels and inputs
- Button text
- Cards and content blocks
- Data displays

### Font Weight Guidelines

- **Thin (100)**: Minimal, elegant text (use sparingly)
- **Light (300)**: Secondary text, captions
- **Regular (400)**: Default body text
- **Medium (500)**: Emphasized text, important labels
- **Bold (700)**: Headings, strong emphasis
- **Black (900)**: Maximum impact headlines

## Color Combinations

Works well with your color palette:

- Pacifico with accent colors: `text-accent-pink`, `text-accent-salmon`, `text-accent-red`
- Roboto with neutral colors: `text-foreground`, `text-foreground/80`, `text-foreground/60`

## Performance Notes

- Fonts are loaded with `display=swap` for better performance
- Font weights are preloaded for faster rendering
- Consider using `font-display: swap` in CSS for better UX

## Testing

You can test all font combinations using the `FontExample` component:

```jsx
import FontExample from "./components/FontExample";

// Use in your app to see all font variations
<FontExample />;
```

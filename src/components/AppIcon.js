import { icon } from '../utils/icons.js';

// Consistent software icon container.
// size: sm(48) | md(56) | lg(80) | xl(96)
export function AppIcon(app, size = 'md', className = '') {
  const sizes = { sm: 48, md: 56, lg: 80, xl: 96 };
  const px = sizes[size] || 56;
  const glyph = size === 'sm' ? 24 : size === 'xl' ? 46 : size === 'lg' ? 38 : 28;
  const color = app.color || '#2563EB';
  return `
    <span class="app-icon app-icon--${size} ${className}" style="--app-accent:${color}" aria-hidden="true">
      ${icon(app.icon, glyph, 1.9)}
    </span>
  `;
}

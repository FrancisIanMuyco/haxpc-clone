export function formatDate(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return '';
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function licenseBadge(license) {
  const l = (license || '').toLowerCase();
  if (l.includes('open source')) return { label: 'Open Source', cls: 'badge-green' };
  if (l.includes('freeware')) return { label: 'Freeware', cls: 'badge-blue' };
  if (l.toLowerCase() === 'free') return { label: 'Free', cls: 'badge-teal' };
  if (l.includes('freemium')) return { label: 'Freemium', cls: 'badge-amber' };
  return { label: license, cls: 'badge-neutral' };
}

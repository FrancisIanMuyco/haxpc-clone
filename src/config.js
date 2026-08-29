// Detect base path for subpath deployments (e.g., GitHub Pages at /haxpc-clone/)
// On local dev this returns '/', on GitHub Pages this returns '/haxpc-clone/'
const pathname = window.location.pathname;
export const BASE = pathname.replace(/(index\.html)?$/, '').replace(/\/$/, '') + '/';

// Get the app-relative path (stripped of base path)
// Works with both direct navigation and 404 redirect (?path= parameter)
export function getAppPath() {
  const params = new URLSearchParams(window.location.search);
  const redirectPath = params.get('path');
  if (redirectPath) return redirectPath;
  const p = window.location.pathname;
  if (p.startsWith(BASE)) {
    return p.substring(BASE.length - 1); // Keep the leading /
  }
  return p;
}

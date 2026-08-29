import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { software } from '../data/software.js';
import content from './_list-page.js';

export default function Latest() {
  const items = [...software].sort((a, b) => new Date(b.updated) - new Date(a.updated));
  return content({
    title: 'Latest Software',
    subtitle: 'The newest releases and updates, fresh from developer sources.',
    items,
    crumb: 'Latest',
  });
}

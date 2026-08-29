import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { software } from '../data/software.js';
import content from './_list-page.js';

export default function Popular() {
  const items = [...software].filter(s => s.popular > 0).sort((a, b) => a.popular - b.popular);
  return content({
    title: 'Popular Software',
    subtitle: 'The most downloaded and loved tools in the PinoyPC community.',
    items,
    crumb: 'Popular',
    numbered: true,
  });
}

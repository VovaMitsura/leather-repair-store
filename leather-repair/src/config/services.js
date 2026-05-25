// Service catalog. `featured: true` services have detail pages under
// src/components/ServiceDetail.jsx — others route to the contact form.
// To add a new service: append to this array. To add a detail page:
// set `featured: true` and add an entry in ServiceDetail.jsx CONTENT map.

export const SERVICES = [
  {
    key: 'scratch',
    title: 'Scratch repair',
    desc: 'Surface marks and deeper gouges blended into the original finish.',
    href: '#/service/leather-scratch-repair',
    featured: true,
    icon: 'scratch',
  },
  {
    key: 'cracks',
    title: 'Cracks & tears',
    desc: 'Reinforced and color-matched so the repair lasts and stays invisible.',
    href: '#contact',
    icon: 'tear',
  },
  {
    key: 'recoloring',
    title: 'Recoloring & dye match',
    desc: 'Faded or worn leather brought back to its original tone.',
    href: '#/service/leather-recoloring',
    featured: true,
    icon: 'palette',
  },
  {
    key: 'scuffs',
    title: 'Scuffs & fading',
    desc: 'Spot fixes for high-contact areas — arms, seats, steering wheels.',
    href: '#contact',
    icon: 'shine',
  },
  {
    key: 'seams',
    title: 'Stitching & seams',
    desc: 'Loose, broken, or worn seams restitched with matching thread.',
    href: '#contact',
    icon: 'thread',
  },
  {
    key: 'bolster',
    title: 'Bolster & cushion wear',
    desc: 'Worn driver bolsters and sofa cushion edges rebuilt to shape.',
    href: '#contact',
    icon: 'cushion',
  },
  {
    key: 'conditioning',
    title: 'Cleaning & conditioning',
    desc: 'Deep cleans and protective conditioning to extend leather life.',
    href: '#/service/leather-conditioning',
    featured: true,
    icon: 'drop',
  },
  {
    key: 'foam',
    title: 'Foam & cushion fill',
    desc: 'Sagging foam replaced or rebuilt so cushions feel firm again.',
    href: '#contact',
    icon: 'cushion',
  },
  {
    key: 'vinyl',
    title: 'Vinyl & leather-match',
    desc: 'Vinyl, bonded leather, and leather-match surfaces restored.',
    href: '#contact',
    icon: 'swatch',
  },
];

export default SERVICES;

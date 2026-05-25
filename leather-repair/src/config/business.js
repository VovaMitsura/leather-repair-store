// Single source of truth for business contact info, hours, and location.
// Update values here and they propagate everywhere on the site.

export const BUSINESS = {
  name: 'Mitsura Leather Repair',
  legalName: 'Mitsura LLC',
  tagline: 'Leather & Upholstery Repair',

  // Contact
  phone: {
    e164: '+12672678681',         // for tel: links
    display: '(267) 267-8681',    // for UI
  },
  email: 'micuranikolaj@gmail.com',

  // Location
  address: {
    locality: 'Philadelphia',
    region: 'PA',
    country: 'US',
    full: 'Philadelphia, PA US',
  },
  mapUrl: 'https://www.google.com/maps/place/+Philadelphia+PA+US',

  // Service area (used in schema.org LocalBusiness)
  serviceArea: ['Philadelphia', 'New Jersey'],

  // Hours — keep ordered Monday → Sunday for display.
  // `schemaSpec` follows schema.org openingHours format: "Mo 09:00-17:00".
  hours: [
    { day: 'Monday',    open: '9:00am', close: '5:00pm',  schemaSpec: 'Mo 09:00-17:00' },
    { day: 'Tuesday',   open: '9:00am', close: '5:00pm',  schemaSpec: 'Tu 09:00-17:00' },
    { day: 'Wednesday', open: '9:00am', close: '5:00pm',  schemaSpec: 'We 09:00-17:00' },
    { day: 'Thursday',  open: '9:00am', close: '5:00pm',  schemaSpec: 'Th 09:00-17:00' },
    { day: 'Friday',    open: '9:00am', close: '5:00pm',  schemaSpec: 'Fr 09:00-17:00' },
    { day: 'Saturday',  open: '9:00am', close: '5:00pm',  schemaSpec: 'Sa 09:00-17:00' },
    { day: 'Sunday',    open: '9:00am', close: '5:00pm',  schemaSpec: 'Su 09:00-17:00' },
  ],

  // Marketing
  freeEstimateTagline: 'Free Estimates · Call or Text',
  priceRange: '$$',

  // Canonical site URL — used in OG/Twitter/canonical tags and sitemap.
  // TODO(production): replace with actual production domain when deployed.
  siteUrl: 'https://mitsuraleatherrepair.com',
};

export default BUSINESS;

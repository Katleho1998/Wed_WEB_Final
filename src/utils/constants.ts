import { NavItem, TimelineEvent, Accommodation, MealOption } from '../types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Our Story', href: '#our-story' },
  { label: 'Wedding Info', href: '#wedding-info' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'RSVP', href: '#rsvp' },
  {label: 'Find Us', href: '#FindUs'},
  { label: 'Share Photos', href: '#photo-upload' }
];

export const WEDDING_DATE = new Date('2024-09-27T10:00:00');

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    time: '10:00 AM',
    title: 'Saturday - Matrimony Ceremony',
    description: 'Church @ Allen Temple, 188 Ingedezi Street, Zone 7 Meadowland',
  },
  {
    time: '12:30 PM',
    title: 'Saturday - Reception',
    description: '12278, Zone 9, Meadowlands (near Mjakes Tuckshop)',
  },
  {
    time: '12:30 PM',
    title: 'Sunday Celebration',
    description: 'Join us at Molapo Park for the continuation of our celebration',
  },
];

export const ACCOMMODATIONS: Accommodation[] = [
  {
    name: 'Soweto Hotel',
    description: 'Luxury hotel with traditional African charm',
    price: 'From R1,500/night',
    distance: '2km from venue',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bookingUrl: '#',
  },
  {
    name: 'Meadowlands Guest House',
    description: 'Comfortable accommodation close to the venue',
    price: 'From R950/night',
    distance: '1km from venue',
    image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bookingUrl: '#',
  },
  {
    name: 'Urban Boutique Hotel',
    description: 'Modern comfort in the heart of Soweto',
    price: 'From R1,200/night',
    distance: '3km from venue',
    image: 'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bookingUrl: '#',
  },
];

export const MEAL_OPTIONS: MealOption[] = [
  {
    id: 'traditional',
    name: 'Traditional African Feast',
    description: 'A selection of traditional dishes including pap, chakalaka, and mogodu',
    dietaryInfo: 'Contains various meats and vegetables',
  },
  {
    id: 'western',
    name: 'Western Menu',
    description: 'Grilled chicken or beef with roasted vegetables and rice',
    dietaryInfo: 'Halaal options available',
  },
  {
    id: 'vegetarian',
    name: 'Vegetarian Option',
    description: 'Mixed vegetable curry with rice and traditional sides',
    dietaryInfo: 'Vegetarian, can be made vegan on request',
  },
];

export const REGISTRY_STORES = [
  {
    name: 'Woolworths',
    url: 'https://www.woolworths.co.za/cat/Gift-Cards/_/N-1z13s5h',
  },
  {
    name: '@Home',
    url: 'https://www.home.co.za/gift-cards',
  },
  {
    name: 'Volpes',
    url: 'https://www.volpes.co.za/gift-cards',
  },
  {
    name: 'Coriocroft',
    url: 'https://www.coriocroft.com/gift-cards',
  },
];
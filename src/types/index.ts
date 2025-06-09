export interface NavItem {
  label: string;
  href: string;
}

export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
}

export interface Accommodation {
  name: string;
  description: string;
  price: string;
  distance: string;
  image: string;
  bookingUrl: string;
}

export interface MealOption {
  id: string;
  name: string;
  description: string;
  dietaryInfo: string;
}
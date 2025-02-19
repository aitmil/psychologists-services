export interface User {
  user: { name: string; email: string } | null;
}

export interface Review {
  reviewer: string;
  rating: number;
  comment: string;
}

export interface Psychologist {
  id: string;
  name: string;
  avatar_url: string;
  experience: string;
  reviews: Review[];
  price_per_hour: number;
  rating: number;
  license: string;
  specialization: string;
  initial_consultation: string;
  about: string;
}

export interface PsychologistState {
  data: Psychologist[];
  dataFavorites: Psychologist[];
  favorites: string[];
  sortBy: string;
  lastKey: string | number | null;
  hasMore: boolean;
  isLoading: boolean;
}

export interface SortBy {
  id: number;
  name: string;
}

export type AppointmentFormValues = {
  name: string;
  phone: string;
  time: string;
  email: string;
  comment: string;
};

export type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

export type LoginFormValues = { email: string; password: string };

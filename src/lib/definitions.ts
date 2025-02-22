export interface User {
  name: string;
  email: string;
  id: string;
}

export interface UserState {
  user: User | null;
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

export interface PsychologistsState {
  data: Psychologist[];
  psychologist: Psychologist | null;
  sortBy: string;
  lastKey: string | number | null;
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface FavoritesState {
  data: Psychologist[];
  sortBy: string;
  lastKey: string | number | null;
  hasMore: boolean;
  isLoading: boolean;
}

export interface FetchDataResponse {
  data: Psychologist[];
  lastValue: string | number | null;
  hasMore: boolean;
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

export interface User {
  user: { name: string; email: string } | null;
}

export interface Review {
  reviewer: string;
  rating: number;
  comment: string;
}

export interface Psychologist {
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

export interface PsychologistsList {
  data: Psychologist[] | null;
}

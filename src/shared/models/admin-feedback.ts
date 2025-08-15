export interface Review {
  id: number;
  user_id: number;
  email: string;
  comment: string;
  rating: number;
  sentiment: "positive" | "neutral" | "negative" | "Unknown";
  created_at: string; // ISO string or date string
}

export interface ReviewSummary {
  total_reviews: number;
  positive: number;
  neutral: number;
  negative: number;
  unknown: number;
}

export interface ReviewsApiResponse {
  reviews: Review[];
  summary: ReviewSummary;
}

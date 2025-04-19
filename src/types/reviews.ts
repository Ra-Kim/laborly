export interface ISubmitReview {
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
}

export interface IReview {
  id: string;
  reviewer_id: string;
  worker_id: string;
  job_id: string;
  rating: number;
  text: string;
  is_flagged: boolean;
  created_at: string;
  updated_at: string;
}

export interface IWorkerSummary {
  average_rating: number;
  total_reviews: number;
}

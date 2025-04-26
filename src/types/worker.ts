export interface IWorkerProfile {
  bio: string;
  years_experience: number;
  availability_note: string;
  id: string;
  user_id: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
  is_verified: boolean;
  professional_skills: string;
  work_experience: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  location: string;
  profile_picture: string;
}

export type IWorkerKYCStatus = "PENDING" | "APPROVED" | "REJECTED"

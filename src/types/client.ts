export interface IClientProfile {
  business_name: string;
  id: string;
  user_id: string;
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  location: string;
  profile_picture: string;
  created_at: string;
  updated_at: string;
}

export interface IFavoriteWorker {
  worker_id: string;
  id: string;
  client_id: string;
  created_at: string;
}



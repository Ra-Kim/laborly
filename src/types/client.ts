import { IWorkerProfile } from "./worker";

export interface IClientProfile {
  business_name: string;
  id: string;
  user_id: string;
  profile_description: string;
  email: string;
  phone_number: string;
  first_name: string;
  address: string;
  last_name: string;
  location: string;
  created_at: string;
  updated_at: string;
}

export interface IFavoriteWorker {
  worker: IWorkerProfile;
  id: string;
  client_id: string;
  created_at: string;
}

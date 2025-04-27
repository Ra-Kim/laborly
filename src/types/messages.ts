export interface IStartConversation {
  content: string;
  service_id: string;
  receiver_id: string;
}

export interface IReplyConversation {
  content: string;
}

export interface IMessage {
  content: string;
  id: string;
  sender_id: string;
  thread_id: string;
  timestamp: string;
}

export interface IThread {
  id: string;
  created_at: string;
  job_id: string;
  is_closed: true;
  participants: {
    user: {
      id: string;
      first_name: string;
      last_name: string;
      profile_picture: null;
    };
  }[];
  messages: IMessage[];
}

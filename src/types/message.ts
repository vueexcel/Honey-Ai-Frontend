export interface Message {
  id?: string; // optional for temp streamed message
  user_id?: string;
  character_id?: string;
  sender_type: "user" | "character";
  message_type: "text" | "image" | "video";
  content: string;
  created_at?: string;
};

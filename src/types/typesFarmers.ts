export interface FarmersTypes {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  phone: number;
  avatar_url: string;
  location: string;
  farm_name: string;
  farm_type: string;
  farm_size: number;
  products: string;
  bio: string;
  created_at: number;
  updated_at: number;
}

export interface FarmersPostsTypes {
  id: number;
  farmer_id: number;
  title: string;
  content: string;
  image_url: string;
  created_at: number;
}

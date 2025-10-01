export interface IUser {
    id: string;
    is_verified: boolean;
    is_registred: boolean;
}

export interface userInfo {
  user_name: string,
  first_name: string,
  last_name: string,
  age: number,
  phone: string,
  bio: string,
  email: string,
  hobbies: string[]
}

export interface UserCredentials{
  id: string;
  password_hash: string;
  is_registred: boolean;
  is_verified: boolean;
}

export interface UserInfo {
  user_name: string;
  email: string;
  is_registred: boolean;
  is_verified: boolean;
}

export interface password{
  user_id: string;
  verif_id: string;
  verif_code: string;
}

export interface userProfilInfo {
  user_name: string;
  gender: string;
  bio: string;
  rating: number;
  avatar: string;
  hobbies: string[];
}

export interface UserImageGallery {
  picture_path: string;
  slot_number: number;
}

export interface userMatches {
  id: string;
  username: string;
  avatar: string;
  date: Date
}

export interface UserProfileVisite {
  user_id: string,
  avatar: string,
  user_name: string,
  view_time: string,
  visit_count: number
}

export interface profileInfo {
  profile_info: userProfilInfo;
  profile_images: userImages;
  profile_visite?: UserProfileVisite [];
  matches?: userMatches[];
  
}

export interface userNotification {
  user_id: string;
  user_name: string;
  profileImage: string;
  notification: string;
}

export interface UserScore {
  id: string;
  distance: number;
  age: number;
  rating: number;
  hobbies: number;
  score: number
}

export interface suggestionsData {
  id: string;
  user_name: string;
  gender: string;
  age: number;
  bio: string;
  rating: number;
  distance: string;
  is_online: Boolean;
  picture_paths: string[];
}

export interface EmailTokens {
  email_code: string;
  email_id: string;
}
export interface IUser {
    id: string;
    is_verified: boolean;
    is_registred: boolean;
    verif_email_id?: string;
    verif_email_code?: string;
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

export interface UserStatus {
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
  hobbies: string[];
}

export interface userImages {
  profileImage: string;
  images: string[];
}

export interface userMatches {
  user_id: string;
  user_name: string;
  profileImage: string;
}

export interface profileInfo {
  user_info: userProfilInfo;
  user_images: userImages;
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
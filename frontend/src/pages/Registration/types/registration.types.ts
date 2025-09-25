export interface RegistrationData {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  phone: string;
  bio: string;
  latitude: number;
  longitude: number;
  hobbies: string[];
  profileImage: (File | null);
  images: (File | null)[];
}

export type UserFormProps = RegistrationData & {
    updateFields: (fields: Partial<RegistrationData>) => void;
};
export interface FormData {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  phone: string;
  bio: string;
  latitude: number;
  longitude: number;
}

export type UserFormProps = FormData & {
    updateFields: (fields: Partial<FormData>) => void;
};
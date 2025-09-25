import { RegistrationData } from "./types/registration.types";

const buildFormData = (data: RegistrationData): FormData => {
  const formData = new FormData();

  formData.append('firstName', data.firstName);
  formData.append('lastName', data.lastName);
  formData.append('age', data.age);
  formData.append('gender', data.gender);
  formData.append('phone', data.phone);
  formData.append('bio', data.bio);
  formData.append('latitude', String(data.latitude));
  formData.append('longitude', String(data.longitude));

  // Convert hobbies array to JSON string, or send each separately if backend supports it
  formData.append('hobbies', JSON.stringify(data.hobbies));

  // Profile image (single file)
  if (data.profileImage) {
    formData.append('profileImage', data.profileImage);
  }

  // Additional images (array of files)
  data.images.forEach((file) => {
    if (file) {
      formData.append('images', file); // same field name for all
    }
  });

  return formData;
};

export default buildFormData;

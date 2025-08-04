export interface UserProfile {
  id: number;
  name: string;
  age: number;
  images: string[];
  description: string;
  rating: number;
  mutualFriends: number;
}

export const testUsers: UserProfile[] = [
  {
    id: 1,
    name: "John Doe",
    age: 28,
    images: [
      "img/prfile_img_2.png",
      "img/profile_image_5.png",
      "img/profile_image_6.png",
      "img/profile_image.png",
    ],
    description:
      "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod",
    rating: 3,
    mutualFriends: 3,
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 30,
    images: [
      "https://cdn.intra.42.fr/users/68cf081abe9e9f700d9efd1d27f07231/hazaouya.jpg",
      "img/aahrach.jpeg",
      "https://cdn.intra.42.fr/users/b145a08af26318cd43d39176d47b64c7/zlazrak.JPG",
      "https://cdn.intra.42.fr/users/fecbc74d595c68f963737b256abc7aa8/yoyahya.JPG",
    ],
    description:
      "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor",
    rating: 4,
    mutualFriends: 5,
  },
  {
    id: 3,
    name: "Alice Johnson",
    age: 25,
    images: ["img/girl_1.png", "img/girl_2.png"],
    description:
      "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt",
    rating: 5,
    mutualFriends: 2,
  },
];

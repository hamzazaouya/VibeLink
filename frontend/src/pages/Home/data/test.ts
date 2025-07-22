export interface UserProfile {
  id: number;
  name: string;
  age: number;
  image: string;
  description: string;
  rating: number;
  mutualFriends: number;
}

export const testUsers: UserProfile[] = [
  {
    id: 1,
    name: "John Doe",
    age: 28,
    image: "img/login_image.png",
    description:
      "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod",
    rating: 3,
    mutualFriends: 3,
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 30,
    image: "img/profile_img_4.png",
    description:
      "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor",
    rating: 4,
    mutualFriends: 5,
  },
  {
    id: 3,
    name: "Alice Johnson",
    age: 25,
    image: "img/profile_img.png",
    description:
      "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt",
    rating: 5,
    mutualFriends: 2,
  },
  {
    id: 4,
    name: "Bob Brown",
    age: 32,
    image: "img/girl_1.png",
    description:
      "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua",
    rating: 4,
    mutualFriends: 4,
  },
  {
    id: 5,
    name: "Emily Davis",
    age: 27,
    image: "img/profile_img_1.png",
    description:
      "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua Ut Enim Ad Minim Veniam",
    rating: 5,
    mutualFriends: 6,
  },
  {
    id: 6,
    name: "Sarah Wilson",
    age: 26,
    image: "img/girl_2.png",
    description:
      "Adventure seeker and coffee enthusiast. Love hiking and exploring new places.",
    rating: 4,
    mutualFriends: 7,
  },
  {
    id: 7,
    name: "Alice Smith",
    age: 22,
    image: "img/profile_image_5.png",
    description:
      "Tech lover and aspiring developer. Passionate about coding and design.",
    rating: 5,
    mutualFriends: 5,
  },
  {
    id: 8,
    name: "Bob Brown",
    age: 32,
    image: "img/profile_image_5.png",
    description:
      "Music producer and DJ. Always looking for the next big sound.",
    rating: 4,
    mutualFriends: 4,
  },
  {
    id: 9,
    name: "Emily Davis",
    age: 24,
    image: "img/profile_image.png",
    description:
      "Graphic designer and art lover. Enjoys creating beautiful things.",
    rating: 5,
    mutualFriends: 6,
  },
  {
    id: 10,
    name: "Mike Johnson",
    age: 30,
    image: "img/profile_img_3.png",
    description:
      "Photographer and travel blogger. Always looking for the next great shot.",
    rating: 5,
    mutualFriends: 2,
  },
];

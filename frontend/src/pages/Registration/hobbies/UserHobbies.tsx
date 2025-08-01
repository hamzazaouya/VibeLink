import IconButton from "./IconButton";
import "../styles/userHobbies.css"
import { useState } from "react";
import { UserFormProps } from "../types/registration.types";

    const iconButtons: [string, string][] = [
        ["📗", "Quran"],
        ["💪", "Workout"],
        ["⚽", "Soccer"],
        ["🏀", "Basketball"],
        ["🏊‍♂️", "Swimming"],
        ["♟️", "Chess"],
        ["🎣", "Fishing"],
        ["☕", "Coffee"],
        ["📈", "Investing"],
        ["📷", "Photography"],
        ["💻", "Coding"],
        ["🚴‍♂️", "Cycling"],
        ["🥾", "Hiking"],
        ["⛺", "Camping"],
        ["✍️", "Blogging"],
        ["🕹️", "Gaming"],
        ["🎨", "Drawing"],
        ["🧑‍🍳", "Cooking"],
        ["🎙️", "Podcast"],
        ["🌱", "Gardening"],
        ["📚", "Reading"],
        ["🧁", "Baking"],
        ["🏄‍♂️", "Surfing"],
        ["🧶", "Knitting"],
        ["🏃‍♂️", "Running"],
        ["✈️", "Traveling"],
        ["🐦", "Bird Watching"],
        ["🤝", "Volunteering"],
        ["🎲", "Board Games"],
        ["🧩", "Puzzle Solving"],
        ["🤖", "Robotics"],
        ["🖌️", "Calligraphy"],
        ["🛶", "Canoeing"],
        ["🏹", "Archery"],
        ["📖", "Storytelling"],
        ["🛹", "Skateboarding"],
        ["🧗‍♂️", "Rock Climbing"],
        ["🎭", "Theater"],
        ["🚣‍♀️", "Rowing"],
        ["🧙‍♂️", "Cosplaying"],
        ["📡", "Astronomy"],
        ["🎮", "Video Gaming"],
        ["🥋", "Martial Arts"],
        ["🍰", "Cake Baking"],
    ];

function UserHobbies(props: UserFormProps) {
  const { hobbies, updateFields } = props;
  const maxSelection = 7;

  function toggleHobby(label: string) {
    if (hobbies.includes(label)) {
      // Remove hobby
      updateFields({ hobbies: hobbies.filter((h) => h !== label) });
    } else {
      if (hobbies.length < maxSelection) {
        // Add hobby
        updateFields({ hobbies: [...hobbies, label] });
      }
    }
  }

  return (
    <div className="full">
      <div className="user_hobbies">
        <h1>Choose your Hobbies</h1>
        <h3>
          {hobbies.length} / {maxSelection}
        </h3>
        <div className="hobbies">
          {iconButtons.map(([emoji, label]) => (
            <IconButton
              key={label}
              emoji={emoji}
              label={label}
              selected={hobbies.includes(label)}
              onClick={() => toggleHobby(label)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserHobbies;
import { IconButtonProps } from "../types/IconButton.types";

function IconButton({ emoji, label, selected, onClick}: IconButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`hobbie ${selected ? "bg-accent-pink" : "bg-white bg-opacity-20"}`} 
      aria-pressed={selected}
      title={label}
      >
      <span className="mr-2">{emoji}</span> {label}
    </button>
  );
}

export default IconButton;
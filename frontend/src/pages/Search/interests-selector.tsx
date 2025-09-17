import { useState } from "react";
import { InterestTag } from "./interest-tag";
import { INTERESTS } from "@/lib/interests-data";

interface InterestsSelectorProps {
  selectedInterests?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  maxSelections?: number;
  title?: string;
  className?: string;
}

export function InterestsSelector({
  selectedInterests = [],
  onSelectionChange,
  maxSelections,
  className = "",
}: InterestsSelectorProps) {
  const [selected, setSelected] = useState<string[]>(selectedInterests);

  const handleInterestClick = (interestId: string) => {
    let newSelected: string[];

    if (selected.includes(interestId)) {
      // Remove if already selected
      newSelected = selected.filter((id) => id !== interestId);
    } else {
      // Add if not selected (check max limit)
      if (maxSelections && selected.length >= maxSelections) {
        return; // Don't add if at max limit
      }
      newSelected = [...selected, interestId];
    }

    setSelected(newSelected);
    onSelectionChange?.(newSelected);
  };

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-3">
        {INTERESTS.map((interest) => (
          <InterestTag
            key={interest.id}
            interest={interest}
            isSelected={selected.includes(interest.id)}
            onClick={() => handleInterestClick(interest.id)}
          />
        ))}
      </div>
    </div>
  );
}

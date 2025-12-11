import Matches from "./Matches";
import Views from "./Views";
import { rightPanel } from "../types/rightPanel.types";

function RightPanel({ matches, views }: rightPanel) {
    console.log("===============> ", "matches", matches, "Views", views)
    return (
        <div className="space-y-4">
            {matches && <Matches matches={matches} />}
            {views && <Views views={views} />}
        </div>
    );
}

export default RightPanel
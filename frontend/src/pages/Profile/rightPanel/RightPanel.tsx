import Matches from "./Matches";
import { rightPanel } from "../types/rightPanel.types";

function RightPanel({matches}: rightPanel) {
    return (
        <Matches matches={matches}/>
    );
}

export default RightPanel
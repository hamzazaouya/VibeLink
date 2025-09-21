import "./styles/buttons.css"
import { RiArrowLeftSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";

type ButtonProps = {
  currentPage: number;
  back: () => void;
  next: () => void;
};

function Buttons ({currentPageIndex, back, next }: ButtonProps) {
    return (
        <>
            <div className="buttons flex">
                {
                currentPageIndex !== 0 && <div className="back">
                    <button
                        onClick={back}
                        ><RiArrowLeftSLine />Back
                    </button>
                </div>}
                <div className="next">
                    <button
                        onClick={next}
                        > Next <RiArrowRightSLine /></button>
                </div>
            </div>
        </>
    )
}

export default Buttons;
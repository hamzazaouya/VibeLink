import "./styles/buttons.css"
import { RiArrowLeftSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";

type ButtonProps = {
  currentPage: number;
  back: () => void;
  next: () => void;
  handleSubmit: () => void;
};

function Buttons ({currentPageIndex, back, next, handleSubmit }: ButtonProps) {

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
                {currentPageIndex < 2 &&<div className="next">
                    <button
                        onClick={next}
                        > Next <RiArrowRightSLine /></button>
                </div>}
                {currentPageIndex == 2  &&<div className="next">
                    <button
                        onClick={handleSubmit}
                        > Finish</button>
                </div>}
            </div>
        </>
    )
}

export default Buttons;
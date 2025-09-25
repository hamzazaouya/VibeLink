import { useState } from 'react';
import "./styles/stepper.css"
import {TiTick} from "react-icons/ti"


function Stepper ({ currentPageIndex }: { currentPageIndex: number }) {
    const steps = ["informations", "hobbies", "images"];
    // const [currentStep, setCurrentStep] = useState(1)
    return (
        <>
            <div className="flex justify-center w-full">
                {
                    steps.map((step, i) => {
                        return (
                        <div    key={i} 
                                className={`step-item ${ currentPageIndex === i && "active"} 
                                ${i <  currentPageIndex && 'complete'}`}>
                            <div className="step">
                                {
                                i >=  currentPageIndex ? i : <TiTick size={25}/> 
                                }
                            </div>
                            <p>{step}</p>
                        </div>);
                    })
                }
            </div>
        </>
    );
}

export default Stepper
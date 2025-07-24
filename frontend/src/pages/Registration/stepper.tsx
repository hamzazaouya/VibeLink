import { useState } from 'react';
import "./stepper.css"
import {TiTick} from "react-icons/ti"
function Stepper () {
    const steps = ["email verification", "informations", "hobbies", "profile images"];
    const [currentStep, setCurrentStep] = useState(3)
    return (
        <>
            <div className="flex justify-center">
                {
                    steps.map((step, i) => {
                        return (
                        <div    key={i} 
                                className={`step-item ${currentStep === i + 1 && "active"} 
                                ${i + 1 < currentStep && 'complete'}`}>
                            <div className="step">
                                {
                                i + 1 >= currentStep ? i + 1 : <TiTick size={25}/> 
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
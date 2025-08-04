import Stepper from "./stepper";
import EmailConfirmation from "./emailConfirmation/EmailConfirmation";
import UserInformation from "./UserInfo/UserInfo";
import UserHobbies from "./hobbies/UserHobbies";
import Buttons from "./buttons"
import React, { useState } from "react";
import { FormData } from "./types/registration.types";
import IconButton from "./hobbies/IconButton";
import ImageUploader from "./images/imagesUploader";
import MultiStepFrom from "./MultiStepFrom";

const INIT_DATA: FormData = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  phone: "",
  bio: "",
  latitude: 32.229408,
  longitude: -7.957042,
  hobbies: [],
};

function UserRegistration () {
    const[data, setData] = useState(INIT_DATA);
    function updateFields(fields: Partial<FormData>) {
        setData(prev => {
            return {...prev, ...fields}

        });
    }
    const {currentPageIndex, currentPage, back, next} = MultiStepFrom([
                <EmailConfirmation />, 
                <UserInformation {...data} updateFields={updateFields}/>,
                <UserHobbies {...data} updateFields={updateFields}/>,
                <ImageUploader />
            ]);
    return (
        <div className="flex flex-col bg-background h-screen w-screen px-5">
        
            <div className="flex items-center justify-start h-[10%]">
                <h1 className="text-[1.5rem] font-[1000] tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-accent-pink from-30% via-accent-red to-accent-salmon">VibeLink</h1>
            </div>
            <div className="h-[80%] flex flex-col items-center justify-center">
                <div>
                    <div className="text-[1.2rem] lg:text-[1.5rem] mb-5 font-light">
                        Hi <span className="font-bold">Hamza</span> Complete your registration
                    </div>
                    <Stepper currentPageIndex={currentPageIndex}/>
                    <div className="bg-white bg-opacity-30 rounded-xl p-2 mt-5">
                        {currentPage}
                    </div>
                    
                    {currentPageIndex > 0 ? <Buttons currentPage={currentPage} currentPageIndex={currentPageIndex} back={back} next={next}/> :  ""}
                </div>
            </div>
        </div>
    );
}

export default UserRegistration

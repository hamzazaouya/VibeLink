import Stepper from "./stepper";
import EmailConfirmation from "./emailConfirmation/EmailConfirmation";
import UserInformation from "./UserInfo/UserInfo";
import UserHobbies from "./hobbies/UserHobbies";
import Buttons from "./buttons"
import React, { useState } from "react";
import { FormData } from "./types/registration.types";
import IconButton from "./hobbies/IconButton";
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
                <UserHobbies {...data} updateFields={updateFields}/>
            ]);
    return (
        <>
            <div className=" relative h-screen w-screen bg-background flex items-center flex-col">
            
                <div className="absolute top-2 left-5">
                    <h1 className="text-[1.5rem] font-[1000] tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-accent-pink from-30% via-accent-red to-accent-salmon">VibeLink</h1>
                </div>
                <div className="absolute mt-[20%] md:mt-[5%] lg:mt-[3%]">
                    <div className="sm:text-[1.2rem] lg:text-[1.5rem] mb-5 font-light">Hi <span className="font-bold">Hamza</span> Complete your registration</div>
                        <Stepper currentPageIndex={currentPageIndex}/>
                        <div className="w-full bg-white mt-10 bg-opacity-30 rounded-xl p-2">
                            {currentPage}
                        </div>
                        
                        {currentPageIndex > 0 ? <Buttons currentPage={currentPage} back={back} next={next}/> :  ""}
                </div>
            </div>
        </>
    );
}

export default UserRegistration

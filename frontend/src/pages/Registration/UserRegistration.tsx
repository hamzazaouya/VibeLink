import React, { useState, useEffect } from "react";
import Stepper from "./stepper";
import UserInformation from "./UserInfo/UserInfo";
import UserHobbies from "./hobbies/UserHobbies";
import ImagesUploader from "./images/imagesUploader";
import Buttons from "./buttons";
import { FormData } from "./types/registration.types";
import useMultiStepFrom from "./MultiStepFrom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from 'react-spinners';

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
  images: [null, null, null, null, null],
};

function UserRegistration() {
  const [data, setData] = useState(INIT_DATA);
  const [isLoading, setIsLoading] = useState(true); // 👈 Show loader only
  const navigate = useNavigate();

  const pages = [
    <UserInformation {...data} updateFields={updateFields} />,
    <UserHobbies {...data} updateFields={updateFields} />,
    <ImagesUploader {...data} updateFields={updateFields} />,
  ];

  const { currentPageIndex, currentPage, back, next} = useMultiStepFrom(pages);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => ({ ...prev, ...fields }));
  }

  useEffect(() => {
    async function checkUserStatus() {
      try {
        const response = await axios.get("http://localhost:3000/user/status", {
          withCredentials: true,
        });

        const { emailVerified, isRegistred} = response.data;

        if (!emailVerified) {
          navigate("/email/confirmation")
        } else if (emailVerified && isRegistred) {
          navigate("/home");
          return;
        }

        setIsLoading(false);
      } catch (error) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    }

    checkUserStatus();
  }, [navigate]);

  function isFormDataComplete(data: FormData): boolean {
    
  }
  // ✅ Real registration page after auth
  return (
    <div className="flex flex-col bg-background h-screen w-screen px-5">
      <div className="flex items-center justify-start h-[10%]">
        <h1 className="text-[1.5rem] font-[1000] tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-accent-pink from-30% via-accent-red to-accent-salmon">
          VibeLink
        </h1>
      </div>
      <div className="h-[80%] flex flex-col items-center justify-center">
        <div>
          <div className="text-[1.2rem] lg:text-[1.5rem] mb-5 font-light text-center">
            Hi <span className="font-bold">Hamza</span>, complete your registration
          </div>
          <Stepper currentPageIndex={currentPageIndex} />
          <div className="bg-white bg-opacity-30 rounded-xl p-2 mt-5">{currentPage}</div>
            <Buttons
              currentPage={currentPage}
              currentPageIndex={currentPageIndex}
              back={back}
              next={next}
            />
        </div>
      </div>
    </div>
  );
}

export default UserRegistration;

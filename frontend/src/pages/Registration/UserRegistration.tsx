import React, { useState, useEffect } from "react";
import Stepper from "./stepper";
import UserInformation from "./UserInfo/UserInfo";
import UserHobbies from "./hobbies/UserHobbies";
import ImagesUploader from "./images/imagesUploader";
import Buttons from "./buttons";
import { RegistrationData } from "./types/registration.types";
import useMultiStepFrom from "./MultiStepFrom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import buildFormData from "./formData";
import Swal from "sweetalert2"

const INIT_DATA: RegistrationData = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  phone: "",
  bio: "",
  latitude: 32.229408,
  longitude: -7.957042,
  hobbies: [],
  profileImage: null,
  images: [null, null, null, null, null],
};

function UserRegistration() {
  const [data, setData] = useState(INIT_DATA);
  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();
  const BACKEND_APP_URL = import.meta.env.VITE_BACKEND_APP_URL

  const pages = [
    <UserInformation {...data} updateFields={updateFields} />,
    <UserHobbies {...data} updateFields={updateFields} />,
    <ImagesUploader {...data} updateFields={updateFields} />,
  ];
  console.log(data);
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

      } catch (error) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    }

    checkUserStatus();
  }, [navigate]);

  const handleSubmit = async () => {
    const formData = buildFormData(data);
      try {
        console.log(formData);
          await axios.post(`${BACKEND_APP_URL}/user/register`, formData, { withCredentials: true });
          navigate('/home');
      } catch (error) {
        if (error.status == 400) {
              let errorMessages;
              if (error.response.data.errors) {
                errorMessages = error.response.data.errors.map(error => error.message).join('\n');

              }else {
                errorMessages = error.response.data.error;
              }
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: errorMessages,
              });
        }
        else {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.response.data.message || 'Something went wrong!',
          });}
      }
    };

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
              handleSubmit={handleSubmit}
            />
        </div>
      </div>
    </div>
  );
}

export default UserRegistration;

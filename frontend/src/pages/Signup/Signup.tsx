import Slider from "./Slider";
import CreateAccountForm from "./CreateAccountForm";
import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2"

function Signup () {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

        const response = await axios.post('http://localhost:3000/user/signup', form);
        console.log('Success:', response.data);
        navigate('/login');
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.status == 409) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message || 'Something went wrong!',
                });
            } else if (error.status == 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Password error" || 'Something went wrong!',
                });
            }
        } else {
            setErrorMessage("Unexpected error");
            console.log('Unexpected error:', error);
        }
    }
};

    return (
        <>
           <div className="h-screen w-screen bg-background flex justify-center items-center">
                <div className=" flex flex-row gap-[3rem] bg-foreground rounded-xl bg-opacity-20 p-[1rem]">
                    <Slider />
                    <CreateAccountForm 
                    form={form}
                    onChange={handleChange}
                    onSubmit={handleSubmit}/>
                </div>
           </div>
        </>
    )
}

export default Signup;
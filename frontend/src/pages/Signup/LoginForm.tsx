import React, { useState } from "react";
import axios from "axios"
import Swal from "sweetalert2"
import { useNavigate } from 'react-router-dom';

function LoginAccountForm	() {
    const FRONTEND_APP_URL = import.meta.env.VITE_FRONTEND_APP_URL
    const BACKEND_APP_URL = import.meta.env.VITE_BACKEND_APP_URL
    console.log(FRONTEND_APP_URL, BACKEND_APP_URL);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(`${BACKEND_APP_URL}/user/login`, form, { withCredentials: true });
            navigate('/register');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message || 'Something went wrong!',
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    return (
            <div className="w-full lg:w-full lg:h-[35rem] flex items-center">
                <div>
                    <h1 className="text-left font-bold text-[2rem]">Login</h1>
                    <div className="text-left text-[.8rem] pl-1 mt-2">
                        <span className="">didn't have an account ?</span>
                        <a href={`${FRONTEND_APP_URL}/signup`} className="px-[.5rem] underline text-accent-salmon">Signup</a>
                    </div>
                    <div className="mt-6">
                        <form onSubmit={handleSubmit} className="">
                            <div className="mt-2">
                                <input 
                                    type="email" 
                                    name="email"
                                    value={form.email}
                                    placeholder="Email"
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 rounded-md bg-white/40 text-black placeholder-gray-700 text-[.8rem] placeholder:text-[.8rem] focus:outline-none focus:ring-1 focus:ring-accent-red"
                                />
                            </div>

                            <div className="mt-2">
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    placeholder="Password"
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 rounded-md bg-white/40 text-black placeholder-gray-700 text-[.8rem] placeholder:text-[.8rem] focus:outline-none focus:ring-1 focus:ring-accent-red"
                                />
                            </div>
                            <div className="mt-4 text-left text-[.8rem] flex">
                                <input
                                id="terms"
                                type="checkbox"
                                className="h-4 w-4 bg-white  border-gray-300 rounded"
                                />
                                <span className="ml-2">I agree to the</span>
                                <a href="" className="ml-1 underline text-accent-salmon">Terms & Conditions</a>
                            </div>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="capitalize text-[1rem] rounded font-bold w-full py-2 bg-gradient-to-r from-accent-pink from-30% via-accent-red to-accent-salmon text-white rounded border border-transparent hover:border-white hover:text-white transition focus:outline-none focus:ring-0"
                                >
                                    Login
                                </button>
                            </div>
                            <div className="flex items-center mt-6">
                                <span className="inline-block w-full h-[1px] bg-white "></span>
                                <span className="inline-block w-full text-[.7rem]">or Login using</span>
                                <span className="inline-block w-full h-[1px] bg-white "></span>
                            </div>
                            <div className="flex w-full gap-2 grid-cols-2 mt-6 ">
                                <div className="w-full">
                                    <a href="http://localhost:3000/user/auth/google">
                                        <div className="text-white px-2 py-1.5 border rounded-md text-center text-[.8rem] transition hover:border-accent-red ">
                                            Google
                                        </div>
                                    </a>
                                </div >
                                <div className="w-full">
                                    <a href="http://localhost:3000/user/auth/discord">
                                        <div className="text-white px-2 py-1.5 border rounded-md text-center text-[.8rem] transition hover:border-accent-red ">
                                            Discord
                                        </div>
                                    </a>
                                </div >
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    )
}


export default LoginAccountForm
import React, { useState } from "react";

function CreateAccountForm	() {

    const APP_URL = "https://ideal-adventure-vr9wxw6pxrjfp6p5-5173.app.github.dev"

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', form);
        // Add validation or API call here
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    return (
        <>
            <div className="bg-white bg-opacity-0 w-[300px] h-[416px]">
                <div className="mt-[3rem]">
                    <h1 className="text-left font-bold text-[1.7rem]">Login</h1>
                    <div className="text-left text-[.7rem] pl-1 mt-2">
                        <span className="">didn't have an account ?</span>
                        <a href='${APP_URL}/signup' className="px-[.5rem] underline text-accent-salmon">Signup</a>
                    </div>
                    <div className="mt-6 w-[260px]">
                        <form onSubmit={handleSubmit}className="">
                            <div className="mt-2">
                                <input 
                                    type="email" 
                                    name="email"
                                    value={form.email}
                                    placeholder="Email"
                                    onChange={handleChange}
                                    className="w-full px-3 py-1 rounded-md bg-white/40 text-black placeholder-gray-700 text-[.7rem] placeholder:text-[.7rem] focus:outline-none focus:ring-1 focus:ring-accent-red"
                                />
                            </div>

                            <div className="mt-2">
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    placeholder="Password"
                                    onChange={handleChange}
                                    className="w-full px-3 py-1 rounded-md bg-white/40 text-black placeholder-gray-700 text-[.7rem] placeholder:text-[.7rem] focus:outline-none focus:ring-1 focus:ring-accent-red"
                                />
                            </div>
                            <div className="mt-4 text-left text-[.7rem] flex">
                                <input
                                id="terms"
                                type="checkbox"
                                className="h-4 w-4 bg-white  border-gray-300 rounded"
                                />
                                <span className="ml-2">I agree to the</span>
                                <a href="" className="ml-1 underline text-accent-salmon">Terms & Conditions</a>
                            </div>

                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="capitalize text-[.8rem] rounded font-bold w-full py-1 bg-gradient-to-r from-accent-pink from-30% via-accent-red to-accent-salmon text-white rounded border border-transparent hover:border-white hover:text-white transition focus:outline-none focus:ring-0"
                                >
                                    Login
                                </button>
                            </div>
                            <div className="flex items-center mt-6">
                                <span className="inline-block w-full h-[1px] bg-white "></span>
                                <span className="inline-block w-full text-[.5rem]">or Login using</span>
                                <span className="inline-block w-full h-[1px] bg-white "></span>
                            </div>
                            <div className="flex w-full gap-2 grid-cols-2 mt-6 ">
                                <div className="w-full">
                                    <a href="">
                                        <div className="text-white px-2 py-1 border rounded-md text-center text-[.7rem] transition hover:border-accent-red ">
                                            Google
                                        </div>
                                    </a>
                                </div >
                                <div className="w-full">
                                    <a href="">
                                        <div className="text-white px-2 py-1 border rounded-md text-center text-[.7rem] transition hover:border-accent-red ">
                                            Discord
                                        </div>
                                    </a>
                                </div >
                                <div className="w-full">
                                    <a href="">
                                        <div className="text-white px-2 py-1 border rounded-md text-center text-[.7rem] transition hover:border-accent-red ">
                                            Facebook
                                        </div>
                                    </a>
                                </div >
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}


export default CreateAccountForm
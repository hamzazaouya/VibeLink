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
            <div className="bg-white bg-opacity-0 w-[25rem] h-[35rem] flex content-center items-center">
                
                <div className="w-full">
                    <h1 className="text-left font-bold text-[2rem]">Create an account</h1>
                    <div className="text-left text-[.8rem] pl-1 mt-2">
                        <span className="">alredy have an account ?</span>
                        <a href='${APP_URL}/login' className="px-[.5rem] underline text-accent-salmon">Login</a>
                    </div>
                    <div className="mt-6 w-[80%]">
                        <form onSubmit={handleSubmit}className="">
                            <div>
                                <input 
                                    type="text" 
                                    name="username"
                                    value={form.username}
                                    placeholder="Username"
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 rounded-md bg-white/40 text-black placeholder-gray-700 text-[.8rem] placeholder:text-[.8rem] focus:outline-none focus:ring-1 focus:ring-accent-red"
                                />
                            </div>

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
                                    Create account
                                </button>
                            </div>
                            <div className="flex items-center mt-6">
                                <span className="inline-block w-full h-[1px] bg-white "></span>
                                <span className="inline-block w-full text-[.7rem]">Or Register with</span>
                                <span className="inline-block w-full h-[1px] bg-white "></span>
                            </div>
                            <div className="flex w-full gap-2 grid-cols-2 mt-6 ">
                                <div className="w-full">
                                    <a href="">
                                        <div className="text-white px-2 py-1.5 border rounded-md text-center text-[.8rem] transition hover:border-accent-red ">
                                            Google
                                        </div>
                                    </a>
                                </div >
                                <div className="w-full">
                                    <a href="">
                                        <div className="text-white px-2 py-1.5 border rounded-md text-center text-[.8rem] transition hover:border-accent-red ">
                                            Discord
                                        </div>
                                    </a>
                                </div >
                                <div className="w-full">
                                    <a href="">
                                        <div className="text-white px-2 py-1.5 border rounded-md text-center text-[.8rem] transition hover:border-accent-red ">
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
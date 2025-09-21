import "../styles/emailConfirmation.css"
import OTPVerification from "./OTPVerification"
import React, { useState, useEffect} from "react";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2"


function EmailConfirmation () {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        async function checkUserStatus() {
            try {
            const response = await axios.get("http://localhost:3000/user/status", {
                withCredentials: true,
            });

            const { emailVerified, isRegistred} = response.data;

            if (emailVerified && !isRegistred) {
                navigate("/register")
            } else if(emailVerified && isRegistred) {
                navigate("/home");
                return;
            }
            } catch (error) {
            navigate("/login");
            }
        }
        checkUserStatus();
    }, [navigate]);

    const handleVerifyClick = async () => {
        try {
            await axios.post(`http://localhost:3000/user/verify/email`, {code: otp}, {withCredentials: true});
            navigate('/register');
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message || 'Something went wrong!',
            });
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
                <div className="email_conf bg-white bg-opacity-30 rounded-xl p-10 mt-5">
                    <h1>Please check your email</h1>
                    <p>We send you a sex-digit code to <span>hamza@gmail.com</span>.</p>
                    <p>Didn’t receive an email? <a href="">Resend</a></p>
                    <div className="flex justify-center">
                        <OTPVerification otp={otp} setOtp={setOtp} />
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={handleVerifyClick}
                        disabled={otp.length < 6}
                        className="mt-5 px-3 py-2 text-[.8rem] bg-accent-pink text-white font-bold bg-opacity-80 rounded-xl hover:bg-opacity-100 transition"
                    >
                        Verify
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EmailConfirmation
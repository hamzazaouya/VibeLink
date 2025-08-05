import React, { useState } from "react";
import OtpInput from "react-otp-input";
import "../styles/emailConfirmation.css"

function OTPVerification() {
  const [otp, setOtp] = useState("");

  const handleVerifyClick = () => {
    alert(`Entered OTP: ${otp}`);
  };

  return (
    <div className="mt-5">
     <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        inputType="tel"
        renderSeparator={<span className="mx-2"></span>}
        inputStyle={{
          width: '2.5rem',
          height: '4rem',
          textAlign: 'center',
          border: '1px solid #ccc',
          borderRadius: '.5rem',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          fontSize: '25px',
        }}
        renderInput={(props) => (
          <input
            {...props}
            required
          />
        )}
      />
      <button
        onClick={handleVerifyClick}
        disabled={otp.length < 6}
        className="mt-5 px-3 py-2 text-[.8rem] bg-accent-pink text-white font-bold bg-opacity-80 rounded-xl hover:bg-opacity-100 transition"
      >
        Verify
      </button>
    </div>
    );
}

export default OTPVerification;

import "./styles/emailConfirmation.css"
import OTPVerification from "./OTPVerification"

function EmailConfirmation () {
    return (
        <>
            <div className="email_conf">
                <h1>Please check your email</h1>
                <p>We send you a sex-digit code to <span>hamza@gmail.com</span>.</p>
                <p>Didn’t receive an email? <a href="">Resend</a></p>
                <div className="flex justify-center">
                    <OTPVerification />
                </div>
            </div>
        </>
    )
}

export default EmailConfirmation
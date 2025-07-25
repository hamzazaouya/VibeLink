import Stepper from "./stepper";
import EmailConfirmation from "./EmailConfirmation";
import UserInformation from "./UserInformation";

function UserRegistration () {
    return (
        <>
            <div className=" relative h-screen w-screen bg-background flex items-center flex-col">
                <div className="absolute top-10 left-20">
                    <h1 className="text-[2rem] font-[1000] tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-accent-pink from-30% via-accent-red to-accent-salmon">VibeLink</h1>
                </div>
                <div className="w-[60%] mt-[3%]">
                    <div className="text-[2rem] mb-5 font-light">Hi <span className="font-bold">Hamza</span> Complete your registration</div>
                        <Stepper />
                        {/* <EmailConfirmation /> */}
                        <UserInformation />
                </div>
            </div>
        </>
    );
}

export default UserRegistration
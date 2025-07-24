import Stepper from "./stepper";

function UserRegistration () {
    return (
        <>
            <div className=" relative h-screen w-screen bg-background flex items-center flex-col">
                <div className="absolute top-10 left-20">
                    <h1 className="text-[2rem] font-[1000] tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-accent-pink from-30% via-accent-red to-accent-salmon">VibeLink</h1>
                </div>
                <div className="w-[60%] mt-[5%]">
                    <div className="text-[2rem] mb-12 font-light">Hi <span className="font-bold">Hamza</span> Complete your registration</div>
                    <div className="mb-2">
                        <Stepper />
                    </div>
                    <div className="w-full h-[50%] bg-white">

                    </div>
                </div>
            </div>
        </>
    );
}

export default UserRegistration
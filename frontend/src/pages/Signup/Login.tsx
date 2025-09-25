import Slider from "./Slider";
import LoginForm from "./LoginForm";

function Login() {
  return (
    < div className="px-5 bg-background h-screen w-screen ">
      <div className="h-full flex justify-center items-center">
        <div className="flex flex-row gap-[3rem] bg-foreground rounded-xl bg-opacity-20 p-[1rem]">
          <div className="hidden md:block">
            <Slider />
          </div>
          <LoginForm />
      </div>
      </div>
    </div>
  );
}

export default Login;

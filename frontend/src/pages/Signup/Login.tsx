import Slider from "./Slider";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <>
      <div className="h-screen w-screen bg-background flex justify-center items-center">
        <div className=" flex flex-row gap-[3rem] bg-foreground rounded-xl bg-opacity-20 p-[1rem]">
          <Slider />
          <LoginForm />
        </div>
      </div>
    </>
  );
}

export default Login;

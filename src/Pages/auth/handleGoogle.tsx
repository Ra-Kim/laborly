import { Button } from "@/Components/ui/button";
import {  useNavigate, useSearchParams } from "react-router-dom";
import Logo from "@/Components/common/Logo";
import { useAppThunkDispatch } from "@/redux/store";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { exchangeCode } from "@/redux/auth/thunkActions";


const HandleGoogle = () => {
  const searchParams = useSearchParams();
  const code = searchParams[0]?.get("code") || "";
  const state = searchParams[0]?.get("state") || "";

  const navigate = useNavigate();
  const dispatch = useAppThunkDispatch();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      if (code && state) {
        dispatch(exchangeCode({ code, state })).then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            navigate("/");
          } else {
            navigate("/auth/sign-in");
          }
        });
      } else {
        toast.error("Invalid request, please try again");
        navigate("/auth/sign-in");
      }
    };
    handleGoogleLogin();
  }, [code, state, dispatch]);

  return (
    <div className="py-4 w-[95%] lg:w-4/5 justify-center mx-auto bg-white !font-[Roboto]">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Logo />
        {/* sign in button */}
        <Button
          className="min-w-[150px]"
          variant={"outline"}
          onClick={() => navigate(`/auth/sign-up`)}
        >
          Create account
        </Button>
      </div>
      {/* form section */}
      <div className="lg:w-fit w-[95%] lg:max-w-[80%] mx-auto mt-8">
        <p className="font-medium text-[#121212E5] text-4xl">Welcome Back!</p>
        <p className="text-[#50555CB2] mt-4">
          Sign in to laborly and get access to experienced artisans
        </p>
      </div>
    </div>
  );
};

export default HandleGoogle;

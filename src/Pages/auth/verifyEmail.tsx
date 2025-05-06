import { Button } from "@/Components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import Logo from "@/Components/common/Logo";
import { useAppThunkDispatch } from "@/redux/store";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { resendEmail, verifyEmail } from "@/redux/auth/thunkActions";
import {
  ResponsiveModal,
  ResponsiveModalTrigger,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/Components/ui/responsiveModal";
import ResendEmail from "@/Components/modals/ResendEmail";
import Spinner from "@/Components/ui/Spinner";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const token = searchParams[0]?.get("token") || "";
  const navigate = useNavigate();
  const dispatch = useAppThunkDispatch();
  const [noEmail, setNoEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verifyEmailFunc = async () => {
      if (token) {
        setLoading(true);
        dispatch(verifyEmail(token)).then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            navigate("/");
          } else {
            navigate("/auth/sign-in");
          }
        });
        setLoading(false);
      } else {
        toast.error("Invalid request, please try again");
      }
    };
    verifyEmailFunc();
  }, [token, dispatch]);

  const resendEmailFunc = () => {
    const email = localStorage.getItem("email");
    if (email) {
      dispatch(resendEmail(email));
    } else {
      toast.error("No email found, kindly enter email");
      setNoEmail(true);
    }
  };

  return (
    <>
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

          {loading && <Spinner />}
          <div>
            <p>Did not get an email?</p>
            <p className="text-[#50555CB2] mt-4">
              Check your spam folder or{" "}
              <span
                className="text-[#121212E5] cursor-pointer"
                onClick={resendEmailFunc}
              >
                resend email
              </span>
            </p>
          </div>
        </div>
      </div>
      <ResponsiveModal open={noEmail} onOpenChange={setNoEmail}>
        <ResponsiveModalTrigger asChild></ResponsiveModalTrigger>
        <ResponsiveModalContent className="sm:max-w-[425px] lg:min-w-[70vw] lg:min-h-[50vh]">
          <ResponsiveModalHeader>
            <ResponsiveModalTitle>Enter Email</ResponsiveModalTitle>
          </ResponsiveModalHeader>
          <ResendEmail setAddModalOpen={setNoEmail} />
        </ResponsiveModalContent>
      </ResponsiveModal>
    </>
  );
};

export default VerifyEmail;

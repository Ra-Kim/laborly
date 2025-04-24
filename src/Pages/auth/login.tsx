import { Button } from "@/Components/ui/button";
import { FormField, FormItem, FormControl, Form } from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { PasswordInput } from "@/Components/ui/passwordInput";
import { emailRegex } from "@/lib/regex";
import { useNavigate } from "react-router-dom";
import Logo from "@/Components/common/Logo";
import { useAppThunkDispatch } from "@/redux/store";
import { googleLogin, login } from "@/redux/auth/thunkActions";
import { SVGS } from "@/assets/svgs";

const Login = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .matches(emailRegex, "Invalid Email")
      .required("This field is required"),
    password: Yup.string().required("Password is required"),
  });
  const form = useForm<Yup.InferType<typeof validationSchema>>({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: {},
  });
  const {
    // register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const dispatch = useAppThunkDispatch();
  const onSubmit: SubmitHandler<
    Yup.InferType<typeof validationSchema>
  > = async (data) => {
    await dispatch(login(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/");
      }
    });
  };

  const GoogleIcon = SVGS.google;
  // google sign in
  const googleSignin = () => {
    dispatch(googleLogin("")).unwrap();
  };
  return (
    <div className="py-4 w-4/5 justify-center mx-auto bg-white !font-[Roboto]">
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
      <div className="w-fit max-w-[80%] mx-auto mt-8">
        <p className="font-medium text-[#121212E5] text-4xl">Welcome Back!</p>
        <p className="text-[#50555CB2] mt-4">
          Sign in to laborly and get access to experienced artisans
        </p>
        <Form {...form}>
          <form
            className="flex flex-col gap-6 mt-16 w-full lg:w-[600px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              control={control}
              name={"email"}
              render={({ field: { onChange, value, name } }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-full lg:w-[600px]"
                      id={name}
                      name={name}
                      labelText={"Enter email"}
                      placeholder={"Enter email"}
                      value={value}
                      onChange={onChange}
                      error={errors[name]?.message}
                      autoComplete="off"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={"password"}
              render={({ field: { onChange, value, name } }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput
                      id={name}
                      name={name}
                      className="w-full lg:w-[600px]"
                      labelText={"Enter Password"}
                      placeholder={"Enter Password"}
                      value={value}
                      onChange={onChange}
                      error={errors[name]?.message}
                      autoComplete="off"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Sign in</Button>
          </form>
        </Form>
        <div className="border-t border-t-[#4B555833] flex justify-center my-12">
          <p className="-mt-3 text-[#50555CD9] px-4 bg-white">
            Or Sign in with
          </p>
        </div>
        <Button
          className="grid grid-cols-[auto,1fr] w-full"
          onClick={googleSignin}
        >
          <div className="h-full w-fit p-1 bg-white rounded-full">
            <GoogleIcon />
          </div>
          <div className="flex items-center justify-center ">
            Sign in with Google
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Login;

import { Button } from "@/Components/ui/button";
import { FormField, FormItem, FormControl, Form } from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { PasswordInput } from "@/Components/ui/passwordInput";
import { emailRegex, passwordRegex, phoneRegExp } from "@/lib/regex";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
} from "@/Components/ui/select";
import { ROLES } from "@/lib/constants";
import { useNavigate } from "react-router-dom";
import PhoneNumberInput from "@/Components/ui/phoneinput";
import {
  isValidPhoneNumber,
  formatPhoneNumber,
  // formatPhoneNumberIntl,
} from "react-phone-number-input";
import {
  ResponsiveModal,
  ResponsiveModalTrigger,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/Components/ui/responsiveModal";
import Logo from "@/Components/common/Logo";
import { useAppThunkDispatch } from "@/redux/store";
import {  signUp } from "@/redux/auth/thunkActions";
import { SVGS } from "@/assets/svgs";
import { useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Signup = () => {
  const navigate = useNavigate();
  type FormFields = "first_name" | "email" | "last_name" | "phone_number";
  const validationSchema = Yup.object({
    first_name: Yup.string().required("This field is required"),
    last_name: Yup.string().required("This field is required"),
    email: Yup.string()
      .email("Invalid email format")
      .matches(emailRegex, "Invalid Email")
      .required("This field is required"),
    // country: Yup.string().required("This field is required"),
    phone_number: Yup.string()
      .required("This field is required")
      .matches(phoneRegExp, "Phone number is not valid"),
    role: Yup.string()
      .matches(/^(CLIENT|WORKER)$/, "Role must be either CLIENT or WORKER")
      .required("This field is required"),
    password: Yup.string()
      .matches(
        passwordRegex,
        "Kindly ensure your password has at least one capital letter, small letter, numerical and special character. It must also be at least 8 letters long"
      )
      .required("Password is required"),
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
    setValue,
    clearErrors,
    setError,
    // getValues,
    watch,
    formState: { errors },
  } = form;

  const dispatch = useAppThunkDispatch();
  const onSubmit: SubmitHandler<
    Yup.InferType<typeof validationSchema>
  > = async (data) => {
    const updatedPhoneNumber = formatPhoneNumber(data.phone_number).replaceAll(
      " ",
      ""
    );
    data = { ...data, phone_number: updatedPhoneNumber };
    await dispatch(signUp(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate(`/auth/sign-in`);
      }
    });
  };

  const GoogleIcon = SVGS.google;
  // google sign in
  const [googleModal, setGoogleModal] = useState(false);
  const [role, setRole] = useState("");
  const googleSignUp = () => {
    const googleLoginURL = BASE_URL + "auth/google/login";
    if (role) {
      window.open(
        googleLoginURL + `?role=${encodeURIComponent(role)}`,
        "_blank"
      );
    } else {
      alert("Please select a role to proceed");
    }
  };
  return (
    <div className="py-4 w-[95%] lg:w-4/5 justify-center mx-auto bg-white !font-[Roboto]">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Logo />
        {/* sign in button */}
        <Button
          className="min-w-[150px]"
          variant={"outline"}
          onClick={() => navigate(`/auth/sign-in`)}
        >
          Sign in
        </Button>
      </div>
      {/* form section */}
      <div className="lg:w-fit w-[95%] lg:max-w-4/5 mx-auto mt-8">
        <p className="font-medium text-[#121212E5] text-4xl">
          Create your Account
        </p>
        <p className="text-[#50555CB2] mt-4">
          Sign up to laborly and get access to experienced artisans
        </p>
        <Form {...form}>
          <form
            className="flex flex-col gap-6 mt-8 w-full lg:w-[600px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            {[
              {
                name: "first_name",
                label: "First Name",
                placeholder: "First name",
              },
              {
                name: "last_name",
                label: "Last Name",
                placeholder: "Last name",
              },
              {
                name: "email",
                label: "Email",
                placeholder: "Email",
              },
            ].map(({ name, label, placeholder }) => (
              <FormField
                key={name}
                control={control}
                name={name as FormFields}
                render={({ field: { onChange, value, name } }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-full lg:w-[600px]"
                        id={name}
                        name={name}
                        labelText={label}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        error={errors[name]?.message}
                        autoComplete="off"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
            <FormField
              control={control}
              name={"phone_number"}
              render={({ field: { value, name } }) => (
                <FormItem>
                  <FormControl>
                    <PhoneNumberInput
                      id={name}
                      labelText={"Phone Number"}
                      placeholder={"Phone Number"}
                      className="w-full lg:w-[600px]"
                      value={value}
                      onChange={(value) => {
                        value = `+${value}`;
                        setValue(name, value);
                        if (!isValidPhoneNumber(value || "")) {
                          setError(name, {
                            message: "Phone number is not valid",
                          });
                        } else {
                          clearErrors(name);
                        }
                      }}
                      error={errors[name]?.message}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={"role"}
              render={({ field: { value, name } }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      value={value}
                      onValueChange={(value) => {
                        setValue(name, value);
                        clearErrors(name);
                      }}
                      name={name}
                    >
                      <SelectTrigger
                        className="h-10 w-full text-sm lg:w-[600px]"
                        labelText="What areyou doing on Laborly"
                        value={value}
                        error={!!errors?.[name]}
                      >
                        {ROLES?.find((val) => val.value === watch(name))
                          ?.label || (
                          <span className="text-[#50555C99] text-[15px] font-medium">
                            What are you doing on Laborly
                          </span>
                        )}
                      </SelectTrigger>
                      <SelectContent className="max-h-[45vh]">
                        {ROLES?.map((item) => (
                          <SelectItem key={item.value} value={`${item.value}`}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {errors?.[name]?.message && (
                    <span id={name} className="text-sm text-red-500">
                      {errors?.[name].message}
                    </span>
                  )}
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
                      labelText={"Create Password"}
                      placeholder={"Create Password"}
                      value={value}
                      onChange={onChange}
                      error={errors[name]?.message}
                      autoComplete="off"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <p className="text-[#50555CD9] px-4 -mt-2">
              Password must be a minimum of 8 letters
            </p>
            <Button type="submit">Create Account</Button>
          </form>
        </Form>
        <div className="border-t border-t-[#4B555833] flex justify-center my-12">
          <p className="-mt-3 text-[#50555CD9] px-4 bg-white">
            Or Sign up with
          </p>
        </div>
        <ResponsiveModal open={googleModal} onOpenChange={setGoogleModal}>
          <ResponsiveModalTrigger asChild>
            <Button className="grid grid-cols-[auto,1fr] w-full">
              <div className="h-full w-fit p-1 bg-white rounded-full">
                <GoogleIcon />
              </div>
              <div className="flex items-center justify-center ">
                Sign up with Google
              </div>
            </Button>
          </ResponsiveModalTrigger>
          <ResponsiveModalContent className="sm:max-w-[425px] lg:min-w-[600px] lg:min-h-[50vh]">
            <ResponsiveModalHeader>
              <ResponsiveModalTitle>Select role</ResponsiveModalTitle>
            </ResponsiveModalHeader>
            <div>
              <p className="text-[#50555CD9] px-4 -mt-2 text center">
                What are you doing on Laborly?
              </p>
              <div className="flex flex-col gap-4 mt-4">
                {ROLES?.map((item) => (
                  <Button
                    key={item.value}
                    variant={"outline"}
                    className={`w-full ${
                      item.value === role
                        ? "border-primary border-2 bg-blue-200"
                        : ""
                    }`}
                    onClick={() => {
                      setRole(item.value);
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
              <div className="my-4 flex gap-4 justify-end">
                <Button
                  className={`w-18 border border-border hidden lg:block`}
                  onClick={() => setGoogleModal(false)}
                  variant={"ghost"}
                >
                  Cancel
                </Button>
                <Button
                  className={`w-full lg:w-40`}
                  onClick={googleSignUp}
                  disabled={!role}
                >
                  Proceed
                </Button>
              </div>
            </div>
          </ResponsiveModalContent>
        </ResponsiveModal>
      </div>
    </div>
  );
};

export default Signup;

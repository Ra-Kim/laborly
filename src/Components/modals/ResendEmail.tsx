import { cn } from "@/lib/utils";
import { Input } from "@/Components/ui/input";
import * as Yup from "yup";
import { Button } from "@/Components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useAppThunkDispatch } from "@/redux/store";
import { resendEmail } from "@/redux/auth/thunkActions";
import { emailRegex } from "@/lib/regex";

const ResendEmail = ({
  setAddModalOpen,
}: {
  setAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email")
      .matches(emailRegex, "Invalid email")
      .required("Required"),
  });

  const {
    // register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<Yup.InferType<typeof validationSchema>>({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: {},
  });

  const dispatch = useAppThunkDispatch();
  const onSubmit: SubmitHandler<
    Yup.InferType<typeof validationSchema>
  > = async (data) => {
    setLoading(true);
    const res = await dispatch(resendEmail(data.email));
    if (res.meta.requestStatus === "fulfilled") {
      setAddModalOpen(false);
    }
    setLoading(false);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("grid items-start gap-4 mt-4 px-2")}
    >
      <div className="">
        <Controller
          control={control}
          name={`email`}
          render={({ field: { onChange, value, name } }) => (
            <Input
              className={errors?.[name]?.message ? "border border-red-500" : ""}
              labelText="Email"
              type="email"
              id={name}
              name={name}
              placeholder="Email"
              error={errors?.[name]?.message}
              value={value}
              onChange={onChange}
              autoComplete="off"
              // onBlur={handleBlur}
            />
          )}
        />
      </div>
      <div className="my-4 flex gap-4 justify-end">
        <Button
          className={`w-18 border border-border hidden lg:block`}
          onClick={() => setAddModalOpen(false)}
          variant={"ghost"}
        >
          Cancel
        </Button>
        <Button
          className={`w-full lg:w-40`}
          type="submit"
          disabled={loading || !isValid}
        >
          Resend email
        </Button>
      </div>
    </form>
  );
};

export default ResendEmail;

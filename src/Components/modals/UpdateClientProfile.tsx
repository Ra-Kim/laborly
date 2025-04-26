import { cn } from "@/lib/utils";
import { Input } from "@/Components/ui/input";
import * as Yup from "yup";
import { Button } from "@/Components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { useAppSelector, useAppThunkDispatch } from "@/redux/store";
import PhoneNumberInput from "../ui/phoneinput";
import {
  formatPhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import {
  getClientProfile,
  patchClientProfile,
} from "@/redux/client/thunkActions";

interface WorkerProfileFormValues {
  profile_description: string;
  address: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  location: string;
}

const UpdateClientProfile = ({
  setAddModalOpen,
}: {
  setAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    address: Yup.string(),
    profile_description: Yup.string(),
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    phone_number: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
  });
  const { clientProfile } = useAppSelector(({ client }) => client);

  const {
    // register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<WorkerProfileFormValues>({
    resolver: yupResolver(validationSchema) as any,
    mode: "onTouched",
    defaultValues: {
      first_name: clientProfile?.first_name ?? "",
      last_name: clientProfile?.last_name ?? "",
      phone_number: `${
        "+234" +
        (clientProfile?.phone_number?.split("")?.splice(1)?.join("") ?? "")
      }`,
      location: clientProfile?.location ?? "",
      profile_description: clientProfile?.profile_description ?? "",
      address: clientProfile?.address ?? "",
    },
  });

  const dispatch = useAppThunkDispatch();
  const onSubmit: SubmitHandler<WorkerProfileFormValues> = async (data) => {
    setLoading(true);
    const updatedPhoneNumber = formatPhoneNumber(data.phone_number).replaceAll(
      " ",
      ""
    );
    data = { ...data, phone_number: updatedPhoneNumber };
    const res = await dispatch(patchClientProfile(data));
    if (res.meta.requestStatus === "fulfilled") {
      dispatch(getClientProfile(""));
      setAddModalOpen(false);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "grid items-start gap-4 px-2 h-[90vh] max-h-[90vh] grid-rows-[1fr,auto] overflow-y-auto"
      )}
    >
      <div className="grid gap-4 mt-4 ">
        <div className="">
          <Controller
            control={control}
            name={`first_name`}
            render={({ field: { onChange, value, name } }) => (
              <Input
                className={
                  errors?.[name]?.message ? "border border-red-500" : ""
                }
                labelText="First name"
                type="text"
                id={name}
                name={name}
                placeholder="First name"
                error={errors?.[name]?.message}
                value={value}
                onChange={onChange}
                autoComplete="off"
                // onBlur={handleBlur}
              />
            )}
          />
        </div>
        <div className="">
          <Controller
            control={control}
            name={`last_name`}
            render={({ field: { onChange, value, name } }) => (
              <Input
                className={
                  errors?.[name]?.message ? "border border-red-500" : ""
                }
                labelText="Last name"
                type="text"
                id={name}
                name={name}
                placeholder="Last name"
                error={errors?.[name]?.message}
                value={value}
                onChange={onChange}
                autoComplete="off"
                // onBlur={handleBlur}
              />
            )}
          />
        </div>
        <div className="">
          <Controller
            control={control}
            name={`profile_description`}
            render={({ field: { onChange, value, name } }) => (
              <Textarea
                className={
                  errors?.[name]?.message ? "border border-red-500" : ""
                }
                labelText="Profile description"
                id={name}
                name={name}
                placeholder="Profile description"
                error={errors?.[name]?.message}
                value={value || ""}
                onChange={onChange}
                autoComplete="off"
                // onBlur={handleBlur}
              />
            )}
          />
        </div>
        <div className="">
          <Controller
            control={control}
            name={`phone_number`}
            render={({ field: { value, name } }) => (
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
            )}
          />
        </div>
        <div className="">
          <Controller
            control={control}
            name={`location`}
            render={({ field: { onChange, value, name } }) => (
              <Input
                className={
                  errors?.[name]?.message ? "border border-red-500" : ""
                }
                labelText="Location"
                type="text"
                id={name}
                name={name}
                placeholder="Location"
                error={errors?.[name]?.message}
                value={value}
                onChange={onChange}
                autoComplete="off"
                // onBlur={handleBlur}
              />
            )}
          />
        </div>
        <div className="">
          <Controller
            control={control}
            name={`address`}
            render={({ field: { onChange, value, name } }) => (
              <Input
                className={
                  errors?.[name]?.message ? "border border-red-500" : ""
                }
                labelText="Address"
                type="text"
                id={name}
                name={name}
                placeholder="Address"
                error={errors?.[name]?.message}
                value={value}
                onChange={onChange}
                autoComplete="off"
                // onBlur={handleBlur}
              />
            )}
          />
        </div>
      </div>
      <div className="my-4 flex gap-4 justify-end">
        <Button
          className={`w-18 border border-border hidden lg:block`}
          onClick={() => setAddModalOpen(false)}
          variant={"ghost"}
        >
          Cancel
        </Button>
        <Button className={`w-full lg:w-40`} type="submit" disabled={loading}>
          Update profile
        </Button>
      </div>
    </form>
  );
};

export default UpdateClientProfile;

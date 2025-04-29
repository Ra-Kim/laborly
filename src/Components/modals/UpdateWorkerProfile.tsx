import { cn } from "@/lib/utils";
import { Input } from "@/Components/ui/input";
import * as Yup from "yup";
import { Button } from "@/Components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { useAppSelector, useAppThunkDispatch } from "@/redux/store";
import {
  getWorkerProfile,
  patchWorkerProfile,
} from "@/redux/worker/thunkActions";
import PhoneNumberInput from "../ui/phoneinput";
import {
  formatPhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import { Switch } from "../ui/switch";
import { LOCATIONS } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
} from "@/Components/ui/select";

interface WorkerProfileFormValues {
  bio: string; // Made required
  years_experience: number;
  availability_note: string | null;
  is_available: boolean;
  professional_skills: string;
  work_experience: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  location: string;
  profile_picture?: string;
}

const UpdateWorkerProfile = ({
  setAddModalOpen,
}: {
  setAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    bio: Yup.string(),
    years_experience: Yup.number(),
    availability_note: Yup.string(),
    is_available: Yup.boolean().required(),
    professional_skills: Yup.string(),
    work_experience: Yup.string(),
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    phone_number: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
  });
  const { workerProfile } = useAppSelector(({ worker }) => worker);

  const {
    // register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    control,
    formState: { errors },
  } = useForm<WorkerProfileFormValues>({
    resolver: yupResolver(validationSchema) as any,
    mode: "onTouched",
    defaultValues: {
      first_name: workerProfile?.first_name ?? "",
      last_name: workerProfile?.last_name ?? "",
      phone_number: `${
        "+234" +
        (workerProfile?.phone_number?.split("")?.splice(1)?.join("") ?? "")
      }`,
      location: workerProfile?.location ?? "",
      bio: workerProfile?.bio ?? "",
      years_experience: workerProfile?.years_experience ?? 0,
      availability_note: workerProfile?.availability_note ?? "",
      is_available: !!workerProfile?.is_available,
      professional_skills: workerProfile?.professional_skills ?? "",
      work_experience: workerProfile?.work_experience ?? "",
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
    const res = await dispatch(patchWorkerProfile(data));
    if (res.meta.requestStatus === "fulfilled") {
      dispatch(getWorkerProfile(""));
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
            name={`bio`}
            render={({ field: { onChange, value, name } }) => (
              <Textarea
                className={
                  errors?.[name]?.message ? "border border-red-500" : ""
                }
                labelText="Bio"
                id={name}
                name={name}
                placeholder="Bio"
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
            render={({ field: { value, name } }) => (
              <Select
                value={value}
                onValueChange={(value) => {
                  setValue(name, value);
                  clearErrors(name);
                }}
                name={name}
              >
                <SelectTrigger
                  className="h-10 w-full text-sm"
                  labelText="Location"
                  value={value}
                  error={!!errors?.[name]}
                >
                  {LOCATIONS?.find((val) => val.value === watch(name))
                    ?.label || (
                    <span className="text-[#50555C99] text-[15px] font-medium">
                      Location
                    </span>
                  )}
                </SelectTrigger>
                <SelectContent className="max-h-[45vh]">
                  {LOCATIONS?.map((item) => (
                    <SelectItem key={item.value} value={`${item.value}`}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="">
          <Controller
            control={control}
            name={`years_experience`}
            render={({ field: { onChange, value, name } }) => (
              <Input
                className={
                  errors?.[name]?.message ? "border border-red-500" : ""
                }
                labelText="Years of experience"
                type="number"
                inputMode="numeric"
                id={name}
                name={name}
                placeholder="Years of experience"
                error={errors?.[name]?.message}
                value={value || 0}
                onChange={onChange}
                autoComplete="off"
                min={0}
                // onBlur={handleBlur}
              />
            )}
          />
        </div>
        <div className="">
          <Controller
            control={control}
            name={`is_available`}
            render={({ field: { onChange, value, name } }) => (
              <div className="flex items-center justify-between px-2">
                <p className="text-[#50555C99] font-semibold">
                  Availability
                  <span className="font-normal text-sm">
                    {" "}
                    (are you available)
                  </span>
                </p>
                <Switch
                  name={name}
                  checked={!!value}
                  onCheckedChange={onChange}
                />
              </div>
            )}
          />
        </div>
        <div className="">
          <Controller
            control={control}
            name={`availability_note`}
            render={({ field: { onChange, value, name } }) => (
              <Textarea
                className={
                  errors?.[name]?.message ? "border border-red-500" : ""
                }
                labelText="Note"
                id={name}
                name={name}
                placeholder="Note (note to clients)"
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
            name={`professional_skills`}
            render={({ field: { onChange, value, name } }) => (
              <Textarea
                className={
                  errors?.[name]?.message ? "border border-red-500" : ""
                }
                labelText="Professional skills"
                id={name}
                name={name}
                placeholder="Input your professional skills seperated by a comma e.g (Plumbing, Electrical work, HVAC)"
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
            name={`work_experience`}
            render={({ field: { onChange, value, name } }) => (
              <Textarea
                className={
                  errors?.[name]?.message ? "border border-red-500" : ""
                }
                labelText="Work experience"
                id={name}
                name={name}
                placeholder="Work experience ( a short note on previous jobs you have done)"
                error={errors?.[name]?.message}
                value={value || ""}
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

export default UpdateWorkerProfile;

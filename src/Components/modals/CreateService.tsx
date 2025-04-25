import { cn } from "@/lib/utils";
import { Input } from "@/Components/ui/input";
import * as Yup from "yup";
import { Button } from "@/Components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { useAppThunkDispatch } from "@/redux/store";
import {
  createService,
  getMyServices,
  updateService,
} from "@/redux/services/thunkActions";
import { IService } from "@/types/service";

const CreateService = ({
  setAddModalOpen,
  service,
}: {
  setAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  service?: IService;
}) => {
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
  });

  const {
    // register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Yup.InferType<typeof validationSchema>>({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: service?.title || "",
      description: service?.description || "",
      location: service?.location || "",
    },
  });

  const dispatch = useAppThunkDispatch();
  const onSubmit: SubmitHandler<
    Yup.InferType<typeof validationSchema>
  > = async (data) => {
    setLoading(true);
    if (service?.id) {
      const res = await dispatch(
        updateService({ id: service?.id, body: data })
      );
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(getMyServices(""));
        setAddModalOpen(false);
      }
    } else {
      const res = await dispatch(createService(data));
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(getMyServices(""));
        setAddModalOpen(false);
      }
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
          name={`title`}
          render={({ field: { onChange, value, name } }) => (
            <Input
              className={errors?.[name]?.message ? "border border-red-500" : ""}
              labelText="Service title"
              type="text"
              id={name}
              name={name}
              placeholder="Service title"
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
          name={`description`}
          render={({ field: { onChange, value, name } }) => (
            <Textarea
              className={errors?.[name]?.message ? "border border-red-500" : ""}
              labelText="Service description"
              id={name}
              name={name}
              placeholder="Service description"
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
          name={`location`}
          render={({ field: { onChange, value, name } }) => (
            <Input
              className={errors?.[name]?.message ? "border border-red-500" : ""}
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
      <div className="my-4 flex gap-4 justify-end">
        <Button
          className={`w-18 border border-border hidden lg:block`}
          onClick={() => setAddModalOpen(false)}
          variant={"ghost"}
        >
          Cancel
        </Button>
        <Button className={`w-full lg:w-40`} type="submit" disabled={loading}>
          {service?.id ? "Update service" : "Create service"}
        </Button>
      </div>
    </form>
  );
};

export default CreateService;

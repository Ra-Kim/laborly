import { cn } from "@/lib/utils";
import * as Yup from "yup";
import { Button } from "@/Components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Textarea } from "@/Components/ui/textarea";
import { useAppThunkDispatch } from "@/redux/store";
import { cancelJob, getJobs } from "@/redux/jobs/thunkActions";

const CancelJob = ({
  setAddModalOpen,
  job_id,
}: {
  setAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  job_id: string;
}) => {
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object({
    comment: Yup.string().required("Required"),
  });

  const {
    // register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Yup.InferType<typeof validationSchema>>({
    mode: "onTouched",
    resolver: yupResolver(validationSchema) as any,
    defaultValues: {},
  });
  const dispatch = useAppThunkDispatch();
  const onSubmit: SubmitHandler<
    Yup.InferType<typeof validationSchema>
  > = async (data) => {
    setLoading(true);
    const res = await dispatch(
      cancelJob({
        id: job_id,
        body: {
          cancel_reason: data.comment,
        },
      })
    );
    if (res.meta.requestStatus === "fulfilled") {
      setAddModalOpen(false);
      dispatch(getJobs(""));
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
          name={`comment`}
          render={({ field: { onChange, value, name } }) => (
            <Textarea
              className={errors?.[name]?.message ? "border border-red-500" : ""}
              labelText="Rejection reason"
              id={name}
              name={name}
              placeholder="Rejection reason"
              error={errors?.[name]?.message}
              value={value}
              onChange={onChange}
              autoComplete="off"
              // onBlur={handleBlur}
            />
          )}
        />
      </div>
      <div className="my-4 flex flex-col lg:flex-row gap-4 justify-end">
        <Button
          className={`lg:w-24 w-full border border-border`}
          onClick={() => setAddModalOpen(false)}
          variant={"ghost"}
        >
          Cancel
        </Button>
        <Button
          className={`w-full lg:w-36 bg-red-500`}
          type="submit"
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default CancelJob;

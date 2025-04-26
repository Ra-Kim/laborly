import { cn } from "@/lib/utils";
import * as Yup from "yup";
import { Button } from "@/Components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Textarea } from "@/Components/ui/textarea";
import { useAppThunkDispatch } from "@/redux/store";
import { getJobs } from "@/redux/jobs/thunkActions";
import { submitReview } from "@/redux/reviews/thunkActions";
import { FaRegStar, FaStar } from "react-icons/fa";

const WriteReview = ({
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
  const [rating, setRating] = useState(0);

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
      submitReview({
        id: job_id,
        body: {
          text: data.comment,
          rating
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
      <div className="flex justify-between items-center">
        <p>Set job rating here</p>
        <div className=" text-sm flex items-center justify-center m-auto my-2 text-center text-secondary">
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} onClick={() => setRating(index)}>
              {index < rating ? (
                <FaStar className="text-center" />
              ) : (
                <FaRegStar className="text-center" />
              )}
            </span>
          ))}
        </div>
      </div>
      <div className="">
        <Controller
          control={control}
          name={`comment`}
          render={({ field: { onChange, value, name } }) => (
            <Textarea
              className={errors?.[name]?.message ? "border border-red-500" : ""}
              labelText="Review"
              id={name}
              name={name}
              placeholder="Review"
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
        <Button className={`w-full lg:w-36`} type="submit" disabled={loading}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default WriteReview;

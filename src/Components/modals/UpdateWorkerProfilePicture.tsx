import { Form } from "@/Components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useRef, useEffect } from "react";
import * as Yup from "yup";
import { Button } from "@/Components/ui/button";
import { toast } from "react-toastify";
import { CloudUpload, RefreshCcw, Trash } from "lucide-react";
import { useAppSelector, useAppThunkDispatch } from "@/redux/store";
import { getWorkerProfilePicture, patchWorkerProfilePic } from "@/redux/worker/thunkActions";

const UpdateWorkerProfilePic = ({
  setAddModalOpen,
}: {
  setAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { workerProfilePicture } = useAppSelector(({ worker }) => worker);
  const [preview, setPreview] = useState<string[] | undefined>(() => {
    if (workerProfilePicture) {
      return [workerProfilePicture];
    } else return undefined;
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const handleImageClick = () => {
    if (inputRef.current != null) {
      inputRef.current.click();
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileArr = event.target.files;

      const _fileList: File[] = [];
      for (let i = 0; i < fileArr.length; i++) {
        _fileList.push(fileArr[i]);
      }
      const _file = _fileList.splice(0, 1);
      const _fileSize = Math.floor(_file[0].size / 1024000);
      if (_fileSize < 10) {
        setValue("profile_picture", _file[0]);

        const tempArr: string[] = [];
        _file.map((file) => {
          const files = new FileReader();
          files.onload = () => {
            if (typeof files.result === "string") {
              tempArr.push(files.result);
              setPreview([...tempArr]);
            }
          };
          files.readAsDataURL(file);
        });
      } else {
        toast.error("Please select a file less than 10MB");
      }
      event.target.files = null;
    }
  };
  const validationSchema = Yup.object({
    profile_picture: Yup.mixed(),
  });

  const form = useForm<Yup.InferType<typeof validationSchema>>({
    mode: "onTouched",
    resolver: yupResolver(validationSchema) as any,
    defaultValues: {},
  });

  const {
    // register,
    handleSubmit,
    setValue,
  } = form;

  const dispatch = useAppThunkDispatch();
  useEffect(() => {
    dispatch(getWorkerProfilePicture(""));
  }, [dispatch]);

  const onSubmit: SubmitHandler<Yup.InferType<typeof validationSchema>> = (
    data
  ) => {
    const formData = new FormData();
    if (data.profile_picture) {
      formData.append("profile_picture", data.profile_picture);
    } else {
      toast.error("Add selfie file");
      return;
    }
    dispatch(patchWorkerProfilePic(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setPreview(undefined);
        setValue("profile_picture", null);
        dispatch(getWorkerProfilePicture(""));
        setAddModalOpen(false);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="gap-2 my-8 px-2">
          <div className="flex flex-col gap-6">
            <p className="text-lg font-semibold text-[#46464A]">
              Upload profile picture
            </p>
          </div>
          {preview ? (
            preview.map((link, idx) => (
              <div key={idx} className="ml-auto flex gap-2 items-center">
                <div className="border-2 border-dashed border-primary px-2 flex flex-col gap-3 justify-around items-center py-4 min-h-32 min-w-48">
                  <img src={link} alt="" width={180} />
                </div>
                <div className="flex flex-col gap-4">
                  <div
                    className="text-primary cursor-pointer"
                    onClick={handleImageClick}
                  >
                    <RefreshCcw />
                    <input
                      type="file"
                      className="hidden"
                      ref={inputRef}
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div
                    className="text-red-500 cursor-pointer"
                    onClick={() => {
                      setValue("profile_picture", null);
                      setPreview(undefined);
                    }}
                  >
                    <Trash />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              className="border border-dashed border-[#CBD5E1] px-2 cursor-pointer flex flex-col gap-3 justify-around items-center py-4 min-h-32 min-w-48"
              onClick={handleImageClick}
            >
              <CloudUpload />
              <p className="label-medium text-[#919094]">
                Click to upload a file
              </p>
              <p className="label-small text-[#77777A]">PDF, MS, PNG or JPEG</p>
              <input
                type="file"
                className="hidden"
                ref={inputRef}
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          )}
        </div>

        <div className="mt-32">
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateWorkerProfilePic;

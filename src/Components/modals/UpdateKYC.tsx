import { FormField, FormItem, FormControl, Form } from "@/Components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useRef, useEffect, useCallback } from "react";
import * as Yup from "yup";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import { toast } from "react-toastify";
import { CloudUpload, Folder, RefreshCcw, Trash } from "lucide-react";
import { useAppThunkDispatch } from "@/redux/store";
import { submitKYC } from "@/redux/worker/thunkActions";
import { FileWithPath, useDropzone } from "react-dropzone";

const DOCUMENT_TYPES = [
  {
    name: "Driver's License",
    value: "Driver's License",
  },
  {
    name: "Passport",
    value: "Passport",
  },
  {
    name: "National ID Card",
    value: "National ID Card",
  },
];

const UpdateKYC = ({
  setAddModalOpen,
}: {
  setAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [preview, setPreview] = useState<string[]>();
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
        setValue("selfie_file", _file[0]);

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
    selfie_file: Yup.mixed(),
    document_type: Yup.string().required("Required"),
    document_file: Yup.mixed(),
  });

  const form = useForm<Yup.InferType<typeof validationSchema>>({
    mode: "onTouched",
    resolver: yupResolver(validationSchema) as any,
    defaultValues: {},
  });

  const {
    // register,
    handleSubmit,
    control,
    setValue,

    watch,
    formState: { errors },
  } = form;

  const [docPreview, setDocPreview] = useState({
    file_name: "",
    file_type: "",
    file_url: "",
  });
  const onDrop = useCallback(
    (acceptedFiles: readonly FileWithPath[]) => {
      acceptedFiles.map((file) => {
        setDocPreview({
          ...docPreview,
          file_name: file.name,
          file_type: file.type,
        });
        setValue("document_file", file)
        // const files = new FileReader();
        // files.onload = () => {
        //   if (typeof files.result === "string") {
        //     tempArr.push(files.result);
        //     setPreview({ ...docPreview, file_url: tempArr[0] });
        //   }
        // };
        // files.readAsDataURL(file);
      });
    },
    [docPreview]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: {
        "application/pdf": [".pdf"],
        "image/*": [".jpeg", ".jpg", ".png"],
      },
      onDrop,
    });
  useEffect(() => {
    if (isDragReject && !isDragActive) {
      toast.error("Invalid file type");
    }
  }, [isDragReject, isDragActive]);

  const dispatch = useAppThunkDispatch();

  const onSubmit: SubmitHandler<Yup.InferType<typeof validationSchema>> = (
    data
  ) => {
    const formData = new FormData();
    formData.append("document_type", data.document_type);
    if (data.selfie_file) {
      formData.append("selfie_file", data.selfie_file);
    } else {
      toast.error("Add selfie file");
      return;
    }
    if (data.document_file) {
      formData.append("document_file", data.document_file);
    } else {
      toast.error("upload document file");
      return;
    }
    dispatch(submitKYC(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setPreview(undefined);
        setValue("selfie_file", null);
        setValue("document_file", null);
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
              Upload selfie
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
                      setValue("selfie_file", null);
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
                Click to upload or drag and drop a file
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
        <div className="grid my-8 relative px-2">
          <FormField
            control={control}
            name={"document_type"}
            render={({ field: { value, name } }) => (
              <FormItem>
                <FormControl>
                  <Select
                    value={value}
                    onValueChange={(value) => {
                      setValue(name, value);
                    }}
                  >
                    <SelectTrigger
                      className="h-10 w-full text-sm"
                      labelText="Document type"
                    >
                      {DOCUMENT_TYPES.find((val) => val.value === watch(name))
                        ?.name || (
                        <span className="text-muted-foreground">
                          Document type
                        </span>
                      )}
                    </SelectTrigger>
                    <SelectContent className="max-h-[45vh]">
                      {DOCUMENT_TYPES.map((currency) => (
                        <SelectItem
                          key={currency.value}
                          value={`${currency?.value}`}
                        >
                          {currency.name}
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
        </div>
        <div>
          <div className="flex flex-col gap-6">
            <p className="text-lg font-semibold text-[#46464A]  mt-12">
              Upload document here
            </p>
          </div>
          {docPreview?.file_name ? (
            <div
              className="h-12 text-[#919094] border-2 border-dashed w-full rounded flex flex-col items-center justify-center gap-4 text-[12px] cursor-pointer"
              {...getRootProps()}
            >
              <p>{docPreview?.file_name}</p>
              <input {...getInputProps()} />
            </div>
          ) : (
            <div
              className="h-52 text-[#919094] border-2 border-dashed w-full rounded flex flex-col items-center justify-center gap-4 text-[12px] cursor-pointer"
              {...getRootProps()}
            >
              {isDragActive ? (
                <p className="text-[#475569] font-medium">
                  Drop the files here...
                </p>
              ) : (
                <>
                  <Folder className="h-6 w-6" />
                  <div className="text-center flex flex-col items-center gap-1">
                    <p className="text-[#64748B] font-medium">
                      Drop your files or click to upload
                    </p>
                    <p className="text-[#94A3B8]">
                      Supported files types: PDF, XLS, DOCX
                    </p>
                  </div>
                  <Button variant={"outline"} className="w-[60px] h-6">
                    Browse
                  </Button>
                  <input {...getInputProps()} />
                </>
              )}
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

export default UpdateKYC;

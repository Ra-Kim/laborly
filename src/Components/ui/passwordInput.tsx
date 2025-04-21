import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  error?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, labelText, error, id, ...props }, ref) => {
    const [isVisible, setisVisible] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const [_type, setType] = React.useState(type);
    const errorId = id ? `${id}-error` : undefined;

    React.useEffect(() => {
      if (isVisible) {
        setType("text");
      } else {
        setType("password");
      }
    }, [isVisible]);
    return (
      <div className="relative">
        <label
          htmlFor={id}
          className={cn(
            "absolute text-xs text-gray-500 bg-white px-1 transform transition-transform",
            {
              "translate-y-[-0.1rem] translate-x-[0.75rem]":
                isFocused || props.value,
              "text-[#2563EB]": isFocused,
              "text-red-500": error,
              "opacity-0 translate-y-0 translate-x-0 text-gray-500":
                !isFocused && !props.value && !error,
            }
          )}
          style={{ top: "-0.5rem", left: "0.75rem" }}
        >
          {labelText}
        </label>
        <div
          className={cn(
            "flex h-[54px] w-full rounded-[20px] font-medium border border-[#868686D9] bg-background px-3 py-2 text-[15px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#50555C99] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 font-[Roboto]",
            {
              "text-red-500 border-red-500": !!error,
              "border-[#2563EB]": isFocused,
            },
            className
          )}
        >
          <input
            className="h-10 outline-none w-full bg-white focus:bg-white active:bg-white"
            type={_type}
            ref={ref}
            id={id}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          <button type="button" onClick={() => setisVisible(!isVisible)}>
            {isVisible ? <EyeOff /> : <Eye />}
          </button>
        </div>
        {!!error && (
          <span id={errorId} className="text-sm text-red-500">
            {error}
          </span>
        )}
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };

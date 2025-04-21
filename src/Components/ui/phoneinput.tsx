import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { cn } from "../../lib/utils";

export interface PhoneInputProps {
  labelText: string;
  error?: string;
  value: string;
  onChange: (value: string, country: unknown) => void;
  id?: string;
  className?: string;
  placeholder?: string;
  name?: string;
}

const PhoneNumberInput: React.FC<PhoneInputProps> = ({
  labelText,
  error,
  value,
  onChange,
  id,
  className,
}) => {
  const errorId = id ? `${id}-error` : undefined;
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div className="relative">
      {/* Label */}
      <label
        htmlFor={id}
        className={cn(
          "absolute text-xs bg-white px-1 transform transition-transform z-10",
          {
            "translate-y-[-0.1rem] translate-x-[0.75rem]": value || error,
            "text-[#2563EB]": isFocused,
            "text-red-500": !!error,
            // "opacity-0 translate-y-0 translate-x-0 text-gray-500":
            //   !value && !error,
          }
        )}
        style={{ top: "-0.5rem", left: "0.75rem" }}
      >
        {labelText}
      </label>

      {/* Phone Input */}
      <PhoneInput
        country={"ng"} // Default country
        value={value}
        onChange={(phone, country) => onChange(phone, country)}
        inputClass={cn(
          "!border-none !outline-none !w-full !font-[Roboto] font-medium",
          className
        )}
        buttonClass={cn("!border-none !bg-none !bg-[#fff]")}
        containerClass={cn(
          "flex h-[54px] w-full rounded-[20px] font-medium border border-[#868686D9] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 font-[Roboto]",
          {
            "border-[#2563EB]": isFocused,
            "text-red-500 border-red-500": !!error,
          }
        )}
        inputProps={{
          id,
          "aria-invalid": !!error,
          "aria-describedby": error ? errorId : undefined,
          onFocus: () => setIsFocused(true),
          onBlur: () => setIsFocused(false),
        }}
      />

      {/* Error Message */}
      {error && (
        <span id={errorId} className="text-sm text-red-500">
          {error}
        </span>
      )}
    </div>
  );
};

export default PhoneNumberInput;

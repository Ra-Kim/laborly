import React from "react";

import { cn } from "../../lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelText: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, labelText, error, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const errorId = id ? `${id}-error` : undefined;

    return (
      <div className="relative">
        <label
          htmlFor={id}
          className={cn(
            "absolute text-sm text-gray-500 bg-white  px-1 transform transition-transform font-[Roboto]",
            {
              "translate-y-[-0.1rem] translate-x-[0.75rem]":
                isFocused || props.value,
              "text-[#2563EB]": isFocused,
              "text-red-500": !!error,
              "opacity-0 translate-y-0 translate-x-0 text-gray-500":
                !isFocused && !props.value && !error,
            }
          )}
          style={{ top: "-0.5rem", left: "0.75rem" }}
        >
          {labelText}
        </label>
        <textarea
          className={cn(
            "flex h-28 w-full resize-none rounded-[20px] font-medium border border-[#868686D9] bg-background px-3 py-2 text-[15px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#50555C99] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 font-[Roboto]",
            {
              "border-[#2563EB]": isFocused,
              "text-red-500 border-red-500": !!error,
            },
            className
          )}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={props.value || ""}
          {...props}
        />
        {!!error && (
          <span id={errorId} className="text-xs text-red-500">
            {error}
          </span>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };

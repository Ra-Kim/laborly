import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import Spinner from "./Spinner";

interface ISearchSelect
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
  options: any;
  loading: boolean;
  children?: React.ReactNode;
  modal?: boolean;
  
}

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    labelText?: string;
    error?: boolean;
  }
>(({ className, children, labelText, error, ...props }, ref) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div className="relative">
      {props.value && (
        <label
          className={cn(
            "absolute text-sm text-gray-500 bg-white px-1 transform transition-transform font-[Roboto]",
            {
              "translate-y-[-0.1rem] translate-x-[0.75rem]":
                isFocused || props.value !== null,
              "opacity-0 translate-y-0 translate-x-0":
                !isFocused && props.value === null,
            }
          )}
          style={{ top: "-0.5rem", left: "0.75rem" }}
        >
          {labelText}
        </label>
      )}
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex min-h-[54px] w-full items-center font-medium justify-between rounded-[20px] border border-[#868686D9] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-primary  focus:outline-1 active:outline-1 active:outline-primary disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
          { "border-red-500": error },
          className
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    </div>
  );
});

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

export const SearchSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  ISearchSelect
>(
  (
    { className, position = "popper", options, loading, modal, ...props },
    ref
  ) => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const filteredOptions = options?.filter((option: { label: string }) =>
      option.label?.toLowerCase()?.includes(searchTerm.toLowerCase())
    );

    if (modal === false) {
      return (
        <SelectPrimitive.Content
          ref={ref}
          className={cn(
            "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            position === "popper" &&
              "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
            className
          )}
          position={position}
          {...props}
        >
          <div className="relative px-2 my-2">
            <Input
              placeholder="Search"
              labelText=""
              value={searchTerm}
              onKeyDown={(e) => e.stopPropagation()}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute top-2/4 left-3 transform -translate-y-2/4 text-gray-400" />
          </div>
          {loading ? (
            <div className="w-full min-w-[var(--radix-select-trigger-width)] text-center flex justify-center py-2">
              <Spinner />
            </div>
          ) : (
            <SelectPrimitive.Viewport
              className={cn(
                "p-1",
                position === "popper" &&
                  "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
              )}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions?.map(
                  (item: { value: string | number; label: string }) => (
                    <SelectItem key={item.value} value={`${item.value}`}>
                      {item.label}
                    </SelectItem>
                  )
                )
              ) : (
                <p>No options found</p>
              )}
              
            </SelectPrimitive.Viewport>
          )}
        </SelectPrimitive.Content>
      );
    }

    return (
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          ref={ref}
          className={cn(
            "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            position === "popper" &&
              "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
            className
          )}
          position={position}
          {...props}
        >
          <div className="relative px-2 my-2">
            <Input
              placeholder="Search"
              labelText=""
              value={searchTerm}
              onKeyDown={(e) => e.stopPropagation()}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute top-2/4 left-3 transform -translate-y-2/4 text-gray-400" />
          </div>
          {loading ? (
            <div className="w-full min-w-[var(--radix-select-trigger-width)] text-center flex justify-center py-2">
              <Spinner />
            </div>
          ) : (
            <SelectPrimitive.Viewport
              className={cn(
                "p-1",
                position === "popper" &&
                  "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
              )}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions?.map(
                  (item: { value: string | number; label: string }) => (
                    <SelectItem key={item.value} value={`${item.value}`}>
                      {item.label}
                    </SelectItem>
                  )
                )
              ) : (
                <p>No options found</p>
              )}
            </SelectPrimitive.Viewport>
          )}
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    );
  }
);
SearchSelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-white text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};

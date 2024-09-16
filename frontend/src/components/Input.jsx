import { useState } from "react";

/**
 * Custume Text input component
 * @label input label
 * @type input type
 * @placeholder input placeholder
 * @value value of input - default value = ''
 * @error message to display on input error
 * @maxWidth set to empty string fill up entire space.
 * Width must conform to tailwind styling. Default value "max-w-[335px]"
 * @onChange onchange handler
 * @onBlur function that fies when focus leaves input
 * @otherProps Added props (optional)
 */

export default function Input({
  label = "",
  type = "",
  placeholder = "",
  value,
  maxWidth = "max-w-[335px]",
  onChange,
  onBlur,
  ...otherProps
}) {
  const [inputValue, setInputValue] = useState(value || "");
  return (
    <div className={`space-y-2 mb-2 pb-4 w-full ${maxWidth} mx-auto relative`}>
      <label htmlFor={otherProps?.id}>{label}</label>
      <input
        type={type}
        value={value || inputValue}
        onBlur={onBlur}
        onChange={(e) => {
          setInputValue(e.target.value);
          onChange && onChange(e.target.value);
        }}
        placeholder={placeholder}
        className={`border group hover:border-gray-500 focus:outline-none focus:border-gray-500 ${
          otherProps?.error?.length > 3 || otherProps.isinvalid
            ? "border-rose-500"
            : ""
        } rounded-xl w-full min-w-[340px]/ py-4 px-2.5 disabled:border-transparent`}
        {...otherProps}
      />
      {otherProps?.isinvalid ||
        (otherProps?.error?.length > 3 && (
          <small className="absolute group-focus:hidden bottom-0 left-0 font-medium text-rose-500">
            {otherProps.error}
          </small>
        ))}
    </div>
  );
}

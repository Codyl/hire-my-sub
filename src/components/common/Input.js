import React from "react";

const Input = (props) => {
  const {
    label,
    className,
    type,
    required,
    value,
    onInput,
    onBlur,
    errorText,
    hasError,
  } = props;
  return (
    <div className={`${className}`}>
      <div className={`flex justify-between `}>
        <label
          htmlfor={label.toLowerCase().replace(/ /g, "-")}
          className={` flex-5`}>
          {label}:
        </label>
        <input
          type={type ?? "text"}
          required={required ?? true}
          value={value}
          onChange={onInput}
          onBlur={onBlur}
          className="flex-1 ml-3"
        />
      </div>
      {hasError && <p className="text-red-500">{errorText}</p>}
    </div>
  );
};

export default Input;

import React from "react";

const Button = (props) => {
  const { type, isDisabled, children, onClick } = props;
  return (
    <button
      className={`self-end ${isDisabled && "bg-gray-100 text-gray-300"} ${
        !isDisabled && isDisabled !== undefined && "bg-green-500 text-green-900"
      } rounded p-2`}
      type={type}
      onClick={onClick}
      disabled={isDisabled}>
      {children}
    </button>
  );
};

export default Button;

import React, { useState, useEffect } from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import useInput from "../hooks/user-input";
import axios from "axios";

const AddUserPage = () => {
  const validateValue = (value) => {
    return /\w{4,}/gi.test(value);
  };
  const {
    value: firstNvalue,
    isValid: firstNisValid,
    hasError: firstNhasError,
    inputClass: firstNinputClass,
    warningText: firstNwarningText,
    valueChangeHandler: firstNvalueChangeHandler,
    inputBlurHandler: firstNinputBlurHandler,
    reset: firstNreset,
  } = useInput(validateValue, "first name is required!");
  const {
    value: lastNvalue,
    isValid: lastNisValid,
    hasError: lastNhasError,
    inputClass: lastNinputClass,
    warningText: lastNwarningText,
    valueChangeHandler: lastNvalueChangeHandler,
    inputBlurHandler: lastNinputBlurHandler,
    reset: lastNreset,
  } = useInput(validateValue, "last name is required!");
  const [formIsValid, setFormIsValid] = useState(false);
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    inputClass: emailInputClass,
    warningText: emailWarningText,
    valueChangeHandler: emailValueChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: emailReset,
  } = useInput(validateValue, "valid email required");
  const {
    value: occupationValue,
    isValid: occupationIsValid,
    hasError: occupationHasError,
    inputClass: occupationInputClass,
    warningText: occupationWarningText,
    valueChangeHandler: occupationValueChangeHandler,
    inputBlurHandler: occupationInputBlurHandler,
    reset: occupationReset,
  } = useInput(validateValue, "occupation is required!");
  const [isUserPosted, setIsUserPosted] = useState();
  const [err, setErr] = useState();

  useEffect(() => {
    if (emailIsValid && firstNisValid && lastNisValid && occupationIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
    // console.log(formIsValid);
  }, [
    emailIsValid,
    firstNisValid,
    lastNisValid,
    occupationIsValid,
    setFormIsValid,
  ]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Submit event occured", formIsValid);
    axios
      .post("https://node-hmdyk.onrender.com/user/add-user", {
        first_name: firstNvalue,
        last_name: lastNvalue,
        email: emailValue,
        occupation: occupationValue,
      })
      .then((res) => {
        console.log(res.data.message);
        setIsUserPosted(res.data.message);
      })
      .catch((err) => {
        setErr(err.message);
      });
  };

  const resetFormHandler = () => {
    occupationReset();
    firstNreset();
    lastNreset();
    emailReset();
  };

  return (
    <form
      className="lg:w-1/2 p-5 m-auto mt-5 flex flex-col justify-center"
      onSubmit={onSubmitHandler}>
      <Input
        className={firstNinputClass}
        label="First Name"
        onInput={firstNvalueChangeHandler}
        onBlur={firstNinputBlurHandler}
        value={firstNvalue}
        errorText={firstNwarningText}
        hasError={firstNhasError}
        reset={firstNreset}
      />
      <Input
        className={lastNinputClass}
        label="Last Name"
        onInput={lastNvalueChangeHandler}
        onBlur={lastNinputBlurHandler}
        value={lastNvalue}
        errorText={lastNwarningText}
        hasError={lastNhasError}
        reset={lastNreset}
      />
      <Input
        className={emailInputClass}
        label="Email"
        onInput={emailValueChangeHandler}
        onBlur={emailInputBlurHandler}
        value={emailValue}
        errorText={emailWarningText}
        hasError={emailHasError}
        reset={emailReset}
        type="email"
      />
      <Input
        className={occupationInputClass}
        label="Occupation"
        onInput={occupationValueChangeHandler}
        onBlur={occupationInputBlurHandler}
        value={occupationValue}
        errorText={occupationWarningText}
        hasError={occupationHasError}
        reset={occupationReset}
      />
      <Button type="button" onClick={resetFormHandler}>
        Reset form
      </Button>
      <Button type="submit" isDisabled={!formIsValid}>
        Add User
      </Button>
      {!!isUserPosted && <p className="text-green-700">{isUserPosted}</p>}
      {!!err && <p className="text-red-700">{err}</p>}
    </form>
  );
};

export default AddUserPage;

import "./styles.css";
import React, { ReactNode } from "react";
import { FieldProps, useField } from "@formiz/core";
import BaseInput from "./BaseInput";

export type InputProps<FormattedValue = string> = FieldProps<
  string,
  FormattedValue
> & {
  autoFocus?: boolean;
  type?: string;
  label?: ReactNode;
  className?: string;
};

const Input = <FormattedValue = string,>(props: InputProps<FormattedValue>) => {
  const {
    errorMessage,
    id,
    isValid,
    setValue,
    resetKey,
    value,
    setIsTouched,
    isTouched,
    otherProps: { autoFocus = false, type = "text", label },
  } = useField(props);

  return (
    <BaseInput
      className={props.className}
      id={id}
      key={resetKey}
      errorMessage={errorMessage}
      isValid={isValid}
      setValue={setValue}
      setIsTouched={setIsTouched}
      value={value ?? ""}
      isTouched={isTouched}
      autoFocus={autoFocus}
      type={type}
      label={label}
    />
  );
};

export default Input;

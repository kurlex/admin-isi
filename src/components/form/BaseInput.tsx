import React, { Children, Key, ReactNode, useState } from "react";

interface BaseInputProps {
  key?: Key | null;
  id?: string;
  value?: any;
  autoFocus?: boolean;
  errorMessage: any;
  setValue: (fieldValue: any) => void;
  setIsTouched: (isTouched: boolean) => void;
  isTouched: boolean;
  label: ReactNode;
  type: string | null;
  isValid: boolean;
  className?: string;
  children?: any;
}
const BaseInput = (props: BaseInputProps) => {
  const {
    id,
    type,
    label,
    errorMessage,
    setValue,
    isTouched,
    setIsTouched,
    isValid,
  } = props;
  const showError = !isValid && isTouched;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="base-input form-focus pass-group">
      <label className="focus-label">{label}</label>
      <div className="input-container">
        {type === "textarea" && (
          <textarea
            {...{
              ...props,
              children: undefined,
            }}
            className={`field-input form-control floating ${
              showError ? "is-error" : ""
            } ${props.className}`}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsTouched(false)}
            onBlur={() => setIsTouched(true)}
            aria-invalid={!isValid}
            aria-describedby={!isValid ? `${id}-error` : undefined}
          ></textarea>
        )}
        {type !== "textarea" && (
          <input
            {...{
              ...props,
              children: undefined,
            }}
            className={`field-input form-control floating ${
              showError ? "is-error" : ""
            } ${props.className}`}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsTouched(false)}
            onBlur={() => setIsTouched(true)}
            type={showPassword ? "text" : type || "text"}
            aria-invalid={!isValid}
            aria-describedby={!isValid ? `${id}-error` : undefined}
          />
        )}

        {type === "password" && (
          <span
            onClick={() => setShowPassword((x) => !x)}
            className={`fas  toggle-password ${
              showPassword ? "fa-eye" : "fa-eye-slash"
            }`}
          />
        )}
        {showError && (
          <div id={`${id}-error`} className="form-error-feedback absolute">
            {`${label} ${errorMessage ?? "is Required"}`}
          </div>
        )}
        {props.children}
      </div>
    </div>
  );
};

export default BaseInput;

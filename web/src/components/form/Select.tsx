import "./styles.css";
import React, { useEffect, useRef, useState } from "react";
import { useField } from "@formiz/core";
import { InputProps } from "./Input";
import BaseInput from "./BaseInput";
import ISearchItem from "./ISearchItem";

type SelectProps<FormattedValue = ISearchItem> = InputProps<FormattedValue> & {
  itemsList: FormattedValue[];
  allowForeignItem?: boolean;
  className?: string;
};

const Select = (props: SelectProps<ISearchItem>) => {
  const { itemsList, allowForeignItem } = props;
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
  const [showList, setShowList] = useState<boolean>(false);
  const selectContainer = useRef(null);

  const handleClickOutside = (event: any) => {
    if (
      selectContainer.current &&
      !(selectContainer.current as HTMLElement).contains(event.target)
    )
      setShowList(false);
  };
  const onTouch = (touched: boolean) => {
    if (!touched) setShowList(true);
    setIsTouched(touched);
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [selectContainer]);
  if (
    value &&
    !showList &&
    !allowForeignItem &&
    !itemsList.some((item) => item.name === value)
  )
    setValue("");

  return (
    <div ref={selectContainer}>
      <BaseInput
        className={props.className}
        id={id}
        key={resetKey}
        errorMessage={errorMessage}
        isValid={isValid}
        setValue={setValue}
        setIsTouched={onTouch}
        value={value ?? ""}
        isTouched={isTouched}
        autoFocus={autoFocus}
        type={type}
        label={label}
      >
        {showList && (
          <div className="select-item-container">
            <div className="">
              {itemsList
                .filter((item) => item.name.includes(value ?? ""))
                .map((item, index) => (
                  <div
                    className="select-item"
                    key={index}
                    onClick={() => {
                      setValue(item.name);
                      setShowList(false);
                    }}
                  >
                    <div className="select-item-icon">
                      <img src={item.imageUrl} alt="icon" />
                    </div>

                    <span>{item.name}</span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </BaseInput>
    </div>
  );
};

export default Select;

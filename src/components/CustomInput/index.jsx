import React from "react";
import {
  ErrorMessage,
  IconWrapper,
  InputStyled,
  InputWrapper,
  LabelStyled,
} from "./index.style";
import { useController } from "react-hook-form";

const CustomInput = ({
  label,
  icon,
  error,
  control,
  name,
  fullWidth,
  type,
  customFormDesign,
  labelColor,
  borderLight,
  defaultValue,
  onKeyValue,
  onKeyDown,
  autocomplete,
  onInput,
  disabled,
  ...props
}) => {
  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
  });
  return (
    <>
      <LabelStyled labelColor={labelColor}>{label}</LabelStyled>
      <InputWrapper>
        <InputStyled
          {...props}
          fullWidth={fullWidth}
          disabled={disabled}
          onChange={(e) => {
            field.onChange(e);
            if (props.onChange) {
              props.onChange(e);
            }
          }}
          onBlur={field.onBlur}
          value={field.value}
          name={field.name}
          customFormDesign={customFormDesign}
          inputRef={field.ref}
          autocomplete={autocomplete}
          onInput={onInput}
          type={type}
          onKeyDown={onKeyDown}
          defaultValue={defaultValue}
          borderLight={borderLight}
        />
        {icon && <IconWrapper>{icon}</IconWrapper>}
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
};

export default CustomInput;

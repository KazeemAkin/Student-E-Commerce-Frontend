import React, { useState } from "react";
import { empty } from "../../Utilities/utils";
import colors from "../../config/colors";
import { InputText } from "primereact/inputtext";

export default function AppTextInput({
  name,
  placeholder,
  icon,
  id,
  type,
  height = 40,
  width = "100%",
  labelTitle,
  fontSize = 14,
  isDisabled = false,
  as,
  rows,
  cols,
  required = false,
  isHidden = false,
  addClassName,
  containerWidth,
  isError,
  errorMessage
}) {
  const [focused, setFocused] = useState(false);

  return (
    <>
      <div
        className="p-inputgroup mt-10"
        style={{
          display: "flex",
          flexDirection: "column",
          width: containerWidth,
        }}
      >
        {!empty(labelTitle) && (
          <label htmlFor={id}>
            {labelTitle} {required ? <span className="required">*</span> : ""}
          </label>
        )}
        <div style={{ display: "flex", flexDirection: "row", marginTop: 5 }}>
          {icon && (
            <span className="p-inputgroup-addon">
              <i className={"pi pi-" + icon}></i>
            </span>
          )}
          <InputText
            id={id}
            as={as}
            name={name}
            rows={rows}
            cols={cols}
            placeholder={placeholder}
            type={type}
            disabled={isDisabled}
            hidden={isHidden}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              width,
              border: "1px solid #f1f1f1",
              outline: focused
                ? "1px solid" + colors.primary
                : "1px solid #f1f1f1",
              padding: "10px",
              height,
              fontSize,
              backgroundColor: colors.white,
              cursor: isDisabled ? "not-allowed" : "text",
            }}
            className={addClassName}
          />
        </div>
        {
          isError && <div>{ errorMessage }</div>
        }
      </div>
    </>
  );
}

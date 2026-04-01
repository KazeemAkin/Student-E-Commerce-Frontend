import React, { useState } from "react";
import { ErrorMessage, Field } from "formik";
import { empty } from "../../Utilities/utils";
import colors from "../../config/colors";

export default function InputFieldChange({
  name,
  placeholder,
  icon,
  id,
  type,
  height,
  width = "100%",
  labelTitle,
  fontSize = 14,
  isDisabled = false,
  as,
  rows,
  cols,
  required = false,
  marginTop = 0,
  containerWidth,
  isError,
  errorMessage,
  isDefaultError = true,
  ...others
}) {
  const [focused, setFocused] = useState(false);

  return (
    <>
      <div
        className="p-inputgroup mt-30"
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop,
          width: containerWidth,
        }}
      >
        {!empty(labelTitle) && (
          <label htmlFor={id}>
            {labelTitle} {required ? <span className="required">*</span> : ""}
          </label>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 5,
            borderRadius: 8,
          }}
        >
          {icon && (
            <span className="p-inputgroup-addon" style={{ border: "none" }}>
              <i className={"pi pi-" + icon}></i>
            </span>
          )}
          <Field
            id={id}
            as={as}
            name={name}
            rows={rows}
            cols={cols}
            placeholder={placeholder}
            type={type}
            disabled={isDisabled}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              width,
              border: "1px solid #f1f1f1",
              padding: "10px",
              outline: isError ? `1px solid ${colors.red}` : focused
                ? "1px solid" + colors.primary
                : "1px solid #f1f1f1",
              height,
              backgroundColor: colors.white,
              fontSize,
              cursor: isDisabled ? "not-allowed" : "text",
            }}
            {...others}
          />
        </div>
        {
          isError && <div className="input-error">{ errorMessage || "This field is required" }</div>
        }
        {
          isDefaultError && <ErrorMessage
          name={name}
          component="div"
          style={{
            marginTop: 7,
            fontSize: 14,
            fontStyle: "italic",
            color: "#ce1616",
          }}
        />
        }
        
      </div>
    </>
  );
}

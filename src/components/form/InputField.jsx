import React, { useState } from "react";
import { ErrorMessage, Field } from "formik";
import { empty } from "../../Utilities/utils";
import colors from "../../config/colors";

export default function InputField({
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
  backgroundColor = colors.white,
  padding = "10px",
  paddingLeft,
  paddingRight,
  ...others
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
          <Field
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
              padding,
              paddingLeft,
              paddingRight,
              height,
              fontSize,
              backgroundColor,
              cursor: isDisabled ? "not-allowed" : "text",
            }}
            className={addClassName}
            {...others}
          />
        </div>
        <ErrorMessage
          name={name}
          component="div"
          style={{
            marginTop: 7,
            fontSize: 14,
            fontStyle: "italic",
            color: "#ce1616",
          }}
        />
      </div>
    </>
  );
}

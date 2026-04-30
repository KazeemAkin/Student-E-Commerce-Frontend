import { useState } from "react";
import { ErrorMessage, Field } from "formik";
import { empty } from "../../Utilities/utils";
import colors from "../../config/colors";

export default function InputField({
  name,
  placeholder,
  icon,
  id,
  type = "",
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
  sideLabelTitle = "",
  otherStyles,
  defaultOutline = "1px solid #f1f1f1",
  labelMarginTop,
  labelMarginLeft,
  focusedOutline = "1px solid" + colors.primary,
  inputOtherStyles = {},
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 5,
            ...otherStyles,
          }}
        >
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
              outline: focused ? focusedOutline : defaultOutline,
              padding,
              paddingLeft,
              paddingRight,
              height,
              fontSize,
              backgroundColor,
              cursor: isDisabled ? "not-allowed" : "text",
              ...inputOtherStyles,
            }}
            className={addClassName}
            {...others}
          />
          {!empty(sideLabelTitle) && (
            <label
              style={{ marginTop: labelMarginTop, marginLeft: labelMarginLeft }}
              htmlFor={id}
            >
              {sideLabelTitle}
            </label>
          )}
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

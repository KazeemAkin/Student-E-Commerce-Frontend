import React, { useState } from "react";
import { ErrorMessage, Field } from "formik";
import { empty } from "../../Utilities/utils";
import colors from "../../config/colors";

export default function SelectField({
  name,
  placeholder,
  icon,
  id,
  height,
  multiple = false,
  options = [],
  labelTitle = "",
  valueKey = "id",
  selectedOption = "",
  handleChangeFunc,
  display = "title",
  marginTop = 5,
  required = false,
  customPlaceholder = "",
  customValue = "",
  width = "100%",
  display1,
  index = 1,
  isDisabled = false,
  containerWidth,
}) {
  const [focused, setFocused] = useState(false);

  return (
    <>
      <div
        key={index}
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
            marginTop,
            flexDirection: "row",
          }}
        >
          {icon && (
            <span className="p-inputgroup-addon">
              <i className={"pi pi-" + icon}></i>
            </span>
          )}
          <Field
            id={id}
            name={name}
            as="select"
            multiple={multiple}
            value={selectedOption}
            disabled={isDisabled}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              width,
              border: "1px solid #f1f1f1",
              padding: "10px",
              height,
              borderRadius: 7,
              backgroundColor: colors.lightgray,
              cursor: isDisabled ? "not-allowed" : "text",
              outline: focused
                ? "1px solid" + colors.primary
                : "1px solid #f1f1f1",
            }}
            onChange={handleChangeFunc}
          >
            <option value="">{placeholder}</option>
            {customPlaceholder && (
              <option value={customValue}>{customPlaceholder}</option>
            )}
            {options.map((option, index) => (
              <option
                key={index}
                value={
                  valueKey === "id" && !empty(option._id)
                    ? option._id
                    : option[valueKey]
                }
              >
                {!empty(display1)
                  ? option[display] + " - " + option[display1]
                  : option[display]}
              </option>
            ))}
          </Field>
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

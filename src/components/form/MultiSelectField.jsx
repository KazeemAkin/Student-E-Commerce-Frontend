import React, { useState } from "react";
import { ErrorMessage } from "formik";
import { empty } from "../../Utilities/utils";
import { MultiSelect } from "primereact/multiselect";
import colors from "../../config/colors";

export default function MultiSelectField({
  name = '',
  placeholder = '',
  icon,
  id,
  options = [],
  labelTitle = "",
  selectedOptions = [],
  maxSelectedLabels = 100,
  marginTop = 5,
  onChange,
  optionLabel = "title",
  optionValue = "_id",
  required = false,
  multiClassName = "w-full md:w-20rem",
  mt = "mt-30",
  containerWidth,
  height
}) {
  const [focused, setFocused] = useState(false);

  return (
    <>
      <div
        className={"p-inputgroup " + mt}
        style={{
          display: "flex",
          flexDirection: "column",
          width: containerWidth,
          height,
          fontSize: 16
        }}
      >
        {!empty(labelTitle) && (
          <label htmlFor={id}>
            {labelTitle} {required ? <span className="required">*</span> : ""}
          </label>
        )}
        <div
          style={{ display: "flex", marginTop, flexDirection: "row", height }}
        >
          {icon && (
            <span className="p-inputgroup-addon">
              <i className={"pi pi-" + icon}></i>
            </span>
          )}
          <MultiSelect
            value={selectedOptions}
            onChange={onChange}
            options={options}
            placeholder={placeholder}
            maxSelectedLabels={maxSelectedLabels}
            className={multiClassName}
            filter
            optionLabel={optionLabel}
            optionValue={optionValue}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{ borderColor: colors.lightgray, height, fontSize: 14, paddingTop: 3, 
              outline: focused
                ? "1px solid" + colors.primary
                : "1px solid #f1f1f1", }}
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

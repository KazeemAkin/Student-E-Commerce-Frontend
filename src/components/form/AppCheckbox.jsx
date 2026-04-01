import React from "react";
import { Checkbox } from "primereact/checkbox";

export default function AppCheckbox({
  index,
  onChange,
  checked,
  value,
  style,
  width = "",
  ...others
}) {
  return (
    <div
      key={`auth-${index + 1}`}
      className={`flex align-items-center ${width}`}
      style={style}
    >
      <Checkbox
        inputId={`authorization${index + 1}`}
        name="authorizations"
        value={value}
        onChange={onChange}
        checked={checked}
        {...others}
      />
      <label htmlFor={`authorization${index + 1}`} className="ml-10">
        {value}
      </label>
    </div>
  );
}

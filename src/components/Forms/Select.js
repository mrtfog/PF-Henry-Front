import React from "react";

export default ({ onChange, options, value, name, label }) => {
  return (
    <div>
      <select name={name} value={value} onChange={onChange} label={name}>
        <option value="">{label}</option>
        {options.length &&
          options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
      </select>
    </div>
  );
};

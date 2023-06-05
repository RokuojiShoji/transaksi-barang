import React from "react";
import "../App.css";
import { useField } from "formik";

function RadioButton({ options, onValueChange, name }) {
  const [field, , helpers] = useField(name)

  function handleClick(value) {
    helpers.setValue(value)
    onValueChange(value);
  }

  return (
    <div>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          style={{
            backgroundColor:
              field.value === option.value ? "#343434" : "aquamarine",
            color:
              field.value === option.value ? "white" : "black",
          }}
          className="radioButton"
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default RadioButton;

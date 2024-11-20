import React, { useState } from "react";

export const FormItem = ({ name, value, children }) => {
  if (children?.length > 1) {
    throw new Error("FormItem must include one element!");
  }
  const [map, updateMap] = useState({});

  const formValueChange = (e) => {
    const formItemValue = e.target.value;
    if (name) {
      updateMap({ ...map, [name]: formItemValue });
    }
  };

  const inputProps = {
    value: map[name] ?? value,
    onChange: formValueChange,
    ...(children?.props ?? {}),
  };

  return (
    <div>
      <input {...inputProps} />
    </div>
  );
};

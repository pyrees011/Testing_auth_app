import React from "react";
import { TextField } from "@mui/material";

const InputField = ({ name, label, value, handleChange, type="text" }) => {
    return (
        <TextField
            name={name}
            type={type}
            label={label}
            value={value}
            onChange={handleChange}
        />
    );
}

export default InputField;
import React from "react";
import { Button } from "@mui/material";

const CustomButton = ({ label, handleClick }) => {
    return (
        <Button variant="contained" color="primary" onClick={handleClick}>{label}</Button>
    );
}

export default CustomButton;
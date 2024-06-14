import React from "react";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";

import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";

function Login() {
    const [formState, setFormState] = React.useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formState);
    }

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4">login</Typography>
                </Grid>
                <Grid item xs={12}>
                    <InputField
                        name="email"
                        label="Email"
                        value={formState.email}
                        handleChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputField
                        name="password"
                        type="password"
                        label="password"
                        value={formState.password}
                        handleChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomButton label="Sign in" handleClick={handleSubmit} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default Login;
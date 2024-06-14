import React from "react";
// import { Link } from "react-router-dom";

import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";

function Register() {
    const [formState, setFormState] = React.useState({
        name: "",
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
            <Typography variant="h4">register</Typography>
            </Grid>
            <Grid item xs={12}>
            <InputField
                name="name"
                label="Username"
                value={formState.name}
                handleChange={handleChange}
            />
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
            <CustomButton label="Sign up" handleClick={handleSubmit} />
            </Grid>
            <Grid item xs={12}>
            <Box>
                <Typography variant="body1" label="login_link">Already have an account?</Typography>
            </Box>
            </Grid>
        </Grid>
        </Container>
    );
    }

export default Register;
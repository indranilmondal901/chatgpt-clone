import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery, TextField, Button, Alert, Collapse, Typography } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isNotMobile = useMediaQuery("(min-width:1000px)");
    //States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    //login Controll
    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:8080/api/v1/auth/login', { email, password });
            if (data.token) {
                localStorage.setItem('authToken', true)
                toast.success("Login sucessfully");
                navigate("/");
            }
        } catch (err) {
            if (err.response.data.message) {
                setError(err.response.data.message);
            } else if (err.message) {
                console.log("else IF")
                setError(err.message);
            }
            setTimeout(() => {
                setError("");
            }, 5000)
        }
    }
    return (
        <Box width={isNotMobile ? '40%' : '80%'} p={'2rem'} m={'2rem auto'} borderRadius={'10px'} sx={{ boxShadwo: 5 }} backgroundColor={theme.palette.background.alt}>
            <Collapse in={error}>
                <Alert severity='error' mb={2}>{error}</Alert>
            </Collapse>
            <form onSubmit={handelSubmit}>
                <Typography variant="h3"> Sign In </Typography>
                <TextField
                    label="email"
                    type='email'
                    required
                    margin='normal'
                    fullWidth
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }} />
                <TextField
                    label="password"
                    type='password'
                    required
                    margin='normal'
                    fullWidth
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }} />
                <Button type='submit'
                    fullWidth
                    variant='contained'
                    size='large' sx={{ color: 'white', mt: "2" }}>
                    SIGN IN
                </Button>
                <Typography mt={2}>
                    Don't have an account ? <Link to='/register'>please register here</Link>
                </Typography>
            </form>
        </Box>
    )
}

export default Login

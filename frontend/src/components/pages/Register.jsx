import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery, TextField, Button, Alert, Collapse, Typography } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Register = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isNotMobile = useMediaQuery("(min-width:1000px)")
    //States
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    //register Controll
    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://chatgpt-b-1.onrender.com/api/v1/auth/register', { username, email, password });
            toast.success("User register sucessfully");
            navigate("/login")
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
                <Typography variant="h3"> Sign Up </Typography>
                <TextField
                    label="username"
                    type='text'
                    required
                    margin='normal'
                    fullWidth
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }} />
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
                    SIGN UP
                </Button>
                <Typography mt={2}>
                    Already have an account ? <Link to='/login'>please login</Link>
                </Typography>
            </form>
        </Box>
    )
}

export default Register

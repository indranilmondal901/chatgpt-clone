import React from 'react';
import { Box, Typography } from "@mui/material";
// import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const Navbar = () => {
    // const theme = useTheme()
    const loggedIn = JSON.parse(localStorage.getItem("authToken"));
    const navigate = useNavigate();

    // Logout controller
    const handelLogout = async () => {
        try {
            await axios.post('https://chatgpt-b-1.onrender.com/api/v1/auth/logout')
                .then((res) => {
                    if (res.status === 200) {
                        localStorage.removeItem('authToken')
                        toast.success(res.data.message)
                        navigate('/')
                    }
                })
        } catch (error) {
            console.log(error)
            // toast.error('Server Error');
        }
    }
    return (
        <Box width={"100%"} p={"1rem 6%"} textAlign={"center"} sx={{ boxShadow: 3, mb: 2 }} backgroundColor="">
            <Typography variant="h1" color={"primary"} fontWeight="bold">
                AI GPT3 CLONE
            </Typography>
            {
                loggedIn ?
                    (
                        <>
                            <Link to="/" p={1}> Home</Link>
                            <Link p={1} onClick={handelLogout}> Log Out</Link>
                        </>
                    )
                    :
                    (
                        <>
                            <Link to="/register" p={1}> Sign Up</Link>
                            <Link to="/login" p={1}> Sign In</Link>
                        </>
                    )
            }
        </Box>
    )
}

export default Navbar


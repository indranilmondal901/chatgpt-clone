import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery, TextField, Button, Alert, Collapse, Typography, Card } from "@mui/material";
import { Link } from 'react-router-dom';
import axios from 'axios';

const JsConverter = () => {
    const theme = useTheme();
    const isNotMobile = useMediaQuery("(min-width:1000px)");
    //States
    const [text, setText] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    //code Controll
    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('https://chatgpt-b-1.onrender.com/api/v1/openai/js-converter', { text: text });
            setCode(data);
        } catch (err) {
            console.log(err)
            if (err.response.data.err) {
                setError(err.message)
            }
            else if (err.message) {
                setError(err.message)
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
                <Typography variant="h3"> JS-Converter </Typography>
                <TextField
                    type='text'
                    multiline={true}
                    placeholder='Type Your Text Here For Generating Code'
                    required
                    margin='normal'
                    fullWidth
                    value={text}
                    onChange={(e) => { setText(e.target.value) }} />

                <Button type='submit'
                    fullWidth
                    variant='contained'
                    size='large' sx={{ color: 'white', mt: "2" }}>
                    Get Code
                </Button>
                <Typography mt={2}>
                    Not this page ? <Link to='/'>go back</Link>
                </Typography>
            </form>
            {
                code ? (
                    <Card sx={{ mt: 4, border: 1, boxShadow: 0, height: '500px', borderRadius: 5, borderColor: 'natural.medium', bgcolor: 'background.default', overflow:'auto'}}>
                        <Typography p={2}>{code}</Typography>
                    </Card>
                ) : (
                    <Card sx={{ mt: 4, border: 1, boxShadow: 0, height: '500px', borderRadius: 5, borderColor: 'natural.medium', bgcolor: 'background.default' }}>
                        <Typography variant='h5' sx={{ textAlign: 'center', verticalAlign: 'center', lineHeight: '450px' }} color='natural.main'>Your code Will appear here</Typography>
                    </Card>
                )
            }
        </Box>
    )
}

export default JsConverter

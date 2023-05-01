import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery, TextField, Button, Alert, Collapse, Typography, Card } from "@mui/material";
import { Link } from 'react-router-dom';
import axios from 'axios';
const SciFiImage = () => {
    const theme = useTheme();
    const isNotMobile = useMediaQuery("(min-width:1000px)");
    //States
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');

    //Image Controll
    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:8080/api/v1/openai/scifi-img', { text: text });
            setImage(data);
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
                <Typography variant="h3"> SCI-FI Image </Typography>
                <TextField
                    type='text'
                    multiline={true}
                    placeholder='Type Your Text here For Generating image'
                    required
                    margin='normal'
                    fullWidth
                    value={text}
                    onChange={(e) => { setText(e.target.value) }} />

                <Button type='submit'
                    fullWidth
                    variant='contained'
                    size='large' sx={{ color: 'white', mt: "2" }}>
                    Get Image
                </Button>
                <Typography mt={2}>
                    Not this page ? <Link to='/'>go back</Link>
                </Typography>
            </form>
            {
                image ? (
                    <Card sx={{ mt: 4, border: 1, boxShadow: 0, height: '500px', borderRadius: 5, borderColor: 'natural.medium', bgcolor: 'background.default' }}>
                        <Box sx={{display:"flex",justifyContent:"center", my:5}}>
                            <img src={image} alt="SciFi" />
                        </Box>
                    </Card>
                ) : (
                    <Card sx={{ mt: 4, border: 1, boxShadow: 0, height: '500px', borderRadius: 5, borderColor: 'natural.medium', bgcolor: 'background.default' }}>
                        <Typography variant='h5' sx={{ textAlign: 'center', verticalAlign: 'center', lineHeight: '450px' }} color='natural.main'>image Will appear here</Typography>
                    </Card>
                )
            }
        </Box>
    )
}


export default SciFiImage


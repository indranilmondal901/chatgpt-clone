import React from 'react';
import { Box, Typography, Card, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Code from '@mui/icons-material/Code';

const JsConverterCard = () => {
    const navigate = useNavigate();
    return (
        <Box p={2}>
            <Typography variant='h4' mb={2} fontWeight="bold">
                JS-Code-Converter
            </Typography>
            <Card onClick={() => navigate("/js-converter")} sx={{
                boxShadow: 2, borderRadius: 5, height: 190,
                width: 200, '&:hover': { border: 2, boxShadow: 0, borderColor: 'primary.dark', cursor: 'pointer' }
            }}>
                <Code sx={{ fontSize: 80, color: 'primary.main', mt: 2, ml: 2 }} />
                <Stack p={3} pt={0}>
                    <Typography variant='h5' fontWeight="bold" >JS-Converter </Typography>
                    <Typography variant='h6' >
                        Get Your Code Here
                    </Typography>
                </Stack>
            </Card>
        </Box>
    )
}

export default JsConverterCard;

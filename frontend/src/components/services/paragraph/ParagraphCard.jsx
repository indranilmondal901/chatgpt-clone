import React from 'react';
import { Box, Typography, Card, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FormatAlignLeftOutlined from '@mui/icons-material/FormatAlignLeftOutlined';

const ParagraphCard = () => {
    const navigate = useNavigate();
    return (
        <Box p={2}>
            <Typography variant='h4' mb={2} fontWeight="bold">
                Paragraph Generation
            </Typography>
            <Card onClick={() => navigate("/paragraph")} sx={{
                boxShadow: 2, borderRadius: 5, height: 190,
                width: 200, '&:hover': { border: 2, boxShadow: 0, borderColor: 'primary.dark', cursor: 'pointer' }
            }}>
                <FormatAlignLeftOutlined sx={{ fontSize: 80, color: 'primary.main', mt: 2, ml: 2 }} />
                <Stack p={3} pt={0}>
                    <Typography variant='h5' fontWeight="bold" >Paragraph </Typography>
                    <Typography variant='h6' >
                        Get Your Paragraph Ready
                    </Typography>
                </Stack>
            </Card>
        </Box>
    )
}

export default ParagraphCard

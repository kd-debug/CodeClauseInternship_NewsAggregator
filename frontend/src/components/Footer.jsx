import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const footerBg = isDarkMode ? '#1a1f2b' : '#204020';
    const footerText = isDarkMode ? '#f0f0f0' : '#e6e6cc';
    const brandColor = isDarkMode ? '#9acd32' : 'white';

    return (
        <Box
            component="footer"
            sx={{
                py: 4,
                px: 2,
                mt: 'auto',
                backgroundColor: footerBg,
                color: footerText,
                fontFamily: 'Montserrat, sans-serif',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 900, color: brandColor, fontFamily: 'Montserrat, sans-serif', letterSpacing: 1 }}>
                            NewsNexus
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: footerText, fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '1.1rem', mb: 1 }}>
                            Your one-stop destination for the latest news from around the world.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: brandColor, fontFamily: 'Montserrat, sans-serif' }}>
                            Contact
                        </Typography>
                        <Typography variant="body1" sx={{ color: footerText, fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                            Email: <a href="mailto:support@newsnexus.com" style={{ color: footerText, textDecoration: 'underline', fontWeight: 500 }}>support@newsnexus.com</a>
                        </Typography>
                        <Typography variant="body1" sx={{ color: footerText, fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                            Phone: <span style={{ fontWeight: 500, color: brandColor }}>+91 9876543210</span>
                        </Typography>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 4, borderTop: 1, borderColor: 'rgba(230, 230, 204, 0.2)', pt: 2 }}>
                    <Typography variant="body2" align="center" sx={{ color: footerText, fontFamily: 'Montserrat, sans-serif', fontWeight: 400, letterSpacing: 1 }}>
                        © {new Date().getFullYear()} <span style={{ fontWeight: 700, color: brandColor }}>NewsNexus</span>. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
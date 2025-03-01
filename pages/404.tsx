import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Box, Button } from '@mui/material';
import { Navigation } from '../components/Navigation';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    // If the current path doesn't start with /shophub in production,
    // redirect to the correct path
    if (typeof window !== 'undefined' && 
        process.env.NODE_ENV === 'production' && 
        !window.location.pathname.startsWith('/shophub')) {
      const newPath = `/shophub${window.location.pathname}`;
      window.location.href = newPath;
    }
  }, []);

  return (
    <>
      <Navigation />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center',
            gap: 3,
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            404 - Page Not Found
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            The page you're looking for doesn't exist or has been moved.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => router.push('/')}
          >
            Go to Homepage
          </Button>
        </Box>
      </Container>
    </>
  );
} 
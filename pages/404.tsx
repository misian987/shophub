import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { Navigation } from '../components/Navigation';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    // Simple redirect to homepage if we're not already there
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      router.push('/shophub/');
    }
  }, [router]);

  return (
    <>
      <Navigation />
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => router.push('/shophub/')}
        >
          GO TO HOMEPAGE
        </Button>
      </Container>
    </>
  );
} 
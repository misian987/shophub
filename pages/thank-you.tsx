import { useEffect } from 'react';
import { NextPage } from 'next';
import { Container, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { trackPageView } from '../utils/dataLayer';
import { Navigation } from '../components/Navigation';

const ThankYouPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    trackPageView('Thank You', window.location.pathname);
  }, []);

  return (
    <>
      <Navigation />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Thank You for Your Purchase!
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Your order has been confirmed and will be shipped soon.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => router.push('/')}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default ThankYouPage; 
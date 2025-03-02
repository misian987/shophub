import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Navigation } from '../../components/Navigation';
import { trackPageView } from '../../utils/dataLayer';

const ConfirmationPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    trackPageView('Checkout - Confirmation', window.location.pathname);
  }, []);

  return (
    <>
      <Navigation />
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <CheckCircleOutlineIcon
            color="success"
            sx={{ fontSize: 64, mb: 2 }}
          />
          <Typography variant="h4" component="h1" gutterBottom>
            Thank You for Your Order!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Your order has been successfully placed. We'll send you an email with your order details
            and tracking information once your package ships.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => router.push('/')}
              sx={{ mr: 2 }}
            >
              Continue Shopping
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default ConfirmationPage; 
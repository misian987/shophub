import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
} from '@mui/material';
import { Navigation } from '../../components/Navigation';
import { useCart } from '../../context/CartContext';
import { trackPageView, trackCheckoutStep } from '../../utils/dataLayer';
import { PaymentDetails } from '../../types';

const PaymentPage: NextPage = () => {
  const router = useRouter();
  const { cart } = useCart();
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  useEffect(() => {
    trackPageView('Checkout - Payment', window.location.pathname);
    trackCheckoutStep(2, 'Payment');
  }, []);

  useEffect(() => {
    // Check if shipping details exist
    const shippingDetails = localStorage.getItem('shippingDetails');
    if (!shippingDetails || cart.items.length === 0) {
      router.push('/checkout/shipping');
    }
  }, [cart.items.length, router]);

  const handleInputChange = (field: keyof PaymentDetails) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value;
    
    // Basic input formatting
    if (field === 'cardNumber') {
      value = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
      value = value.substring(0, 19); // 16 digits + 3 spaces
    } else if (field === 'expiryDate') {
      value = value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
      value = value.substring(0, 5); // MM/YY format
    } else if (field === 'cvv') {
      value = value.replace(/\D/g, '').substring(0, 3);
    }

    setPaymentDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Store payment details in localStorage for the final step
    localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));
    router.push('/checkout/review');
  };

  const isFormValid = () => {
    const { cardNumber, cardHolder, expiryDate, cvv } = paymentDetails;
    return (
      cardNumber.replace(/\s/g, '').length === 16 &&
      cardHolder.trim() !== '' &&
      expiryDate.length === 5 &&
      cvv.length === 3
    );
  };

  return (
    <>
      <Navigation />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Payment Information
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Card Number"
                  value={paymentDetails.cardNumber}
                  onChange={handleInputChange('cardNumber')}
                  placeholder="1234 5678 9012 3456"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Card Holder Name"
                  value={paymentDetails.cardHolder}
                  onChange={handleInputChange('cardHolder')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Expiry Date"
                  value={paymentDetails.expiryDate}
                  onChange={handleInputChange('expiryDate')}
                  placeholder="MM/YY"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="CVV"
                  type="password"
                  value={paymentDetails.cvv}
                  onChange={handleInputChange('cvv')}
                  placeholder="123"
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                onClick={() => router.push('/checkout/shipping')}
              >
                Back to Shipping
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isFormValid()}
              >
                Review Order
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default PaymentPage; 
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
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from '@mui/material';
import { Navigation } from '../../components/Navigation';
import { CheckoutStepper } from '../../components/CheckoutStepper';
import { useCart } from '../../context/CartContext';
import { trackPageView, trackCheckoutStep, trackCheckoutOption } from '../../utils/dataLayer';
import { PaymentDetails } from '../../types';

const PaymentPage: NextPage = () => {
  const router = useRouter();
  const { cart } = useCart();
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'credit',
  });

  useEffect(() => {
    trackPageView('Checkout - Payment', window.location.pathname);
    trackCheckoutStep(2, 'Payment');

    // Try to load saved payment details (except sensitive info)
    const savedDetails = localStorage.getItem('paymentDetails');
    if (savedDetails) {
      const { paymentMethod } = JSON.parse(savedDetails);
      setPaymentDetails(prev => ({ ...prev, paymentMethod }));
    }
  }, []);

  useEffect(() => {
    if (cart.items.length === 0) {
      router.push('/cart');
    }

    // Check if shipping details exist
    const shippingDetails = localStorage.getItem('shippingDetails');
    if (!shippingDetails) {
      router.push('/checkout/shipping');
    }
  }, [cart.items.length, router]);

  const handleInputChange = (field: keyof PaymentDetails) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPaymentDetails((prev) => ({ ...prev, [field]: value }));

    if (field === 'paymentMethod') {
      trackCheckoutOption(2, 'Payment Method', value);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Store only non-sensitive payment details
    localStorage.setItem('paymentDetails', JSON.stringify({
      paymentMethod: paymentDetails.paymentMethod,
    }));
    router.push('/checkout/review');
  };

  const isFormValid = () => {
    const { cardNumber, cardName, expiryDate, cvv } = paymentDetails;
    return cardNumber.trim() !== '' &&
           cardName.trim() !== '' &&
           expiryDate.trim() !== '' &&
           cvv.trim() !== '';
  };

  return (
    <>
      <Navigation />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <CheckoutStepper />
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Payment Information
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
                <FormControl component="fieldset" sx={{ mb: 4 }}>
                  <FormLabel component="legend">Payment Method</FormLabel>
                  <RadioGroup
                    value={paymentDetails.paymentMethod}
                    onChange={handleInputChange('paymentMethod')}
                  >
                    <FormControlLabel
                      value="credit"
                      control={<Radio />}
                      label="Credit Card"
                    />
                    <FormControlLabel
                      value="debit"
                      control={<Radio />}
                      label="Debit Card"
                    />
                  </RadioGroup>
                </FormControl>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Card Number"
                      value={paymentDetails.cardNumber}
                      onChange={handleInputChange('cardNumber')}
                      inputProps={{ maxLength: 16 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Name on Card"
                      value={paymentDetails.cardName}
                      onChange={handleInputChange('cardName')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Expiry Date (MM/YY)"
                      value={paymentDetails.expiryDate}
                      onChange={handleInputChange('expiryDate')}
                      inputProps={{ maxLength: 5 }}
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
                      inputProps={{ maxLength: 4 }}
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
                    Continue to Review
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Typography>
                  Items ({cart.items.reduce((total, item) => total + item.quantity, 0)}):
                  ${cart.total.toFixed(2)}
                </Typography>
                <Typography>Shipping: Calculated next</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">
                Total: ${cart.total.toFixed(2)}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PaymentPage; 
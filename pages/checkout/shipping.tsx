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
} from '@mui/material';
import { Navigation } from '../../components/Navigation';
import { CheckoutStepper } from '../../components/CheckoutStepper';
import { useCart } from '../../context/CartContext';
import { trackPageView, trackCheckoutStep } from '../../utils/dataLayer';
import { ShippingDetails } from '../../types';

const ShippingPage: NextPage = () => {
  const router = useRouter();
  const { cart } = useCart();
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  useEffect(() => {
    trackPageView('Checkout - Shipping', window.location.pathname);
    trackCheckoutStep(1, 'Shipping');

    // Try to load saved shipping details
    const savedDetails = localStorage.getItem('shippingDetails');
    if (savedDetails) {
      setShippingDetails(JSON.parse(savedDetails));
    }
  }, []);

  useEffect(() => {
    if (cart.items.length === 0) {
      router.push('/cart');
    }
  }, [cart.items.length, router]);

  const handleInputChange = (field: keyof ShippingDetails) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShippingDetails((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem('shippingDetails', JSON.stringify(shippingDetails));
    router.push('/checkout/payment');
  };

  const isFormValid = () => {
    return Object.values(shippingDetails).every((value) => value.trim() !== '');
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
                Shipping Information
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="First Name"
                      value={shippingDetails.firstName}
                      onChange={handleInputChange('firstName')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Last Name"
                      value={shippingDetails.lastName}
                      onChange={handleInputChange('lastName')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="email"
                      label="Email"
                      value={shippingDetails.email}
                      onChange={handleInputChange('email')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Address"
                      value={shippingDetails.address}
                      onChange={handleInputChange('address')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="City"
                      value={shippingDetails.city}
                      onChange={handleInputChange('city')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="State/Province"
                      value={shippingDetails.state}
                      onChange={handleInputChange('state')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="ZIP/Postal Code"
                      value={shippingDetails.zipCode}
                      onChange={handleInputChange('zipCode')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Country"
                      value={shippingDetails.country}
                      onChange={handleInputChange('country')}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    variant="outlined"
                    onClick={() => router.push('/cart')}
                  >
                    Back to Cart
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!isFormValid()}
                  >
                    Continue to Payment
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

export default ShippingPage; 
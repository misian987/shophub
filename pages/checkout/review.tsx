import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Navigation } from '../../components/Navigation';
import { CheckoutStepper } from '../../components/CheckoutStepper';
import { useCart } from '../../context/CartContext';
import { trackPageView, trackCheckoutStep, trackPurchase } from '../../utils/dataLayer';
import { ShippingDetails, PaymentDetails } from '../../types';

const ReviewPage: NextPage = () => {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);

  useEffect(() => {
    trackPageView('Checkout - Review', window.location.pathname);
    trackCheckoutStep(3, 'Review');

    // Load saved details
    const savedShipping = localStorage.getItem('shippingDetails');
    const savedPayment = localStorage.getItem('paymentDetails');

    if (savedShipping) {
      setShippingDetails(JSON.parse(savedShipping));
    }
    if (savedPayment) {
      setPaymentDetails(JSON.parse(savedPayment));
    }
  }, []);

  useEffect(() => {
    if (cart.items.length === 0) {
      router.push('/cart');
      return;
    }

    // Check if previous steps are completed
    const shippingDetails = localStorage.getItem('shippingDetails');
    const paymentDetails = localStorage.getItem('paymentDetails');
    
    if (!shippingDetails || !paymentDetails) {
      router.push('/checkout/shipping');
    }
  }, [cart.items.length, router]);

  const handlePlaceOrder = () => {
    // Track purchase
    const tax = cart.total * 0.1;
    trackPurchase({
      id: `ORDER-${Date.now()}`,
      revenue: cart.total,
      tax: tax,
      shipping: 0,
      items: cart.items,
    });

    // Clear cart and stored data
    clearCart();
    localStorage.removeItem('shippingDetails');
    localStorage.removeItem('paymentDetails');
    router.push('/checkout/confirmation');
  };

  if (!shippingDetails || !paymentDetails) {
    return null;
  }

  return (
    <>
      <Navigation />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <CheckoutStepper />
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Review Order
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Shipping Information
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary={`${shippingDetails.firstName} ${shippingDetails.lastName}`}
                      secondary={shippingDetails.email}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Shipping Address"
                      secondary={`${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.state} ${shippingDetails.zipCode}, ${shippingDetails.country}`}
                    />
                  </ListItem>
                </List>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom>
                  Payment Information
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Payment Method"
                      secondary={paymentDetails.paymentMethod === 'credit' ? 'Credit Card' : 'Debit Card'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Card Holder"
                      secondary={paymentDetails.cardName || 'Not available'}
                    />
                  </ListItem>
                </List>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom>
                  Order Items
                </Typography>
                <List>
                  {cart.items.map((item) => (
                    <ListItem key={item.id}>
                      <ListItemText
                        primary={item.name}
                        secondary={`Quantity: ${item.quantity}`}
                      />
                      <Typography>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    variant="outlined"
                    onClick={() => router.push('/checkout/payment')}
                  >
                    Back to Payment
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
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
                <Typography>Shipping: Free</Typography>
                <Typography>Tax: ${(cart.total * 0.1).toFixed(2)}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">
                Total: ${(cart.total * 1.1).toFixed(2)}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ReviewPage; 
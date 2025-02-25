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
  }, []);

  useEffect(() => {
    // Load saved details
    const loadedShippingDetails = localStorage.getItem('shippingDetails');
    const loadedPaymentDetails = localStorage.getItem('paymentDetails');

    if (!loadedShippingDetails || !loadedPaymentDetails || cart.items.length === 0) {
      router.push('/checkout/shipping');
      return;
    }

    setShippingDetails(JSON.parse(loadedShippingDetails));
    setPaymentDetails(JSON.parse(loadedPaymentDetails));
  }, [cart.items.length, router]);

  const handlePlaceOrder = () => {
    const orderId = `ORDER-${Date.now()}`;
    const tax = cart.total * 0.1;
    const shipping = 10.00;

    trackPurchase({
      id: orderId,
      revenue: cart.total,
      tax,
      shipping,
      products: cart.items.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
    });

    // Clear stored data
    localStorage.removeItem('shippingDetails');
    localStorage.removeItem('paymentDetails');
    clearCart();
    
    router.push('/thank-you');
  };

  if (!shippingDetails || !paymentDetails) {
    return null;
  }

  return (
    <>
      <Navigation />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Review Your Order
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography>
                  {shippingDetails.firstName} {shippingDetails.lastName}
                </Typography>
                <Typography>{shippingDetails.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>{shippingDetails.address}</Typography>
                <Typography>
                  {shippingDetails.city}, {shippingDetails.state} {shippingDetails.zipCode}
                </Typography>
                <Typography>{shippingDetails.country}</Typography>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box>
            <Typography variant="h6" gutterBottom>
              Payment Information
            </Typography>
            <Typography>
              Card ending in {paymentDetails.cardNumber.slice(-4)}
            </Typography>
            <Typography>{paymentDetails.cardHolder}</Typography>
            <Typography>Expires: {paymentDetails.expiryDate}</Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <List>
              {cart.items.map((item) => (
                <ListItem key={item.product.id}>
                  <ListItemText
                    primary={item.product.name}
                    secondary={`Quantity: ${item.quantity}`}
                  />
                  <Typography>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </Typography>
                </ListItem>
              ))}
              <Divider sx={{ my: 2 }} />
              <ListItem>
                <ListItemText primary="Subtotal" />
                <Typography>${cart.total.toFixed(2)}</Typography>
              </ListItem>
              <ListItem>
                <ListItemText primary="Tax (10%)" />
                <Typography>${(cart.total * 0.1).toFixed(2)}</Typography>
              </ListItem>
              <ListItem>
                <ListItemText primary="Shipping" />
                <Typography>$10.00</Typography>
              </ListItem>
              <ListItem>
                <ListItemText primary="Total" />
                <Typography variant="h6" color="primary">
                  ${(cart.total + cart.total * 0.1 + 10).toFixed(2)}
                </Typography>
              </ListItem>
            </List>
          </Box>

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
        </Paper>
      </Container>
    </>
  );
};

export default ReviewPage; 
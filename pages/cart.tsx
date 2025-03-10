import { useEffect } from 'react';
import { NextPage } from 'next';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Box,
  Avatar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../context/CartContext';
import { trackPageView, trackRemoveFromCart, trackBeginCheckout } from '../utils/dataLayer';
import { useRouter } from 'next/router';
import { Navigation } from '../components/Navigation';
import { CartItem } from '../types';

const CartPage: NextPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      trackPageView('Shopping Cart', router.asPath);
    }
  }, [router.isReady]);

  const handleRemoveFromCart = (item: CartItem) => {
    trackRemoveFromCart({
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
      quantity: item.quantity,
    });
    removeFromCart(item.id);
  };

  const handleProceedToCheckout = () => {
    trackBeginCheckout(cart.items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
      quantity: item.quantity,
    })));
    router.push('/checkout/shipping');
  };

  if (cart.items.length === 0) {
    return (
      <>
        <Navigation />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Your Cart is Empty
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => router.push('/')}
            sx={{
              background: 'linear-gradient(45deg, #556cd6 30%, #19857b 90%)',
              boxShadow: '0 3px 5px 2px rgba(85, 108, 214, .3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #19857b 30%, #556cd6 90%)',
                boxShadow: '0 4px 6px 2px rgba(85, 108, 214, .4)',
              },
            }}
          >
            Continue Shopping
          </Button>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Shopping Cart
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={item.image}
                        alt={item.name}
                        variant="rounded"
                        sx={{ width: 60, height: 60 }}
                      />
                      <Typography>{item.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2, alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Total: ${cart.total.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleProceedToCheckout}
            sx={{
              background: 'linear-gradient(45deg, #556cd6 30%, #19857b 90%)',
              boxShadow: '0 3px 5px 2px rgba(85, 108, 214, .3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #19857b 30%, #556cd6 90%)',
                boxShadow: '0 4px 6px 2px rgba(85, 108, 214, .4)',
              },
            }}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default CartPage; 
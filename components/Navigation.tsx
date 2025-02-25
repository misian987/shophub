import { AppBar, Toolbar, Button, Badge, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from 'next/router';
import { useCart } from '../context/CartContext';
import { Logo } from './Logo';

export const Navigation = () => {
  const router = useRouter();
  const { cart } = useCart();

  const cartItemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        bgcolor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 15px rgba(85, 108, 214, 0.08)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 4 } }}>
        <Logo />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push('/cart')}
            startIcon={
              <Badge 
                badgeContent={cartItemCount} 
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: 'rgba(25, 133, 123, 0.9)',
                    color: 'white',
                  },
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            }
            sx={{
              borderRadius: '50px',
              px: 3,
              py: 1,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              background: 'linear-gradient(145deg, rgba(85, 108, 214, 0.9) 0%, rgba(25, 133, 123, 0.9) 100%)',
              boxShadow: '0 3px 12px rgba(85, 108, 214, 0.15)',
              '&:hover': {
                background: 'linear-gradient(145deg, rgba(25, 133, 123, 0.9) 0%, rgba(85, 108, 214, 0.9) 100%)',
                boxShadow: '0 4px 15px rgba(85, 108, 214, 0.2)',
              },
            }}
          >
            Cart
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}; 
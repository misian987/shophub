import { AppBar, Toolbar, Button, Badge, Box, IconButton } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { Logo } from './Logo';

export const Navigation = () => {
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
          <Link href="/cart" passHref style={{ textDecoration: 'none' }}>
            <IconButton
              component="span"
              sx={{
                color: 'rgba(25, 133, 123, 0.9)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                  color: 'rgba(85, 108, 214, 0.9)',
                },
              }}
            >
              <Badge
                badgeContent={cartItemCount}
                color="primary"
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: 'rgba(85, 108, 214, 0.9)',
                    color: 'white',
                    fontWeight: 'bold',
                  },
                }}
              >
                <ShoppingCartOutlinedIcon sx={{ fontSize: '1.75rem' }} />
              </Badge>
            </IconButton>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}; 
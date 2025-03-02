import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

export const Logo = () => {
  return (
    <Link href="/" style={{ textDecoration: 'none' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          gap: 1.5,
          position: 'relative',
          py: 1,
          '&:hover': {
            '& .icon': {
              transform: 'rotate(10deg) scale(1.1)',
              boxShadow: '0 4px 15px rgba(85, 108, 214, 0.15)',
            },
            '& .text': {
              letterSpacing: 2,
            },
            '&::after': {
              width: '100%',
              opacity: 0.8,
            },
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '0%',
            height: '2px',
            background: 'linear-gradient(145deg, rgba(85, 108, 214, 0.8) 0%, rgba(25, 133, 123, 0.8) 100%)',
            transition: 'width 0.3s ease-in-out, opacity 0.3s ease-in-out',
            opacity: 0,
          },
        }}
      >
        <Box
          className="icon"
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '50%',
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 2px 10px rgba(85, 108, 214, 0.1)',
          }}
        >
          <ShoppingBagOutlinedIcon
            sx={{
              fontSize: '2rem',
              color: 'rgba(25, 133, 123, 0.9)',
              filter: 'drop-shadow(0 2px 3px rgba(25, 133, 123, 0.15))',
            }}
          />
        </Box>
        <Typography
          variant="h5"
          component="span"
          className="text"
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(145deg, rgba(85, 108, 214, 0.9) 0%, rgba(25, 133, 123, 0.9) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            textTransform: 'uppercase',
            letterSpacing: 1.5,
            fontSize: { xs: '1.2rem', sm: '1.5rem' },
            textShadow: '0 2px 8px rgba(85, 108, 214, 0.08)',
          }}
        >
          ShopHub
        </Typography>
      </Box>
    </Link>
  );
}; 
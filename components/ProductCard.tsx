import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { trackSelectItem } from '../utils/dataLayer';

interface ProductCardProps {
  product: Product;
  index: number;
  listName: string;
}

export const ProductCard = ({ product, index, listName }: ProductCardProps) => {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleProductClick = () => {
    trackSelectItem({
      ...product,
      index: index
    }, listName);
    router.push(`/product/${product.id}`);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardMedia
        component="img"
        height="250"
        image={product.image}
        alt={product.name}
        sx={{ cursor: 'pointer' }}
        onClick={handleProductClick}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          sx={{
            cursor: 'pointer',
            '&:hover': { color: 'primary.main' },
          }}
          onClick={handleProductClick}
        >
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, flexGrow: 1 }}
        >
          {product.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary">
            ${product.price.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}; 
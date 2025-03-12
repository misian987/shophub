import { useEffect } from 'react';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Box,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import { Navigation } from '../../components/Navigation';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { trackPageView, trackViewItem } from '../../utils/dataLayer';
import { Product } from '../../types';

interface ProductPageProps {
  product: Product;
}

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useCart();

  useEffect(() => {
    if (product) {
      trackPageView(`Product - ${product.name}`, window.location.pathname);
      trackViewItem({
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
      });
    }
  }, [product]);

  if (router.isFallback || !product) {
    return (
      <>
        <Navigation />
        <Container>
          <Typography>Loading...</Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Breadcrumbs sx={{ mb: 4 }}>
          <MuiLink
            component="button"
            variant="body1"
            onClick={() => router.push('/')}
            sx={{ cursor: 'pointer' }}
          >
            Home
          </MuiLink>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        <Paper sx={{ p: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  borderRadius: 1,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h1" gutterBottom>
                {product.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                Category: {product.category}
              </Typography>
              <Typography variant="h5" color="primary" sx={{ mb: 3 }}>
                ${product.price.toFixed(2)}
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                {product.description}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  addToCart(product);
                  router.push('/cart');
                }}
              >
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            You might also like
          </Typography>
          <Grid container spacing={4}>
            {products
              .filter((p) => p.id !== product.id && p.category === product.category)
              .slice(0, 3)
              .map((relatedProduct) => (
                <Grid item key={relatedProduct.id} xs={12} sm={4}>
                  <Paper
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      '&:hover': { boxShadow: 6 },
                    }}
                    onClick={() => router.push(`/product/${relatedProduct.id}`)}
                  >
                    <Box
                      component="img"
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      sx={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover',
                        borderRadius: 1,
                      }}
                    />
                    <Typography variant="h6" sx={{ mt: 2 }}>
                      {relatedProduct.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${relatedProduct.price.toFixed(2)}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = products.map((product) => ({
    params: { id: product.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = products.find((p) => p.id === params?.id);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductPage; 
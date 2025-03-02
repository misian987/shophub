import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Container,
  Grid,
  Typography,
  Box,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { products } from '../data/products';
import { trackPageView, trackViewItemList } from '../utils/dataLayer';
import { Navigation } from '../components/Navigation';
import { ProductCard } from '../components/ProductCard';

const HomePage: NextPage = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (router.isReady) {
      trackPageView('Home - Product Listing', router.asPath);
    }
  }, [router.isReady]);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(products.map((product) => product.category)))];

  // Filter products based on category and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Track view_item_list when filtered products change
  useEffect(() => {
    if (filteredProducts.length > 0) {
      trackViewItemList(filteredProducts, `Product List - ${selectedCategory}`);
    }
  }, [filteredProducts, selectedCategory]);

  return (
    <>
      <Navigation />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #556cd6 30%, #19857b 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Welcome to Our Store
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Discover our amazing products at great prices
          </Typography>
          
          {/* Search Bar */}
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ maxWidth: 600, mb: 4 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Category Tabs */}
        <Tabs
          value={selectedCategory}
          onChange={(_, newValue) => setSelectedCategory(newValue)}
          sx={{ mb: 4 }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {categories.map((category) => (
            <Tab
              key={category}
              label={category.charAt(0).toUpperCase() + category.slice(1)}
              value={category}
            />
          ))}
        </Tabs>

        {/* Products Grid */}
        <Grid container spacing={4}>
          {filteredProducts.map((product, index) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard 
                product={product} 
                index={index}
                listName={`Product List - ${selectedCategory}`}
              />
            </Grid>
          ))}
        </Grid>

        {/* No Results Message */}
        {filteredProducts.length === 0 && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No products found matching your criteria
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
};

export default HomePage; 
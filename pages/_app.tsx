import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import { CartProvider } from '../context/CartContext';
import Script from 'next/script';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { initializeDataLayer } from '../utils/dataLayer';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    background: {
      default: '#f5f7ff',
      paper: '#ffffff',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 4px 20px rgba(85, 108, 214, 0.15)',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initializeDataLayer();
  }, []);

  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <>
      <Head>
        <title>ShopHub - Your Premium Shopping Destination</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="Discover amazing products at great prices on ShopHub - your one-stop shop for quality items" />
        <meta name="theme-color" content="#556cd6" />
        <link rel="icon" href="/shophub/favicon.ico" />
      </Head>

      {/* Google Tag Manager */}
      {GTM_ID && (
        <>
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>

          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CartProvider>
          <Box 
            sx={{ 
              pt: '84px',
              minHeight: '100vh',
              background: 'linear-gradient(145deg, #f5f7ff 0%, #eef5f5 100%)',
            }}
          >
            <Component {...pageProps} />
          </Box>
        </CartProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp; 
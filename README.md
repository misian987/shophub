# ShopHub

A modern eCommerce website built with Next.js, TypeScript, and Material-UI.

## Features

- Responsive design with mobile-first approach
- Product catalog with search and category filtering
- Shopping cart functionality with real-time updates
- Multi-step checkout process
- DataLayer integration for analytics
- Beautiful UI with Material-UI components
- Enhanced product tracking with view_item_list and select_item events
- SEO-friendly with proper meta tags

## Technology Stack

- Next.js 13.5.8
- TypeScript 5.0.4
- Material-UI v5
- Context API for state management
- GitHub Pages for hosting
- Google Analytics 4 event tracking

## Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shophub.git
   cd shophub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000/shophub](http://localhost:3000/shophub) in your browser.

## Building for Production

1. Create a production build:
   ```bash
   npm run build
   ```

2. Test the production build locally:
   ```bash
   npm run start
   ```

## Deployment

The site is configured for GitHub Pages deployment:

1. Update `next.config.js` with your repository name:
   ```js
   basePath: '/your-repo-name',
   assetPrefix: '/your-repo-name/',
   ```

2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

3. Enable GitHub Pages in your repository settings:
   - Go to Settings > Pages
   - Set source to GitHub Actions

## Project Structure

```
shophub/
├── components/        # Reusable UI components
├── context/          # React Context providers
├── data/            # Static data and mock products
├── pages/           # Next.js pages and API routes
├── public/          # Static assets
├── styles/          # Global styles
└── utils/           # Helper functions and utilities
```

## Features in Detail

### Shopping Cart
- Add/remove items
- Update quantities
- Real-time total calculation
- Persistent cart state

### Checkout Process
1. Cart Review
2. Shipping Information
3. Payment Details
4. Order Confirmation

### Analytics Integration
- Page views tracking
- Product impressions
- Add to cart events
- Purchase events

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Material-UI for the beautiful components
- Next.js team for the amazing framework
- All contributors who help improve the project 
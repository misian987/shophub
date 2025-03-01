// DataLayer type definitions
interface DataLayerEvent {
  event: string;
  [key: string]: any;
}

declare global {
  interface Window {
    dataLayer: DataLayerEvent[];
  }
}

// Initialize dataLayer if it doesn't exist
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
}

// Push events to dataLayer
export const pushToDataLayer = (event: DataLayerEvent) => {
  if (typeof window !== 'undefined') {
    window.dataLayer.push(event);
  }
};

// Predefined event types
export const trackPageView = (pageTitle: string, pageUrl: string) => {
  pushToDataLayer({
    event: 'pageview',
    page: {
      title: pageTitle,
      url: pageUrl,
    },
  });
};

export const trackProductView = (product: {
  id: string;
  name: string;
  price: number;
  category: string;
}) => {
  pushToDataLayer({
    event: 'product_view',
    ecommerce: {
      detail: {
        products: [product],
      },
    },
  });
};

export const trackAddToCart = (product: {
  id: string;
  name: string;
  price: number;
  quantity: number;
}) => {
  pushToDataLayer({
    event: 'add_to_cart',
    ecommerce: {
      add: {
        products: [product],
      },
    },
  });
};

export const trackCheckoutStep = (step: number, stepName: string, options?: any) => {
  pushToDataLayer({
    event: 'checkout',
    ecommerce: {
      checkout: {
        actionField: { step, step_name: stepName },
        ...options,
      },
    },
  });
};

export const trackCheckoutOption = (step: number, stepName: string, option: string, value: string) => {
  pushToDataLayer({
    event: 'checkout_option',
    ecommerce: {
      checkout_option: {
        actionField: {
          step,
          step_name: stepName,
          option,
          value,
        },
      },
    },
  });
};

export const trackPurchase = (transaction: {
  id: string;
  revenue: number;
  tax: number;
  shipping: number;
  products: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}) => {
  pushToDataLayer({
    event: 'purchase',
    ecommerce: {
      purchase: {
        actionField: {
          id: transaction.id,
          revenue: transaction.revenue,
          tax: transaction.tax,
          shipping: transaction.shipping,
        },
        products: transaction.products,
      },
    },
  });
};

import { Product } from '../types';

export const trackViewItemList = (items: Array<{
  id: string;
  name: string;
  price: number;
  category: string;
}>, listName: string = 'Product List') => {
  pushToDataLayer({
    event: 'view_item_list',
    ecommerce: {
      item_list_name: listName,
      items: items.map((product, index) => ({
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.category,
        index: index + 1,
      })),
    },
  });
};

export const trackSelectItem = (product: {
  id: string;
  name: string;
  price: number;
  category: string;
}, index: number, listName: string = 'Product List') => {
  pushToDataLayer({
    event: 'select_item',
    ecommerce: {
      item_list_name: listName,
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.category,
        index: index + 1,
      }],
    },
  });
}; 
// DataLayer type definitions
interface DataLayerEvent {
  event: string;
  [key: string]: any;
}

declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Initialize dataLayer if it doesn't exist
export const initializeDataLayer = () => {
  window.dataLayer = window.dataLayer || [];
};

// Push events to dataLayer
export const pushToDataLayer = (event: DataLayerEvent) => {
  if (typeof window !== 'undefined') {
    window.dataLayer.push(event);
  }
};

// Predefined event types
export const trackPageView = (title: string, path: string) => {
  window.dataLayer.push({
    event: 'page_view',
    page_title: title,
    page_path: path,
  });
};

export const trackProductView = (product: {
  id: string;
  name: string;
  price: number;
  category: string;
}) => {
  window.dataLayer.push({
    event: 'view_item',
    ecommerce: {
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.category,
      }],
    },
  });
};

export const trackAddToCart = (product: {
  id: string;
  name: string;
  price: number;
}, quantity: number) => {
  window.dataLayer.push({
    event: 'add_to_cart',
    ecommerce: {
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        quantity: quantity,
      }],
    },
  });
};

export const trackRemoveFromCart = (product: {
  id: string;
  name: string;
  price: number;
}, quantity: number) => {
  window.dataLayer.push({
    event: 'remove_from_cart',
    ecommerce: {
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        quantity: quantity,
      }],
    },
  });
};

export const trackCheckoutStep = (step: number, name: string) => {
  window.dataLayer.push({
    event: 'checkout_progress',
    ecommerce: {
      checkout: {
        actionField: {
          step: step,
          option: name,
        },
      },
    },
  });
};

export const trackCheckoutOption = (step: number, checkoutOption: string, value: string) => {
  window.dataLayer.push({
    event: 'checkout_option',
    ecommerce: {
      checkout_option: {
        actionField: {
          step: step,
          option: checkoutOption,
          value: value,
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
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}) => {
  window.dataLayer.push({
    event: 'purchase',
    ecommerce: {
      transaction_id: transaction.id,
      value: transaction.revenue,
      tax: transaction.tax,
      shipping: transaction.shipping,
      currency: 'USD',
      items: transaction.items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
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
  window.dataLayer.push({
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
  window.dataLayer.push({
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
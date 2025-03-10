// DataLayer type definitions
interface DataLayerEvent {
  event: string;
  pr1: string;
  page_title?: string;
  page_path?: string;
  ecommerce?: {
    currency?: string;
    value?: number;
    items?: Array<{
      item_id: string;
      item_name: string;
      price: number;
      item_category: string;
      quantity?: number;
      index?: number;
      item_brand?: string;
      item_variant?: string;
      item_list_name?: string;
      item_list_id?: string;
      coupon?: string;
      discount?: number;
    }>;
    item_list_name?: string;
    item_list_id?: string;
    shipping_tier?: string;
    payment_type?: string;
    transaction_id?: string;
    tax?: number;
    shipping?: number;
    checkout_step?: number;
    checkout_option?: string;
  };
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

// Error handling wrapper for tracking functions
const trackSafely = <T extends (...args: any[]) => void>(
  trackingFunction: T,
  functionName: string
): T => {
  return ((...args: Parameters<T>) => {
    try {
      if (typeof window === 'undefined') {
        console.warn(`${functionName} called during SSR, skipping`);
        return;
      }
      if (!window.dataLayer) {
        console.error('DataLayer not initialized');
        initializeDataLayer();
      }
      trackingFunction(...args);
    } catch (error) {
      console.error(`Error in ${functionName}:`, error);
      // You might want to send this error to your error tracking service
    }
  }) as T;
};

// Push events to dataLayer
export const pushToDataLayer = trackSafely((event: DataLayerEvent) => {
  window.dataLayer.push({
    ...event,
    pr1: event.event // Ensure pr1 matches event name
  });
}, 'pushToDataLayer');

// Wrap all tracking functions with error handling
export const trackPageView = trackSafely((title: string, path: string) => {
  window.dataLayer.push({
    event: 'page_view',
    pr1: 'page_view',
    page_title: title,
    page_path: path
  });
}, 'trackPageView');

// E-commerce Events
export const trackViewItem = trackSafely((product: {
  id: string;
  name: string;
  price: number;
  category: string;
  currency?: string;
  quantity?: number;
  index?: number;
  brand?: string;
  variant?: string;
  list_name?: string;
  list_id?: string;
}) => {
  window.dataLayer.push({
    event: 'view_item',
    pr1: 'view_item',
    ecommerce: {
      currency: product.currency || 'USD',
      value: product.price * (product.quantity || 1),
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.category,
        quantity: product.quantity || 1,
        index: product.index,
        item_brand: product.brand,
        item_variant: product.variant,
        item_list_name: product.list_name,
        item_list_id: product.list_id,
      }],
    },
  });
}, 'trackViewItem');

export const trackViewItemList = trackSafely((items: Array<{
  id: string;
  name: string;
  price: number;
  category: string;
  quantity?: number;
  index?: number;
  brand?: string;
  variant?: string;
}>, listName: string = 'Product List', listId?: string) => {
  window.dataLayer.push({
    event: 'view_item_list',
    pr1: 'view_item_list',
    ecommerce: {
      item_list_name: listName,
      item_list_id: listId,
      items: items.map((product, index) => ({
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.category,
        quantity: product.quantity || 1,
        index: index + 1,
        item_brand: product.brand,
        item_variant: product.variant,
      })),
    },
  });
}, 'trackViewItemList');

export const trackSelectItem = trackSafely((product: {
  id: string;
  name: string;
  price: number;
  category: string;
  quantity?: number;
  index?: number;
  brand?: string;
  variant?: string;
}, listName: string = 'Product List', listId?: string) => {
  window.dataLayer.push({
    event: 'select_item',
    pr1: 'select_item',
    ecommerce: {
      item_list_name: listName,
      item_list_id: listId,
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.category,
        quantity: product.quantity || 1,
        index: product.index,
        item_brand: product.brand,
        item_variant: product.variant,
      }],
    },
  });
}, 'trackSelectItem');

export const trackAddToCart = trackSafely((product: {
  id: string;
  name: string;
  price: number;
  category: string;
  currency?: string;
  quantity?: number;
  brand?: string;
  variant?: string;
  coupon?: string;
  discount?: number;
}) => {
  window.dataLayer.push({
    event: 'add_to_cart',
    pr1: 'add_to_cart',
    ecommerce: {
      currency: product.currency || 'USD',
      value: product.price * (product.quantity || 1),
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.category,
        quantity: product.quantity || 1,
        item_brand: product.brand,
        item_variant: product.variant,
        coupon: product.coupon,
        discount: product.discount,
      }],
    },
  });
}, 'trackAddToCart');

export const trackRemoveFromCart = trackSafely((product: {
  id: string;
  name: string;
  price: number;
  category: string;
  currency?: string;
  quantity?: number;
  brand?: string;
  variant?: string;
}) => {
  window.dataLayer.push({
    event: 'remove_from_cart',
    pr1: 'remove_from_cart',
    ecommerce: {
      currency: product.currency || 'USD',
      value: product.price * (product.quantity || 1),
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.category,
        quantity: product.quantity || 1,
        item_brand: product.brand,
        item_variant: product.variant,
      }],
    },
  });
}, 'trackRemoveFromCart');

export const trackBeginCheckout = trackSafely((items: Array<{
  id: string;
  name: string;
  price: number;
  category: string;
  quantity?: number;
  brand?: string;
  variant?: string;
  coupon?: string;
  discount?: number;
}>, currency: string = 'USD') => {
  const value = items.reduce((total, item) => 
    total + (item.price * (item.quantity || 1)), 0
  );

  window.dataLayer.push({
    event: 'begin_checkout',
    pr1: 'begin_checkout',
    ecommerce: {
      currency,
      value,
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        item_category: item.category,
        quantity: item.quantity || 1,
        item_brand: item.brand,
        item_variant: item.variant,
        coupon: item.coupon,
        discount: item.discount,
      })),
    },
  });
}, 'trackBeginCheckout');

export const trackAddShippingInfo = trackSafely((items: Array<{
  id: string;
  name: string;
  price: number;
  category: string;
  quantity?: number;
  brand?: string;
  variant?: string;
}>, shippingTier: string, currency: string = 'USD') => {
  const value = items.reduce((total, item) => 
    total + (item.price * (item.quantity || 1)), 0
  );

  window.dataLayer.push({
    event: 'add_shipping_info',
    pr1: 'add_shipping_info',
    ecommerce: {
      currency,
      value,
      shipping_tier: shippingTier,
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        item_category: item.category,
        quantity: item.quantity || 1,
        item_brand: item.brand,
        item_variant: item.variant,
      })),
    },
  });
}, 'trackAddShippingInfo');

export const trackAddPaymentInfo = trackSafely((items: Array<{
  id: string;
  name: string;
  price: number;
  category: string;
  quantity?: number;
  brand?: string;
  variant?: string;
  coupon?: string;
  discount?: number;
}>, paymentType: string, currency: string = 'USD') => {
  const value = items.reduce((total, item) => 
    total + (item.price * (item.quantity || 1)), 0
  );

  window.dataLayer.push({
    event: 'add_payment_info',
    pr1: 'add_payment_info',
    ecommerce: {
      currency,
      value,
      payment_type: paymentType,
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        item_category: item.category,
        quantity: item.quantity || 1,
        item_brand: item.brand,
        item_variant: item.variant,
        coupon: item.coupon,
        discount: item.discount,
      })),
    },
  });
}, 'trackAddPaymentInfo');

export const trackPurchase = trackSafely((transaction: {
  id: string;
  revenue: number;
  tax: number;
  shipping: number;
  currency?: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    category: string;
    quantity?: number;
    brand?: string;
    variant?: string;
    coupon?: string;
    discount?: number;
  }>;
}) => {
  window.dataLayer.push({
    event: 'purchase',
    pr1: 'purchase',
    ecommerce: {
      transaction_id: transaction.id,
      value: transaction.revenue,
      tax: transaction.tax,
      shipping: transaction.shipping,
      currency: transaction.currency || 'USD',
      items: transaction.items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        item_category: item.category,
        quantity: item.quantity || 1,
        item_brand: item.brand,
        item_variant: item.variant,
        coupon: item.coupon,
        discount: item.discount,
      })),
    },
  });
}, 'trackPurchase');

export const trackViewPromotion = trackSafely((promotion: {
  id: string;
  name: string;
  creative_name?: string;
  creative_slot?: string;
  items?: Array<{
    id: string;
    name: string;
    price: number;
    category: string;
    quantity?: number;
    brand?: string;
    variant?: string;
  }>;
}) => {
  window.dataLayer.push({
    event: 'view_promotion',
    pr1: 'view_promotion',
    ecommerce: {
      promotion_id: promotion.id,
      promotion_name: promotion.name,
      creative_name: promotion.creative_name,
      creative_slot: promotion.creative_slot,
      items: promotion.items?.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        item_category: item.category,
        quantity: item.quantity || 1,
        item_brand: item.brand,
        item_variant: item.variant,
      })),
    },
  });
}, 'trackViewPromotion');

export const trackSelectPromotion = trackSafely((promotion: {
  id: string;
  name: string;
  creative_name?: string;
  creative_slot?: string;
  items?: Array<{
    id: string;
    name: string;
    price: number;
    category: string;
    quantity?: number;
    brand?: string;
    variant?: string;
  }>;
}) => {
  window.dataLayer.push({
    event: 'select_promotion',
    pr1: 'select_promotion',
    ecommerce: {
      promotion_id: promotion.id,
      promotion_name: promotion.name,
      creative_name: promotion.creative_name,
      creative_slot: promotion.creative_slot,
      items: promotion.items?.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        item_category: item.category,
        quantity: item.quantity || 1,
        item_brand: item.brand,
        item_variant: item.variant,
      })),
    },
  });
}, 'trackSelectPromotion');

export const trackCheckoutStep = trackSafely((step: number, stepName: string) => {
  window.dataLayer.push({
    event: 'checkout_progress',
    pr1: 'checkout_progress',
    ecommerce: {
      checkout_step: step,
      checkout_option: stepName
    }
  });
}, 'trackCheckoutStep');

export const trackCheckoutOption = trackSafely((step: number, option: string) => {
  window.dataLayer.push({
    event: 'checkout_option',
    pr1: 'checkout_option',
    ecommerce: {
      checkout_step: step,
      checkout_option: option
    }
  });
}, 'trackCheckoutOption'); 
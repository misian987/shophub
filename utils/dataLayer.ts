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

// E-commerce Events
export const trackViewItem = (product: {
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
};

export const trackViewItemList = (items: Array<{
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
};

export const trackSelectItem = (product: {
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
};

export const trackAddToCart = (product: {
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
};

export const trackRemoveFromCart = (product: {
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
};

export const trackBeginCheckout = (items: Array<{
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
};

export const trackAddShippingInfo = (items: Array<{
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
};

export const trackAddPaymentInfo = (items: Array<{
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
};

export const trackPurchase = (transaction: {
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
};

export const trackViewPromotion = (promotion: {
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
};

export const trackSelectPromotion = (promotion: {
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
}; 
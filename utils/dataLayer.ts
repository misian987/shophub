// DataLayer type definitions
interface DataLayerEvent {
  event: string;
  pr1?: string;  // Making pr1 optional as it's not needed for GA4
  page_title?: string;
  page_path?: string;
  ecommerce?: {
    currency?: string;
    value?: number;
    items: Array<{
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
  // Clear previous ecommerce data
  window.dataLayer.push({ ecommerce: null });
  
  window.dataLayer.push(event);
}, 'pushToDataLayer');

// Wrap all tracking functions with error handling
export const trackPageView = trackSafely((title: string, path: string) => {
  // Clear previous ecommerce data
  window.dataLayer.push({ ecommerce: null });
  
  window.dataLayer.push({
    event: 'page_view',
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
  affiliation?: string;
  coupon?: string;
  discount?: number;
  item_category2?: string;
  item_category3?: string;
  item_category4?: string;
  item_category5?: string;
  location_id?: string;
}) => {
  // Clear previous ecommerce data
  window.dataLayer.push({ ecommerce: null });

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
        item_category2: product.item_category2,
        item_category3: product.item_category3,
        item_category4: product.item_category4,
        item_category5: product.item_category5,
        quantity: product.quantity || 1,
        index: product.index,
        item_brand: product.brand,
        item_variant: product.variant,
        item_list_name: product.list_name,
        item_list_id: product.list_id,
        affiliation: product.affiliation,
        coupon: product.coupon,
        discount: product.discount,
        location_id: product.location_id
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
  item_category2?: string;
  item_category3?: string;
  item_category4?: string;
  item_category5?: string;
  affiliation?: string;
  coupon?: string;
  discount?: number;
  location_id?: string;
}>, listName: string = 'Product List', listId?: string) => {
  // Clear previous ecommerce data
  window.dataLayer.push({ ecommerce: null });

  // Calculate total value of items
  const value = items.reduce((total, item) => 
    total + (item.price * (item.quantity || 1)), 0
  );

  window.dataLayer.push({
    event: 'view_item_list',
    ecommerce: {
      currency: 'USD',
      value,
      item_list_id: listId,
      item_list_name: listName,
      items: items.map((product, index) => ({
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.category,
        item_category2: product.item_category2,
        item_category3: product.item_category3,
        item_category4: product.item_category4,
        item_category5: product.item_category5,
        quantity: product.quantity || 1,
        index: index + 1,
        item_brand: product.brand,
        item_variant: product.variant,
        affiliation: product.affiliation,
        coupon: product.coupon,
        discount: product.discount,
        item_list_id: listId,
        item_list_name: listName
      }))
    }
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
  item_category2?: string;
  item_category3?: string;
  item_category4?: string;
  item_category5?: string;
  affiliation?: string;
  coupon?: string;
  discount?: number;
  location_id?: string;
  promotion_id?: string;
  promotion_name?: string;
  creative_name?: string;
  creative_slot?: string;
}, listName: string = 'Product List', listId?: string) => {
  // Clear previous ecommerce data
  window.dataLayer.push({ ecommerce: null });

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
        item_category2: product.item_category2,
        item_category3: product.item_category3,
        item_category4: product.item_category4,
        item_category5: product.item_category5,
        quantity: product.quantity || 1,
        index: product.index,
        item_brand: product.brand,
        item_variant: product.variant,
        affiliation: product.affiliation,
        coupon: product.coupon,
        discount: product.discount,
        location_id: product.location_id,
        promotion_id: product.promotion_id,
        promotion_name: product.promotion_name,
        creative_name: product.creative_name,
        creative_slot: product.creative_slot
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
  item_category2?: string;
  item_category3?: string;
  item_category4?: string;
  item_category5?: string;
  item_list_name?: string;
  item_list_id?: string;
  affiliation?: string;
  location_id?: string;
  creative_name?: string;
  creative_slot?: string;
  promotion_id?: string;
  promotion_name?: string;
}) => {
  // Clear previous ecommerce data
  window.dataLayer.push({ ecommerce: null });

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
        item_category2: product.item_category2,
        item_category3: product.item_category3,
        item_category4: product.item_category4,
        item_category5: product.item_category5,
        quantity: product.quantity || 1,
        item_brand: product.brand,
        item_variant: product.variant,
        item_list_name: product.item_list_name,
        item_list_id: product.item_list_id,
        affiliation: product.affiliation,
        coupon: product.coupon,
        discount: product.discount,
        location_id: product.location_id,
        creative_name: product.creative_name,
        creative_slot: product.creative_slot,
        promotion_id: product.promotion_id,
        promotion_name: product.promotion_name
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
  item_category2?: string;
  item_category3?: string;
  item_category4?: string;
  item_category5?: string;
  item_list_name?: string;
  item_list_id?: string;
  affiliation?: string;
  location_id?: string;
  coupon?: string;
  discount?: number;
}) => {
  // Clear previous ecommerce data
  window.dataLayer.push({ ecommerce: null });

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
        item_category2: product.item_category2,
        item_category3: product.item_category3,
        item_category4: product.item_category4,
        item_category5: product.item_category5,
        quantity: product.quantity || 1,
        item_brand: product.brand,
        item_variant: product.variant,
        item_list_name: product.item_list_name,
        item_list_id: product.item_list_id,
        affiliation: product.affiliation,
        coupon: product.coupon,
        discount: product.discount,
        location_id: product.location_id
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
  item_category2?: string;
  item_category3?: string;
  item_category4?: string;
  item_category5?: string;
  item_list_name?: string;
  item_list_id?: string;
  affiliation?: string;
  location_id?: string;
}>, currency: string = 'USD') => {
  // Clear previous ecommerce data
  window.dataLayer.push({ ecommerce: null });

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
        item_category2: item.item_category2,
        item_category3: item.item_category3,
        item_category4: item.item_category4,
        item_category5: item.item_category5,
        quantity: item.quantity || 1,
        item_brand: item.brand,
        item_variant: item.variant,
        item_list_name: item.item_list_name,
        item_list_id: item.item_list_id,
        affiliation: item.affiliation,
        coupon: item.coupon,
        discount: item.discount,
        location_id: item.location_id
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
  item_category2?: string;
  item_category3?: string;
  item_category4?: string;
  item_category5?: string;
  item_list_name?: string;
  item_list_id?: string;
  affiliation?: string;
  location_id?: string;
  coupon?: string;
  discount?: number;
}>, shippingTier: string, currency: string = 'USD', coupon?: string) => {
  // Clear previous ecommerce data
  window.dataLayer.push({ ecommerce: null });

  const value = items.reduce((total, item) => 
    total + (item.price * (item.quantity || 1)), 0
  );

  window.dataLayer.push({
    event: 'add_shipping_info',
    ecommerce: {
      currency,
      value,
      shipping_tier: shippingTier,
      coupon,
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        item_category: item.category,
        item_category2: item.item_category2,
        item_category3: item.item_category3,
        item_category4: item.item_category4,
        item_category5: item.item_category5,
        quantity: item.quantity || 1,
        item_brand: item.brand,
        item_variant: item.variant,
        item_list_name: item.item_list_name,
        item_list_id: item.item_list_id,
        affiliation: item.affiliation,
        coupon: item.coupon,
        discount: item.discount,
        location_id: item.location_id
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
  // Clear previous ecommerce data
  window.dataLayer.push({ ecommerce: null });

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
}, 'trackAddPaymentInfo');

export const trackPurchase = trackSafely((transaction: {
  id: string;
  revenue: number;
  tax: number;
  shipping: number;
  currency?: string;
  coupon?: string;
  affiliation?: string;
  shipping_tier?: string;
  payment_type?: string;
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
    item_category2?: string;
    item_category3?: string;
    item_category4?: string;
    item_category5?: string;
    item_list_name?: string;
    item_list_id?: string;
    affiliation?: string;
    location_id?: string;
  }>;
}) => {
  // Clear previous ecommerce data
  window.dataLayer.push({ ecommerce: null });

  window.dataLayer.push({
    event: 'purchase',
    ecommerce: {
      transaction_id: transaction.id,
      value: transaction.revenue,
      tax: transaction.tax,
      shipping: transaction.shipping,
      currency: transaction.currency || 'USD',
      coupon: transaction.coupon,
      affiliation: transaction.affiliation,
      shipping_tier: transaction.shipping_tier,
      payment_type: transaction.payment_type,
      items: transaction.items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        item_category: item.category,
        item_category2: item.item_category2,
        item_category3: item.item_category3,
        item_category4: item.item_category4,
        item_category5: item.item_category5,
        quantity: item.quantity || 1,
        item_brand: item.brand,
        item_variant: item.variant,
        item_list_name: item.item_list_name,
        item_list_id: item.item_list_id,
        affiliation: item.affiliation,
        coupon: item.coupon,
        discount: item.discount,
        location_id: item.location_id
      })),
    },
  });
}, 'trackPurchase');

export const trackViewPromotion = trackSafely((promotion: {
  id: string;
  name: string;
  creative_name?: string;
  creative_slot?: string;
  location_id?: string;
  items?: Array<{
    id: string;
    name: string;
    price: number;
    category: string;
    quantity?: number;
    brand?: string;
    variant?: string;
    item_category2?: string;
    item_category3?: string;
    item_category4?: string;
    item_category5?: string;
    item_list_name?: string;
    item_list_id?: string;
    affiliation?: string;
    coupon?: string;
    discount?: number;
    location_id?: string;
  }>;
}) => {
  // Clear previous ecommerce data
  window.dataLayer.push({ ecommerce: null });

  window.dataLayer.push({
    event: 'view_promotion',
    ecommerce: {
      promotion_id: promotion.id,
      promotion_name: promotion.name,
      creative_name: promotion.creative_name,
      creative_slot: promotion.creative_slot,
      location_id: promotion.location_id,
      items: promotion.items?.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        item_category: item.category,
        item_category2: item.item_category2,
        item_category3: item.item_category3,
        item_category4: item.item_category4,
        item_category5: item.item_category5,
        quantity: item.quantity || 1,
        item_brand: item.brand,
        item_variant: item.variant,
        item_list_name: item.item_list_name,
        item_list_id: item.item_list_id,
        affiliation: item.affiliation,
        coupon: item.coupon,
        discount: item.discount,
        location_id: item.location_id
      })),
    },
  });
}, 'trackViewPromotion');

export const trackSelectPromotion = trackSafely((promotion: {
  id: string;
  name: string;
  creative_name?: string;
  creative_slot?: string;
  location_id?: string;
  items?: Array<{
    id: string;
    name: string;
    price: number;
    category: string;
    quantity?: number;
    brand?: string;
    variant?: string;
    item_category2?: string;
    item_category3?: string;
    item_category4?: string;
    item_category5?: string;
    item_list_name?: string;
    item_list_id?: string;
    affiliation?: string;
    coupon?: string;
    discount?: number;
    location_id?: string;
  }>;
}) => {
  // Clear previous ecommerce data
  window.dataLayer.push({ ecommerce: null });

  window.dataLayer.push({
    event: 'select_promotion',
    ecommerce: {
      promotion_id: promotion.id,
      promotion_name: promotion.name,
      creative_name: promotion.creative_name,
      creative_slot: promotion.creative_slot,
      location_id: promotion.location_id,
      items: promotion.items?.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        item_category: item.category,
        item_category2: item.item_category2,
        item_category3: item.item_category3,
        item_category4: item.item_category4,
        item_category5: item.item_category5,
        quantity: item.quantity || 1,
        item_brand: item.brand,
        item_variant: item.variant,
        item_list_name: item.item_list_name,
        item_list_id: item.item_list_id,
        affiliation: item.affiliation,
        coupon: item.coupon,
        discount: item.discount,
        location_id: item.location_id
      })),
    },
  });
}, 'trackSelectPromotion');

export const trackCheckoutStep = trackSafely((step: number, stepName: string) => {
  // Clear previous ecommerce data
  window.dataLayer.push({ ecommerce: null });

  window.dataLayer.push({
    event: 'checkout_progress',
    ecommerce: {
      checkout_step: step,
      checkout_option: stepName
    }
  });
}, 'trackCheckoutStep');

export const trackCheckoutOption = trackSafely((step: number, option: string) => {
  // Clear previous ecommerce data
  window.dataLayer.push({ ecommerce: null });

  window.dataLayer.push({
    event: 'checkout_option',
    ecommerce: {
      checkout_step: step,
      checkout_option: option
    }
  });
}, 'trackCheckoutOption'); 
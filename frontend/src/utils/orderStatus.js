/** Canonical order lifecycle (plus legacy DB values). */
export const ORDER_STATUS_LABELS = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  shipped: 'Shipped',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  paid: 'Paid (legacy)',
  packed: 'Packed (legacy)',
  returned: 'Returned',
  refunded: 'Refunded'
};

export const USER_STATUS_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'out_for_delivery', label: 'Out for delivery' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' }
];

export const STATUS_BADGE_CLASS = {
  pending: 'bg-amber-100 text-amber-900',
  confirmed: 'bg-sky-100 text-sky-900',
  paid: 'bg-blue-100 text-blue-800',
  packed: 'bg-indigo-100 text-indigo-800',
  shipped: 'bg-violet-100 text-violet-900',
  out_for_delivery: 'bg-fuchsia-100 text-fuchsia-900',
  delivered: 'bg-emerald-100 text-emerald-900',
  cancelled: 'bg-red-100 text-red-800',
  returned: 'bg-gray-100 text-gray-800',
  refunded: 'bg-gray-100 text-gray-800'
};

export function labelOrderStatus(status) {
  if (!status) return '—';
  return ORDER_STATUS_LABELS[status] || status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function paymentMethodLabel(method) {
  const m = {
    cod: 'Cash on Delivery (COD)',
    upi: 'UPI',
    card: 'Card',
    netbanking: 'Net banking',
    emi: 'EMI'
  };
  return m[method] || method || '—';
}

/** Ordered steps for timeline (excluding cancelled). */
export const SHIPPING_PIPELINE = ['pending', 'confirmed', 'shipped', 'out_for_delivery', 'delivered'];

export function pipelineIndex(status) {
  if (!status) return -1;
  if (status === 'paid' || status === 'packed') return 1;
  const i = SHIPPING_PIPELINE.indexOf(status);
  return i;
}

const SELLER_PIPELINE = ['pending', 'confirmed', 'shipped', 'out_for_delivery', 'delivered'];

function sellerNormalize(s) {
  if (s === 'paid') return 'pending';
  if (s === 'packed') return 'shipped';
  return s;
}

function sellerPipelineIndex(s) {
  const n = sellerNormalize(s);
  const i = SELLER_PIPELINE.indexOf(n);
  return i >= 0 ? i : 0;
}

/** Hindi labels for seller-facing dropdowns */
export const ORDER_STATUS_LABELS_HI = {
  pending: 'लंबित',
  confirmed: 'पुष्टि',
  shipped: 'शिप्ड',
  out_for_delivery: 'आउट फॉर डिलीवरी',
  delivered: 'डिलीवर्ड',
  cancelled: 'रद्द'
};

export function labelOrderStatusBilingual(status) {
  const en = labelOrderStatus(status);
  const hi = ORDER_STATUS_LABELS_HI[status];
  return hi ? `${en} (${hi})` : en;
}

/**
 * Forward fulfilment statuses + cancel (seller can jump to any later stage).
 * Matches backend pipeline rules.
 */
export function getSellerSelectableStatuses(current) {
  if (!current || current === 'delivered' || current === 'cancelled') return [];
  const idx = sellerPipelineIndex(current);
  const out = [];
  for (let j = idx + 1; j < SELLER_PIPELINE.length; j++) {
    out.push(SELLER_PIPELINE[j]);
  }
  out.push('cancelled');
  return out;
}

export const ADMIN_STATUS_OPTIONS = [
  'pending',
  'confirmed',
  'paid',
  'packed',
  'shipped',
  'out_for_delivery',
  'delivered',
  'cancelled',
  'returned',
  'refunded'
];

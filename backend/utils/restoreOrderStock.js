import Product from '../models/Product.model.js';

/**
 * Put quantities back into catalog when an order is cancelled.
 * @param {import('mongoose').Document} orderDoc Order with items[].product and items[].quantity
 */
export default async function restoreOrderStock(orderDoc) {
  const items = orderDoc.items || [];
  for (const item of items) {
    const pid = item.product?._id || item.product;
    if (!pid) continue;
    await Product.findByIdAndUpdate(pid, {
      $inc: { stock: item.quantity, sales: -item.quantity }
    });
  }
}

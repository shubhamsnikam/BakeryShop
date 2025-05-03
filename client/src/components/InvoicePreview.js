import React, { forwardRef } from 'react';

const InvoicePreview = forwardRef(({ customer = {}, saleItems = [], products = [], invoiceNo = '',totalAmount = 0  }, ref) => {
  const total = saleItems.reduce((sum, item) => {
    const product = products.find(p => p._id === item.product);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const currentDate = new Date().toLocaleDateString();

  return (
    <div ref={ref} className="invoice-print border p-4 bg-white" style={{ width: '100%', fontFamily: 'Arial', color: '#000' }}>
      {/* Company Header */}
      <div className="text-center mb-4">
        <img src="/logo.png" alt="Bakery Logo" style={{ height: '80px' }} />
        <h3 className="mt-2">इंद्रायणी बेकर्स, स्वीट्स अँड बेकर्स</h3>
        <p>123 Main Street, Sangli | Contact: 9209312828</p>
        <hr />
      </div>

      {/* Invoice Details */}
      <div className="d-flex justify-content-between mb-3">
        <div>
          <strong>Customer:</strong> {customer.name || '-'}<br />
          <strong>Contact:</strong> {customer.contact || '-'}
        </div>
        <div>
          <strong>Date:</strong> {currentDate}<br />
          <strong>Invoice No:</strong> {invoiceNo || '-'}
        </div>
      </div>

      {/* Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {saleItems.map(item => {
            const product = products.find(p => p._id === item.product);
            if (!product) return null;
            return (
              <tr key={item.product}>
                <td>{product.name}</td>
                <td>{item.quantity}</td>
                <td>₹{product.price.toFixed(2)}</td>
                <td>₹{(product.price * item.quantity).toFixed(2)}</td>
              </tr>
            );
          })}
          <tr className="fw-bold">
            <td colSpan="3">Total Amount</td>
            <td>₹{total.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <p className="text-center mt-4">Thank you for shopping with us!</p>
    </div>
  );
});

export default InvoicePreview;

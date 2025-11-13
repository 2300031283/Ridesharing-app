import { useState, useEffect } from 'react';
import './PaymentsPage.css';

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    filterPayments();
  }, [payments, statusFilter, typeFilter]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/payments');
      const data = await response.json();

      if (data.status === 'success') {
        // Fetch booking details for each payment to get ride info
        const paymentsWithDetails = await Promise.all(
          data.data.map(async (payment) => {
            try {
              const bookingRes = await fetch(`http://localhost:8080/api/bookings`);
              const bookingData = await bookingRes.json();
              if (bookingData.status === 'success') {
                const booking = bookingData.data.find(b => b.id === payment.bookingId);
                return {
                  ...payment,
                  booking: booking,
                  rideDetails: booking?.ride || {}
                };
              }
            } catch (err) {
              console.error('Error fetching booking details:', err);
            }
            return payment;
          })
        );
        setPayments(paymentsWithDetails);
        setError('');
      } else {
        setError(data.message || 'Failed to fetch payments');
      }
    } catch (err) {
      console.error('Error fetching payments:', err);
      setError('Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  };

  const filterPayments = () => {
    let filtered = payments;

    if (statusFilter) {
      filtered = filtered.filter(p => p.paymentStatus === statusFilter);
    }

    if (typeFilter) {
      filtered = filtered.filter(p => p.paymentType === typeFilter);
    }

    setFilteredPayments(filtered);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      'PENDING': '#FFA500',
      'COMPLETED': '#4CAF50',
      'FAILED': '#F44336',
      'REFUNDED': '#2196F3'
    };
    return (
      <span className="status-badge" style={{ backgroundColor: statusColors[status] || '#999' }}>
        {status}
      </span>
    );
  };

  return (
    <div className="payments-page">
      <h1>Payments</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="filters">
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
          <option value="FAILED">Failed</option>
          <option value="REFUNDED">Refunded</option>
        </select>

        <select 
          value={typeFilter} 
          onChange={(e) => setTypeFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Types</option>
          <option value="RIDE_FARE">Ride Fare</option>
          <option value="DEPOSIT">Deposit</option>
          <option value="REFUND">Refund</option>
        </select>
      </div>

      {loading ? (
        <p className="loading">Loading payments...</p>
      ) : filteredPayments.length === 0 ? (
        <p className="no-data">No payments found</p>
      ) : (
        <div className="payments-list">
          {filteredPayments.map((payment) => (
            <div key={payment.id} className="payment-card">
              <div className="payment-header">
                <div>
                  <h3>Payment #{payment.id}</h3>
                  <p className="ride-info">
                    {payment.rideDetails?.from_location} → {payment.rideDetails?.to_location}
                  </p>
                </div>
                {getStatusBadge(payment.paymentStatus)}
              </div>

              <div className="payment-details">
                <div className="detail-row">
                  <span className="label">Amount:</span>
                  <span className="value">₹{payment.amount?.toFixed(2)}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Type:</span>
                  <span className="value">{payment.paymentType}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Method:</span>
                  <span className="value">{payment.paymentMethod}</span>
                </div>
                {payment.transactionId && (
                  <div className="detail-row">
                    <span className="label">Transaction ID:</span>
                    <span className="value">{payment.transactionId}</span>
                  </div>
                )}
                <div className="detail-row">
                  <span className="label">Date:</span>
                  <span className="value">{formatDate(payment.createdAt)}</span>
                </div>
                {payment.rideDetails && (
                  <>
                    <div className="detail-row">
                      <span className="label">Ride Name:</span>
                      <span className="value">{payment.rideDetails.name}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Ride Price:</span>
                      <span className="value">₹{payment.rideDetails.price?.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

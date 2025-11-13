import { useState, useEffect } from 'react';
import './RefundsPage.css';

export default function RefundsPage() {
  const [refunds, setRefunds] = useState([]);
  const [filteredRefunds, setFilteredRefunds] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [reasonFilter, setReasonFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRefunds();
  }, []);

  useEffect(() => {
    filterRefunds();
  }, [refunds, statusFilter, reasonFilter]);

  const fetchRefunds = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/refunds');
      const data = await response.json();

      if (data.status === 'success') {
        setRefunds(data.data);
        setError('');
      } else {
        setError(data.message || 'Failed to fetch refunds');
      }
    } catch (err) {
      console.error('Error fetching refunds:', err);
      setError('Failed to fetch refunds');
    } finally {
      setLoading(false);
    }
  };

  const filterRefunds = () => {
    let filtered = refunds;

    if (statusFilter) {
      filtered = filtered.filter(r => r.refundStatus === statusFilter);
    }

    if (reasonFilter) {
      filtered = filtered.filter(r => r.refundReason.includes(reasonFilter));
    }

    setFilteredRefunds(filtered);
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
      'FAILED': '#F44336'
    };
    return (
      <span className="status-badge" style={{ backgroundColor: statusColors[status] || '#999' }}>
        {status}
      </span>
    );
  };

  const uniqueReasons = [...new Set(refunds.map(r => r.refundReason))];

  return (
    <div className="refunds-page">
      <h1>Refunds</h1>

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
        </select>

        <select 
          value={reasonFilter} 
          onChange={(e) => setReasonFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Reasons</option>
          {uniqueReasons.map((reason, idx) => (
            <option key={idx} value={reason}>
              {reason}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="loading">Loading refunds...</p>
      ) : filteredRefunds.length === 0 ? (
        <p className="no-data">No refunds found</p>
      ) : (
        <div className="refunds-list">
          {filteredRefunds.map((refund) => (
            <div key={refund.id} className="refund-card">
              <div className="refund-header">
                <div>
                  <h3>Refund #{refund.id}</h3>
                  <p className="ride-info">
                    {refund.rideDetails?.from_location} → {refund.rideDetails?.to_location}
                  </p>
                </div>
                {getStatusBadge(refund.refundStatus)}
              </div>

              <div className="refund-details">
                <div className="detail-row">
                  <span className="label">Amount:</span>
                  <span className="value">₹{refund.refundAmount?.toFixed(2)}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Reason:</span>
                  <span className="value">{refund.refundReason}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Method:</span>
                  <span className="value">{refund.refundMethod}</span>
                </div>
                {refund.transactionId && (
                  <div className="detail-row">
                    <span className="label">Transaction ID:</span>
                    <span className="value">{refund.transactionId}</span>
                  </div>
                )}
                <div className="detail-row">
                  <span className="label">Status:</span>
                  <span className="value">{refund.refundStatus}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Date:</span>
                  <span className="value">{formatDate(refund.createdAt)}</span>
                </div>
                {refund.rideDetails && (
                  <>
                    <div className="detail-row">
                      <span className="label">Ride Name:</span>
                      <span className="value">{refund.rideDetails.name}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Ride Price:</span>
                      <span className="value">₹{refund.rideDetails.price?.toFixed(2)}</span>
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

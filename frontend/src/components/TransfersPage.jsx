import { useState, useEffect } from 'react';
import './TransfersPage.css';

export default function TransfersPage() {
  const [transfers, setTransfers] = useState([]);
  const [filteredTransfers, setFilteredTransfers] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState(''); // 'sent' or 'received'
  const [userFilter, setUserFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTransfers();
  }, []);

  useEffect(() => {
    filterTransfers();
  }, [transfers, statusFilter, typeFilter, userFilter]);

  const fetchTransfers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/transfers');
      const data = await response.json();

      if (data.status === 'success') {
        setTransfers(data.data);
        setError('');
      } else {
        setError(data.message || 'Failed to fetch transfers');
      }
    } catch (err) {
      console.error('Error fetching transfers:', err);
      setError('Failed to fetch transfers');
    } finally {
      setLoading(false);
    }
  };

  const filterTransfers = () => {
    let filtered = transfers;

    if (statusFilter) {
      filtered = filtered.filter(t => t.transferStatus === statusFilter);
    }

    if (typeFilter === 'sent') {
      filtered = filtered.filter(t => t.fromUser === userFilter || !userFilter);
    } else if (typeFilter === 'received') {
      filtered = filtered.filter(t => t.toUser === userFilter || !userFilter);
    }

    setFilteredTransfers(filtered);
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

  const getDirectionBadge = (fromUser, toUser) => {
    const currentUser = userFilter || 'User';
    if (fromUser === currentUser) {
      return <span className="direction-badge sent">Sent</span>;
    } else if (toUser === currentUser) {
      return <span className="direction-badge received">Received</span>;
    }
    return null;
  };

  return (
    <div className="transfers-page">
      <h1>Transfers</h1>

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
          value={typeFilter} 
          onChange={(e) => setTypeFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Transfers</option>
          <option value="sent">Sent</option>
          <option value="received">Received</option>
        </select>

        <input 
          type="text"
          placeholder="Filter by user..."
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
          className="filter-input"
        />
      </div>

      {loading ? (
        <p className="loading">Loading transfers...</p>
      ) : filteredTransfers.length === 0 ? (
        <p className="no-data">No transfers found</p>
      ) : (
        <div className="transfers-list">
          {filteredTransfers.map((transfer) => (
            <div key={transfer.id} className="transfer-card">
              <div className="transfer-header">
                <div>
                  <h3>Transfer #{transfer.id}</h3>
                  <p className="transfer-route">
                    {transfer.fromUser} → {transfer.toUser}
                  </p>
                </div>
                <div className="badges">
                  {getDirectionBadge(transfer.fromUser, transfer.toUser)}
                  {getStatusBadge(transfer.transferStatus)}
                </div>
              </div>

              <div className="transfer-details">
                <div className="detail-row">
                  <span className="label">Amount:</span>
                  <span className="value">₹{transfer.amount?.toFixed(2)}</span>
                </div>
                <div className="detail-row">
                  <span className="label">From:</span>
                  <span className="value">{transfer.fromUser}</span>
                </div>
                <div className="detail-row">
                  <span className="label">To:</span>
                  <span className="value">{transfer.toUser}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Reason:</span>
                  <span className="value">{transfer.reason}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Status:</span>
                  <span className="value">{transfer.transferStatus}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Date:</span>
                  <span className="value">{formatDate(transfer.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

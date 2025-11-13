import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../api';
import './YourRides.css';

export default function YourRides() {
  const [bookings, setBookings] = useState([]);
  const [expandedBooking, setExpandedBooking] = useState(null);
  const [messages, setMessages] = useState({});
  const [messageInput, setMessageInput] = useState({});
  const [sendingMessage, setSendingMessage] = useState({});

  useEffect(() => { fetchBookings(); }, []);

  async function fetchBookings() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`);
      const data = await res.json();
      if (data.status === 'ok') setBookings(data.data || []);
    } catch (e) { console.error('Failed to fetch bookings', e); }
  }

  async function fetchMessages(bookingId) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/messages/${bookingId}`);
      const data = await res.json();
      if (data.status === 'ok') {
        setMessages(prev => ({ ...prev, [bookingId]: data.data || [] }));
      }
    } catch (e) { console.error('Failed to fetch messages', e); }
  }

  function toggleChat(bookingId) {
    if (expandedBooking === bookingId) {
      setExpandedBooking(null);
    } else {
      setExpandedBooking(bookingId);
      fetchMessages(bookingId);
    }
  }

  async function sendMessage(bookingId) {
    const text = messageInput[bookingId]?.trim();
    if (!text) return;

    setSendingMessage(prev => ({ ...prev, [bookingId]: true }));
    try {
      const res = await fetch(`${API_BASE_URL}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          senderName: 'You',
          senderType: 'passenger',
          messageText: text
        })
      });
      const data = await res.json();
      if (data.status === 'ok') {
        setMessageInput(prev => ({ ...prev, [bookingId]: '' }));
        await fetchMessages(bookingId);
      } else {
        alert(data.message || 'Failed to send message');
      }
    } catch (e) {
      console.error('Message send error', e);
      alert('Failed to send message');
    } finally {
      setSendingMessage(prev => ({ ...prev, [bookingId]: false }));
    }
  }

  return (
    <div className="your-rides-page">
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (<p>No bookings yet.</p>) : (
        <div className="bookings-list">
          {bookings.map(b => (
            <div key={b.id} className="booking-card">
              <div><strong>Ride:</strong> {b.ride?.from} → {b.ride?.to} — ₹{b.ride?.price}</div>
              <div><strong>When:</strong> {b.ride?.date} {b.ride?.time}</div>
              <div><strong>Booked by:</strong> {b.bookerName || 'Guest'} ({b.bookerContact || '—'})</div>
              <div><strong>Driver:</strong> {b.ride?.name} ({b.ride?.contact})</div>
              <div><strong>At:</strong> {new Date(b.createdAt).toLocaleString()}</div>
              <button className="message-btn" onClick={() => toggleChat(b.id)}>
                {expandedBooking === b.id ? '▼ Close Chat' : '▶ Message Driver'}
              </button>

              {expandedBooking === b.id && (
                <div className="chat-section">
                  <div className="messages-container">
                    {(messages[b.id] || []).length === 0 ? (
                      <p className="no-messages">No messages yet. Start a conversation!</p>
                    ) : (
                      messages[b.id].map(msg => (
                        <div key={msg.id} className={`message ${msg.senderType}`}>
                          <strong>{msg.senderName}:</strong> {msg.messageText}
                          <span className="msg-time">{new Date(msg.createdAt).toLocaleTimeString()}</span>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="message-input-container">
                    <textarea
                      className="message-input"
                      placeholder="Type your message..."
                      value={messageInput[b.id] || ''}
                      onChange={e => setMessageInput(prev => ({ ...prev, [b.id]: e.target.value }))}
                      disabled={sendingMessage[b.id]}
                    />
                    <button
                      className="send-btn"
                      onClick={() => sendMessage(b.id)}
                      disabled={sendingMessage[b.id]}
                    >
                      {sendingMessage[b.id] ? 'Sending...' : 'Send'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

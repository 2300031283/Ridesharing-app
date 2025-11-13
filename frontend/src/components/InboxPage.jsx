import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../api';
import './InboxPage.css';

export default function InboxPage() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [messages, setMessages] = useState({});
  const [messageInput, setMessageInput] = useState('');
  const [sending, setSending] = useState(false);

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

  function selectBooking(bookingId) {
    setSelectedBooking(bookingId);
    fetchMessages(bookingId);
    setMessageInput('');
  }

  async function sendMessage() {
    if (!selectedBooking || !messageInput.trim()) return;

    setSending(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: selectedBooking,
          senderName: 'You',
          senderType: 'passenger',
          messageText: messageInput.trim()
        })
      });
      const data = await res.json();
      if (data.status === 'ok') {
        setMessageInput('');
        await fetchMessages(selectedBooking);
      } else {
        alert(data.message || 'Failed to send message');
      }
    } catch (e) {
      console.error('Message send error', e);
      alert('Failed to send message');
    } finally {
      setSending(false);
    }
  }

  const getLatestMessage = (bookingId) => {
    const msgs = messages[bookingId];
    if (!msgs || msgs.length === 0) return 'No messages yet';
    return msgs[msgs.length - 1].messageText.substring(0, 50) + (msgs[msgs.length - 1].messageText.length > 50 ? '...' : '');
  };

  return (
    <div className="inbox-page">
      <div className="inbox-container">
        <div className="conversations-list">
          <h3>Conversations</h3>
          {bookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            bookings.map(b => (
              <div
                key={b.id}
                className={`conversation-item ${selectedBooking === b.id ? 'active' : ''}`}
                onClick={() => selectBooking(b.id)}
              >
                <div className="conv-title">{b.ride?.name}</div>
                <div className="conv-route">{b.ride?.from} → {b.ride?.to}</div>
                <div className="conv-preview">{getLatestMessage(b.id)}</div>
              </div>
            ))
          )}
        </div>

        {selectedBooking ? (
          <div className="chat-detail">
            {bookings.find(b => b.id === selectedBooking) && (
              <>
                <div className="chat-header">
                  {(() => {
                    const booking = bookings.find(b => b.id === selectedBooking);
                    return `Chat with ${booking.ride?.name} (${booking.ride?.from} → ${booking.ride?.to})`;
                  })()}
                </div>
                <div className="messages-list">
                  {(messages[selectedBooking] || []).length === 0 ? (
                    <p className="no-messages">No messages. Start a conversation!</p>
                  ) : (
                    messages[selectedBooking].map(msg => (
                      <div key={msg.id} className={`message ${msg.senderType}`}>
                        <strong>{msg.senderName}:</strong> {msg.messageText}
                        <span className="msg-time">{new Date(msg.createdAt).toLocaleTimeString()}</span>
                      </div>
                    ))
                  )}
                </div>
                <div className="message-input-box">
                  <textarea
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={e => setMessageInput(e.target.value)}
                    disabled={sending}
                  />
                  <button onClick={sendMessage} disabled={sending}>
                    {sending ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="chat-detail empty">
            <p>Select a conversation to view messages</p>
          </div>
        )}
      </div>
    </div>
  );
}

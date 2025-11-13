import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../api';
import './SearchResultsPage.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const timeSlots = [
  { key: '0-3', label: '1am - 3am', start: 1, end: 3 },
  { key: '3-6', label: '3am - 6am', start: 3, end: 6 },
  { key: '6-9', label: '6am - 9am', start: 6, end: 9 },
  { key: '9-12', label: '9am - 12pm', start: 9, end: 12 },
  { key: '12-15', label: '12pm - 3pm', start: 12, end: 15 },
  { key: '15-18', label: '3pm - 6pm', start: 15, end: 18 },
  { key: '18-21', label: '6pm - 9pm', start: 18, end: 21 },
  { key: '21-24', label: '9pm - 12am', start: 21, end: 24 },
];

export default function SearchResultsPage() {
  const query = useQuery();
  const navigate = useNavigate();
  const [from, setFrom] = useState(query.get('from') || '');
  const [to, setTo] = useState(query.get('to') || '');
  const [date, setDate] = useState(query.get('date') || '');

  const [rides, setRides] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [selectedTimes, setSelectedTimes] = useState([]);
  const [priceRange, setPriceRange] = useState(1000);
  const [maxPrice, setMaxPrice] = useState(6000);
  const [availabilities, setAvailabilities] = useState([]);
  const [carType, setCarType] = useState('');

  const [selectedRide, setSelectedRide] = useState(null);
  const [bookingInProgress, setBookingInProgress] = useState([]);

  useEffect(() => { fetchRides(); }, []);

  useEffect(() => { applyFilters(); }, [rides, selectedTimes, priceRange, availabilities, carType, from, to]);

  async function fetchRides() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/rides`);
      const data = await res.json();
      if (data.status === 'ok') {
        const normalized = (data.data || []).map(r => ({ ...r, vacancies: Number(r.vacancies) || 0 }));
        setRides(normalized);
      }
    } catch (e) {
      console.error('Failed to fetch rides', e);
    }
  }

  function toggleTime(k) { setSelectedTimes(p => p.includes(k) ? p.filter(x=>x!==k) : [...p,k]); }
  function toggleAvailability(n) { setAvailabilities(p => p.includes(n) ? p.filter(x=>x!==n) : [...p,n]); }

  function applyFilters() {
    let list = [...rides];
    if (from) list = list.filter(r => r.from && r.from.toLowerCase().includes(from.toLowerCase()));
    if (to) list = list.filter(r => r.to && r.to.toLowerCase().includes(to.toLowerCase()));
    list = list.filter(r => (r.price || 0) <= priceRange);
    if (availabilities.length > 0) list = list.filter(r => availabilities.includes(Number(r.vacancies)));
    if (selectedTimes.length > 0) {
      list = list.filter(r => {
        if (!r.time) return false;
        const h = parseInt(r.time.split(':')[0], 10);
        return selectedTimes.some(key => {
          const slot = timeSlots.find(s=>s.key===key);
          if (!slot) return false;
          if (slot.end <= slot.start) return h>=slot.start || h<slot.end;
          return h>=slot.start && h<slot.end;
        });
      });
    }
    if (carType) list = list.filter(r => r.carName && r.carName.toLowerCase().includes(carType.toLowerCase()));
    setFiltered(list);
  }

  function doSearch() {
    const params = new URLSearchParams(); if (from) params.set('from', from); if (to) params.set('to', to); if (date) params.set('date', date);
    navigate(`/search-results?${params.toString()}`);
    applyFilters();
  }

  async function handleBook(ride) {
    if (!ride.vacancies || Number(ride.vacancies) <= 0) { alert('No vacancies'); return; }
    // ask user for name/contact (simple prompt)
    const name = window.prompt('Your name for booking (optional):', 'Guest');
    const contact = window.prompt('Contact number (optional):', '');
    if (name === null) return; // cancelled

    setBookingInProgress(p => p.includes(ride.id) ? p : [...p, ride.id]);
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rideId: ride.id, name, contact })
      });
      const data = await res.json();
      if (res.ok && data.status === 'ok') {
        // refresh rides and filtered view
        await fetchRides();
        applyFilters();
        // optionally navigate to your-rides
        navigate('/your-rides');
      } else {
        alert(data.message || 'Failed to book');
      }
    } catch (e) {
      console.error('Booking error', e);
      alert('Booking failed');
    } finally {
      setBookingInProgress(p => p.filter(id => id !== ride.id));
    }
  }

  return (
    <div className="search-results-page">
      <div className="filters-panel">
        <h3>Filters</h3>
        <div className="filter-group">
          <div className="filter-field"><label>From</label><input value={from} onChange={e=>setFrom(e.target.value)} /></div>
          <div className="filter-field"><label>To</label><input value={to} onChange={e=>setTo(e.target.value)} /></div>
          <div className="filter-field"><label>Date</label><input type="date" value={date} onChange={e=>setDate(e.target.value)} /></div>
          <div className="filter-field"><button className="apply-search" onClick={doSearch}>Search Rides</button></div>
        </div>

        <div className="filter-group"><h4>Timing</h4>{timeSlots.map(s=> (
          <label key={s.key} className="checkbox-row"><input type="checkbox" checked={selectedTimes.includes(s.key)} onChange={()=>toggleTime(s.key)} /> <span>{s.label}</span></label>
        ))}</div>

        <div className="filter-group"><h4>Price (max): ₹{priceRange}</h4>
          <input type="range" min="10" max={maxPrice} value={priceRange} onChange={e=>setPriceRange(Number(e.target.value))} />
        </div>

        <div className="filter-group"><h4>Availability</h4>{[2,3,4,5].map(n=> (
          <label key={n} className="checkbox-row"><input type="checkbox" checked={availabilities.includes(n)} onChange={()=>toggleAvailability(n)} /> <span>{n} seats</span></label>
        ))}</div>

        <div className="filter-group"><h4>Car Name</h4><input placeholder="e.g., Swift" value={carType} onChange={e=>setCarType(e.target.value)} /></div>
      </div>

      <div className="results-panel">
        <h3>Results ({filtered.length})</h3>
        <div className="results-list">
          {filtered.map(ride => (
            <div className="ride-card" key={ride.id}>
              <div className="ride-main">
                <div className="route"><div className="from">{ride.from}</div><div className="arrow">→</div><div className="to">{ride.to}</div></div>
                <div className="price">₹{ride.price}</div>
              </div>
              <div className="ride-meta"><div>{ride.date} • {ride.time}</div><div>{ride.vacancies} seats • {ride.gender} • {ride.name}</div><div className="car-name">{ride.carName || 'Car'}</div></div>
              <div className="card-actions">
                <div className="left-actions"><button onClick={()=>setSelectedRide(ride)}>Details</button></div>
                <div className="right-actions">
                  {bookingInProgress.includes(ride.id) ? (
                    <button className="book-btn" disabled>Booking...</button>
                  ) : (
                    <button className="book-btn" onClick={()=>handleBook(ride)}>Book Ride</button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && <div className="no-results">No rides match your filters.</div>}
        </div>
      </div>

      {selectedRide && (
        <div className="modal-overlay" onClick={()=>setSelectedRide(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <button className="close-modal" onClick={()=>setSelectedRide(null)}>×</button>
            <h3>{selectedRide.name} — ₹{selectedRide.price}</h3>
            <p><strong>Route:</strong> {selectedRide.from} → {selectedRide.to}</p>
            <p><strong>When:</strong> {selectedRide.date} at {selectedRide.time}</p>
            <p><strong>Seats:</strong> {selectedRide.vacancies}</p>
            <p><strong>Contact:</strong> {selectedRide.contact}</p>
            <p><strong>Car:</strong> {selectedRide.carName || 'N/A'}</p>
            <div className="car-photos"><img src="/car-placeholder.jpg" alt="car"/><img src="/car-placeholder.jpg" alt="car"/></div>
            <div className="driver-details"><h4>Driver Details</h4><p>Name: {selectedRide.name}</p><p>Gender: {selectedRide.gender}</p><p>Rating: ⭐ 4.7</p></div>
          </div>
        </div>
      )}
    </div>
  );
}

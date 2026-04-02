import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { Calendar, MapPin, Users, Info, CreditCard } from 'lucide-react';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  // Payment Modal States
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const url = filter ? `/events?category=${filter}` : '/events';
      const res = await api.get(url);
      setEvents(res.data.data);
    } catch (err) {
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const openPaymentModal = (event) => {
    setSelectedEvent(event);
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setPaymentProcessing(true);
    
    // Simulate payment delay
    setTimeout(async () => {
      try {
        await api.post('/bookings', { eventId: selectedEvent.id });
        toast.success(`Payment successful! You are booked for ${selectedEvent.title}.`);
        setShowPaymentModal(false);
        fetchEvents(); // Refresh available seats
      } catch (err) {
        toast.error(err.response?.data?.error || 'Failed to complete booking');
      } finally {
        setPaymentProcessing(false);
      }
    }, 1500);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Discover Events</h2>
        <p className="mt-1 text-sm text-gray-500">Find and book tickets for cultural events happening around the campus.</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {['', 'Dance', 'Music', 'Drama'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === cat
                ? 'bg-brand-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {cat || 'All Categories'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 bg-white shadow rounded-lg border-2 border-dashed border-gray-300">
           <Info className="mx-auto h-12 w-12 text-gray-400" />
           <h3 className="mt-2 text-sm font-medium text-gray-900">No events found</h3>
           <p className="mt-1 text-sm text-gray-500">Check back later for new cultural events.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div key={event.id} className="card flex flex-col hover:shadow-lg transition-shadow duration-300">
              <div className="bg-brand-50 px-6 py-4 flex-shrink-0 flex justify-between items-start">
                 <div>
                    <h3 className="text-lg font-medium text-brand-900 line-clamp-1">{event.title}</h3>
                    <span className="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-100 text-brand-800">
                      {event.category}
                    </span>
                 </div>
                 <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                    ${event.price || 0}
                 </div>
              </div>
              <div className="p-6 flex-1">
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="flex-shrink-0 mr-2 h-4 w-4" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="flex-shrink-0 mr-2 h-4 w-4" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="flex-shrink-0 mr-2 h-4 w-4" />
                    {event.availableSeats} / {event.totalSeats} seats available
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                 <button
                    onClick={() => openPaymentModal(event)}
                    disabled={event.availableSeats === 0}
                    className="w-full btn-primary"
                 >
                   {event.availableSeats === 0 ? 'Sold Out' : `Book Ticket ($${event.price || 0})`}
                 </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedEvent && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => !paymentProcessing && setShowPaymentModal(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <CreditCard className="h-6 w-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Complete Payment
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        You are about to securely book a ticket for <span className="font-bold">{selectedEvent.title}</span>. Total cost is <span className="font-bold text-green-600">${selectedEvent.price || 0}</span>.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <form onSubmit={handlePaymentSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Name on Card</label>
                      <input type="text" required placeholder="John Doe" className="mt-1 input-field" />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Card Number</label>
                      <input type="text" required placeholder="0000 0000 0000 0000" maxLength="19" className="mt-1 input-field tracking-widest font-mono" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Expiry</label>
                        <input type="text" required placeholder="MM/YY" maxLength="5" className="mt-1 input-field" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">CVV</label>
                        <input type="text" required placeholder="123" maxLength="4" className="mt-1 input-field" />
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <button 
                        type="submit" 
                        disabled={paymentProcessing}
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                      >
                        {paymentProcessing ? 'Processing...' : `Pay $${selectedEvent.price || 0}`}
                      </button>
                      <button 
                        type="button" 
                        disabled={paymentProcessing}
                        onClick={() => setShowPaymentModal(false)} 
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

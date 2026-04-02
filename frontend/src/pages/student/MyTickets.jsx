import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { Ticket, Calendar, MapPin, XCircle } from 'lucide-react';

const MyTickets = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get('/bookings');
      setBookings(res.data.data);
    } catch (err) {
      toast.error('Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await api.delete(`/bookings/${bookingId}`);
        toast.success('Booking cancelled successfully');
        fetchBookings();
      } catch (err) {
        toast.error(err.response?.data?.error || 'Failed to cancel booking');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">My Tickets</h2>
        <p className="mt-1 text-sm text-gray-500">View and manage your registered cultural events.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-white shadow rounded-lg border-2 border-dashed border-gray-300">
           <Ticket className="mx-auto h-12 w-12 text-gray-400" />
           <h3 className="mt-2 text-sm font-medium text-gray-900">No tickets yet</h3>
           <p className="mt-1 text-sm text-gray-500">You haven't booked any events yet. Go to the Events tab to discover what's happening!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white shadow rounded-lg flex flex-col md:flex-row overflow-hidden border border-gray-100">
              <div className={`w-full md:w-32 flex-shrink-0 flex flex-col items-center justify-center p-4 text-white ${booking.status === 'confirmed' ? 'bg-brand-600' : 'bg-gray-400'}`}>
                 <Ticket className="h-8 w-8 mb-2" />
                 <span className="font-bold text-lg uppercase tracking-wider text-center">{booking.status}</span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{booking.event?.title}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="flex-shrink-0 mr-2 h-4 w-4" />
                      {new Date(booking.event?.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="flex-shrink-0 mr-2 h-4 w-4" />
                      {booking.event?.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {booking.event?.category}
                      </span>
                    </div>
                  </div>
                </div>
                {booking.status === 'confirmed' && (
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                    <button
                      onClick={() => handleCancel(booking.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    >
                      <XCircle className="mr-1.5 h-4 w-4" /> Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;

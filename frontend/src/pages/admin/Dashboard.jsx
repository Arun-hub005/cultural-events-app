import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Calendar, Users, Ticket, DollarSign } from 'lucide-react';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalBookings: 0,
    totalUsers: 0,
    availableSeats: 0,
    revenueEstimate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get('/admin/analytics');
        setStats(res.data.data);
      } catch (err) {
        toast.error('Failed to load dashboard analytics');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  const cards = [
    { name: 'Total Events', value: stats.totalEvents, icon: Calendar, color: 'bg-blue-500' },
    { name: 'Total Bookings', value: stats.totalBookings, icon: Ticket, color: 'bg-green-500' },
    { name: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-purple-500' },
    { name: 'Available Seats', value: stats.availableSeats, icon: Calendar, color: 'bg-indigo-500' },
    { name: 'Est. Revenue', value: `$${stats.revenueEstimate}`, icon: DollarSign, color: 'bg-brand-500' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mb-8">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div key={card.name} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-md ${card.color} text-white`}>
                    <card.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{card.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{card.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Visual Chart Placeholder */}
      <div className="mt-8 bg-white overflow-hidden shadow rounded-lg p-6 h-64 flex items-center justify-center border-2 border-dashed border-gray-200">
        <div className="text-center">
           <h3 className="mt-2 text-sm font-semibold text-gray-900">Analytics Graph</h3>
           <p className="mt-1 text-sm text-gray-500">More charts coming in V2</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

"use client";

import { useEffect, useState } from "react";
import { Users, CalendarCheck, Clock, Coffee } from "lucide-react";

type DashboardStats = {
  totalReservations: number;
  pendingReservations: number;
  confirmedReservations: number;
  totalMenuItems: number;
  recentReservations: Array<{
    id: string;
    customerName: string;
    reservationDate: string;
    reservationTime: string;
    guestCount: number;
    status: string;
  }>;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/dashboard");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return <div className="animate-pulse">Loading dashboard...</div>;
  }

  if (!stats) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-medium text-foreground">Dashboard</h1>
        <p className="text-muted text-sm mt-1">Overview of CafeHira operations.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted mb-1">Total Reservations</p>
              <h3 className="text-3xl font-display font-medium">{stats.totalReservations}</h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Users size={20} /></div>
          </div>
        </div>
        
        <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted mb-1">Pending Requests</p>
              <h3 className="text-3xl font-display font-medium">{stats.pendingReservations}</h3>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg"><Clock size={20} /></div>
          </div>
        </div>

        <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted mb-1">Confirmed</p>
              <h3 className="text-3xl font-display font-medium">{stats.confirmedReservations}</h3>
            </div>
            <div className="p-3 bg-green-50 text-green-600 rounded-lg"><CalendarCheck size={20} /></div>
          </div>
        </div>

        <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted mb-1">Menu Items</p>
              <h3 className="text-3xl font-display font-medium">{stats.totalMenuItems}</h3>
            </div>
            <div className="p-3 bg-primary/10 text-primary rounded-lg"><Coffee size={20} /></div>
          </div>
        </div>
      </div>

      {/* Recent Reservations */}
      <div className="bg-background border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h2 className="text-lg font-medium text-foreground">Recent Reservations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface text-muted text-xs uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Guests</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {stats.recentReservations.map((res) => (
                <tr key={res.id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{res.customerName}</td>
                  <td className="px-6 py-4">{res.reservationDate}</td>
                  <td className="px-6 py-4">{res.reservationTime}</td>
                  <td className="px-6 py-4">{res.guestCount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      res.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                      res.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {res.status}
                    </span>
                  </td>
                </tr>
              ))}
              {stats.recentReservations.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted">No recent reservations found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

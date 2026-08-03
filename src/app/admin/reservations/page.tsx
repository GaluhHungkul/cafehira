"use client";

import { useEffect, useState } from "react";
import { Check, X, Trash2 } from "lucide-react";

type Reservation = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  reservationDate: string;
  reservationTime: string;
  guestCount: number;
  notes: string | null;
  status: string;
};

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const res = await fetch("/api/admin/reservations");
      if (res.ok) {
        const data = await res.json();
        setReservations(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchReservations();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteReservation = async (id: string) => {
    if (!confirm("Are you sure you want to delete this reservation?")) return;
    try {
      const res = await fetch(`/api/admin/reservations/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchReservations();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <div className="animate-pulse">Loading reservations...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-medium text-foreground">Manage Reservations</h1>
        <p className="text-muted text-sm mt-1">View and manage customer bookings.</p>
      </div>

      <div className="bg-background border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface text-muted text-xs uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Guests</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reservations.map((res) => (
                <tr key={res.id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground">{res.customerName}</p>
                    {res.notes && <p className="text-xs text-muted mt-1 max-w-[200px] truncate" title={res.notes}>Note: {res.notes}</p>}
                  </td>
                  <td className="px-6 py-4">
                    <p>{res.customerPhone}</p>
                    <p className="text-xs text-muted">{res.customerEmail}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p>{res.reservationDate}</p>
                    <p className="text-xs text-muted">{res.reservationTime}</p>
                  </td>
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
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {res.status !== 'CONFIRMED' && (
                        <button 
                          onClick={() => updateStatus(res.id, 'CONFIRMED')}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                          title="Confirm"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      {res.status !== 'CANCELLED' && (
                        <button 
                          onClick={() => updateStatus(res.id, 'CANCELLED')}
                          className="p-1.5 text-amber-600 hover:bg-amber-50 rounded"
                          title="Cancel"
                        >
                          <X size={16} />
                        </button>
                      )}
                      <button 
                        onClick={() => deleteReservation(res.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {reservations.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted">No reservations found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

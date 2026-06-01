"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CalendarDays, Clock, Users, MapPin, CheckCircle2 } from "lucide-react";
import { fadeUp } from "@/lib/motion";

export default function ReservationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    date: "",
    time: "",
    guests: "2",
    area: "Indoor",
    specialRequests: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen pt-32 pb-16 bg-background flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-cafe max-w-md w-full mx-4 p-10 text-center"
        >
          <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="heading-section text-2xl mb-4">Reservation Confirmed</h2>
          <p className="text-muted mb-8 leading-relaxed">
            Thank you, {formData.name}. Your table for {formData.guests} at CafeHira is booked for {formData.date} at {formData.time}. We've sent the details to your contact number.
          </p>
          <button 
            onClick={() => {
              setIsSuccess(false);
              setFormData({ ...formData, date: "", time: "", specialRequests: "" });
            }} 
            className="btn-primary w-full"
          >
            Make Another Booking
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container-cafe max-w-4xl">
        <SectionHeading
          label="Book a Table"
          title="Reserve Your Spot"
          description="Join us for a quiet morning coffee, a productive afternoon, or a relaxing evening."
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-12">
          {/* Info Side */}
          <motion.div 
            className="md:col-span-5 space-y-8"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <div className="card-glass p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
              
              <h3 className="text-xl font-display font-medium text-foreground mb-6">Need to Know</h3>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-primary shadow-sm shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Opening Hours</h4>
                    <p className="text-sm text-muted">Mon–Fri: 7AM–9PM<br />Sat–Sun: 8AM–10PM</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-primary shadow-sm shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Location</h4>
                    <p className="text-sm text-muted">42 Serenity Lane, Willow District<br />Valet parking available.</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-primary shadow-sm shrink-0">
                    <Users size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Large Groups</h4>
                    <p className="text-sm text-muted">For parties of 8 or more, please contact us directly at hello@cafehira.com.</p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            className="md:col-span-7"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="card-cafe p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-surface-muted border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                    placeholder="Jane Doe"
                  />
                </div>
                
                {/* Contact */}
                <div className="space-y-2">
                  <label htmlFor="contact" className="text-sm font-medium text-foreground">Email or WhatsApp</label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    required
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full bg-surface-muted border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                {/* Date */}
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <CalendarDays size={14} className="text-muted" /> Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-surface-muted border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-foreground"
                  />
                </div>

                {/* Time */}
                <div className="space-y-2">
                  <label htmlFor="time" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Clock size={14} className="text-muted" /> Time
                  </label>
                  <select
                    id="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-surface-muted border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-foreground appearance-none"
                  >
                    <option value="" disabled>Select time</option>
                    <option value="08:00">08:00 AM</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                    <option value="18:00">06:00 PM</option>
                    <option value="19:00">07:00 PM</option>
                    <option value="20:00">08:00 PM</option>
                  </select>
                </div>

                {/* Guests */}
                <div className="space-y-2">
                  <label htmlFor="guests" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Users size={14} className="text-muted" /> Guests
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    required
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full bg-surface-muted border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-foreground appearance-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Seating Preference */}
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground block mb-3">Seating Preference</label>
                <div className="grid grid-cols-3 gap-3">
                  {["Indoor", "Outdoor", "Smoking Area"].map((area) => (
                    <label 
                      key={area}
                      className={`cursor-pointer text-center px-2 py-3 rounded-lg border text-sm font-medium transition-all ${
                        formData.area === area 
                        ? "border-primary bg-primary/5 text-primary" 
                        : "border-border bg-surface-muted text-muted hover:border-border-strong hover:bg-surface"
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="area" 
                        value={area}
                        checked={formData.area === area}
                        onChange={handleChange}
                        className="hidden" 
                      />
                      {area}
                    </label>
                  ))}
                </div>
              </div>

              {/* Special Requests */}
              <div className="mb-8">
                <label htmlFor="specialRequests" className="text-sm font-medium text-foreground block mb-2">Special Requests (Optional)</label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  rows={3}
                  value={formData.specialRequests}
                  onChange={handleChange}
                  className="w-full bg-surface-muted border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none placeholder:text-muted/60"
                  placeholder="Anniversary, allergy info, high chair needed..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-primary w-full text-base py-3.5 relative overflow-hidden"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Confirm Reservation"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

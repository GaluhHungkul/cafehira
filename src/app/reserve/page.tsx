"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CalendarDays, Clock, Users, MapPin, CheckCircle2, AlertCircle } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";

const reservationSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Invalid email format"),
  customerPhone: z.string().min(5, "Phone number is required"),
  reservationDate: z.string().min(1, "Please select a date"),
  reservationTime: z.string().min(1, "Please select a time slot"),
  guestCount: z.number().int().min(1, "At least 1 guest").max(7, "Maximum 7 guests"),
  notes: z.string().optional(),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

type Slot = {
  time: string;
  available: boolean;
};

export default function ReservationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [confirmedData, setConfirmedData] = useState<ReservationFormValues | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      reservationDate: "",
      reservationTime: "",
      guestCount: 2,
      notes: "",
    },
  });

  const selectedDate = watch("reservationDate");
  const selectedTime = watch("reservationTime");

  useEffect(() => {
    if (!selectedDate) {
      setSlots(null);
      return;
    }

    let isMounted = true;
    
    // Clear selected time when date changes
    setValue("reservationTime", "", { shouldValidate: !!selectedTime });
    
    const fetchSlots = async () => {
      setIsLoadingSlots(true);
      setSlotsError(null);
      
      try {
        const res = await fetch(`/api/reservations/availability?date=${selectedDate}`);
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.error || "Failed to load availability");
        }
        if (isMounted) {
          setSlots(data.slots);
        }
      } catch (err: any) {
        if (isMounted) {
          setSlotsError(err.message || "An error occurred");
          setSlots(null);
        }
      } finally {
        if (isMounted) {
          setIsLoadingSlots(false);
        }
      }
    };

    fetchSlots();
    
    return () => {
      isMounted = false;
    };
  }, [selectedDate, setValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (data: ReservationFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      const resData = await res.json();
      
      if (!res.ok) {
        throw new Error(resData.error || "Failed to make reservation");
      }
      
      setConfirmedData(data);
      setIsSuccess(true);
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMakeAnother = () => {
    reset();
    setIsSuccess(false);
    setConfirmedData(null);
    setSlots(null);
  };

  if (isSuccess && confirmedData) {
    return (
      <main className="min-h-screen pt-32 pb-16 bg-background flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-cafe max-w-md w-full mx-4 p-10 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/10 rounded-full blur-3xl -translate-y-10 translate-x-10"></div>
          
          <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 shadow-sm border border-green-100">
            <CheckCircle2 size={40} className="animate-[pulse_2s_ease-in-out_infinite]" />
          </div>
          <h2 className="heading-section text-3xl mb-2">Reservation Confirmed</h2>
          <p className="text-muted mb-8 leading-relaxed">
            Thank you, <span className="font-medium text-foreground">{confirmedData.customerName}</span>. Your table is booked and ready.
          </p>
          
          <div className="bg-surface/50 border border-border rounded-xl p-5 mb-8 text-left space-y-3">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="text-muted text-sm">Date</span>
              <span className="font-medium text-foreground">{confirmedData.reservationDate}</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="text-muted text-sm">Time</span>
              <span className="font-medium text-foreground">{confirmedData.reservationTime}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted text-sm">Guests</span>
              <span className="font-medium text-foreground">{confirmedData.guestCount} {confirmedData.guestCount === 1 ? 'Person' : 'People'}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <button 
              onClick={handleMakeAnother} 
              className="btn-primary w-full shadow-md"
            >
              Make Another Reservation
            </button>
            <Link href="/" className="block w-full py-3 text-sm font-medium text-muted hover:text-primary transition-colors">
              Return to Home
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  // Get minimum date for date picker (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <main className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container-cafe max-w-5xl">
        <SectionHeading
          label="Book a Table"
          title="Reserve Your Spot"
          description="Join us for a quiet morning coffee, a productive afternoon, or a relaxing evening."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12">
          {/* Info Side */}
          <motion.div 
            className="lg:col-span-4 space-y-8"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <div className="card-glass p-8 rounded-2xl relative overflow-hidden h-full border border-primary/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16 blur-3xl pointer-events-none"></div>
              
              <h3 className="text-2xl font-display font-medium text-foreground mb-8 relative z-10">Need to Know</h3>
              
              <ul className="space-y-8 relative z-10">
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary shadow-sm shrink-0 border border-primary/10">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Opening Hours</h4>
                    <p className="text-sm text-muted leading-relaxed">Mon–Fri: 7AM–9PM<br />Sat–Sun: 8AM–10PM</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary shadow-sm shrink-0 border border-primary/10">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Location</h4>
                    <p className="text-sm text-muted leading-relaxed">42 Serenity Lane, Willow District<br />Valet parking available.</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary shadow-sm shrink-0 border border-primary/10">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Large Groups</h4>
                    <p className="text-sm text-muted leading-relaxed">For parties of 8 or more, please contact us directly at hello@cafehira.com.</p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            className="lg:col-span-8"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.1 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="card-cafe p-6 sm:p-8 md:p-10 shadow-lg border border-border/50">
              {submitError && (
                <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-3">
                  <AlertCircle className="text-red-500 mt-0.5 shrink-0" size={18} />
                  <div>
                    <h4 className="text-red-800 font-medium text-sm">Reservation Failed</h4>
                    <p className="text-red-700 text-sm mt-1">{submitError}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-8">
                {/* Date */}
                <div className="space-y-2 col-span-1 md:col-span-2">
                  <label htmlFor="reservationDate" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <CalendarDays size={16} className="text-primary" /> Select Date
                  </label>
                  <input
                    type="date"
                    id="reservationDate"
                    min={today}
                    {...register("reservationDate")}
                    className={`w-full bg-surface-muted border ${errors.reservationDate ? 'border-red-400 focus:ring-red-400/20' : 'border-border focus:border-primary focus:ring-primary/20'} rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 transition-all text-foreground`}
                  />
                  {errors.reservationDate && <p className="text-red-500 text-xs mt-1">{errors.reservationDate.message}</p>}
                </div>

                {/* Time Slots */}
                <div className="space-y-3 col-span-1 md:col-span-2 mb-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Clock size={16} className="text-primary" /> Available Time
                  </label>
                  
                  {!selectedDate ? (
                    <div className="bg-surface border border-border border-dashed rounded-xl p-8 text-center text-muted text-sm">
                      Please select a date to view available times
                    </div>
                  ) : isLoadingSlots ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className="h-11 bg-surface-muted animate-pulse rounded-lg border border-border"></div>
                      ))}
                    </div>
                  ) : slotsError ? (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 flex items-center gap-2">
                      <AlertCircle size={16} /> {slotsError}
                    </div>
                  ) : slots && slots.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                      {slots.map(slot => (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={!slot.available}
                          onClick={() => setValue("reservationTime", slot.time, { shouldValidate: true })}
                          className={`py-2.5 px-2 text-center rounded-lg border text-sm font-medium transition-all duration-200 ${
                            !slot.available
                              ? "bg-surface-muted text-muted/40 border-border cursor-not-allowed"
                              : selectedTime === slot.time
                              ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-[1.02]"
                              : "bg-surface border-border text-foreground hover:border-primary hover:text-primary hover:shadow-sm"
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-surface border border-border rounded-xl p-6 text-center text-muted text-sm">
                      No slots available for this date.
                    </div>
                  )}
                  {errors.reservationTime && <p className="text-red-500 text-xs mt-1">{errors.reservationTime.message}</p>}
                </div>
              </div>
              
              <div className="h-px w-full bg-border/50 mb-8"></div>

              <h4 className="font-display font-medium text-lg mb-6 text-foreground">Guest Details</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="customerName" className="text-sm font-medium text-foreground">Full Name</label>
                  <input
                    type="text"
                    id="customerName"
                    {...register("customerName")}
                    className={`w-full bg-surface-muted border ${errors.customerName ? 'border-red-400 focus:ring-red-400/20' : 'border-border focus:border-primary focus:ring-primary/20'} rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 transition-all`}
                    placeholder="Jane Doe"
                  />
                  {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName.message}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="customerEmail" className="text-sm font-medium text-foreground">Email Address</label>
                  <input
                    type="email"
                    id="customerEmail"
                    {...register("customerEmail")}
                    className={`w-full bg-surface-muted border ${errors.customerEmail ? 'border-red-400 focus:ring-red-400/20' : 'border-border focus:border-primary focus:ring-primary/20'} rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 transition-all`}
                    placeholder="jane@example.com"
                  />
                  {errors.customerEmail && <p className="text-red-500 text-xs mt-1">{errors.customerEmail.message}</p>}
                </div>

                {/* Contact */}
                <div className="space-y-2">
                  <label htmlFor="customerPhone" className="text-sm font-medium text-foreground">Phone Number</label>
                  <input
                    type="text"
                    id="customerPhone"
                    {...register("customerPhone")}
                    className={`w-full bg-surface-muted border ${errors.customerPhone ? 'border-red-400 focus:ring-red-400/20' : 'border-border focus:border-primary focus:ring-primary/20'} rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 transition-all`}
                    placeholder="+62 812 3456 7890"
                  />
                  {errors.customerPhone && <p className="text-red-500 text-xs mt-1">{errors.customerPhone.message}</p>}
                </div>

                {/* Guests */}
                <div className="space-y-2">
                  <label htmlFor="guestCount" className="text-sm font-medium text-foreground flex items-center gap-2">
                    Guest Count
                  </label>
                  <select
                    id="guestCount"
                    {...register("guestCount", { valueAsNumber: true })}
                    className={`w-full bg-surface-muted border ${errors.guestCount ? 'border-red-400 focus:ring-red-400/20' : 'border-border focus:border-primary focus:ring-primary/20'} rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 transition-all text-foreground appearance-none`}
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                  {errors.guestCount && <p className="text-red-500 text-xs mt-1">{errors.guestCount.message}</p>}
                </div>
              </div>

              {/* Special Requests */}
              <div className="mb-8 space-y-2">
                <label htmlFor="notes" className="text-sm font-medium text-foreground block">Special Requests (Optional)</label>
                <textarea
                  id="notes"
                  rows={3}
                  {...register("notes")}
                  className={`w-full bg-surface-muted border ${errors.notes ? 'border-red-400 focus:ring-red-400/20' : 'border-border focus:border-primary focus:ring-primary/20'} rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 transition-all resize-none placeholder:text-muted/60`}
                  placeholder="Anniversary, allergy info, high chair needed, preferred seating..."
                ></textarea>
                {errors.notes && <p className="text-red-500 text-xs mt-1">{errors.notes.message}</p>}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-primary w-full text-base py-4 rounded-xl relative overflow-hidden font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Reservation...
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

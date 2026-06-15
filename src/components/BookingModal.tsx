import React, { useState, useEffect } from 'react';
import { Car } from '../data/cars';
import { syncDatabase, DBInquiry } from '../lib/firebase';
import { X, Calendar, CheckCircle, Calculator, Phone, MessageSquare, User as UserIcon } from 'lucide-react';

interface BookingModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
  onInquiryCreated: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  car,
  isOpen,
  onClose,
  onInquiryCreated
}) => {
  // Contact Profile states - persisted in local memory
  const [customerName, setCustomerName] = useState(() => localStorage.getItem('sr_customer_name') || '');
  const [customerPhone, setCustomerPhone] = useState(() => localStorage.getItem('sr_customer_phone') || '');
  
  // Date states
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [duration, setDuration] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Submission & Celebrate States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successInquiry, setSuccessInquiry] = useState<DBInquiry | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Reset states when car or visibility changes
  useEffect(() => {
    if (isOpen) {
      setStartDate('');
      setEndDate('');
      setDuration(0);
      setTotalPrice(0);
      setSuccessInquiry(null);
      setError(null);
    }
  }, [isOpen, car]);

  // Recalculate dynamic price
  useEffect(() => {
    if (startDate && endDate && car) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 0) {
        setDuration(diffDays);
        setTotalPrice(diffDays * car.pricePerDay);
        setError(null);
      } else {
        setDuration(0);
        setTotalPrice(0);
        if (startDate === endDate) {
          setDuration(1);
          setTotalPrice(car.pricePerDay);
        } else if (end < start) {
          setError("End date cannot occur before start date.");
        }
      }
    }
  }, [startDate, endDate, car]);

  if (!isOpen || !car) return null;

  // Submit Inquiry right away, save user credentials locally, then prepare WhatsApp redirect payload
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!customerName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!customerPhone.trim()) {
      setError("Please enter a valid WhatsApp contact number.");
      return;
    }

    if (duration <= 0) {
      setError("Please select valid renting dates.");
      return;
    }

    // Persist contact options in standard client storage
    localStorage.setItem('sr_customer_name', customerName);
    localStorage.setItem('sr_customer_phone', customerPhone);

    const uniqueId = "inq_" + Math.random().toString(36).substring(2, 11);
    const payload: DBInquiry = {
      inquiryId: uniqueId,
      userId: 'guest',
      customerName: customerName,
      customerEmail: '',
      customerPhone: customerPhone,
      carId: car.id,
      carName: car.name,
      startDate,
      endDate,
      durationDays: duration || 1,
      totalEstimate: totalPrice || car.pricePerDay,
      status: 'pending',
      whatsappSent: false,
      createdAt: new Date().toISOString()
    };

    setIsSubmitting(true);
    try {
      // Save locally so it manifests on their private client-side Trips Dashboard!
      const existingInquiries = localStorage.getItem('sr_rentals_inquiries');
      const inquiriesList = existingInquiries ? JSON.parse(existingInquiries) : [];
      inquiriesList.push(payload);
      localStorage.setItem('sr_rentals_inquiries', JSON.stringify(inquiriesList));

      setIsSubmitting(false);
      setSuccessInquiry(payload);
      onInquiryCreated();
    } catch (err: any) {
      setError("Failed to create reservation: " + (err?.message || String(err)));
      setIsSubmitting(false);
    }
  };

  // Build client WhatsApp redirect
  const triggerWhatsAppRedirect = () => {
    if (!successInquiry) return;
    
    const ownerWhatsAppNumber = "919676939529"; // Real Sree Hanuman Travels owner whatsapp
    const textMessage = `Hello Sree Hanuman Travels Kadapa!\n\nI want to inquire about leasing a vehicle. Details:\n\n👤 Rentee Name: ${successInquiry.customerName}\n📱 WhatsApp Phone: ${successInquiry.customerPhone}\n🚗 Selected Vehicle: ${successInquiry.carName}\n📅 Dates: ${successInquiry.startDate} to ${successInquiry.endDate} (${successInquiry.durationDays} Days)\n\nPlease share the custom daily tariff prices for this booking. Thanks!`;
    
    const encodedMessage = encodeURIComponent(textMessage);
    const finalUrl = `https://wa.me/${ownerWhatsAppNumber}?text=${encodedMessage}`;

    // Mark WhatsApp redirect as active
    try {
      const existingInquiries = localStorage.getItem('sr_rentals_inquiries');
      if (existingInquiries) {
        const inquiriesList: DBInquiry[] = JSON.parse(existingInquiries);
        const updated = inquiriesList.map(item => {
          if (item.inquiryId === successInquiry.inquiryId) {
            return { ...item, whatsappSent: true, status: 'pending' as const };
          }
          return item;
        });
        localStorage.setItem('sr_rentals_inquiries', JSON.stringify(updated));
      }
    } catch (err) {
      console.error(err);
    }

    window.open(finalUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" id="booking-modal-backdrop">
      {/* Blurred background dim overlay tint sheet */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer" 
        onClick={onClose}
      />

      {/* Sheet Content panel box */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl animate-fade-in" id="booking-modal-panel">
        
        {/* Color accents header bar */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 h-1.5 w-full"></div>

        {/* Floating exit pin button */}
        <button 
          onClick={onClose}
          type="button"
          className="absolute right-4 top-4 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-full transition-colors cursor-pointer"
          title="Dismiss overlay"
          id="btn-close-booking-modal"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6 sm:p-8 space-y-6 max-h-[95vh] overflow-y-auto">
          {!successInquiry ? (
            <div className="space-y-4">
              <div>
                <span className="bg-amber-500/15 text-amber-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-500/20">
                  Quick Direct WhatsApp Reservation
                </span>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tight mt-3">
                  Book {car.name}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed mt-1">
                  Enter your details below. Once submitted, you will immediately launch your WhatsApp chat precompiled with all travel specs.
                </p>
              </div>

              {/* Form segment */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                
                {/* Visual specifications details pill */}
                <div className="flex flex-wrap items-center gap-2 rounded-xl bg-slate-950 border border-white/5 p-3 text-xs text-white/70">
                  <span className="text-[10px] font-black tracking-widest text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full uppercase border border-amber-500/20">
                    {car.type}
                  </span>
                  <span>• {car.seats} Seats</span>
                  <span>• {car.fuel} Engine</span>
                  <span>• manual Drive</span>
                </div>

                {error && (
                  <div className="rounded-lg bg-orange-500/15 border border-orange-500/30 p-3 text-xs text-orange-400 font-bold">
                    ⚠️ {error}
                  </div>
                )}

                {/* Name & phone details */}
                <div className="space-y-3 p-4 rounded-xl border border-white/5 bg-slate-950">
                  <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Your Contact Information</h4>
                  
                  <div className="space-y-1.5">
                    <label className="block text-[10px] text-white/60 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white/30">
                        <UserIcon className="h-4 w-4" />
                      </span>
                      <input 
                        type="text"
                        required
                        placeholder="e.g. Suresh Kumar"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="block w-full rounded-xl border border-white/10 bg-slate-900 py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-amber-500 transition-all font-semibold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] text-white/60 uppercase tracking-wider">WhatsApp Phone Number</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white/30">
                        <Phone className="h-3.5 w-3.5" />
                      </span>
                      <input 
                        type="tel"
                        required
                        placeholder="e.g. 9676939529"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="block w-full rounded-xl border border-white/10 bg-slate-900 py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-amber-500 transition-all font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Datepicker selectors calendar input */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">Start Date</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-white/30">
                        <Calendar className="h-4 w-4" />
                      </span>
                      <input 
                        type="date"
                        required
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="block w-full rounded-xl border border-white/10 bg-slate-950 py-3 pl-11 pr-4 text-xs text-white focus:outline-none focus:border-amber-500 transition-all font-semibold"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">End Date</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-white/30">
                        <Calendar className="h-4 w-4" />
                      </span>
                      <input 
                        type="date"
                        required
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="block w-full rounded-xl border border-white/10 bg-slate-950 py-3 pl-11 pr-4 text-xs text-white focus:outline-none focus:border-amber-500 transition-all font-semibold"
                      />
                    </div>
                  </div>
                </div>

                {/* Dynamic Price Estimator replacement Card pane - No numeric costs shown */}
                {duration > 0 && (
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2 animate-fade-in text-xs text-white/70">
                    <h5 className="text-[10px] font-black text-emerald-400 flex items-center space-x-1.5 uppercase tracking-widest pb-1 border-b border-white/5">
                      <Calculator className="h-3.5 w-3.5 text-emerald-400" />
                      Tariff & Quote information
                    </h5>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Selected Duration</span>
                        <span className="font-bold text-white">{duration} Days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Renting Tariff Pricing</span>
                        <span className="font-bold text-emerald-400">Custom Direct Tariffs</span>
                      </div>
                      <div className="flex justify-between text-[11px] font-bold text-white">
                        <span>Upfront Security deposit</span>
                        <span className="font-bold text-yellow-500">₹0 security deposit</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Branch Location Notice */}
                <div className="rounded-xl border border-white/5 bg-slate-950 p-4">
                  <p className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em]">Office branch coordinates</p>
                  <p className="text-sm text-white font-bold mt-1 leading-tight">Sree Hanuman Travels Kadapa</p>
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">Sattar Colony, Ravindra Nagar, Kadapa, Andhra Pradesh 516001</p>
                </div>

                {/* Confirm Action Button */}
                <div className="pt-2">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 active:scale-95 py-3.5 text-xs font-black uppercase tracking-widest shadow-lg shadow-amber-500/20 cursor-pointer transition-all"
                    id="btn-confirm-inquiry"
                  >
                    <span>Instant WhatsApp reservation</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            // WhatsApp dispatcher Screen
            <div className="text-center py-6 px-4 space-y-6 animate-fade-in" id="booking-success-container">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                <CheckCircle className="h-10 w-10 text-emerald-400" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-white uppercase tracking-tight">Form details generated</h3>
                <p className="text-xs text-white/60 max-w-md mx-auto pt-1 leading-relaxed">
                  Your inquiry <strong>{successInquiry.inquiryId}</strong> is precompiled. Tap the button below to directly launch WhatsApp & send the reservation sheet to Proprietor Settooru Bros.
                </p>
              </div>

              {/* Specific Booking details card */}
              <div className="rounded-xl border border-white/10 bg-slate-950 p-5 text-left max-w-sm mx-auto font-sans leading-relaxed text-xs">
                <div className="flex justify-between text-white/40 border-b border-white/5 pb-2.5 mb-2.5 font-bold uppercase tracking-widest">
                  <span>RESERVATION SUMMARY</span>
                  <span className="font-mono text-white/65">{successInquiry.inquiryId}</span>
                </div>
                <p className="text-white font-black text-base tracking-tight">{successInquiry.carName}</p>
                <p className="text-white/80 mt-2 font-bold uppercase tracking-wide">👤 Rentee: <span className="text-white">{successInquiry.customerName}</span></p>
                <p className="text-white/80 mt-1 font-bold uppercase tracking-wide">📅 Dates: <span className="text-white">{successInquiry.startDate}</span> to <span className="text-white">{successInquiry.endDate}</span></p>
                <p className="text-white/80 font-bold uppercase tracking-wide mt-1">💰 Estimated Rent: <span className="text-emerald-400 font-bold">Direct Custom Sree Hanuman rates</span></p>
              </div>

              {/* Action Buttons: Direct Call & WhatsApp CTA */}
              <div className="space-y-3 max-w-sm mx-auto">
                <button 
                  type="button"
                  onClick={triggerWhatsAppRedirect}
                  className="w-full inline-flex items-center justify-center space-x-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 py-4 text-xs font-black uppercase tracking-widest text-slate-950 shadow-lg shadow-green-500/20 cursor-pointer transition-all font-bold"
                  id="btn-whatsapp-owner-direct"
                >
                  <MessageSquare className="h-5 w-5 fill-slate-950 stroke-none" />
                  <span>Send direct WhatsApp now</span>
                </button>

                <a 
                  href="tel:9676939529"
                  className="w-full inline-flex items-center justify-center space-x-2.5 rounded-full border border-white/10 hover:border-amber-500/40 bg-slate-950 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-slate-900 active:scale-95 transition-all text-center"
                  id="btn-call-owner-direct"
                >
                  <Phone className="h-4 w-4 text-amber-400 animate-pulse" />
                  <span>Call Hotline 9676939529</span>
                </a>
              </div>

              <button 
                type="button" 
                onClick={onClose}
                className="text-xs text-white/50 hover:text-white font-bold uppercase tracking-widest block mx-auto pt-2 cursor-pointer transition-colors"
              >
                Go back to fleet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

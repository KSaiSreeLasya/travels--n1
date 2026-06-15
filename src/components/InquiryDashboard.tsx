import React, { useState, useEffect } from 'react';
import { DBInquiry, isFirebaseConfigured } from '../lib/firebase';
import { Mail, Phone, Calendar, Clock, CheckCircle, MessageSquareOff, MessageCircle, HelpCircle, Power, RefreshCw, PhoneCall, User } from 'lucide-react';

export const InquiryDashboard: React.FC = () => {
  const [customerName, setCustomerName] = useState(() => localStorage.getItem('sr_customer_name') || 'Guest Rentee');
  const [customerPhone, setCustomerPhone] = useState(() => localStorage.getItem('sr_customer_phone') || '');
  const [inquiries, setInquiries] = useState<DBInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  // Sync inquiries in real-time/sandbox directly from local preferences storage
  useEffect(() => {
    const fetchInquiries = () => {
      const data = localStorage.getItem('sr_rentals_inquiries');
      if (data) {
        try {
          const parsed = JSON.parse(data);
          parsed.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setInquiries(parsed);
        } catch (e) {
          console.error(e);
        }
      }
      
      const savedName = localStorage.getItem('sr_customer_name');
      const savedPhone = localStorage.getItem('sr_customer_phone');
      if (savedName) setCustomerName(savedName);
      if (savedPhone) setCustomerPhone(savedPhone);
      
      setLoading(false);
    };

    fetchInquiries();
    const interval = setInterval(fetchInquiries, 1500);
    return () => clearInterval(interval);
  }, []);

  // Pre-filled WhatsApp message redirect to owner at 9676939529
  const triggerWhatsAppRedirect = (inq: DBInquiry) => {
    const ownerWhatsAppNumber = "919676939529"; // Sree Hanuman Travels WhatsApp contact
    const textMessage = `Hello Sree Hanuman Travels Kadapa!\n\nI want to follow up on my Booking Inquiry:\n📄 Inquiry ID: ${inq.inquiryId}\n🚘 Vehicle: ${inq.carName}\n📅 Dates: ${inq.startDate} to ${inq.endDate} (${inq.durationDays} Days)\n💬 Customized Tariff Rate request:\nPlease share my calculated price estimate according to our route. Thanks!`;
    const encodedMessage = encodeURIComponent(textMessage);
    const finalUrl = `https://wa.me/${ownerWhatsAppNumber}?text=${encodedMessage}`;
    window.open(finalUrl, '_blank');
  };

  // Status badge style helpers
  const getStatusBadge = (status: DBInquiry['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-400 border border-emerald-500/20">
            Confirmed
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center rounded-full bg-cyan-500/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-cyan-400 border border-cyan-500/20">
            Contacted
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-amber-500 border border-amber-500/20">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center rounded-full bg-amber-500/20 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-amber-400 border border-amber-500/40 animate-pulse">
            Pending Approval
          </span>
        );
    }
  };

  return (
    <div className="space-y-6" id="dashboard-container">
      {/* Overview stats board without numeric prices */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Inquiries */}
        <div className="rounded-2xl border border-white/10 bg-slate-900 p-5 flex items-center justify-between shadow-lg">
          <div>
            <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Selected Inquiries</span>
            <p className="text-3xl font-black text-white mt-1">{loading ? "..." : inquiries.length} Vehicles</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-amber-500">
            <Clock className="h-6 w-6" />
          </div>
        </div>

        {/* 24/7 Direct Call Hotline */}
        <a 
          href="tel:9676939529"
          className="rounded-2xl border border-amber-500/20 bg-slate-900 p-5 flex items-center justify-between shadow-lg hover:border-amber-500 transition-colors group cursor-pointer"
        >
          <div>
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Sree Hanuman Hotlines</span>
            <p className="text-xl font-bold text-white mt-1.5 group-hover:text-amber-400 transition-colors">Call 9676939529</p>
            <span className="text-[10px] text-white/40 font-semibold block mt-0.5">Prop: Settooru Bros.</span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-115 transition-transform">
            <Phone className="h-5 w-5 text-amber-500" />
          </div>
        </a>

        {/* Database state */}
        <div className="rounded-2xl border border-white/10 bg-slate-900 p-5 flex items-center justify-between shadow-lg">
          <div>
            <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Database Sync</span>
            <div className="flex items-center space-x-2 mt-2">
              <span className={`inline-block h-2.5 w-2.5 rounded-full ${isFirebaseConfigured ? "bg-emerald-500 animate-pulse" : "bg-amber-500 animate-pulse"}`}></span>
              <p className="text-sm font-black text-white uppercase tracking-tight">
                {isFirebaseConfigured ? "Firebase Cloud" : "Local Browser DB"}
              </p>
            </div>
          </div>
          <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-white/55">
            <Power className="h-5 w-5 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Inquiry historical list */}
      <div className="rounded-2xl border border-white/10 bg-slate-900 shadow-xl overflow-hidden">
        <div className="border-b border-white/10 bg-slate-950 px-5 py-4 flex items-center justify-between">
          <h3 className="font-black text-white text-sm uppercase tracking-wider">Inquiry Activity Log (Real-Time)</h3>
          {loading && (
            <span className="flex items-center text-xs text-white/50 space-x-1.5 font-bold animate-pulse">
              <RefreshCw className="h-3.5 w-3.5 animate-spin text-amber-500" />
              <span className="uppercase tracking-wider text-[10px]">Syncing liveSynced...</span>
            </span>
          )}
        </div>

        {loading ? (
          <div className="py-20 text-center space-y-3">
            <RefreshCw className="h-8 w-8 text-amber-500 animate-spin mx-auto" />
            <p className="text-xs text-white/50 font-semibold uppercase tracking-wider">Synchronizing live inquiries...</p>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="py-16 text-center space-y-4">
            <p className="text-sm text-white/50 font-bold uppercase tracking-wider">No inquiries recorded yet.</p>
            <p className="text-xs text-white/30 max-w-sm mx-auto">Selected fleet options & rental details will appear here immediately upon submission.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {inquiries.map((inq) => (
              <div 
                key={inq.inquiryId} 
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                id={`db-inquiry-${inq.inquiryId}`}
              >
                <div className="space-y-2">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="text-sm font-black text-white uppercase italic tracking-tight">{inq.carName}</span>
                    <span className="text-[10px] font-mono font-bold text-white/50 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                      ID: {inq.inquiryId}
                    </span>
                    {getStatusBadge(inq.status)}
                    {inq.whatsappSent && (
                      <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-emerald-400 border border-emerald-500/20">
                        WhatsApp Sent
                      </span>
                    )}
                  </div>
                  
                  {/* Inquiry details lines */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/60 font-semibold">
                    <span className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
                      {inq.startDate} to {inq.endDate} ({inq.durationDays} Days)
                    </span>
                    <span className="flex items-center font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/15">
                     Tariff: Ask Sree Hanuman Owner
                    </span>
                  </div>
                  
                  <div className="text-[9px] text-white/30 uppercase tracking-widest font-bold">
                    Captured on {new Date(inq.createdAt).toLocaleDateString()} {new Date(inq.createdAt).toLocaleTimeString()}
                  </div>
                </div>

                {/* Booking contact actions: Direct Call & WhatsApp ping */}
                <div className="flex items-center space-x-2 self-start md:self-center">
                  <a 
                    href="tel:9676939529"
                    className="inline-flex items-center space-x-1.5 rounded-full border border-white/10 hover:border-amber-500/30 bg-slate-950 hover:bg-slate-900 px-3.5 py-2 text-xs font-black uppercase tracking-widest text-slate-200 cursor-pointer transition-all active:scale-95"
                    title="Call owner directly"
                    id={`btn-call-reping-${inq.inquiryId}`}
                  >
                    <Phone className="h-3.5 w-3.5 text-amber-500" />
                    <span>Call Now</span>
                  </a>

                  <button 
                    onClick={() => triggerWhatsAppRedirect(inq)}
                    className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-950 cursor-pointer transition-all active:scale-95"
                    id={`btn-whatsapp-reping-${inq.inquiryId}`}
                    title="Direct WhatsApp owner"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

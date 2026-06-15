import React from 'react';
import { MapPin, Phone, Clock, ShieldCheck, Map, Navigation, CheckCircle2 } from 'lucide-react';

export const AboutContact: React.FC = () => {
  const handleOpenDirections = () => {
    const encodedAddress = encodeURIComponent("Sree Hanuman Travels, Sattar Colony, Ravindra Nagar, Nagarajupeta, Kadapa, Andhra Pradesh 516001");
    const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(directionsUrl, '_blank');
  };

  const handleWhatsAppOwner = () => {
    const textMessage = "Hello Sree Hanuman Travels owner, I want to inquire about renting a car or booking a tourist package/bus at your Kadapa branch. Please share details.";
    const encodedMessage = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/919676939529?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="about-contact-section">
      {/* Contact info and Branch location */}
      <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-sm">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-500 bg-amber-500/10 px-3.5 py-1.5 rounded-full inline-block">
            Prop: Settooru Bros • Sree Hanuman Travels
          </span>
          <h3 className="text-3xl font-black text-white mt-4 tracking-tighter uppercase italic" id="about-title">
            Visit Our Head Office in Kadapa
          </h3>
          <p className="text-xs text-white/50 mt-1">
            Centrally located in Sattar Colony. Walk in today for direct bookings, vehicle inspection, or customized tour packages planning.
          </p>
        </div>

        {/* Details list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Address Card */}
          <div className="border border-white/5 rounded-xl p-4 bg-slate-950 space-y-2 hover:border-amber-500/20 transition-all">
            <span className="text-amber-500 block" title="Shop Address">
              <MapPin className="h-5 w-5" />
            </span>
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Office Address</h4>
            <p className="text-xs text-white/70 leading-relaxed font-semibold">
              3/108-10-A1, Sattar Colony,<br />
              Ravindra Nagar, Nagarajupeta,<br />
              Kadapa, Andhra Pradesh - 516001
            </p>
          </div>

          {/* Timings Card */}
          <div className="border border-white/5 rounded-xl p-4 bg-slate-950 space-y-2 hover:border-amber-500/20 transition-all">
            <span className="text-amber-500 block">
              <Clock className="h-5 w-5" />
            </span>
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Service Timing</h4>
            <p className="text-xs text-white/70 font-semibold leading-relaxed">
              Open 24 Hours / 7 Days Live<br />
              (Instant support for emergency travel, temple trips & early morning airport drops)
            </p>
          </div>
        </div>

        {/* Professional Contact Numbers panel */}
        <div className="border border-white/10 rounded-xl p-4 bg-amber-500/5 space-y-3">
          <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center">
            <Phone className="h-3.5 w-3.5 mr-2" /> Direct Call Support (Settooru Bros)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm font-semibold text-white">
            <div className="bg-slate-950 px-3 py-2 rounded-lg border border-white/5 text-center">
              <span className="text-[10px] text-white/40 block pb-0.5">Cell 1</span>
              <a href="tel:7989648106" className="font-mono hover:text-amber-400">7989648106</a>
            </div>
            <div className="bg-slate-950 px-3 py-2 rounded-lg border border-white/5 text-center">
              <span className="text-[10px] text-white/40 block pb-0.5">Cell 2</span>
              <a href="tel:9866653347" className="font-mono hover:text-amber-400">9866653347</a>
            </div>
            <div className="bg-slate-950 px-3 py-2 rounded-lg border border-white/5 text-center">
              <span className="text-[10px] text-white/40 block pb-0.5">Cell 3</span>
              <a href="tel:8886328410" className="font-mono hover:text-amber-400">8886328410</a>
            </div>
          </div>
        </div>

        {/* Trust features / Real physical glass options */}
        <div className="space-y-4 pt-5 border-t border-white/10">
          <h4 className="text-xs font-black text-amber-500 uppercase tracking-[0.2em]">
            Official Services Provided
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-bold uppercase tracking-wide text-white/90">
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="h-4 w-4 text-amber-500 flex-shrink-0" />
              <span>Car Rentals</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="h-4 w-4 text-amber-500 flex-shrink-0" />
              <span>Bus Bookings</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="h-4 w-4 text-amber-500 flex-shrink-0" />
              <span>Daily Trips</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="h-4 w-4 text-amber-500 flex-shrink-0" />
              <span>Tourist Packages</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="h-4 w-4 text-amber-500 flex-shrink-0" />
              <span>Air Tickets</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="h-4 w-4 text-amber-500 flex-shrink-0" />
              <span>Airport Cab Drops</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map Visual Representation */}
      <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900 rounded-2xl p-6 sm:p-8 text-white space-y-6 shadow-xl relative overflow-hidden border border-white/10">
        {/* Background gradient design */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl"></div>

        <div className="relative space-y-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
            <Map className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-white leading-none uppercase tracking-tighter italic">Instant GPS Directions</h3>
            <p className="text-xs text-white/60 leading-relaxed font-semibold">
              We are located at <strong>Sattar Colony, Ravindra Nagar, Kadapa</strong>. Traveling from nearby towns? Tap below to open Google Maps navigation instantly on your mobile.
            </p>
          </div>
          
          {/* Simulated mini Map visualization (minimalist and extremely premium styling) */}
          <div className="border border-white/10 rounded-xl bg-slate-950 p-4 relative overflow-hidden font-mono text-[10px] text-white/30 h-28 flex flex-col justify-between">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="flex justify-between">
              <span>Ravindra Nagar Rd</span>
              <span>Kadapa Highway</span>
            </div>
            {/* Pulsing Sree Hanuman location marker */}
            <div className="self-center flex flex-col items-center animate-bounce">
              <div className="h-6 w-6 rounded-full bg-amber-500/25 border border-amber-400 flex items-center justify-center text-amber-400 text-[10px] font-bold">
                SH
              </div>
              <span className="text-[8px] text-amber-400 font-extrabold mt-1 uppercase tracking-widest pb-1 bg-slate-950 px-1.5 rounded border border-white/10">
                Sree Hanuman Travels
              </span>
            </div>
            <div className="flex justify-between">
              <span>Sattar Colony Branch</span>
              <span>PIN-516001</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="relative space-y-2.5 pt-4 border-t border-white/10">
          <button 
            type="button"
            onClick={handleOpenDirections}
            className="w-full inline-flex items-center justify-center space-x-2 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 py-3.5 text-xs font-black uppercase tracking-widest shadow-lg shadow-amber-500/10 cursor-pointer transition-all"
            id="btn-open-directions"
          >
            <Navigation className="h-4 w-4 fill-slate-950 text-slate-950" />
            <span>Open in Google Maps</span>
          </button>
          
          <button 
            type="button"
            onClick={handleWhatsAppOwner}
            className="w-full inline-flex items-center justify-center space-x-2 rounded-full border border-white/20 hover:bg-white/5 text-white/80 py-3 text-xs font-black uppercase tracking-widest cursor-pointer transition-all"
            id="btn-contact-help"
          >
            <Phone className="h-4 w-4 text-amber-400" />
            <span>WhatsApp Chat Desk</span>
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Car } from '../data/cars';
import { Star, Users, Flame, Settings, Gauge, Check, MessageCircle, Phone } from 'lucide-react';

interface CarCardProps {
  car: Car;
  onBook: (car: Car) => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, onBook }) => {
  // Prebuilt WhatsApp message
  const whatsappText = `Hello Sree Hanuman Travels Kadapa!\n\nI want to inquire about the rental tariff and custom package rates of *${car.name}*:\n🚗 Class: ${car.type}\n👥 Seating: ${car.seats} Passengers\n⛽ Engine: ${car.fuel}\n\nPlease share availability and pricing sheets! Thank you.`;
  const whatsappUrl = `https://wa.me/919676939529?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div 
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900 transition-all duration-300 hover:border-amber-500/40 hover:shadow-2xl hover:shadow-orange-500/5 animate-fade-in"
      id={`car-card-${car.id}`}
    >
      {/* Aspect Ratio Container for image */}
      <div className="relative w-full overflow-hidden bg-slate-950" style={{ aspectRatio: '4/3' }}>
        <img
          src={car.image}
          alt={car.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105 opacity-75 group-hover:opacity-100"
        />
        {/* Rating overlay badge */}
        <div className="absolute top-3 right-3 flex items-center space-x-1 rounded-full bg-slate-950/80 backdrop-blur-md px-3 py-1 text-xs font-black text-white border border-white/10">
          <Star className="h-3 w-3 fill-amber-500 stroke-amber-500" />
          <span>{car.rating}</span>
        </div>
        
        {/* Type overlay badge */}
        <span className="absolute top-3 left-3 rounded-full bg-amber-500/90 backdrop-blur-sm px-3 py-1 text-[9px] font-black tracking-[0.2em] text-slate-950 uppercase shadow-md shadow-amber-500/20">
          {car.type}
        </span>
      </div>

      {/* Details section */}
      <div className="flex flex-1 flex-col p-6 space-y-4">
        <div>
          <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors tracking-tight uppercase italic leading-tight">
            {car.name}
          </h3>
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mt-1">Premium Kadapa Shuttle</p>
        </div>

        {/* Dynamic specifications list */}
        <div className="grid grid-cols-2 gap-3.5 border-b border-white/5 pb-4">
          <div className="flex items-center space-x-2 text-white/70">
            <Users className="h-4 w-4 text-amber-500 shrink-0" />
            <span className="text-xs font-bold">{car.seats} Seater</span>
          </div>
          <div className="flex items-center space-x-2 text-white/70">
            <Settings className="h-4 w-4 text-amber-500 shrink-0" />
            <span className="text-xs font-bold">{car.transmission}</span>
          </div>
          <div className="flex items-center space-x-2 text-white/70">
            <Flame className="h-4 w-4 text-amber-500 shrink-0" />
            <span className="text-xs font-bold">{car.fuel}</span>
          </div>
          <div className="flex items-center space-x-2 text-white/70">
            <Gauge className="h-4 w-4 text-amber-500 shrink-0" />
            <span className="text-xs font-bold">{car.mileage}</span>
          </div>
        </div>

        {/* Feature quick checklists */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {car.features.slice(0, 3).map((feat, index) => (
            <span key={index} className="inline-flex items-center text-[9px] uppercase tracking-wider bg-white/5 text-white/60 px-2.5 py-1 rounded-md font-bold border border-white/5">
              <Check className="h-2.5 w-2.5 text-amber-500 mr-1.5" />
              {feat}
            </span>
          ))}
        </div>

        {/* Pricing replacement box: Link to WhatsApp chat directly */}
        <div className="pt-2">
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-2xl bg-emerald-500/5 group-hover:bg-emerald-500/10 border border-emerald-500/15 hover:border-emerald-500/30 transition-all cursor-pointer"
            title="Ask current price on WhatsApp"
            id={`btn-wa-price-${car.id}`}
          >
            <div>
              <span className="text-[10px] font-black tracking-widest uppercase text-emerald-450 block">TARIFF RATES</span>
              <span className="text-sm font-bold text-white uppercase tracking-tight group-hover:text-emerald-400 transition-colors">Ask Price on WhatsApp</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform">
              <MessageCircle className="h-4.5 w-4.5" />
            </div>
          </a>
        </div>

        {/* Action Row containing: Call Now & Custom Reservation Book Inquiry */}
        <div className="pt-2 grid grid-cols-2 gap-3.5 mt-auto">
          {/* Direct call button for more info */}
          <a
            href="tel:9676939529"
            className="flex items-center justify-center space-x-1.5 rounded-full border border-white/10 hover:border-amber-500/40 bg-slate-950 py-3 text-xs font-black uppercase tracking-widest text-slate-200 hover:text-white hover:bg-slate-900 active:scale-95 transition-all text-center"
            title="Call 9676939529 for direct booking"
            id={`btn-call-${car.id}`}
          >
            <Phone className="h-3.5 w-3.5 text-amber-500" />
            <span>Call Now</span>
          </a>

          {/* Book Inquiry portal sheet */}
          <button 
            type="button"
            onClick={() => onBook(car)}
            className="rounded-full bg-amber-500 hover:bg-amber-600 py-3 text-xs font-black uppercase tracking-widest text-slate-950 active:scale-95 transition-all cursor-pointer shadow-lg shadow-amber-500/10 text-center"
            id={`btn-book-${car.id}`}
          >
            Reserve Now
          </button>
        </div>
      </div>
    </div>
  );
};

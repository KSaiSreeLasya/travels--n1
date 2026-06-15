/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { isFirebaseConfigured } from './lib/firebase';
import { CAR_FLEET, Car } from './data/cars';
import { Header } from './components/Header';
import { CarCard } from './components/CarCard';
import { BookingModal } from './components/BookingModal';
import { AboutContact } from './components/AboutContact';
import { 
  Shield, 
  MapPin, 
  Sparkles, 
  MessageSquare, 
  Search, 
  CarFront, 
  Smile, 
  Users, 
  Phone, 
  CheckCircle, 
  Star, 
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  Clock,
  ChevronDown
} from 'lucide-react';

// Custom interfaces for tourist devotional packages
interface TourPackage {
  id: string;
  title: string;
  tagline: string;
  image: string;
  features: string[];
  route: string;
}

const DEVOTIONAL_PACKAGES: TourPackage[] = [
  {
    id: "tirumala-pilgrimage",
    title: "Tirumala Tirupati Devotional",
    tagline: "Hassle-free direct family darshan tour from Kadapa",
    image: "https://images.unsplash.com/photo-1601614741344-9f447f52479e?auto=format&fit=crop&q=80&w=600",
    features: ["Door-to-Door Pickup in Kadapa", "Alipiri Forest Path Guidance", "Flexible halts & Hairpin bend safety", "Experienced Pilgrim Support"],
    route: "Kadapa → Rajampet → Tirupati → Tirumala Hills"
  },
  {
    id: "srisailam-trip",
    title: "Mallikarjuna Srisailam Tour",
    tagline: "Divine Jyotirlinga Darshan package through Nallamala Forest",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0612b1b?auto=format&fit=crop&q=80&w=600",
    features: ["Forest Checkpost Permits Included", "Expert ghat-road drivers", "Patalaganga Ropeway Halt Option", "Zero early morning delay"],
    route: "Kadapa → Mydukur → Giddalur → Srisailam Hills"
  },
  {
    id: "ahobilam-mahanandi",
    title: "Ahobilam & Mahanandi Historic",
    tagline: "Explore divine Navanarasimha temples & perennial holy streams",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600",
    features: ["Multi-destination halting route", "Spacious luggage carriers", "Local guide coordinate assist", "Ideal for senior citizens"],
    route: "Kadapa → Mahanandi → Ahobilam Sacred Hills"
  },
  {
    id: "airport-transfers",
    title: "Metro Airport Drop & Pickup",
    tagline: "Catch international flights at Bangalore or Chennai stress-free",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600",
    features: ["Flight delay tracking", "AC cabin rest comfort", "Express Highway Toll routes", "Luggage loading assistance"],
    route: "Kadapa → Chennai (MAA) OR Bangalore (BLR) Airport"
  }
];

function AppContent() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'explore' | 'dashboard'>('explore');
  
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Filter and search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  // FAQ interactive state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Scroll to section helpers
  const scrollToFleet = () => {
    document.getElementById('fleet-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPackages = () => {
    document.getElementById('packages-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Open specific booking modal
  const handleRentCar = (car: Car) => {
    setSelectedCar(car);
    setIsBookingOpen(true);
  };

  // Filtered cars catalog
  const filteredVehicles = CAR_FLEET.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          car.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'All' || car.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased" id="app-root-container">
      
      {/* Modern responsive navbar */}
      <Header 
        onScrollToFleet={scrollToFleet}
        onScrollToContact={scrollToContact}
        activeTab={activeTab}
        setActiveTab={(tab: any) => setActiveTab(tab)}
      />

      {/* Main Content */}
      <main className="pb-16">
          
          {/* Enhanced Professional Saffron/Charcoal Hero Frame with interactive animations */}
          <section className="relative overflow-hidden bg-slate-950 py-20 px-4 text-white sm:px-6 lg:px-8">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
            <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-orange-600/10 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 left-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl animate-pulse"></div>

            <div className="mx-auto max-w-5xl text-center relative z-10 space-y-8">
              {/* Trust Badge & Highlights Group */}
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="inline-flex items-center space-x-2 rounded-full bg-orange-500/10 border border-orange-500/30 px-4 py-2 text-xs text-amber-400 font-bold tracking-wider uppercase animate-bounce">
                  <Sparkles className="h-4 w-4 text-orange-500 mr-1" />
                  <span>Prop: Settooru Bros • Kadapa’s Local Trust</span>
                </div>

                {/* Relocated Premium Sree Hanuman Travels Highlights Bar (Centered inside Hero, Mobile-Friendly) */}
                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-4 max-w-3xl mx-auto py-2.5 px-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
                  <span className="inline-flex items-center space-x-1.5 text-[10px] sm:text-xs font-black uppercase tracking-wider">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                    <span className="text-amber-500 font-extrabold font-sans">Active Bookings Open</span>
                  </span>
                  <span className="text-white/20 hidden sm:inline">|</span>
                  <span className="text-slate-200 text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">
                    <span>🚩</span> Direct Cab, Bus & Outstation Car Operators in Kadapa
                  </span>
                  <span className="text-white/20 hidden sm:inline">|</span>
                  <span className="text-amber-400 bg-amber-500/15 border border-amber-500/30 text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shrink-0">
                    Zero Security Deposit!
                  </span>
                </div>
              </div>
              
              {/* Display Title with typography tracking details (No hardcoded rates in title) */}
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-white max-w-4xl mx-auto uppercase italic">
                  SREE HANUMAN <span className="text-orange-500">TRAVELS</span> KADAPA
                </h2>
                <div className="h-1 w-28 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
              </div>
              
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
                Premium 24-Hour Car & Bus Bookings, Outstation Tour Packages, Daily Passenger Trips, and Tirupati Darshan Airport Drops. Reliable fleet of sanitized vehicles, experienced drivers, and 24/7 direct customer support.
              </p>

              {/* Action grid (Calls dialer & Scroll to fleet) */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-lg mx-auto">
                <button 
                  onClick={scrollToFleet}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-4 text-xs font-black uppercase tracking-widest text-slate-950 hover:from-amber-400 hover:to-orange-500 shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold"
                >
                  <CarFront className="h-4 w-4" />
                  <span>Explore Rental Fleet</span>
                </button>
                
                <a 
                  href="tel:9676939529"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-8 py-4 text-xs font-black uppercase tracking-widest text-slate-200 hover:text-white transition-all font-bold"
                >
                  <Phone className="h-4 w-4 text-amber-500" />
                  <span>Call 9676939529</span>
                </a>
              </div>

              {/* Location indicator flag */}
              <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">
                📍 Head Office Branch: Sattar Colony, Ravindra Nagar, Kadapa
              </p>
            </div>
          </section>

          {/* Core Content Body Wrapper */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
            
            {/* Quick Benefits Metrics bar with styled responsive cards */}
            <section className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center space-x-4 p-2">
                <div className="h-12 w-12 text-orange-500 bg-orange-500/5 flex items-center justify-center rounded-2xl border border-orange-500/10 shrink-0">
                  <Shield className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">No Security Cash</h4>
                  <p className="text-[11px] text-slate-500 font-semibold uppercase">Zero Deposit Required</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-2">
                <div className="h-12 w-12 text-orange-500 bg-orange-500/5 flex items-center justify-center rounded-2xl border border-orange-500/10 shrink-0">
                  <Smile className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">Direct Live Owner</h4>
                  <p className="text-[11px] text-slate-500 font-semibold uppercase">Prop: Settooru Bros</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-2">
                <div className="h-12 w-12 text-orange-550 bg-orange-500/5 flex items-center justify-center rounded-2xl border border-orange-500/10 shrink-0">
                  <Users className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">Airport & Outstation</h4>
                  <p className="text-[11px] text-slate-500 font-semibold uppercase">Experienced Drivers</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-2">
                <div className="h-12 w-12 text-emerald-500 bg-emerald-500/5 flex items-center justify-center rounded-2xl border border-emerald-500/10 shrink-0">
                  <MessageSquare className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">Support Chat Line</h4>
                  <p className="text-[11px] text-slate-500 font-semibold uppercase text-emerald-600 font-mono">WhatsApp 9676939529</p>
                </div>
              </div>
            </section>

            {/* Interactive Car Fleet Grid Section */}
            <section id="fleet-section" className="space-y-6 pt-4 scroll-mt-28">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Self-Drive & Driven Cars</span>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight mt-1 uppercase italic">Our Rental Fleet Collection</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Meticulously serviced hatchbacks, premium Crystas, utility Toofans, & tourist buses</p>
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Category selections */}
                  <div className="flex flex-wrap rounded-2xl bg-slate-200/60 p-1 border border-slate-200">
                    {['All', 'SUV', 'MUV', 'Sedan', 'Hatchback', 'Bus'].map((type) => (
                      <button 
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                          selectedType === type 
                            ? 'bg-slate-900 text-white shadow-sm font-bold' 
                            : 'text-slate-600 hover:text-slate-950'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  {/* Search query field */}
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <Search className="h-4 w-4" />
                    </span>
                    <input 
                      type="text" 
                      placeholder="Search vehicle specs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="rounded-2xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all w-full sm:w-56"
                    />
                  </div>
                </div>
              </div>

              {/* Output pricing warning detail badge */}
              <div className="bg-emerald-500/5 rounded-2xl border border-emerald-500/10 p-4 text-xs font-semibold text-emerald-800 flex items-center space-x-2.5 max-w-2xl">
                <ShieldAlert className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                <span>
                 To give you the lowest possible rate, we do not keep fixed price tags. Tap any <strong>Ask Price on WhatsApp</strong> on our fleet cards to receive custom friendly tariffs direct from Settooru Bros!
                </span>
              </div>

              {/* Cars list grid */}
              {filteredVehicles.length === 0 ? (
                <div className="py-20 text-center space-y-2 bg-white rounded-3xl border border-slate-100">
                  <p className="text-sm font-bold text-slate-600 uppercase tracking-wider">No vehicles match your options.</p>
                  <p className="text-xs text-slate-400">Try changing search descriptors or clean class filter category tab!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredVehicles.map((car) => (
                    <CarCard 
                      key={car.id} 
                      car={car} 
                      onBook={handleRentCar} 
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Pilgrimage specialty Devotional Tour Packages (New Enhanced Homepage Module) */}
            <section id="packages-section" className="space-y-6 pt-4 scroll-mt-28">
              <div className="border-b border-slate-200 pb-5">
                <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Outstation Pilgrimages</span>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight mt-1 uppercase italic">Devotional Outstation Packages</h3>
                <p className="text-xs text-slate-500 mt-0.5">Dedicated door-to-door travels from Kadapa to holy destinations with professional drivers</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {DEVOTIONAL_PACKAGES.map((pkg) => (
                  <div 
                    key={pkg.id}
                    className="group relative flex flex-col md:flex-row overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                    id={`pkg-${pkg.id}`}
                  >
                    {/* Visual photo */}
                    <div className="md:w-2/5 relative h-48 md:h-auto overflow-hidden bg-slate-950 shrink-0">
                      <img 
                        src={pkg.image} 
                        alt={pkg.title}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950/80 to-transparent"></div>
                    </div>

                    {/* Content details */}
                    <div className="p-6 flex flex-col justify-between flex-auto space-y-4">
                      <div>
                        <span className="text-[9px] font-black tracking-widest text-orange-500 uppercase block">{pkg.route}</span>
                        <h4 className="text-lg font-black text-slate-900 mt-1 uppercase leading-tight italic group-hover:text-orange-600 transition-colors">
                          {pkg.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">{pkg.tagline}</p>
                      </div>

                      {/* Package checklist options */}
                      <ul className="space-y-1.5 text-[11px] text-slate-600 font-bold uppercase tracking-wide">
                        {pkg.features.map((feat, i) => (
                          <li key={i} className="flex items-center space-x-1">
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Packages WhatsApp request line & direct call */}
                      <div className="pt-2 grid grid-cols-2 gap-2 border-t border-slate-100">
                        {/* More Info call direct dial */}
                        <a 
                          href="tel:9676939529"
                          className="flex items-center justify-center space-x-1 text-center py-2 border border-slate-200 hover:border-amber-500 text-slate-800 text-[10px] font-black uppercase tracking-wider rounded-full transition-colors font-semibold"
                        >
                          <Phone className="h-3 w-3 text-amber-500 shrink-0" />
                          <span>Call Hotline</span>
                        </a>

                        {/* WhatsApp text price query */}
                        <a 
                          href={`https://wa.me/919676939529?text=${encodeURIComponent(
                            `Hello Sree Hanuman Travels Kadapa!\n\nI want to inquire about custom pricing and availability for the outstation devotional package: *${pkg.title}* (${pkg.route}). Please share the details! Thanks!`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center space-x-1 text-center py-2 bg-[#25D366] hover:bg-[#20ba59] text-slate-950 text-[10px] font-black uppercase tracking-wider rounded-full transition-colors font-bold"
                        >
                          <MessageSquare className="h-3 w-3 fill-slate-950 text-slate-950 stroke-none shrink-0" />
                          <span>Ask Price</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Local Kadapa Client Reviews (Genuine Trust Layout) */}
            <section className="bg-slate-900 rounded-3xl border border-white/5 p-6 sm:p-10 space-y-8 text-white relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 -mr-24 -mt-24 h-48 w-48 rounded-full bg-orange-600/10 blur-3xl"></div>
              
              <div className="border-b border-white/10 pb-5 max-w-xl">
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block">Customer Testimonials</span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase italic mt-1 tracking-tight">Stories of Sree Hanuman Travelers</h3>
                <p className="text-xs text-white/50 leading-relaxed mt-1">Verified local traveler reports from Kadapa households utilizing Crystas and tour buses</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-slate-950 p-5 rounded-2xl border border-white/5 space-y-3.5">
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-3.5 w-3.5 fill-amber-500 stroke-none" />)}
                  </div>
                  <p className="text-xs text-white/70 italic leading-relaxed">
                    "We rented the Innova Crysta for our family trip from Sattar Colony to Tirumala Tirupati temple. Zero security deposit made booking super straightforward. The car was spotless, air conditioning was powerful, and Settooru Bros handled the paperwork within minutes!"
                  </p>
                  <div>
                    <h5 className="text-[11px] font-black uppercase tracking-wide text-white">Suresh Reddi</h5>
                    <span className="text-[9px] text-white/40 font-semibold font-mono uppercase">Ravindra Nagar, Kadapa</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-white/5 space-y-3.5">
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-3.5 w-3.5 fill-amber-500 stroke-none" />)}
                  </div>
                  <p className="text-xs text-white/70 italic leading-relaxed">
                    "Booked the SML Luxury Executive Bus for a family marriage function travel to Bangalore in late April. Outstanding experience! The driver Settooru Bros suggested was extremely careful on the highway, very well-mannered, and navigated complex routes safely."
                  </p>
                  <div>
                    <h5 className="text-[11px] font-black uppercase tracking-wide text-white">Deepika M.</h5>
                    <span className="text-[9px] text-white/40 font-semibold font-mono uppercase">Sattar Colony, Kadapa</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-white/5 space-y-3.5">
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-3.5 w-3.5 fill-amber-500 stroke-none" />)}
                  </div>
                  <p className="text-xs text-white/70 italic leading-relaxed">
                    "Settooru Bros provides unmatched car rental services. For our business clients, we regularly book their Toyota Etios or Swift hybrids. Direct owner settlement, clean authorized yellow commercial plates, and total security transparency. Sree Hanuman is our fixed travel partner."
                  </p>
                  <div>
                    <h5 className="text-[11px] font-black uppercase tracking-wide text-white">Rajasekhar Swamy</h5>
                    <span className="text-[9px] text-white/40 font-semibold font-mono uppercase">Nagarajupeta, Kadapa</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Interactive F.A.Q Section for Sree Hanuman Travels */}
            <section className="space-y-6">
              <div className="border-b border-slate-200 pb-5">
                <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Support FAQ</span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase italic tracking-tight">Common Hires Questions</h3>
                <p className="text-xs text-slate-500 mt-0.5">Learn more about security deposits, customizable tariffs and head branch coordinates</p>
              </div>

              <div className="max-w-3xl mx-auto space-y-3" id="faq-accordions">
                {[
                  {
                    q: "Who manages Sree Hanuman Travels Kadapa?",
                    a: "We are direct local operators promoted and personally managed by the Settooru Bros family in Kadapa, ensuring customized local care & zero middleman commission margins."
                  },
                  {
                    q: "Is there a cash security deposit required to rent?",
                    a: "No! Sree Hanuman Travels is proud to offer zero security deposit rental. Safe, trusted, and verified guests can hire without any upfront deposit locking."
                  },
                  {
                    q: "Why are numeric prices hidden on the website fleet catalog?",
                    a: "Tariff rates vary extensively based on fuel parameters, tourist route tolls, inter-state permits, or custom duration. To guarantee the absolute lowest pricing deals, we provide direct tailored rates via WhatsApp or call!"
                  },
                  {
                    q: "How do I secure key pickup and handover at the branch?",
                    a: "Browse the fleet above, select your car, and hit 'Reserve Now'. Submit your date requirements in step 2. You will instantly get a precompiled message dispatch button to ping Settooru Bros on WhatsApp to coordinate key hand-off!"
                  }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="border border-slate-200 rounded-2xl bg-white overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-800 text-xs sm:text-sm uppercase tracking-tight hover:bg-slate-50 transition-colors"
                    >
                      <span>{item.q}</span>
                      <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${openFaqIndex === index ? 'rotate-180 text-amber-500' : ''}`} />
                    </button>
                    {openFaqIndex === index && (
                      <div className="p-4 pt-1 border-t border-slate-100 text-xs sm:text-sm text-slate-650 leading-relaxed bg-slate-50/50">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* About & Location branch map panel */}
            <section id="contact-section" className="pt-6 border-t border-slate-200/80 scroll-mt-28">
              <AboutContact />
            </section>

          </div>
        </main>

      {/* Saffron/Charcoal Footer layout details */}
      <footer className="border-t border-slate-200 bg-white mt-20 py-10 text-center text-xs text-slate-500 leading-relaxed shadow-inner">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <span className="h-1 bg-gradient-to-r from-amber-500 to-orange-500 w-8 rounded-full"></span>
            <p className="font-black text-slate-900 uppercase tracking-[0.2em] text-sm">Sree Hanuman Travels Kadapa</p>
            <span className="h-1 bg-gradient-to-r from-orange-500 to-amber-500 w-8 rounded-full"></span>
          </div>
          <p className="text-xs text-orange-600 font-black uppercase tracking-widest bg-orange-500/10 px-4 py-1.5 rounded-full col-span-full max-w-max mx-auto border border-orange-500/20 shadow-sm leading-none">
            Prop: Settooru Bros.
          </p>
          <p className="max-w-lg mx-auto text-[11px] text-slate-500 font-semibold uppercase tracking-wide">
            📍 3/108-10-A1, Sattar Colony, Ravindra Nagar, Nagarajupeta, Kadapa, Andhra Pradesh 516001
          </p>
          <p className="text-[11px] text-slate-700 font-black uppercase tracking-wider">
            📞 Direct Calls: 7989648106 • 9866653347 • 8886328410 • Support Hotline: 9676939529
          </p>
          <p className="text-[10px] text-slate-400 font-mono pt-4 border-t border-slate-100 max-w-md mx-auto">
            © 2026 Sree Hanuman Travels Kadapa. Direct authorized Car, Bus & Cab Operator with Zero Security Deposit. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Dynamic Modal PanelsSheets */}
      <BookingModal 
        car={selectedCar}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onInquiryCreated={() => {
          // Sync database completes
        }}
      />

    </div>
  );
}

export default function App() {
  return (
    <AppContent />
  );
}
export { AppContent };

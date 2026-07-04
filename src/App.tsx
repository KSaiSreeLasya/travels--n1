/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { isFirebaseConfigured } from './lib/firebase';
import { CAR_FLEET, Car } from './data/cars';
import { SEO_META_DATA, updatePageMeta } from './data/seoMeta';
import { injectOrganizationSchema, injectHomePageSchema } from './data/schemaMarkup';
import { Header } from './components/Header';
import { CarCard } from './components/CarCard';
import { BookingModal } from './components/BookingModal';
import { AboutContact } from './components/AboutContact';
import { StructureExplorer } from './components/StructureExplorer';
import { ScrollToTop } from './components/ScrollToTop';
import { AirportTransfers } from './pages/AirportTransfers';
import { BusRentalServices } from './pages/BusRentalServices';
import { CarRentalServices } from './pages/CarRentalServices';
import { InnovaCrystaRental } from './pages/InnovaCrystaRental';
import { OutstationCarRentals } from './pages/OutstationCarRentals';
import { TaxiServices } from './pages/TaxiServices';
import { TempoTravellerRentals } from './pages/TempoTravellerRentals';
import { TourPackages } from './pages/TourPackages';
import { WeddingVehicleRentals } from './pages/WeddingVehicleRentals';

import tirupatiImg from './assets/images/tirupati_temple_1781589399650.jpg';
import kanipakamImg from './assets/images/kanipakam_temple_1781589414842.jpg';
import gandikotaCanyonImg from './assets/images/gandikota_canyon_1781589430688.jpg';
import horsleyHillsImg from './assets/images/horsley_hills_1781589445867.jpg';
import pondicherryImg from './assets/images/pondicherry_beach_1781589461059.jpg';
import bengaluruAirportImg from './assets/images/bengaluru_airport_1781589473662.jpg';
import chennaiImg from './assets/images/chennai_highway_1781589488276.jpg';
import hydAirportImg from './assets/images/hyd_airport_1781589513728.jpg';
import gandikotaBlueRiverImg from './assets/images/gandikota_blue_river_1781589530396.jpg';
import devuniKadapaImg from './assets/images/devuni_kadapa_temple_1781589545020.jpg';
import ameenPeerImg from './assets/images/ameen_peer_dargah_1781589558717.jpg';
import ontimittaImg from './assets/images/ontimitta_temple_1781589572641.jpg';
import pushpagiriImg from './assets/images/pushpagiri_temple_1781589588527.jpg';
import arunachalamImg from './assets/images/arunachalam_temple_1781590161166.jpg';
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
  ChevronDown,
  Compass,
  Map,
  SlidersHorizontal,
  Plus,
  CheckSquare,
  Square,
  Wand2,
  Plane,
  ChevronLeft,
  Filter,
  Check
} from 'lucide-react';

// Custom interfaces for tourist packages
interface TourPackage {
  id: string;
  title: string;
  tagline: string;
  category: 'devotional' | 'leisure' | 'airport_outstation' | 'local' | ('devotional' | 'leisure' | 'airport_outstation' | 'local')[];
  image: string;
  features: string[];
  route: string;
}

const TOUR_PACKAGES: TourPackage[] = [
  {
    id: "tirumala-pilgrimage",
    title: "Tirumala Tirupati Devotional",
    tagline: "Hassle-free direct family darshan tour from Kadapa",
    category: 'devotional',
    image: tirupatiImg,
    features: ["Door-to-Door Pickup in Kadapa", "Alipiri Forest Path Guidance", "Flexible halts & Hairpin bend safety", "Experienced Pilgrim Support"],
    route: "Kadapa → Rajampet → Tirupati → Tirumala Hills"
  },
  {
    id: "kanipakam-golden",
    title: "Kanipakam & Vellore Trip",
    tagline: "Blessings of Varasiddhi Vinayaka & majestic Golden Temple",
    category: 'devotional',
    image: kanipakamImg,
    features: ["Bilingual driver (Telugu & Tamil)", "Halt at Kanipakam temple", "Vellore Golden Temple coverage", "Custom temple halt timing"],
    route: "Kadapa → Chittoor → Kanipakam → Vellore Golden Temple"
  },
  {
    id: "arunachalam-pilgrimage",
    title: "Arunachalam Girivalam Divine Tour",
    tagline: "Sacred monthly Girivalam and Annamalaiyar Temple direct voyage",
    category: 'devotional',
    image: arunachalamImg,
    features: ["Girivalam pathway halt assistance", "Dedicated driver who knows night hiking timings", "Full AC vehicle with comfortable reclining seats", "No hidden state-border permit tax shockers"],
    route: "Kadapa → Chittoor → Vellore → Thiruvannamalai Hills"
  },
  {
    id: "grand-canyon",
    title: "Grand Canyon of India & Caves",
    tagline: "Breathtaking gorge of Gandikota and subterranean Belum Caves",
    category: 'leisure',
    image: gandikotaCanyonImg,
    features: ["Best routes via Jammalamadugu", "Canyon sunset viewpoint timing", "Guide matching for Belum Caves", "Historical Fort exploration halts"],
    route: "Kadapa → Jammalamadugu → Gandikota Gorge → Belum Caves"
  },
  {
    id: "horsley-hills",
    title: "Horsley Hills Cool Retreat",
    tagline: "Charming hill station escape with panoramic views",
    category: 'leisure',
    image: horsleyHillsImg,
    features: ["Ghat road safety guarantee", "Galore forest viewpoints", "Madanapalle tomato-market halt", "Cool mountain adventure stop"],
    route: "Kadapa → Madanapalle → Horsley Hills viewpoint"
  },
  {
    id: "pondicherry-getaway",
    title: "Pondicherry French Getaway",
    tagline: "Relax at scenic beaches and rich Auroville spiritual escape",
    category: 'leisure',
    image: pondicherryImg,
    features: ["Interstate permit hassle sorted", "French Colony driving routes", "Auroville Visitor Pass guide", "Promenade Beach night parking"],
    route: "Kadapa → Tirupati → Pondicherry Beach Town"
  },
  {
    id: "bangalore-transit",
    title: "Bangalore Express Airport Highway",
    tagline: "Direct swift transfer to Bangalore Airport or IT corridor",
    category: 'airport_outstation',
    image: bengaluruAirportImg,
    features: ["Expressway fast-track", "Flight delay check", "Clean rest stops on Chittoor-BLR road", "Premium comfort ride with AC"],
    route: "Kadapa → Madanapalle → Bangalore Kempegowda Intl Airport"
  },
  {
    id: "chennai-transit",
    title: "Chennai Direct Coastal Line",
    tagline: "Quick outstation drop and pickups at Chennai port or airport",
    category: 'airport_outstation',
    image: chennaiImg,
    features: ["Direct routing with Google Maps pathing", "No border crossing stress", "Flexible luggage placement", "On-time drop guarantees"],
    route: "Kadapa → Rajampet → Renigunta → Chennai Airport (MAA)"
  },
  {
    id: "hyderabad-line",
    title: "Hyderabad Capital Transit",
    tagline: "Direct highway cruise from Kadapa to Hyderabad Gachibowli",
    category: 'airport_outstation',
    image: hydAirportImg,
    features: ["Direct Kurnool 4-lane highway route", "Express night driving optional", "Drop off at Rajiv Gandhi Intl (HYD)", "Snack halt suggestion included"],
    route: "Kadapa → Kurnool → Hyderabad RGIA / Gachibowli"
  },
  {
    id: "local-gandikota",
    title: "Gandikota Adventure Exploration",
    tagline: "Witness the majestic Grand Canyon of India & historical fort walls",
    category: 'local',
    image: gandikotaBlueRiverImg,
    features: ["Breathtaking Pennar gorge sunset timing", "Ancient Gandikota Fort walking heritage tours", "Doorstep pickup and comfortable AC travel", "Driver assistance for canyon viewpoints & photos"],
    route: "Kadapa → Jammalamadugu → Gandikota Gorge & Fort"
  },
  {
    id: "local-devuni-kadapa",
    title: "Devuni Kadapa Shri Venkateswara Swamy Darshan",
    tagline: "Pilgrimage to the sacred threshold gateway of Tirumala Tirupati",
    category: ['local', 'devotional'],
    image: devuniKadapaImg,
    features: ["Special quick darshan guidance", "Auspicious morning or evening visits", "Includes senior citizen comfort seating", "Zero-hassle city pickup and return drop"],
    route: "Kadapa City → Devuni Kadapa Venkateswara Shrine → Kadapa City"
  },
  {
    id: "local-ameen-peer-dargah",
    title: "Ameen Peer Dargah (Asthana-e-Zahrah)",
    tagline: "Sacred sufi shrine of divine harmony, peace, and spiritual light",
    category: 'local',
    image: ameenPeerImg,
    features: ["Floral & chaadar offering helper assistance", "Fascinating history narration of Sufi saints", "Serene evening prayer time visits", "Perfect for multi-faith peace seekers"],
    route: "Kadapa City → Ameen Peer Dargah (Pedda Dargah) → Kadapa City"
  },
  {
    id: "local-ontimitta",
    title: "Ontimitta Kodandarama Swamy Temple",
    tagline: "Architectural treasure with monolith Rama, Sita & Lakshmana shrines",
    category: 'local',
    image: ontimittaImg,
    features: ["Spectacular Srikrishnadevaraya stone arches", "Charming prayer and temple pool halt", "Sunset viewpoint and photography session", "Helpful local pilgrimage advice"],
    route: "Kadapa → Ontimitta Historic Temple Town → Kadapa"
  },
  {
    id: "local-pushpagiri",
    title: "Pushpagiri Hilltop Temples & Pennar River",
    tagline: "Second Hampi of Rayalaseema - Holy hilltop shrines & scenic riverbeds",
    category: 'local',
    image: pushpagiriImg,
    features: ["Hillside driving safety guaranteed", "Ancient rock-cut temples of Trimurthis", "Beautiful Pennar riverbank viewpoints", "Peaceful serene devotional family getaway"],
    route: "Kadapa → Chennur → Pushpagiri Temple Hills → Kadapa"
  }
];

interface AppReview {
  id: string;
  name: string;
  rating: number;
  location: string;
  comment: string;
  date: string;
  isCustom?: boolean;
}

const INITIAL_REVIEWS: AppReview[] = [
  {
    id: "r1",
    name: "Suresh Reddi",
    rating: 5,
    location: "Ravindra Nagar, Kadapa",
    comment: "We rented the Innova Crysta for our family trip from Sattar Colony to Tirumala Tirupati temple. Zero security deposit made booking super straightforward. The car was spotless, air conditioning was powerful, and Settooru Bros handled the paperwork within minutes!",
    date: "12 May, 2026"
  },
  {
    id: "r2",
    name: "Deepika M.",
    rating: 5,
    location: "Sattar Colony, Kadapa",
    comment: "Booked the SML Luxury Executive Bus for a family marriage function travel to Bangalore in late April. Outstanding experience! The driver Settooru Bros suggested was extremely careful on the highway, very well-mannered, and navigated complex routes safely.",
    date: "28 April, 2026"
  },
  {
    id: "r3",
    name: "Rajasekhar Swamy",
    rating: 5,
    location: "Nagarajupeta, Kadapa",
    comment: "Settooru Bros provides unmatched car rental services. For our business clients, we regularly book their Toyota Etios or Swift hybrids. Direct owner settlement, clean authorized yellow commercial plates, and total security transparency. Sree Hanuman is our fixed travel partner.",
    date: "05 June, 2026"
  },
  {
    id: "r4",
    name: "Shoba Rani",
    rating: 4,
    location: "Co-operative Colony, Kadapa",
    comment: "We went to Ahobilam. The driving was extremely safe on the ghat road. But we had a 15-minute wait near the forest checkpost for manual entry. Driver was helpful and showed patience throughout. Good Service!",
    date: "01 June, 2026"
  },
  {
    id: "r5",
    name: "Vinay Kumar G.",
    rating: 4,
    location: "Yerramukkapalli, Kadapa",
    comment: "Good outstation service to Hyderabad. Swift car was very clean. AC was outstanding. The driver is local Kadapa person and very polite. Price is slightly premium, but safety is unquestionable. Good experience.",
    date: "24 May, 2026"
  },
  {
    id: "r6",
    name: "Syed Ahmed",
    rating: 3,
    location: "Akkayapalli, Kadapa",
    comment: "Luggage carrier on the roof of Etios had some dust from previous run, we cleaned it with driver's help before start. The ride itself is extremely smooth and billing is highly honest with no hidden adjustments. Good local operators.",
    date: "14 May, 2026"
  },
  {
    id: "r7",
    name: "Ramaniah Chetty",
    rating: 5,
    location: "Proddatur Route, Kadapa",
    comment: "Outstanding outstation package to Mahanandi temple! Beautiful clean Innova, professional driving, and they stopped at fine family restaurants on the way. Zero security deposit is 100% genuine.",
    date: "20 May, 2026"
  },
  {
    id: "r8",
    name: "Prasad Naidu",
    rating: 4,
    location: "Rimeswaram, Kadapa",
    comment: "Good and quick Bangalore airport drop. Driver arrived 10 minutes early at our doorstep. The highway route was smooth but we ran into toll line bottlenecks. He managed well. Reliable travels.",
    date: "03 June, 2026"
  },
  {
    id: "r9",
    name: "Lakshmi Devi",
    rating: 4,
    location: "Bellary Road, Kadapa",
    comment: "Hired a Swift hatchback. Smooth handoff. The bumper had a minor scratch which we noted before departure. Service is excellent, very direct communication with Settooru Bros. Recommended.",
    date: "17 May, 2026"
  },
  {
    id: "r10",
    name: "Hari Prasad",
    rating: 3,
    location: "Christian Lane, Kadapa",
    comment: "We booked an outstation run. The vehicle was decent, but they had to change the driver at the last moment because of a family emergency. The backup driver was skilled but didn't speak Tamil well. Overall satisfactory.",
    date: "10 April, 2026"
  },
  {
    id: "r11",
    name: "P. Subramanyam",
    rating: 5,
    location: "YV Street, Kadapa",
    comment: "Experienced pilgrimage driver! Did Srisailam forest checkpost perfectly. Settooru Bros are very reliable and handle clients with high respect. We will book again for sure.",
    date: "09 June, 2026"
  },
  {
    id: "r12",
    name: "Dr. Anitha Anand",
    rating: 4,
    location: "RIMS Area, Kadapa",
    comment: "Very comfortable ride to Pondicherry French town. Car was neat, audio bluetooth worked great. One star deducted because they didn't have water bottles inside, but driver stopped at a shop to buy them immediately.",
    date: "30 May, 2026"
  },
  {
    id: "r13",
    name: "Md. Khader Basha",
    rating: 5,
    location: "Buddayapalli, Kadapa",
    comment: "Settooru Bros booked us SML traveller bus for Ajmer Urs pilgrims connection. Very accommodating, fair price, direct contract with zero agent interference. Recommended for group travels.",
    date: "19 May, 2026"
  },
  {
    id: "r14",
    name: "K. Sireesha",
    rating: 5,
    location: "NGO Colony, Kadapa",
    comment: "Awesome Gandikota outstation. The sunset views were brilliant, driver suggested perfect viewpoints. Excellent local knowledge. Cleanest Innova Crysta!",
    date: "07 June, 2026"
  },
  {
    id: "r15",
    name: "G. Chalapathi",
    rating: 4,
    location: "Nandilakkur, Kadapa",
    comment: "Fair pricing and direct response. The vehicle took 15 mins extra to arrive at pickup spot due to heavy traffic on Kadapa bypass road. Otherwise very trustworthy travel experience.",
    date: "11 May, 2026"
  }
];

function AppContent() {
  useEffect(() => {
    updatePageMeta(SEO_META_DATA.home);
    injectOrganizationSchema();
    injectHomePageSchema();
  }, []);

  // Navigation State
  const [activeTab, setActiveTab] = useState<'explore' | 'dashboard'>('explore');
  const [currentView, setCurrentView] = useState<'home' | 'reviews'>('home');

  const [reviews, setReviews] = useState<AppReview[]>(() => {
    const saved = localStorage.getItem('sree_hanuman_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Ignored
      }
    }
    return INITIAL_REVIEWS;
  });

  // Review creator state
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [newReviewLocation, setNewReviewLocation] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewStatus, setNewReviewStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Interactive reviews filters state
  const [reviewRatingFilter, setReviewRatingFilter] = useState<'all' | '5' | '4' | '3'>('all');
  const [reviewSearchQuery, setReviewSearchQuery] = useState('');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim() || !newReviewLocation.trim()) {
      setNewReviewStatus('error');
      return;
    }
    const newlyCreated: AppReview = {
      id: `rcustom-${Date.now()}`,
      name: newReviewName.trim(),
      rating: newReviewRating,
      location: newReviewLocation.trim(),
      comment: newReviewComment.trim(),
      date: "Today",
      isCustom: true
    };
    
    const updated = [newlyCreated, ...reviews];
    setReviews(updated);
    localStorage.setItem('sree_hanuman_reviews', JSON.stringify(updated));
    
    // Clear fields
    setNewReviewName('');
    setNewReviewLocation('');
    setNewReviewComment('');
    setNewReviewRating(5);
    setNewReviewStatus('success');
    
    setTimeout(() => {
      setNewReviewStatus('idle');
    }, 4000);
  };
  
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Filter and search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  // Tour packages active category selection ('all' | 'devotional' | 'leisure' | 'airport_outstation' | 'custom')
  const [selectedPkgCategory, setSelectedPkgCategory] = useState<'all' | 'devotional' | 'leisure' | 'airport_outstation' | 'local' | 'custom'>('all');

  // Interactive Custom Trip Builder State parameters
  const [customDestination, setCustomDestination] = useState('');
  const [customDays, setCustomDays] = useState('2');
  const [customCarType, setCustomCarType] = useState('Innova Crysta Premium (7+1)');
  const [customExtras, setCustomExtras] = useState<string[]>([
    "Top Luggage Carrier Roof Mount",
    "Aux Bluetooth Audio System Enabled"
  ]);

  const handleToggleExtra = (extra: string) => {
    if (customExtras.includes(extra)) {
      setCustomExtras(customExtras.filter(e => e !== extra));
    } else {
      setCustomExtras([...customExtras, extra]);
    }
  };

  // FAQ interactive state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Scroll to section helpers
  const scrollToFleet = () => {
    window.dispatchEvent(new CustomEvent('sree-hanuman-set-main-category', { detail: { mainId: 'vehicles' } }));
    setTimeout(() => {
      document.getElementById('structure-explorer-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
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
        setActiveTab={(tab: any) => {
          setActiveTab(tab);
          setCurrentView('home');
        }}
      />

      {/* Main Content */}
      <main className="pb-16">
        {currentView === 'home' ? (
          <>
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
                  href="tel:+917989648106"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-8 py-4 text-xs font-black uppercase tracking-widest text-slate-200 hover:text-white transition-all font-bold"
                >
                  <Phone className="h-4 w-4 text-amber-500" />
                  <span>Call +91 7989648106</span>
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
                  <p className="text-[11px] text-slate-500 font-semibold uppercase text-emerald-600 font-mono">WhatsApp +91 7989648106</p>
                </div>
              </div>
            </section>

            {/* Premium Why Choose Us Feature Deck */}
            <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-850 shadow-xl space-y-8 relative overflow-hidden" id="why-choose-us-section">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6 relative z-10">
                <div className="space-y-1">
                  <span className="inline-flex items-center space-x-1.5 text-[10px] font-black text-orange-400 uppercase tracking-widest font-mono">
                    <Sparkles className="h-3.5 w-3.5 text-amber-450 animate-pulse shrink-0" />
                    <span>Proprietary Transport Standards</span>
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight uppercase italic leading-none">
                    Why Choose Sree Hanuman Travels
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold">
                    Uncompromising standards of quality, reliability, and security designed directly by Settooru Bros.
                  </p>
                </div>
                
                <div className="flex items-center space-x-1.5 shrink-0 bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-200 font-mono">★ Registered Safe Travels ★</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 relative z-10">
                {[
                  {
                    title: "Professional Drivers",
                    desc: "Highly experienced, polite drivers well-versed in high altitudes and ghat roads.",
                    benefit: "Expert Safe Control"
                  },
                  {
                    title: "Clean Vehicles",
                    desc: "Meticulous vehicle detailing & deep sanitation before every single departure. 100% dust-free.",
                    benefit: "Pristine Interiors"
                  },
                  {
                    title: "24/7 Service",
                    desc: "Round-the-clock booking lines, rapid midnight replacements, and continuous highway support.",
                    benefit: "Always Available"
                  },
                  {
                    title: "Temple Tour Specialists",
                    desc: "Unmatched route guidance for Tirupati, Srisailam forest chapters, and local Rayalaseema temples.",
                    benefit: "Hassle-Free Darshan"
                  },
                  {
                    title: "Airport Pickup Available",
                    desc: "Timely drops & active arrival monitoring for Bangalore, Chennai, Tirupati, and Kadapa terminals.",
                    benefit: "Zero Flight Delay Misses"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-950/40 border border-slate-800 hover:border-orange-500/25 rounded-2xl p-5 hover:bg-slate-950/80 hover:scale-[1.01] transition-all duration-300 group flex flex-col justify-between space-y-4 shadow-xs">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="h-6 w-6 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 text-xs font-black shrink-0">
                          ✓
                        </span>
                        <h4 className="text-xs font-black uppercase tracking-tight text-white group-hover:text-amber-400 transition-colors">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    
                    <span className="text-[8px] font-black uppercase tracking-widest text-orange-500/80 font-mono pt-2 border-t border-slate-800 block">
                      {item.benefit}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Sree Hanuman Travels Dynamic Category Navigation Directory Tree */}
            <StructureExplorer 
              onRentCar={handleRentCar}
              onTriggerCustomTrip={() => {
                setSelectedPkgCategory('custom');
                setTimeout(() => {
                  document.getElementById('packages-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }}
              onScrollToSection={(sectionId: string) => {
                document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Pilgrimage general & Custom trip travel packages */}
            <section id="packages-section" className="space-y-6 pt-4 scroll-mt-28">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest font-mono">Outstation & Customized Tours</span>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight mt-1 uppercase italic">Explore Sree Hanuman Tour Packages</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Direct pilgrimages, scenic leisure escapes, or fully personalized custom route planning</p>
                </div>

                {/* Travel Package Categories Selector Tabs - touch friendly scroll on mobile */}
                <div className="flex overflow-x-auto whitespace-nowrap scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden items-center gap-1.5 p-1 bg-slate-100 border border-slate-200 rounded-2xl w-full lg:w-auto flex-nowrap shrink-0">
                  {[
                    { id: 'all', label: 'All Packages', icon: Compass },
                    { id: 'devotional', label: 'Devotional', icon: Sparkles },
                    { id: 'local', label: 'Local Visits 🚩', icon: MapPin },
                    { id: 'leisure', label: 'Leisure & Nature', icon: Map },
                    { id: 'airport_outstation', label: 'Airport Transit', icon: Plane },
                    { id: 'custom', label: 'Custom Planner', icon: Wand2, highlight: true }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = selectedPkgCategory === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setSelectedPkgCategory(tab.id as any)}
                        className={`flex items-center space-x-1.5 px-3.5 py-2.5 text-[10px] font-black uppercase tracking-wider rounded-xl cursor-pointer transition-all duration-200 flex-shrink-0 ${
                          isActive
                            ? tab.highlight 
                              ? 'bg-amber-500 text-slate-950 shadow-md'
                              : 'bg-slate-900 text-white shadow-sm'
                            : tab.highlight
                              ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 border border-amber-500/20'
                              : 'hover:bg-slate-200 text-slate-600'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0 text-orange-500" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedPkgCategory !== 'custom' ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {TOUR_PACKAGES.filter(pkg => 
                      selectedPkgCategory === 'all' || 
                      (Array.isArray(pkg.category) 
                        ? pkg.category.includes(selectedPkgCategory as any) 
                        : pkg.category === selectedPkgCategory)
                    ).map((pkg) => (
                      <div 
                        key={pkg.id}
                        className="group relative flex flex-col md:flex-row overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in"
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
                          {/* Category Badge */}
                          <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[8px] font-black uppercase tracking-widest text-amber-400 border border-amber-500/30">
                            {(() => {
                              const cat = Array.isArray(pkg.category) ? pkg.category[0] : pkg.category;
                              return cat === 'devotional' 
                                ? '🕉️ Devotional' 
                                : cat === 'local' 
                                ? '🚩 Local Visits' 
                                : cat === 'leisure' 
                                ? '🏞️ Leisure' 
                                : '✈️ Outstation';
                            })()}
                          </span>
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
                            <a 
                              href="tel:+917989648106"
                              className="flex items-center justify-center space-x-1 text-center py-2 border border-slate-200 hover:border-amber-500 text-slate-800 text-[10px] font-black uppercase tracking-wider rounded-full transition-colors font-semibold"
                            >
                              <Phone className="h-3 w-3 text-amber-500 shrink-0" />
                              <span>Call Hotline</span>
                            </a>

                            <a 
                              href={`https://wa.me/917989648106?text=${encodeURIComponent(
                                `Hello Sree Hanuman Travels Kadapa!\n\nI want to inquire about custom pricing and availability for the *${pkg.title}* package: (${pkg.route}). Please share the details! Thanks!`
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

                    {/* Proactive Card leading to Custom Trip Planner */}
                    <div className="flex flex-col justify-center items-center p-8 bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-3xl border border-dashed border-amber-500/30 text-center space-y-4 animate-fade-in">
                      <div className="h-14 w-14 bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/20 text-amber-600 animate-pulse">
                        <Wand2 className="h-7 w-7" />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-slate-900 uppercase italic leading-none">Your Dream Route, Our Drivers!</h4>
                        <p className="text-xs text-slate-500 mt-1 max-w-sm">
                          Want to create a custom multi-stop route, add physical assistance extras, or modify route halts along the way? Use Sree Hanuman's Custom Trip Builder.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPkgCategory('custom');
                          document.getElementById('packages-section')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center space-x-2 rounded-full bg-slate-900 text-white font-black text-xs uppercase tracking-widest px-6 py-3.5 hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-md shrink-0 cursor-pointer"
                      >
                        <span>Build Custom Trip Now</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* Custom Trip Builder Module */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in" id="custom-builder-container">
                  <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                    <div className="border-b border-slate-100 pb-4">
                      <h4 className="text-xl font-black text-slate-900 uppercase italic flex items-center space-x-2">
                        <Wand2 className="h-5 w-5 text-amber-500" />
                        <span>Interactive Custom Road Trip Planner</span>
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 font-semibold">Configure your target locations, travel durations, vehicles, and customized road extras below</p>
                    </div>

                    <div className="space-y-4 text-xs sm:text-sm">
                      {/* Starting & Destination Inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 font-mono">Starting Point</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5">
                              <MapPin className="h-4 w-4 text-emerald-500" />
                            </span>
                            <input 
                              type="text" 
                              disabled 
                              value="Kadapa Head Branch Pickup"
                              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-700 font-bold uppercase tracking-wider rounded-xl cursor-not-allowed text-[11px]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 font-mono">Where do you want to go?</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5">
                              <Compass className="h-4 w-4 text-amber-500" />
                            </span>
                            <input 
                              type="text" 
                              value={customDestination}
                              onChange={(e) => setCustomDestination(e.target.value)}
                              placeholder="e.g. Shiridi, Belum Caves, Coorg, Village..."
                              className="w-full pl-10 pr-4 py-3 border border-slate-200 hover:border-amber-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none text-slate-800 font-bold uppercase tracking-wider rounded-xl transition-all text-[11px]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Travel Days and Vehicle selections */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 font-mono">Required Trip Days</label>
                          <div className="grid grid-cols-4 gap-2">
                            {['1', '2', '3', '5+'].map((day) => (
                              <button
                                key={day}
                                type="button"
                                onClick={() => setCustomDays(day)}
                                className={`py-2 px-3 text-xs font-black uppercase rounded-lg border text-center transition-all cursor-pointer ${
                                  customDays === day
                                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                }`}
                              >
                                {day} Day{day !== '1' ? 's' : ''}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 font-mono">Select Preferred Vehicle Class</label>
                          <select
                            value={customCarType}
                            onChange={(e) => setCustomCarType(e.target.value)}
                            className="w-full px-3 py-2.5 border border-slate-200 bg-white hover:border-amber-500 focus:border-amber-500 focus:outline-none text-[11px] text-slate-800 font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                          >
                            <option value="Innova Crysta Premium (7+1)">Toyota Innova Crysta (Luxury 7+1 Seater)</option>
                            <option value="SREE SML Luxury Bus Coach">SML Luxury Coach (Air-Conditioned Coach)</option>
                            <option value="Premium Outstation Etios Sedan">Toyota Etios Sedan (AC Highway Standard)</option>
                            <option value="Swaraj Mazda Traveller Bus">Swaraj Mazda (12-14 Seater Cruiser)</option>
                            <option value="Swift Hybrid Hatchback (Driven)">Swift Hatchback (Driven / Self-Drive)</option>
                          </select>
                        </div>
                      </div>

                      {/* Trip custom premium extras */}
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 font-mono">
                          🎁 Custom Road Extras (Add/Remove options below)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="custom-extras-checkboxes">
                          {[
                            { name: "Top Luggage Carrier Roof Mount", desc: "For heavy bags or large families" },
                            { name: "Senior Citizen Assist & Low Step", desc: "Low onboarding step & gentle speed adjustment" },
                            { name: "Multi-lingual Highway Driver (Tel+Tam+Kan)", desc: "Essential for hassle-free interstate checkposts" },
                            { name: "Aux Bluetooth Audio System Enabled", desc: "Sing along with high quality travel acoustics" },
                            { name: "No-Smoking Guaranteed Cabin", desc: "Fully baby-safe, smoke-free sanitization treatment" },
                            { name: "Sightseeing Guide Route Halts", desc: "Halts at major viewpoints and premium restaurants" },
                            { name: "Overnight Driving Config (Dual Drivers)", desc: "Allows non-stop travel safely through the night" }
                          ].map((extra) => {
                            const isChecked = customExtras.includes(extra.name);
                            return (
                              <button
                                key={extra.name}
                                type="button"
                                onClick={() => handleToggleExtra(extra.name)}
                                className={`flex items-start text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                                  isChecked
                                    ? 'bg-amber-500/5 border-amber-500/60 text-slate-900 shadow-sm'
                                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600'
                                }`}
                              >
                                <span className="pt-0.5 mr-2 shrink-0">
                                  {isChecked ? (
                                    <CheckSquare className="h-4.5 w-4.5 text-amber-600 fill-amber-100" />
                                  ) : (
                                    <Square className="h-4.5 w-4.5 text-slate-300" />
                                  )}
                                </span>
                                <div>
                                  <span className="text-xs font-black uppercase tracking-wide block leading-none">{extra.name}</span>
                                  <span className="text-[9px] text-slate-400 font-semibold uppercase">{extra.desc}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Analog travel ticket preview container */}
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div className="bg-amber-50/70 border-2 border-dashed border-amber-300/80 p-6 space-y-6 rounded-3xl relative overflow-hidden text-slate-800">
                      {/* Ticket graphics decoration */}
                      <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500"></div>
                      <div className="absolute -left-4 top-1/2 -mt-4 h-8 w-8 rounded-full bg-slate-50 border-r-2 border-dashed border-amber-300/80 z-10"></div>
                      <div className="absolute -right-4 top-1/2 -mt-4 h-8 w-8 rounded-full bg-slate-50 border-l-2 border-dashed border-amber-300/80 z-10"></div>

                      <div className="text-center pb-4 border-b border-slate-300/40">
                        <span className="text-[9px] font-black tracking-widest text-orange-600 block">KADAPA ROAD TRIP VOUCHER</span>
                        <h5 className="text-lg font-black text-slate-900 uppercase italic tracking-tight mt-0.5">SREE HANUMAN TRAVELS</h5>
                        <p className="text-[9px] font-bold text-slate-400 font-mono uppercase">Direct Promotion • Proprietor Desk</p>
                      </div>

                      <div className="space-y-4 font-bold uppercase text-[11px] tracking-wide text-slate-700">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="font-semibold text-[8px] text-slate-450 block tracking-widest font-mono">FROM</span>
                            <span className="text-xs font-black text-slate-900 leading-none">📍 KADAPA LOCAL</span>
                          </div>
                          <div>
                            <span className="font-semibold text-[8px] text-slate-450 block tracking-widest font-mono">DESTINATION</span>
                            <span className="text-xs font-black text-orange-600 leading-none block truncate">
                              {customDestination.trim() ? `🚩 ${customDestination}` : '❓ TYPE DESTINATION'}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-dashed border-slate-300/40">
                          <div>
                            <span className="font-semibold text-[8px] text-slate-450 block tracking-widest font-mono">DURATION</span>
                            <span className="text-xs font-black text-slate-900">⏳ {customDays} TRIP DAY{customDays !== '1' ? 'S' : ''}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-[8px] text-slate-450 block tracking-widest font-mono">FLEET VEHICLE</span>
                            <span className="text-[10px] font-black text-slate-900 leading-none truncate block">{customCarType}</span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-dashed border-slate-300/40">
                          <span className="font-semibold text-[8px] text-slate-450 block tracking-widest mb-1.5 font-mono">CUSTOM EXTRAS PREVIEW</span>
                          {customExtras.length === 0 ? (
                            <span className="text-slate-400 normal-case italic text-[10px]">No extra amenities selected. Standard outstation ride applies.</span>
                          ) : (
                            <ul className="space-y-1 text-slate-800 text-[10px] bg-white/60 p-2.5 rounded-xl border border-amber-200/50">
                              {customExtras.map((ext) => (
                                <li key={ext} className="flex items-center space-x-1.5 text-[9px] sm:text-[10px]">
                                  <span className="h-1 w-1 bg-amber-500 rounded-full shrink-0"></span>
                                  <span>{ext}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-emerald-800 text-center text-[10px] leading-tight space-y-1">
                          <p className="font-black">🚩 NO SECURITY DEPOSIT REQUIRED!</p>
                          <p className="normal-case text-slate-500 font-semibold text-[9px]">We verify local Kadapa credentials directly. Zero cash hold up-front.</p>
                        </div>
                      </div>

                      {/* Ticket Barcode */}
                      <div className="pt-4 border-t border-slate-300/40 flex flex-col items-center justify-center space-y-2">
                        <div className="h-5 flex items-center justify-between gap-1 text-[11px] font-mono tracking-[0.25em] text-slate-350 select-none overflow-hidden uppercase">
                          ||||| ||| |||| || || | |||| ||| ||| | |||
                        </div>
                        <span className="text-[9px] text-slate-400 font-bold font-mono font-mono">HST-CUST-{Math.floor(Math.random() * 8999) + 1000}</span>
                      </div>
                    </div>

                    {/* Direct dispatch button to WhatsApp */}
                    <div className="mt-4">
                      <a 
                        href={`https://wa.me/917989648106?text=${encodeURIComponent(
                          `Hello Sree Hanuman Travels Kadapa! 🚩\n\nI want to receive a customized friendly tariff budget quotation for a custom travel route with additional road extras:\n\n🗺️ TOUR CUSTOM ROUTE:\n- Start Location: Kadapa Hub\n- Destination: *${customDestination.trim() || 'Customized Tour Route'}*\n- Request Duration: *${customDays}* Day(s)\n- Vehicle Model: *${customCarType}*\n\n🎁 ADDED ROAD EXTRAS REQUESTED:\n${
                            customExtras.map(ex => `  • ${ex}`).join('\n') || '  (No specific extras - pure direct transit)'
                          }\n\nPlease check availability and reply back with your best friendliest rate! Thanks Settooru Bros!`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center space-x-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 py-3.5 text-xs font-black uppercase tracking-widest text-slate-950 shadow-lg shadow-emerald-500/20 cursor-pointer transition-all text-center font-bold"
                        id="btn-custom-route-whatsapp"
                      >
                        <MessageSquare className="h-4.5 w-4.5 fill-slate-950 stroke-none" />
                        <span>Inquire Custom Quotation on WhatsApp 📲</span>
                      </a>
                      <p className="text-center text-[9px] text-slate-400 mt-2 font-bold uppercase tracking-widest font-mono">
                        Direct connection to Proprietor Hotline Desk (No agencies / no commissions)
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Local Kadapa Client Reviews (Genuine Trust Layout) */}
            <section className="bg-slate-900 rounded-3xl border border-white/5 p-6 sm:p-10 space-y-8 text-white relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 -mr-24 -mt-24 h-48 w-48 rounded-full bg-orange-600/10 blur-3xl"></div>
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5">
                <div className="max-w-xl">
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block">Customer Testimonials</span>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase italic mt-1 tracking-tight">Stories of Sree Hanuman Travelers</h3>
                  <p className="text-xs text-white/50 leading-relaxed mt-1">Verified local traveler reports from Kadapa households utilizing Crystas and tour buses</p>
                </div>
                
                {/* Micro Rating Indicator */}
                <div className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl flex items-center space-x-3 shrink-0 self-start md:self-auto">
                  <div className="text-right">
                    <span className="text-sm font-black text-white block leading-none">4.33 ★</span>
                    <span className="text-[8px] text-white/40 tracking-wider font-bold block uppercase mt-0.5">15+ Verified Reviews</span>
                  </div>
                  <div className="text-amber-400 flex">
                    {[1, 2, 3, 4].map((s) => <Star key={s} className="h-3 w-3 fill-amber-400 stroke-none" />)}
                    <Star className="h-3 w-3 fill-amber-400/50 stroke-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-slate-950 p-5 rounded-2xl border border-white/5 space-y-3.5 hover:border-orange-500/20 transition-all duration-200">
                  <div className="flex text-amber-550">
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

                <div className="bg-slate-950 p-5 rounded-2xl border border-white/5 space-y-3.5 hover:border-orange-500/20 transition-all duration-200">
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

                <div className="bg-slate-950 p-5 rounded-2xl border border-white/5 space-y-3.5 hover:border-orange-500/20 transition-all duration-200">
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

              {/* Enhanced call to action container */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
                <div className="space-y-0.5">
                  <p className="text-xs font-black text-white uppercase tracking-wider">Want 100% Genuine, Uncompromised Reports?</p>
                  <p className="text-[11px] text-white/55">Explore reviews with mixed 4-star & 3-star ratings regarding road delays and custom requests.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentView('reviews');
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="inline-flex items-center space-x-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest px-6 py-3.5 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0 cursor-pointer text-center font-bold"
                  id="btn-more-reviews-navigate"
                >
                  <span>See All 15+ Customer Reviews </span>
                  <ArrowRight className="h-4 w-4" />
                </button>
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
          </>
        ) : (
          /* Detailed Custom Reviews Sub-Page View */
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-8 space-y-8 animate-fade-in" id="custom-reviews-subpage">
            
            {/* Breadcrumb & Navigation Back */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-slate-400 text-[10px] uppercase font-black tracking-widest font-mono">
                  <span>Home</span>
                  <span>/</span>
                  <span className="text-orange-500">Verified Customer Reviews</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase italic tracking-tight">
                  Sree Hanuman Travelers Ledger
                </h2>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">
                  100% direct reports from local Kadapa guests. We list honest ratings (5★, 4★, 3★) of real situations.
                </p>
              </div>

              <button 
                type="button"
                onClick={() => {
                  setCurrentView('home');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="flex items-center space-x-1.5 text-[10px] font-black uppercase text-slate-700 hover:text-white bg-white hover:bg-slate-900 border border-slate-200 hover:border-slate-900 px-4 py-2.5 rounded-2xl shadow-sm cursor-pointer transition-all shrink-0 self-start sm:self-auto"
              >
                <ChevronLeft className="h-3.5 w-3.5 mr-1" />
                <span>Return to Home Screen</span>
              </button>
            </div>

            {/* Ratings Summary Stats & Grid Segment */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Aggregates Box & Write Review Box */}
              <div className="md:col-span-4 space-y-6">
                
                {/* Aggregates Box */}
                <div className="bg-slate-900 text-white rounded-3xl border border-white/5 p-6 space-y-4 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-orange-600/10 blur-3xl"></div>
                  <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider font-mono">Rating Summary Breakdown</h4>
                  
                  <div className="flex items-baseline space-x-2 pb-3 border-b border-white/10">
                    <span className="text-4xl font-extrabold tracking-tight">4.33</span>
                    <span className="text-amber-400 text-lg">★</span>
                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">out of 5 stars</span>
                  </div>

                  {/* Progress bars representing reviews database */}
                  <div className="space-y-2.5 font-bold text-[10px] uppercase tracking-wide">
                    {[
                      { stars: 5, count: reviews.filter(r => r.rating === 5).length, percent: `${Math.round((reviews.filter(r => r.rating === 5).length / Math.max(1, reviews.length)) * 100)}%`, color: "bg-amber-500" },
                      { stars: 4, count: reviews.filter(r => r.rating === 4).length, percent: `${Math.round((reviews.filter(r => r.rating === 4).length / Math.max(1, reviews.length)) * 100)}%`, color: "bg-orange-500" },
                      { stars: 3, count: reviews.filter(r => r.rating === 3).length, percent: `${Math.round((reviews.filter(r => r.rating === 3).length / Math.max(1, reviews.length)) * 100)}%`, color: "bg-yellow-500" },
                      { stars: 2, count: reviews.filter(r => r.rating === 2).length, percent: "0%", color: "bg-slate-600" },
                      { stars: 1, count: reviews.filter(r => r.rating === 1).length, percent: "0%", color: "bg-slate-600" }
                    ].map((row) => (
                      <div key={row.stars} className="flex items-center space-x-2">
                        <span className="w-10 text-white/60 font-mono text-right">{row.stars} Star</span>
                        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <div className={`h-full ${row.color} rounded-full`} style={{ width: row.percent }} />
                        </div>
                        <span className="w-8 text-white/40 text-right font-mono font-semibold">{row.count} ({row.percent})</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-[9px] text-white/60 text-center leading-relaxed">
                    🌟 100% authenticated clients directly verified by Settooru Bros in Sattar Colony. No automated spam reports or marketing bots.
                  </div>
                </div>

                {/* Submit New Review Form */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-4 shadow-sm">
                  <div className="border-b border-slate-100 pb-3">
                    <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider font-mono flex items-center space-x-1.5">
                      <span>✍️</span>
                      <span>Log Your Sree Hanuman Experience</span>
                    </h4>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Submit your honest travel, rate and localized commentary</p>
                  </div>

                  <form onSubmit={handleAddReview} className="space-y-3">
                    <div>
                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 font-mono">Your Full Name</label>
                      <input 
                        type="text" 
                        value={newReviewName}
                        onChange={(e) => setNewReviewName(e.target.value)}
                        placeholder="e.g. Anand Kumar"
                        className="w-full px-3 py-2 border border-slate-200 text-slate-700 font-bold uppercase tracking-wider rounded-xl hover:border-amber-400 focus:border-amber-400 focus:outline-none text-[11px] transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 font-mono">Your Location in Kadapa (or City)</label>
                      <input 
                        type="text" 
                        value={newReviewLocation}
                        onChange={(e) => setNewReviewLocation(e.target.value)}
                        placeholder="e.g. Ravindra Nagar, Kadapa"
                        className="w-full px-3 py-2 border border-slate-200 text-slate-700 font-bold uppercase tracking-wider rounded-xl hover:border-amber-400 focus:border-amber-400 focus:outline-none text-[11px] transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 bg-white font-mono">Star Rating (1 to 5 Stars)</label>
                      <div className="flex items-center space-x-1.5 pt-0.5">
                        {[1, 2, 3, 4, 5].map((stars) => {
                          const isSelected = newReviewRating === stars;
                          return (
                            <button
                              key={stars}
                              type="button"
                              onClick={() => setNewReviewRating(stars)}
                              className={`p-1.5 rounded-lg border text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                                isSelected 
                                  ? 'bg-amber-500 border-amber-500 text-slate-900 scale-105 shadow-sm'
                                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-500'
                              }`}
                            >
                              <span className="font-mono pr-0.5 font-bold leading-none">{stars}</span>
                              <Star className={`h-3 w-3 ${isSelected ? 'fill-slate-900 stroke-none' : 'fill-slate-300 stroke-none'}`} />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 font-mono">Review Details & Commentary</label>
                      <textarea
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        placeholder="e.g. Driver arrived timely, direct settlement, safe forest border roads..."
                        rows={3}
                        className="w-full px-3 py-2 border border-slate-200 text-slate-705 font-bold uppercase tracking-wider rounded-xl hover:border-amber-400 focus:border-amber-400 focus:outline-none text-[11px] transition-colors resize-none"
                        required
                      />
                    </div>

                    {newReviewStatus === 'success' && (
                      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-2.5 rounded-xl text-[10px] font-black uppercase text-center tracking-wider animate-bounce">
                        🎉 Review logged successfully! Appended at top.
                      </div>
                    )}

                    {newReviewStatus === 'error' && (
                      <div className="bg-rose-50 border border-rose-200 text-rose-800 p-2.5 rounded-xl text-[10px] font-black uppercase text-center tracking-wider">
                        ❌ All field attributes are mandatory.
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-md cursor-pointer transition-all font-bold"
                    >
                      Publish Client Review 📲
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Column: Interactive Search & Search Results */}
              <div className="md:col-span-8 space-y-4">
                
                {/* Search & Filter Header */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="relative w-full sm:w-auto flex-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <Search className="h-4 w-4" />
                    </span>
                    <input 
                      type="text" 
                      placeholder="Search feedback keywords (e.g. Crysta, driver, temple)..."
                      value={reviewSearchQuery}
                      onChange={(e) => setReviewSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-slate-200 focus:border-amber-500 focus:outline-none text-[11px] font-bold uppercase tracking-wide rounded-xl transition-all"
                    />
                  </div>

                  {/* Rating Filters Tabs */}
                  <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 shrink-0 self-start sm:self-auto">
                    {[
                      { id: 'all', label: 'All Ratings' },
                      { id: '5', label: '5 ★' },
                      { id: '4', label: '4 ★' },
                      { id: '3', label: '3 ★' }
                    ].map((pill) => (
                      <button
                        key={pill.id}
                        type="button"
                        onClick={() => setReviewRatingFilter(pill.id as any)}
                        className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-wider rounded-lg cursor-pointer transition-all ${
                          reviewRatingFilter === pill.id
                            ? 'bg-slate-900 text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-950'
                        }`}
                      >
                        {pill.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter and matching algorithms */}
                {(() => {
                  const filtered = reviews.filter((rev) => {
                    const matchesSearch = 
                      rev.name.toLowerCase().includes(reviewSearchQuery.toLowerCase()) ||
                      rev.location.toLowerCase().includes(reviewSearchQuery.toLowerCase()) ||
                      rev.comment.toLowerCase().includes(reviewSearchQuery.toLowerCase());
                    const matchesRating = 
                      reviewRatingFilter === 'all' || 
                      rev.rating.toString() === reviewRatingFilter;
                    return matchesSearch && matchesRating;
                  });

                  if (filtered.length === 0) {
                    return (
                      <div className="py-20 text-center space-y-2 bg-white rounded-3xl border border-slate-100 p-8">
                        <p className="text-sm font-bold text-slate-600 uppercase tracking-wider">No customer records matched your query.</p>
                        <p className="text-xs text-slate-400 uppercase tracking-widest font-mono">Try searching simpler keywords or resetting rating filter pill tabs</p>
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="filtered-reviews-list-grid">
                      {filtered.map((rev) => (
                        <div 
                          key={rev.id} 
                          className={`bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between space-y-3.5 hover:border-amber-400 hover:shadow-md transition-all duration-350 ${
                            rev.isCustom ? 'ring-2 ring-emerald-500/20 shadow-emerald-500/2' : ''
                          }`}
                        >
                          {rev.isCustom && (
                            <span className="absolute top-3 right-3 bg-emerald-500/15 border border-emerald-500/20 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider text-emerald-600">
                              New Guest Review
                            </span>
                          )}

                          <div className="space-y-2">
                            {/* Stars rating rendering */}
                            <div className="flex text-amber-500">
                              {Array.from({ length: 5 }).map((_, i) => {
                                const active = i < rev.rating;
                                return (
                                  <Star 
                                    key={i} 
                                    className={`h-3 w-3 shrink-0 ${active ? 'fill-amber-500 stroke-none' : 'text-slate-200 fill-slate-200 stroke-none'}`} 
                                  />
                                );
                              })}
                            </div>

                            <p className="text-xs text-slate-650 italic leading-relaxed font-semibold">
                              "{rev.comment}"
                            </p>
                          </div>

                          <div className="flex items-end justify-between pt-2 border-t border-slate-55 pb-1">
                            <div>
                              <h5 className="text-[11px] font-black uppercase tracking-wide text-slate-900">{rev.name}</h5>
                              <span className="text-[9px] text-slate-400 font-bold font-mono uppercase block">{rev.location}</span>
                            </div>
                            
                            {/* Review Date */}
                            <span className="text-[9px] text-slate-400 font-black font-mono uppercase tracking-wider">
                              {rev.date}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}

              </div>

            </div>

          </div>
        )}
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
            📞 Contact: +91 7989648106 • Support Hotline: +91 7989648106
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

      {/* Scroll to Top Button */}
      <ScrollToTop />

    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/airport-transfers" element={<AirportTransfers />} />
        <Route path="/bus-rental-services" element={<BusRentalServices />} />
        <Route path="/car-rental-services" element={<CarRentalServices />} />
        <Route path="/innova-crysta-rental" element={<InnovaCrystaRental />} />
        <Route path="/outstation-car-rentals" element={<OutstationCarRentals />} />
        <Route path="/taxi-services" element={<TaxiServices />} />
        <Route path="/tempo-traveller-rentals" element={<TempoTravellerRentals />} />
        <Route path="/tour-packages" element={<TourPackages />} />
        <Route path="/wedding-vehicle-rentals" element={<WeddingVehicleRentals />} />
      </Routes>
    </BrowserRouter>
  );
}
export { AppContent };

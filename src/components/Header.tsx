import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { HanumanLogo } from './HanumanLogo';
import { User, LogOut, Key, Phone, Menu, X, CheckSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onScrollToFleet?: () => void;
  onScrollToContact?: () => void;
  activeTab?: 'explore' | 'dashboard';
  setActiveTab?: (tab: 'explore' | 'dashboard') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onScrollToFleet = () => {},
  onScrollToContact = () => {},
  activeTab = 'explore',
  setActiveTab = () => {}
}) => {
  const navigate = useNavigate();
  // Scrolled state for glassmorphic navbar dynamics
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/90 backdrop-blur-md py-3 shadow-lg border-b border-orange-500/10' 
          : 'bg-slate-950/95 py-4 border-b border-white/5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo with Hanuman face */}
        <div
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => { navigate('/'); setActiveTab('explore'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <HanumanLogo size="md" className="group-hover:scale-105 transition-transform duration-300" />
          
          <div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-white leading-none uppercase" id="brand-name">
              Sree Hanuman <span className="text-orange-500 block sm:inline">Travels</span>
            </h1>
            <span className="text-[8px] sm:text-[9px] font-black tracking-[0.2em] text-white/40 uppercase block mt-1 hover:text-white/60 transition-colors">
              KADAPA • PRO: SETTOORU BROS
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 bg-white/5 rounded-full p-1 border border-white/10">
          <button 
            onClick={() => { 
              setActiveTab('explore'); 
              window.scrollTo({ top: 0, behavior: 'smooth' }); 
              setMobileMenuOpen(false); 
            }}
            className="px-3.5 py-1.5 text-xs font-black uppercase tracking-wider transition-all rounded-full cursor-pointer text-white/80 hover:text-white hover:bg-white/5"
          >
            Home
          </button>

          <button 
            onClick={() => { 
              setActiveTab('explore'); 
              setMobileMenuOpen(false); 
              setTimeout(() => {
                document.getElementById('structure-explorer-section')?.scrollIntoView({ behavior: 'smooth' });
                window.dispatchEvent(new CustomEvent('sree-hanuman-set-main-category', { detail: { mainId: 'vehicles' } }));
              }, 50);
            }}
            className="px-3.5 py-1.5 text-xs font-black uppercase tracking-wider transition-all rounded-full cursor-pointer text-white/80 hover:text-white hover:bg-white/5"
          >
            Vehicles
          </button>

          <div className="relative group">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="px-3.5 py-1.5 text-xs font-black uppercase tracking-wider transition-all rounded-full cursor-pointer text-white/80 hover:text-white hover:bg-white/5"
            >
              Services
            </button>
            {servicesOpen && (
              <div className="absolute top-full mt-2 left-0 bg-slate-900 border border-white/10 rounded-lg shadow-xl z-50 min-w-max">
                <a href="/car-rental-services" className="block px-4 py-2 text-xs text-white/80 hover:text-white hover:bg-white/5 rounded-t-lg">Car Rental</a>
                <a href="/taxi-services" className="block px-4 py-2 text-xs text-white/80 hover:text-white hover:bg-white/5">Taxi Services</a>
                <a href="/airport-transfers" className="block px-4 py-2 text-xs text-white/80 hover:text-white hover:bg-white/5">Airport Transfers</a>
                <a href="/outstation-car-rentals" className="block px-4 py-2 text-xs text-white/80 hover:text-white hover:bg-white/5">Outstation Rentals</a>
                <a href="/bus-rental-services" className="block px-4 py-2 text-xs text-white/80 hover:text-white hover:bg-white/5">Bus Rental</a>
                <a href="/tempo-traveller-rentals" className="block px-4 py-2 text-xs text-white/80 hover:text-white hover:bg-white/5">Tempo Traveller</a>
                <a href="/innova-crysta-rental" className="block px-4 py-2 text-xs text-white/80 hover:text-white hover:bg-white/5">Innova Crysta</a>
                <a href="/wedding-vehicle-rentals" className="block px-4 py-2 text-xs text-white/80 hover:text-white hover:bg-white/5">Wedding Vehicles</a>
                <a href="/tour-packages" className="block px-4 py-2 text-xs text-white/80 hover:text-white hover:bg-white/5 rounded-b-lg">Tour Packages</a>
              </div>
            )}
          </div>

          <button 
            onClick={() => { 
              setActiveTab('explore'); 
              setMobileMenuOpen(false); 
              setTimeout(() => {
                document.getElementById('structure-explorer-section')?.scrollIntoView({ behavior: 'smooth' });
                window.dispatchEvent(new CustomEvent('sree-hanuman-set-main-category', { detail: { mainId: 'destinations' } }));
              }, 50);
            }}
            className="px-3.5 py-1.5 text-xs font-black uppercase tracking-wider transition-all rounded-full cursor-pointer text-white/80 hover:text-white hover:bg-white/5"
          >
            Destinations
          </button>

          <button 
            onClick={() => { 
              setActiveTab('explore'); 
              onScrollToFleet(); 
              setMobileMenuOpen(false); 
            }}
            className="px-3.5 py-1.5 text-xs font-black uppercase tracking-wider transition-all rounded-full cursor-pointer text-white/80 hover:text-white hover:bg-white/5"
          >
            Fleet
          </button>
          
          <button 
            onClick={() => { 
              setActiveTab('explore'); 
              onScrollToContact(); 
              setMobileMenuOpen(false); 
            }}
            className="px-3.5 py-1.5 text-xs font-black uppercase tracking-wider transition-all rounded-full cursor-pointer text-white/80 hover:text-white hover:bg-white/5"
          >
            Contact
          </button>
        </nav>

        {/* Action Widgets: Call Quick button & Member Auth details */}
        <div className="hidden lg:flex items-center space-x-3">
          
          {/* Header direct call button linking to +91 7989648106 */}
          <a
            href="tel:+917989648106"
            className="flex items-center space-x-2 rounded-full border border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20 px-4 py-2 text-xs font-black text-amber-400 hover:text-amber-300 transition-all font-bold tracking-wider cursor-pointer"
            title="Call Head Office 24/7"
            id="nav-call-hotline"
          >
            <Phone className="h-3.5 w-3.5 animate-bounce" />
            <span>Call +91 7989648106</span>
          </a>
        </div>

        {/* Mobile menu and direct call layout */}
        <div className="flex items-center space-x-3 lg:hidden">
          
          {/* Quick call dialer for mobile header */}
          <a
            href="tel:+917989648106"
            className="flex items-center justify-center h-10 w-10 rounded-full border border-orange-500/30 bg-orange-500/10 text-amber-400 hover:bg-orange-500/20 active:scale-90 transition-all cursor-pointer"
            title="Telephonic support hotline"
          >
            <Phone className="h-4.5 w-4.5" />
          </a>

          {/* Hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
            title="Toggle menus"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Expanded Mobile Menu Drawer panel with beautiful motion styles */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-slate-950 p-4 space-y-3 shadow-2xl animate-fade-in" id="mobile-menu-drawer">
          <nav className="flex flex-col space-y-1">
            <button 
              onClick={() => { 
                setActiveTab('explore'); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
                setMobileMenuOpen(false); 
              }}
              className="w-full text-left px-4 py-3 text-xs font-black uppercase tracking-wider rounded-xl text-white/80 hover:text-white hover:bg-white/5"
            >
              Home
            </button>

            <button 
              onClick={() => { 
                setActiveTab('explore'); 
                setMobileMenuOpen(false); 
                setTimeout(() => {
                  document.getElementById('structure-explorer-section')?.scrollIntoView({ behavior: 'smooth' });
                  window.dispatchEvent(new CustomEvent('sree-hanuman-set-main-category', { detail: { mainId: 'vehicles' } }));
                }, 50);
              }}
              className="w-full text-left px-4 py-3 text-xs font-black uppercase tracking-wider rounded-xl text-white/80 hover:text-white hover:bg-white/5"
            >
              Vehicles
            </button>

            <div className="space-y-2">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="w-full text-left px-4 py-3 text-xs font-black uppercase tracking-wider rounded-xl text-white/80 hover:text-white hover:bg-white/5"
              >
                Services ▼
              </button>
              {servicesOpen && (
                <div className="space-y-1 pl-4">
                  <a href="/car-rental-services" className="block px-4 py-2 text-xs text-white/70 hover:text-white rounded">Car Rental</a>
                  <a href="/taxi-services" className="block px-4 py-2 text-xs text-white/70 hover:text-white rounded">Taxi Services</a>
                  <a href="/airport-transfers" className="block px-4 py-2 text-xs text-white/70 hover:text-white rounded">Airport Transfers</a>
                  <a href="/outstation-car-rentals" className="block px-4 py-2 text-xs text-white/70 hover:text-white rounded">Outstation Rentals</a>
                  <a href="/bus-rental-services" className="block px-4 py-2 text-xs text-white/70 hover:text-white rounded">Bus Rental</a>
                  <a href="/tempo-traveller-rentals" className="block px-4 py-2 text-xs text-white/70 hover:text-white rounded">Tempo Traveller</a>
                  <a href="/innova-crysta-rental" className="block px-4 py-2 text-xs text-white/70 hover:text-white rounded">Innova Crysta</a>
                  <a href="/wedding-vehicle-rentals" className="block px-4 py-2 text-xs text-white/70 hover:text-white rounded">Wedding Vehicles</a>
                  <a href="/tour-packages" className="block px-4 py-2 text-xs text-white/70 hover:text-white rounded">Tour Packages</a>
                </div>
              )}
            </div>

            <button 
              onClick={() => { 
                setActiveTab('explore'); 
                setMobileMenuOpen(false); 
                setTimeout(() => {
                  document.getElementById('structure-explorer-section')?.scrollIntoView({ behavior: 'smooth' });
                  window.dispatchEvent(new CustomEvent('sree-hanuman-set-main-category', { detail: { mainId: 'destinations' } }));
                }, 50);
              }}
              className="w-full text-left px-4 py-3 text-xs font-black uppercase tracking-wider rounded-xl text-white/80 hover:text-white hover:bg-white/5"
            >
              Destinations
            </button>

            <button 
              onClick={() => { 
                setActiveTab('explore'); 
                onScrollToFleet(); 
                setMobileMenuOpen(false); 
              }}
              className="w-full text-left px-4 py-3 text-xs font-black uppercase tracking-wider rounded-xl text-white/80 hover:text-white hover:bg-white/5"
            >
              Our Rental Fleet
            </button>
            
            <button 
              onClick={() => { 
                setActiveTab('explore'); 
                onScrollToContact(); 
                setMobileMenuOpen(false); 
              }}
              className="w-full text-left px-4 py-3 text-xs font-black uppercase tracking-wider rounded-xl text-white/80 hover:text-white hover:bg-white/5"
            >
              Contact Branch
            </button>
          </nav>

          {/* Quick Support Line details in Drawer */}
          <div className="pt-3 border-t border-white/10">
            <a
              href="tel:+917989648106"
              className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-orange-600/20 text-xs text-amber-400 border border-orange-500/30 font-black uppercase tracking-wider text-center"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Call Owner Desk</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

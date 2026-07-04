import React, { useEffect } from 'react';
import { Phone, MapPin, CheckCircle, Star, ArrowRight } from 'lucide-react';
import { updatePageMeta } from '../data/seoMeta';

interface ServicePageProps {
  title: string;
  headline: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  features: string[];
  vehicles: string[];
}

export function ServicePage({
  title,
  headline,
  description,
  metaTitle,
  metaDescription,
  keywords,
  features,
  vehicles,
}: ServicePageProps) {
  useEffect(() => {
    updatePageMeta({
      title: metaTitle,
      description: metaDescription,
      keywords: keywords.join(', '),
    });
    window.scrollTo(0, 0);
  }, [metaTitle, metaDescription, keywords]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 py-20 px-4 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-orange-600/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl animate-pulse"></div>

        <div className="mx-auto max-w-5xl text-center relative z-10 space-y-8">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="inline-flex items-center space-x-2 rounded-full bg-orange-500/10 border border-orange-500/30 px-4 py-2 text-xs text-amber-400 font-bold tracking-wider uppercase">
              <span>KADAPA • SREE HANUMAN TRAVELS</span>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-white uppercase">
              {title} <span className="text-orange-500">Kadapa</span>
            </h1>
            <div className="h-1 w-28 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
          </div>

          <p className="text-sm sm:text-lg text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
            {headline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-lg mx-auto">
            <a
              href="tel:+917989648106"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-4 text-xs font-black uppercase tracking-widest text-slate-950 hover:from-amber-400 hover:to-orange-500 shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </a>
            
            <a
              href="https://wa.me/917989648106"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-8 py-4 text-xs font-black uppercase tracking-widest text-slate-200 hover:text-white transition-all"
            >
              <span>WhatsApp</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">
            📍 Sattar Colony, Ravindra Nagar, Kadapa
          </p>
        </div>
      </section>

      {/* Content Section */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Description */}
        <div className="prose prose-slate max-w-none">
          <h2 className="text-3xl font-black text-slate-900 uppercase mb-6">About Our Service</h2>
          <p className="text-base text-slate-700 leading-relaxed mb-6">{description}</p>
        </div>

        {/* Key Features */}
        <div>
          <h2 className="text-3xl font-black text-slate-900 uppercase mb-8">Why Choose Sree Hanuman Travels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start space-x-4 p-4 rounded-lg bg-white border border-slate-200">
                <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <p className="text-slate-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Available Vehicles */}
        <div>
          <h2 className="text-3xl font-black text-slate-900 uppercase mb-8">Available Vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vehicles.map((vehicle, i) => (
              <div
                key={i}
                className="p-4 rounded-lg bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200"
              >
                <p className="font-bold text-slate-900">{vehicle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white text-center space-y-6">
          <h2 className="text-2xl font-black uppercase">Ready to Book?</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Contact Sree Hanuman Travels today for reliable, affordable, and professional transportation services in Kadapa.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:+917989648106" className="inline-flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 px-8 py-3 rounded-lg font-bold transition">
              <Phone className="h-4 w-4" />
              <span>+91 7989648106</span>
            </a>
            <a href="https://wa.me/917989648106" className="inline-flex items-center space-x-2 border border-white/30 hover:bg-white/10 px-8 py-3 rounded-lg font-bold transition">
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

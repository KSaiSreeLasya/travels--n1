import React from 'react';
import { ServicePage } from './ServicePage';

export function BusRentalServices() {
  return (
    <ServicePage
      title="Bus Rental Services"
      headline="Large group transportation solutions with our premium bus rental services. Mini buses, luxury coaches, and school buses available."
      description="Sree Hanuman Travels provides comprehensive bus rental services for large groups in Kadapa and surrounding regions. Our buses are perfect for corporate events, school tours, wedding processions, religious pilgrimages, and group travel. We maintain a fleet of well-equipped buses with comfortable seating, air-conditioning, and modern entertainment systems. Our experienced drivers are trained in long-distance travel and group management."
      metaTitle="Bus Rental Kadapa | Mini Bus & Luxury Coach Rental"
      metaDescription="Bus rental services in Kadapa. Mini bus, luxury bus, school bus rental. Group travel, weddings, tours. Professional drivers, competitive rates. Call +91 7989648106"
      keywords={[
        "bus rental kadapa",
        "mini bus rental kadapa",
        "luxury bus rental kadapa",
        "tour bus kadapa",
        "school bus rental kadapa",
        "wedding bus rental kadapa",
        "group bus rental kadapa"
      ]}
      features={[
        "Fleet of well-maintained buses",
        "Comfortable seating for 20-50+ passengers",
        "Air-conditioning and climate control",
        "Professional and experienced drivers",
        "Competitive group rental rates",
        "Flexible rental periods available",
        "Perfect for tours, weddings, corporate events"
      ]}
      vehicles={[
        "20-Seater Mini Bus - Group Travel",
        "30-Seater Luxury Coach - Premium",
        "45-Seater Intercity Bus - Large Groups",
        "50-Seater Tour Bus - Extended Tours"
      ]}
    />
  );
}

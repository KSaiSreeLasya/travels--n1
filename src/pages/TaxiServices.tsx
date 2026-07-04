import React from 'react';
import { ServicePage } from './ServicePage';

export function TaxiServices() {
  return (
    <ServicePage
      title="Taxi Services"
      headline="Reliable taxi booking and cab services in Kadapa for daily commutes, airport pickups, and local travel with professional drivers."
      description="Sree Hanuman Travels offers reliable and affordable taxi services throughout Kadapa and nearby areas. Our experienced taxi operators provide safe, comfortable, and punctual transportation for all your local travel needs. Whether you need a quick city ride, airport pickup, railway station transfer, or daily commuting, we are available 24/7 to serve you. All our taxis are regularly maintained and sanitized."
      metaTitle="Taxi Service Kadapa | Cab Booking & Taxi Booking Kadapa"
      metaDescription="Best taxi service in Kadapa. Book cabs online 24/7. Affordable cab booking, airport taxi, taxi near me. Professional drivers. Call +91 7989648106"
      keywords={[
        "taxi service kadapa",
        "taxi booking kadapa",
        "cab booking kadapa",
        "cab service kadapa",
        "cab rental kadapa",
        "taxi near me",
        "cab near me",
        "24 hours taxi kadapa",
        "24/7 cab service kadapa",
        "airport taxi kadapa"
      ]}
      features={[
        "24/7 taxi availability",
        "Professional and courteous drivers",
        "GPS tracking for safety and transparency",
        "Competitive and transparent pricing",
        "Easy online booking and cancellation",
        "Clean and sanitized vehicles",
        "Experienced in local Kadapa routes"
      ]}
      vehicles={[
        "Swift Dzire - 4 Seater Economy Taxi",
        "Maruti Ciaz - 5 Seater Comfort Taxi",
        "Toyota Fortuner - 7 Seater Premium Taxi"
      ]}
    />
  );
}

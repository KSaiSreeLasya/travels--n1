import React from 'react';
import { ServicePage } from './ServicePage';

export function AirportTransfers() {
  return (
    <ServicePage
      title="Airport Transfers"
      headline="Reliable airport taxi and transfer services to Bengaluru, Chennai, Hyderabad airports from Kadapa with punctual drivers and affordable rates."
      description="Sree Hanuman Travels specializes in airport transfer services from Kadapa to major airports including Bengaluru Kempegowda International, Chennai International, and Hyderabad Rajiv Gandhi International. Our drivers are experienced in airport routes and ensure timely pickups and drop-offs. We track flight timings to accommodate delays and provide a stress-free airport transfer experience. All vehicles are well-maintained and equipped with GPS for safety."
      metaTitle="Airport Taxi Kadapa | Airport Transfer Kadapa | Airport Pickup"
      metaDescription="Airport taxi Kadapa. Airport transfers to Bengaluru, Chennai, Hyderabad. Professional drivers, on-time service. Call +91 7989648106"
      keywords={[
        "airport taxi kadapa",
        "airport transfer kadapa",
        "kadapa airport taxi",
        "airport pickup kadapa",
        "airport drop kadapa",
        "airport car rental kadapa",
        "bangalore airport taxi from kadapa",
        "chennai airport taxi from kadapa",
        "hyderabad airport taxi from kadapa"
      ]}
      features={[
        "Professional drivers experienced in airport routes",
        "Punctual pickups and drop-offs",
        "Flight tracking for timely service",
        "Well-maintained and sanitized vehicles",
        "Transparent and competitive pricing",
        "24/7 airport transfer availability",
        "GPS-enabled vehicles for safety"
      ]}
      vehicles={[
        "Swift Dzire - 4 Seater Sedan",
        "Toyota Fortuner - 7 Seater SUV",
        "Toyota Innova Crysta - 7+1 Seater Premium"
      ]}
    />
  );
}

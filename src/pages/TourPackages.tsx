import React from 'react';
import { ServicePage } from './ServicePage';

export function TourPackages() {
  return (
    <ServicePage
      title="Tour Packages"
      headline="Guided tour packages from Kadapa including temple tours, adventure packages, and destination packages with professional drivers and guides."
      description="Sree Hanuman Travels offers curated tour packages from Kadapa to popular destinations including Tirupati, Srisailam, Horsley Hills, Gandikota, and other tourist hotspots. Our packages include temple tours, adventure trips, nature exploration, and destination tours. All packages are customizable based on your preferences and budget. We provide comfortable transportation, experienced drivers familiar with routes, and optional local guide services."
      metaTitle="Tour Packages Kadapa | Temple Tours & Destination Packages"
      metaDescription="Tour packages from Kadapa. Temple tours, adventure packages, destination tours. Tirupati, Srisailam, Horsley Hills. Call +91 7989648106"
      keywords={[
        "tour packages kadapa",
        "temple tour kadapa",
        "tirupati tour package kadapa",
        "weekend tour packages kadapa",
        "adventure tour packages kadapa",
        "destination tour packages kadapa"
      ]}
      features={[
        "Customizable tour packages",
        "Experienced drivers and local guides",
        "Comfortable and sanitized vehicles",
        "Flexible itinerary planning",
        "Competitive package pricing",
        "Temple tour specialization",
        "Adventure and leisure tour options"
      ]}
      vehicles={[
        "Sedan - Individual/Couple Tours",
        "SUV - Small Family Tours",
        "Tempo Traveller - Group Tours",
        "Luxury Bus - Large Group Tours"
      ]}
    />
  );
}

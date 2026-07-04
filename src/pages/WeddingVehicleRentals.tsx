import React from 'react';
import { ServicePage } from './ServicePage';

export function WeddingVehicleRentals() {
  return (
    <ServicePage
      title="Wedding Vehicle Rentals"
      headline="Premium wedding transportation services with luxury cars, buses, and tempo travellers for groom, family, and guests."
      description="Sree Hanuman Travels offers specialized wedding vehicle rental services for all your marriage-related transportation needs. From the groom's entry vehicle to guest transportation and family travel, we provide a complete fleet solution. Our vehicles are decoratively arranged, professionally maintained, and driven by courteous drivers trained in wedding logistics. We coordinate pickup and drop-off timings for multiple venues ensuring seamless guest management."
      metaTitle="Wedding Vehicle Rental Kadapa | Wedding Car & Bus Rental"
      metaDescription="Wedding vehicle rental in Kadapa. Premium cars, buses, tempo for weddings. Groom entry, guest transport. Professional service. Call +91 7989648106"
      keywords={[
        "wedding vehicle rental kadapa",
        "wedding car rental kadapa",
        "wedding bus rental kadapa",
        "wedding tempo rental kadapa",
        "wedding transportation kadapa",
        "groom wedding car kadapa"
      ]}
      features={[
        "Premium and well-decorated vehicles",
        "Professional and courteous drivers",
        "Coordination of multi-vehicle logistics",
        "Flexible timing for wedding schedules",
        "Competitive wedding event rates",
        "Guest accommodation and transport planning",
        "Experience in large-scale wedding transportation"
      ]}
      vehicles={[
        "Luxury Sedan - Groom Entry Vehicle",
        "SUV Fleet - Family Transportation",
        "Tempo Traveller - Guest Transport",
        "Luxury Bus - Large Group Transportation"
      ]}
    />
  );
}

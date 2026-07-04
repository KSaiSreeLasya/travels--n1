import React from 'react';
import { ServicePage } from './ServicePage';

export function OutstationCarRentals() {
  return (
    <ServicePage
      title="Outstation Car Rentals"
      headline="One-way and round-trip outstation car rental services for intercity travel from Kadapa to Bangalore, Chennai, Hyderabad, and beyond."
      description="Sree Hanuman Travels provides reliable outstation car rental services for long-distance travel from Kadapa. Whether you need a one-way transfer or round-trip rental, we offer flexible options with competitive rates. Our experienced drivers are trained for long-distance driving and familiar with major routes to Bangalore, Chennai, Hyderabad, Tirupati, and other cities. All vehicles are well-maintained and equipped with modern amenities for comfortable long journeys."
      metaTitle="Outstation Car Rental Kadapa | One Way & Round Trip Car Hire"
      metaDescription="Outstation car rental Kadapa. One-way, round-trip. Intercity travel to Bangalore, Chennai, Hyderabad. Professional drivers. Call +91 7989648106"
      keywords={[
        "outstation car rental kadapa",
        "outstation taxi kadapa",
        "outstation cab kadapa",
        "one way taxi kadapa",
        "round trip taxi kadapa",
        "long distance taxi kadapa",
        "intercity taxi kadapa"
      ]}
      features={[
        "One-way and round-trip rental options",
        "Experienced long-distance drivers",
        "Well-maintained and comfortable vehicles",
        "Transparent pricing with no hidden charges",
        "Flexible booking and cancellation",
        "GPS-enabled vehicles for safety",
        "Ideal for intercity and outstation travel"
      ]}
      vehicles={[
        "Swift Dzire - 4 Seater Economy",
        "Maruti Ciaz - 5 Seater Comfort",
        "Toyota Fortuner - 7 Seater Premium",
        "Toyota Innova Crysta - 7+1 Seater Luxury"
      ]}
    />
  );
}

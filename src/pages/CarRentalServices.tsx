import React from 'react';
import { ServicePage } from './ServicePage';

export function CarRentalServices() {
  return (
    <ServicePage
      title="Car Rental Services"
      headline="Professional and affordable car rental services in Kadapa with experienced drivers, sanitized vehicles, and 24/7 customer support."
      description="Sree Hanuman Travels provides premium car rental services across Kadapa and surrounding areas. Whether you need a vehicle for a day trip, weekend getaway, or extended travel, we offer a diverse fleet of well-maintained cars with professional drivers. Our services include city commuting, airport transfers, outstation tours, and special event transportation. All vehicles undergo regular sanitization and maintenance to ensure your safety and comfort."
      metaTitle="Car Rental Kadapa | Best Car Rental Services in Kadapa"
      metaDescription="Professional car rental services in Kadapa. Book affordable cars with experienced drivers. 24/7 booking, airport transfers, outstation tours. Call +91 7989648106"
      keywords={[
        "car rental kadapa",
        "car rental in kadapa",
        "rental cars kadapa",
        "best car rental kadapa",
        "affordable car rental kadapa",
        "car hire kadapa",
        "car rental near me",
        "taxi service kadapa"
      ]}
      features={[
        "Well-maintained fleet of sedans and SUVs",
        "Professional and experienced drivers",
        "24/7 availability and customer support",
        "Transparent pricing with no hidden charges",
        "Regular vehicle sanitization and maintenance",
        "Airport and railway station transfers",
        "Flexible booking and cancellation policies"
      ]}
      vehicles={[
        "Swift Dzire - 4 Seater Sedan",
        "Maruti Ciaz - 5 Seater Sedan",
        "Toyota Fortuner - 7 Seater SUV",
        "Toyota Innova Crysta - 7+1 Seater Premium"
      ]}
    />
  );
}

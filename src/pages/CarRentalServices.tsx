import React from 'react';
import { ServicePage } from './ServicePage';

export function CarRentalServices() {
  return (
    <ServicePage
      title="Car Rental Services"
      headline="Professional and affordable car rental services in Kadapa with experienced drivers, sanitized vehicles, and 24/7 customer support."
      description="Sree Hanuman Travels provides premium car rental services across Kadapa and surrounding areas. Whether you need a vehicle for a day trip, weekend getaway, or extended travel, we offer a diverse fleet of well-maintained cars with professional drivers. Our services include city commuting, airport transfers, outstation tours, and special event transportation. All vehicles undergo regular sanitization and maintenance to ensure your safety and comfort."
      metaTitle="Daily & Outstation Car Rental Services | Sree Hanuman Travels Kadapa"
      metaDescription="Daily and outstation car rental services from Kadapa with professional drivers, airport transfers, family trips and flexible booking. Call +91 7989648106."
      keywords={[
       "daily car rental kadapa",
      "outstation car rental kadapa",
      "airport car rental kadapa",
      "family car rental kadapa",
      "driver car rental kadapa",
      "self drive alternative kadapa",
      "weekend car rental kadapa",
      "professional driver kadapa"
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

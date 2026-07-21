export interface PageMeta {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
}

export const SEO_META_DATA: Record<string, PageMeta> = {
  home: {
  title: "Car Rentals in Kadapa | Taxi, Bus & Tempo Traveller | Sree Hanuman Travels",

  description:
    "Sree Hanuman Travels offers affordable car rentals in Kadapa, taxi services, bus rentals, Tempo Traveller rentals, Innova Crysta, airport transfers, corporate travel and outstation trips. Available 24/7.",

  canonical: "https://sreehanumantravels.co.in/",

  keywords:
    "car rentals in kadapa, taxi service kadapa, bus rental kadapa, tempo traveller rental kadapa, innova crysta rental kadapa, airport taxi kadapa, outstation taxi kadapa",
},
  carRentalServices: {
    title: "Daily & Outstation Car Rental Services | Sree Hanuman Travels Kadapa",
    description: "Hire AC cars, Innova Crysta, SUVs, luxury vehicles, and economy cars in Kadapa. Flexible hourly, daily, and monthly rental plans available.",
    canonical: "https://sreehanumantravels.co.in/car-rental-services",
    keywords: "Daily Car Rental Kadapa, Outstation Car Rental Kadapa, Airport Car Rental Kadapa, Driver Car Rental Kadapa",
  },
  taxiServices: {
    title: "24 Hours Taxi Services in Kadapa | Local & Outstation Cabs",
    description: "Affordable taxi services in Kadapa for local travel, airport transfers, corporate trips, and outstation journeys. Easy online booking and professional drivers.",
    canonical: "https://sreehanumantravels.co.in/taxi-services",
    keywords: "Taxi Services Kadapa, 24 Hours Taxi, Local Cabs, Outstation Taxi Kadapa",
  },
  tempoTravellerRentals: {
    title: "Tempo Traveller Rental in Kadapa | AC Traveller & Urbania Hire",
    description: "Book AC Tempo Travellers, Force Urbania, and group travel vehicles in Kadapa for family trips, pilgrimages, weddings, and corporate tours.",
    canonical: "https://sreehanumantravels.co.in/tempo-traveller-rentals",
    keywords: "Tempo Traveller Kadapa, Force Urbania Rental, Group Travel Vehicles",
  },
  busRentalServices: {
    title: "Bus Rentals in Kadapa | AC Mini Bus & Luxury Bus on Rent",
    description: "Rent mini buses, luxury buses, and tourist coaches in Kadapa. Available for weddings, corporate events, educational tours, and group travel.",
    canonical: "https://sreehanumantravels.co.in/bus-rental-services",
    keywords: "Bus Rental Kadapa, Mini Bus Hire, Luxury Bus Rental, Tourist Coach",
  },
  airportTransfers: {
    title: "Kadapa Airport Taxi & Car Rental Services | Airport Transfers",
    description: "Reliable airport pickup and drop services from Kadapa Airport. Comfortable taxis and car rentals available 24/7 with professional drivers.",
    canonical: "https://sreehanumantravels.co.in/airport-transfers",
    keywords: "Airport Taxi Kadapa, Airport Transfer, Kadapa Airport Cab Service",
  },
  weddingVehicleRentals: {
    title: "Wedding Car & Bus Rentals in Kadapa | Sree Hanuman Travels",
    description: "Book luxury wedding cars, AC buses, mini buses, and tempo travellers for weddings and special occasions in Kadapa at competitive prices.",
    canonical: "https://sreehanumantravels.co.in/wedding-vehicle-rentals",
    keywords: "Wedding Car Rental Kadapa, Wedding Bus Rental, Luxury Cars Wedding",
  },
  tourPackages: {
    title: "Tour Packages from Kadapa | Family Trips, Temple Tours & Holidays",
    description: "Explore customized tour packages from Kadapa including Tirupati, Ahobilam, Gandikota, Yaganti, Mahanandi, and other popular destinations.",
    canonical: "https://sreehanumantravels.co.in/tour-packages",
    keywords: "Tour Packages Kadapa, Temple Tours, Holiday Packages, Tirupati Tour",
  },
  outstationCarRentals: {
    title: "Outstation Taxi Services in Kadapa | One Way & Round Trips",
    description: "Book outstation cabs from Kadapa to Hyderabad, Bangalore, Chennai, Vijayawada, Ooty, Shirdi, and more. Safe, affordable, and comfortable travel.",
    canonical: "https://sreehanumantravels.co.in/outstation-car-rentals",
    keywords: "Outstation Cab Kadapa, One Way Taxi, Outstation Car Rental",
  },
  innovaCrystaRental: {
    title: "Toyota Innova Crysta Rental in Kadapa | Premium Car Hire",
    description: "Rent Toyota Innova Crysta in Kadapa for family trips, business travel, airport transfers, and long-distance journeys with experienced drivers.",
    canonical: "https://sreehanumantravels.co.in/innova-crysta-rental",
    keywords: "Innova Crysta Kadapa, Premium Car Rental, Innova Rental Service",
  },
  corporateTravelServices: {
    title: "Corporate Car Rental Services in Kadapa | Business Travel Solutions",
    description: "Professional corporate car rental and employee transportation services in Kadapa. Flexible plans for businesses, meetings, and events.",
    canonical: "https://sreehanumantravels.co.in/corporate-travel-services",
    keywords: "Corporate Car Rental, Business Travel Kadapa, Corporate Transportation",
  },
  templeTourServices: {
    title: "Temple Tour Taxi Services from Kadapa | Tirupati, Srisailam & More",
    description: "Book temple tour cabs from Kadapa to Tirupati, Srisailam, Ahobilam, Kanipakam, Srikalahasti, and other spiritual destinations.",
    canonical: "https://sreehanumantravels.co.in/temple-tour-services",
    keywords: "Temple Tour Taxi Kadapa, Tirupati Temple Cab, Religious Tour",
  },
  monthlyCarRental: {
    title: "Monthly Car Rental in Kadapa | Affordable Long-Term Car Hire",
    description: "Get cost-effective monthly car rental services in Kadapa for personal, corporate, and long-term transportation requirements.",
    canonical: "https://sreehanumantravels.co.in/monthly-car-rental",
    keywords: "Monthly Car Rental Kadapa, Long-Term Car Hire, Affordable Car Rental",
  },
  luxuryVehicleRentals: {
    title: "Luxury Vehicle Rentals in Kadapa | Premium Cars & SUVs",
    description: "Travel in comfort with luxury cars, SUVs, Innova Crysta, Urbania, and luxury buses available for rent in Kadapa.",
    canonical: "https://sreehanumantravels.co.in/luxury-vehicle-rentals",
    keywords: "Luxury Vehicle Rental Kadapa, Premium SUV Rental Kadapa, Luxury Car Hire Kadapa, Wedding Luxury Cars",
  },
  contact: {
    title: "Contact Sree Hanuman Travels Kadapa | Taxi & Car Booking",
    description: "Contact Sree Hanuman Travels for taxi booking, car rentals, bus rentals, airport transfers, and tour packages in Kadapa. Available 24/7.",
    canonical: "https://sreehanumantravels.co.in/contact",
    keywords: "Contact Sree Hanuman Travels, Book Taxi Kadapa, Car Rental Inquiry",
  },
};

export function updatePageMeta(meta: PageMeta): void {
  // Update title
  document.title = meta.title;

  // Update or create meta description
  let descriptionMeta = document.querySelector('meta[name="description"]');
  if (!descriptionMeta) {
    descriptionMeta = document.createElement('meta');
    descriptionMeta.setAttribute('name', 'description');
    document.head.appendChild(descriptionMeta);
  }
  descriptionMeta.setAttribute('content', meta.description);

  // Update or create keywords meta
  if (meta.keywords) {
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsMeta);
    }
    keywordsMeta.setAttribute('content', meta.keywords);
  }

  // Update or create canonical link
  if (meta.canonical) {
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', meta.canonical);
  }

  // Update Open Graph tags
  const updateOGMeta = (property: string, content: string) => {
    let ogMeta = document.querySelector(`meta[property="${property}"]`);
    if (!ogMeta) {
      ogMeta = document.createElement('meta');
      ogMeta.setAttribute('property', property);
      document.head.appendChild(ogMeta);
    }
    ogMeta.setAttribute('content', content);
  };

  updateOGMeta('og:title', meta.title);
  updateOGMeta('og:description', meta.description);
  if (meta.canonical) {
    updateOGMeta('og:url', meta.canonical);
  }

  // Scroll to top on page change
  window.scrollTo(0, 0);
}

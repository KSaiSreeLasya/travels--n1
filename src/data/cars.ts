import innovaImg from "../assets/images/toyota_innova_crysta_1781546407050.jpg";
import cruiserImg from "../assets/images/force_cruiser_1781546426691.jpg";
import toofanImg from "../assets/images/force_toofan_1781546441666.jpg";
import smlBusImg from "../assets/images/sml_bus_1781546457511.jpg";
import etiosImg from "../assets/images/toyota_etios_1781546510305.jpg";
import ertigaImg from "../assets/images/suzuki_ertiga_1781546470675.jpg";
import balenoImg from "../assets/images/suzuki_baleno_1781546486902.jpg";

export interface Car {
  id: string;
  name: string;
  type: 'SUV' | 'Hatchback' | 'Sedan' | 'MUV' | 'Bus';
  pricePerDay: number;
  transmission: 'Manual' | 'Automatic';
  fuel: 'Diesel' | 'Petrol' | 'Electric' | 'CNG';
  seats: number;
  image: string;
  mileage: string;
  rating: number;
  features: string[];
}

export const CAR_FLEET: Car[] = [
  {
    id: "innova-classic",
    name: "Toyota Innova Crystal ",
    type: "MUV",
    pricePerDay: 3200,
    transmission: "Manual",
    fuel: "Diesel",
    seats: 7,
    image: "https://cdn.builder.io/api/v1/image/assets%2F2f195b82614d46a0b777d649ad418b24%2Fea8b4bcbcfab4ffeaee37fd7cccdcb96?format=webp&width=800&height=1200",
    mileage: "8 km/l",
    rating: 4.9,
    features: ["Equipped with heavy-duty front chrome SHIELD guard bar", "White professional finish", "Experienced outstation driver option", "Rooftip luggage carrier available", "Perfect for long family pilgrimages"]
  },
  {
    id: " Etios Sedan ",
    name: "Toyota Etios Sedan  (4+1 Seater)",
    type: "MUV",
    pricePerDay: 4200,
    transmission: "Manual",
    fuel: "Diesel",
    seats: 5,
    image: "https://cdn.builder.io/api/v1/image/assets%2F2f195b82614d46a0b777d649ad418b24%2F953f90c4f39f4c3cb5555a85019d06ee?format=webp&width=1200&height=1800",
    mileage: "13 km/l",
    rating: 4.8,
    features: ["12+1 Spacious layout for groups", "Heavy-duty metal roof luggage carrier rack", "Excellent high ground clearance", "Best-in-class performance for long offroad/rural paths"]
  },
  {
    id: "force-toofan",
    name: "Force Toofan (11+1 Seater)",
    type: "MUV",
    pricePerDay: 4000,
    transmission: "Manual",
    fuel: "Diesel",
    seats: 12,
    image: "https://cdn.builder.io/api/v1/image/assets%2F2f195b82614d46a0b777d649ad418b24%2F510494062f504f169861f97aef2a9987?format=webp&width=800&height=1200",
    mileage: "8 km/l",
    rating: 4.7,
    features: ["11+1 spacious passenger seats", "Clean side-profile TOOFAN signature decals", "Durable all-terrain chassis", "Perfect for Kadapa local & rural group transport"]
  },
  {
    id: "sml-executive-bus",
    name: "SML Isuzu Executive Mini Bus(20+1)",
    type: "Bus",
    pricePerDay: 9500,
    transmission: "Manual",
    fuel: "Diesel",
    seats: 20,
    image: "https://cdn.builder.io/api/v1/image/assets%2F2f195b82614d46a0b777d649ad418b24%2Fe375da286426448dbbeee354d9ade3ec?format=webp&width=1200&height=1800",
    mileage: "4 km/l",
    rating: 4.9,
    features: ["25+1 premium push-back luxury seats", "Full air-conditioned executive coach", "High roof clearance layout", "Digital music & sound system", "Ideal for marriages, tours, and company events"]
  },
  {
    id: "Maruthi ",
    name: "Maruthi Dzire (4+1 seater)",
    type: "MUV",
    pricePerDay: 3800,
    transmission: "Manual",
    fuel: "Diesel",
    seats: 5,
    image: "https://cdn.builder.io/api/v1/image/assets%2F2f195b82614d46a0b777d649ad418b24%2F0065cda0514a4c9b869b357aea759ac5?format=webp&width=1200&height=1800",
    mileage: "13 km/l",
    rating: 4.9,
    features: ["Premium modern body lines", "Rugged matte black front protector bumper shield", "Plush luxury interior captain seats", "Perfect cooling front and rear automatic AC", "First-class highway ride comfort"]
  },
  {
    id: "maruthi-ertiga",
    name: "Maruthi Ertiga (7-Seater)",
    type: "MUV",
    pricePerDay: 2800,
    transmission: "Manual",
    fuel: "Petrol",
    seats: 7,
    image: "https://cdn.builder.io/api/v1/image/assets%2F2f195b82614d46a0b777d649ad418b24%2F59077f5e96b64a6bb27e57e95ca63c34?format=webp&width=1200&height=1800",
    mileage: "10 km/l",
    rating: 4.7,
    features: ["7 Seats compact passenger layout", "Traditional front flower garland ready for auspicious trips", "Highly economical smart-hybrid engine", "Dual blower front & rear cooling vents", "Excellent for city and tourist visits"]
  },
  {
    id: "SML Isuzu Executive Bus",
    name: "SML Isuzu Executive Bus (28 seater)",
    type: "Hatchback",
    pricePerDay: 1800,
    transmission: "Manual",
    fuel: "Petrol",
    seats: 28,
    image: "https://cdn.builder.io/api/v1/image/assets%2F2f195b82614d46a0b777d649ad418b24%2F135a162458884800b2d93b562e6aaf81?format=webp&width=1200&height=1800",
    mileage: "4 km/l",
    rating: 4.6,
    features: ["Beautiful hood red decorative ribbons perfect for weddings", "Sleek projector LED headlights for night travel", "Ultra-maneuverable local hatchback", "Extremely fuel efficient engine", "Smart keyless entry push button start"]
  }
];

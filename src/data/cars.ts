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
    name: "Toyota Innova (Classic with SHIELD Guard)",
    type: "MUV",
    pricePerDay: 3200,
    transmission: "Manual",
    fuel: "Diesel",
    seats: 7,
    image: "https://cdn.builder.io/api/v1/image/assets%2F2f195b82614d46a0b777d649ad418b24%2F594fe5a2ab1e4f25ba78fe7ac3125b9b?format=webp&width=800&height=1200",
    mileage: "12.5 km/l",
    rating: 4.9,
    features: ["Equipped with heavy-duty front chrome SHIELD guard bar", "White professional finish", "Experienced outstation driver option", "Rooftip luggage carrier available", "Perfect for long family pilgrimages"]
  },
  {
    id: "force-cruiser",
    name: "Force Cruiser (12+1 Seater)",
    type: "MUV",
    pricePerDay: 4200,
    transmission: "Manual",
    fuel: "Diesel",
    seats: 13,
    image: "https://cdn.builder.io/api/v1/image/assets%2F2f195b82614d46a0b777d649ad418b24%2F08fc29012269450babae272eb28b0ed0?format=webp&width=800&height=1200",
    mileage: "10.5 km/l",
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
    mileage: "11.0 km/l",
    rating: 4.7,
    features: ["11+1 spacious passenger seats", "Clean side-profile TOOFAN signature decals", "Durable all-terrain chassis", "Perfect for Kadapa local & rural group transport"]
  },
  {
    id: "sml-executive-bus",
    name: "SML Isuzu Executive Bus (25+1)",
    type: "Bus",
    pricePerDay: 9500,
    transmission: "Manual",
    fuel: "Diesel",
    seats: 25,
    image: "https://cdn.builder.io/api/v1/image/assets%2F2f195b82614d46a0b777d649ad418b24%2F047dadc071874fc2af8548c83672b972?format=webp&width=800&height=1200",
    mileage: "8.0 km/l",
    rating: 4.9,
    features: ["25+1 premium push-back luxury seats", "Full air-conditioned executive coach", "High roof clearance layout", "Digital music & sound system", "Ideal for marriages, tours, and company events"]
  },
  {
    id: "innova-crysta",
    name: "Toyota Innova Crysta (Luxury MUV)",
    type: "MUV",
    pricePerDay: 3800,
    transmission: "Manual",
    fuel: "Diesel",
    seats: 7,
    image: "https://cdn.builder.io/api/v1/image/assets%2F2f195b82614d46a0b777d649ad418b24%2Fb2d1196a4e8e4e328139046fe974eb62?format=webp&width=800&height=1200",
    mileage: "13.5 km/l",
    rating: 4.9,
    features: ["Premium modern body lines", "Rugged matte black front protector bumper shield", "Plush luxury interior captain seats", "Perfect cooling front and rear automatic AC", "First-class highway ride comfort"]
  },
  {
    id: "suzuki-ertiga",
    name: "Suzuki Ertiga (7-Seater Comfort)",
    type: "MUV",
    pricePerDay: 2800,
    transmission: "Manual",
    fuel: "Petrol",
    seats: 7,
    image: "https://cdn.builder.io/api/v1/image/assets%2F2f195b82614d46a0b777d649ad418b24%2F6334270d1da149148ab68cf5115a5037?format=webp&width=800&height=1200",
    mileage: "15.0 km/l",
    rating: 4.7,
    features: ["7 Seats compact passenger layout", "Traditional front flower garland ready for auspicious trips", "Highly economical smart-hybrid engine", "Dual blower front & rear cooling vents", "Excellent for city and tourist visits"]
  },
  {
    id: "suzuki-baleno",
    name: "Suzuki Baleno (Marriage Special)",
    type: "Hatchback",
    pricePerDay: 1800,
    transmission: "Manual",
    fuel: "Petrol",
    seats: 5,
    image: "https://cdn.builder.io/api/v1/image/assets%2F2f195b82614d46a0b777d649ad418b24%2Fe17fff9748754b208b37aab9fe771ee0?format=webp&width=800&height=1200",
    mileage: "19.5 km/l",
    rating: 4.6,
    features: ["Beautiful hood red decorative ribbons perfect for weddings", "Sleek projector LED headlights for night travel", "Ultra-maneuverable local hatchback", "Extremely fuel efficient engine", "Smart keyless entry push button start"]
  }
];

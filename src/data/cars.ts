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
    id: "innova-crysta",
    name: "Toyota Innova Crysta",
    type: "MUV",
    pricePerDay: 3500,
    transmission: "Manual",
    fuel: "Diesel",
    seats: 7,
    image: "https://images.unsplash.com/photo-1581540222473-c199e0b17208?auto=format&fit=crop&q=80&w=600",
    mileage: "12.5 km/l",
    rating: 4.9,
    features: ["White Imperial Finish", "Experienced Driver Option", "Carrier Equipped", "Front Shield Guard", "Best for Family Outings"]
  },
  {
    id: "force-cruiser",
    name: "Force Cruiser (12+1)",
    type: "MUV",
    pricePerDay: 4200,
    transmission: "Manual",
    fuel: "Diesel",
    seats: 13,
    image: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=600",
    mileage: "10.5 km/l",
    rating: 4.8,
    features: ["12+1 Seater Passenger Cap", "Heavy Duty Roof Luggage Carrier", "Excellent for Outstation Pilgrimages", "High Ground Clearance"]
  },
  {
    id: "force-toofan",
    name: "Force Toofan (11+1)",
    type: "MUV",
    pricePerDay: 4000,
    transmission: "Manual",
    fuel: "Diesel",
    seats: 12,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600",
    mileage: "11.0 km/l",
    rating: 4.7,
    features: ["11+1 Seater Space", "Sattar Colony Branch Regular", "Perfect for Kadapa Rural Trips", "Durable All-Terrain Chassis"]
  },
  {
    id: "sml-executive-bus",
    name: "SML Executive Passenger Bus",
    type: "Bus",
    pricePerDay: 9500,
    transmission: "Manual",
    fuel: "Diesel",
    seats: 25,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600",
    mileage: "8.0 km/l",
    rating: 4.9,
    features: ["25+1 Luxury Headroom Seats", "Air Conditioned Executive Cab", "Full Integrated Sound System", "Custom Long-Distance Package Deals"]
  },
  {
    id: "toyota-etios",
    name: "Toyota Etios (AP39TD8168)",
    type: "Sedan",
    pricePerDay: 2200,
    transmission: "Manual",
    fuel: "Diesel",
    seats: 5,
    image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=600",
    mileage: "18.5 km/l",
    rating: 4.8,
    features: ["Authorized Kadapa Cab Plate", "Slick Commercial License", "Spacious Luggage Boot", "Superb Air Conditioning", "Great highway stability"]
  },
  {
    id: "suzuki-ertiga",
    name: "Suzuki Ertiga Family Comfort",
    type: "MUV",
    pricePerDay: 2800,
    transmission: "Manual",
    fuel: "Petrol",
    seats: 7,
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600",
    mileage: "15.0 km/l",
    rating: 4.7,
    features: ["7 Seats Compact Layout", "Smart Hybrid Fuel Saving", "Rear AC Vents", "Flexible Cargo Expansion", "Local Tour Friendly"]
  },
  {
    id: "suzuki-baleno",
    name: "Suzuki Baleno Core",
    type: "Hatchback",
    pricePerDay: 1800,
    transmission: "Manual",
    fuel: "Petrol",
    seats: 5,
    image: "https://images.unsplash.com/photo-1627454823403-ff54df8a48b4?auto=format&fit=crop&q=80&w=600",
    mileage: "19.5 km/l",
    rating: 4.6,
    features: ["Compact Design", "Highly Maneuverable", "Powerful Petrol Engine", "Keyless Central Locking", "Super Economical"]
  }
];

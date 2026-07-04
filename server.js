import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from dist
app.use(express.static(path.join(__dirname, 'dist')));

// SEO meta data for service pages
const pageMetadata = {
  '/car-rental-services': {
    title: 'Car Rental Kadapa | Best Car Rental Services in Kadapa',
    description: 'Professional car rental services in Kadapa. Book affordable cars with experienced drivers. 24/7 booking, airport transfers, outstation tours. Call +91 7989648106',
    keywords: 'car rental kadapa,car rental in kadapa,rental cars kadapa,best car rental kadapa'
  },
  '/taxi-services': {
    title: 'Taxi Service Kadapa | Cab Booking & Taxi Booking Kadapa',
    description: 'Best taxi service in Kadapa. Book cabs online 24/7. Affordable cab booking, airport taxi, taxi near me. Professional drivers. Call +91 7989648106',
    keywords: 'taxi service kadapa,taxi booking kadapa,cab booking kadapa,cab service kadapa'
  },
  '/airport-transfers': {
    title: 'Airport Taxi Kadapa | Airport Transfer Kadapa | Airport Pickup',
    description: 'Airport taxi Kadapa. Airport transfers to Bengaluru, Chennai, Hyderabad. Professional drivers, on-time service. Call +91 7989648106',
    keywords: 'airport taxi kadapa,airport transfer kadapa,airport pickup kadapa,airport drop kadapa'
  },
  '/outstation-car-rentals': {
    title: 'Outstation Car Rental Kadapa | One Way & Round Trip Car Hire',
    description: 'Outstation taxi services from Kadapa. One way and round trip rentals to nearby cities. Book now for affordable outstation travel.',
    keywords: 'outstation taxi kadapa,one way taxi kadapa,round trip taxi,outstation car rental'
  },
  '/bus-rental-services': {
    title: 'Bus Rental Kadapa | Mini Bus & Luxury Bus on Rent',
    description: 'Bus rental services in Kadapa. AC mini buses, luxury buses, and tourist coaches for weddings, tours, and groups. Call +91 7989648106',
    keywords: 'bus rental kadapa,mini bus rental,luxury bus rental,coach rental kadapa'
  },
  '/tempo-traveller-rentals': {
    title: 'Tempo Traveller Rental Kadapa | 12 & 17 Seater Tempo Hire',
    description: 'Tempo traveller rental in Kadapa. 12 and 17 seater vehicles for group tours, pilgrimages, and family trips with professional drivers.',
    keywords: 'tempo traveller rental kadapa,tempo hire,group travel vehicles,12 seater tempo'
  },
  '/innova-crysta-rental': {
    title: 'Innova Crysta Rental Kadapa | 7+1 Seater Toyota Rental',
    description: 'Innova Crysta rental in Kadapa. 7+1 seater premium car hire. Family tours, outstation trips. Professional drivers. Call +91 7989648106',
    keywords: 'innova crysta rental kadapa,innova rental kadapa,7 seater rental,premium car hire'
  },
  '/wedding-vehicle-rentals': {
    title: 'Wedding Car Rental Kadapa | Luxury Vehicles for Weddings',
    description: 'Wedding vehicle rentals in Kadapa. Luxury cars, buses, and vehicles for weddings and special events with professional drivers.',
    keywords: 'wedding car rental kadapa,wedding vehicle,luxury car rental,wedding bus'
  },
  '/tour-packages': {
    title: 'Tour Packages Kadapa | Temple Tours & Destination Packages',
    description: 'Tour packages from Kadapa. Temple tours, family packages, and destination tours with comfortable vehicles and professional guides.',
    keywords: 'tour packages kadapa,temple tour,family packages,holiday tour'
  }
};

// Middleware to inject meta tags
app.use((req, res, next) => {
  const metadata = pageMetadata[req.path];
  
  if (metadata) {
    res.locals.pageTitle = metadata.title;
    res.locals.pageDescription = metadata.description;
    res.locals.pageKeywords = metadata.keywords;
    res.locals.canonical = `https://sreehanumantravels.co.in${req.path}`;
  } else {
    res.locals.pageTitle = 'Sree Hanuman Travels Kadapa | Car Rentals, Taxi Services & Bus Rentals';
    res.locals.pageDescription = 'Book reliable car rentals, taxi services, tempo travellers, and bus rentals in Kadapa. 24/7 airport transfers, outstation trips, wedding vehicles, and tour packages at affordable prices.';
    res.locals.pageKeywords = 'Car Rentals Kadapa, Taxi Services Kadapa, Bus Rentals Kadapa, Tempo Traveller Rental Kadapa';
    res.locals.canonical = 'https://sreehanumantravels.co.in/';
  }
  
  next();
});

// Handle SPA routing - serve index.html for all routes
app.get('*', (req, res) => {
  let indexPath = path.join(__dirname, 'dist', 'index.html');
  
  if (!fs.existsSync(indexPath)) {
    return res.status(404).send('index.html not found. Please run: npm run build');
  }
  
  let html = fs.readFileSync(indexPath, 'utf8');
  
  // Inject dynamic meta tags
  if (res.locals.pageDescription || res.locals.pageTitle) {
    html = html.replace(
      /<title>.*?<\/title>/,
      `<title>${res.locals.pageTitle}</title>`
    );
    
    html = html.replace(
      /<meta name="description" content=".*?">/,
      `<meta name="description" content="${res.locals.pageDescription}">`
    );
    
    html = html.replace(
      /<meta name="keywords" content=".*?">/,
      `<meta name="keywords" content="${res.locals.pageKeywords}">`
    );
    
    html = html.replace(
      /<link rel="canonical" href=".*?">/,
      `<link rel="canonical" href="${res.locals.canonical}">`
    );
    
    // Update OG tags
    html = html.replace(
      /<meta property="og:title" content=".*?">/,
      `<meta property="og:title" content="${res.locals.pageTitle}">`
    );
    
    html = html.replace(
      /<meta property="og:description" content=".*?">/,
      `<meta property="og:description" content="${res.locals.pageDescription}">`
    );
    
    html = html.replace(
      /<meta property="og:url" content=".*?">/,
      `<meta property="og:url" content="${res.locals.canonical}">`
    );
  }
  
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`✓ Server running at http://localhost:${PORT}`);
  console.log(`✓ SPA routing configured for React Router`);
  console.log(`✓ Meta tag injection enabled for SEO`);
});

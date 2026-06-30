import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Manual data from projects.js
const allProjects = [
  {
    slug: "mcdonalds-mumbai-t2",
    name: "McDonald's",
    location: "Mumbai International Airport (T2)",
    cost: "₹37.57 Lakh",
    year: 2023,
    status: "Completed",
    category: "Commercial",
    img: "/Mcd.jpg",
    client: "McDonald's India",
    buildingType: "Commercial Fit-out",
    area: "1,200 Sqft",
    duration: "45 days",
    scope: ["Interior fit-out", "Electrical works", "HVAC installation", "Plumbing"],
    description: "Premium fit-out works at Mumbai's international terminal, executed under strict airport authority compliance and live-terminal safety protocols.",
    gallery: { before: [], during: ["/Mcd2.jpg"], after: ["/Mcd.jpg", "/Mcd3.jpg"] },
  },
  {
    slug: "de-fresh-exports-nashik",
    name: "De-Fresh Exports",
    location: "Pimpalgaon Baswant, Nashik",
    cost: "₹2.54 Cr",
    year: 2022,
    status: "Completed",
    category: "Industrial",
    img: "/defresh4.jpg",
    client: "De-Fresh Exports Pvt Ltd",
    buildingType: "Cold Storage & Processing",
    area: "8,000 Sqft",
    duration: "6 months",
    scope: ["Cold storage construction", "Climate control systems", "Industrial flooring", "Processing area build-out"],
    description: "Export-grade cold storage and processing facility with climate-controlled environments and industrial flooring systems.",
    gallery: { before: [], during: ["/defresh.heic", "/defresh2.jpg"], after: ["/defresh3.jpg", "/defresh4.jpg"] },
  },
  {
    slug: "agrospace-dewas",
    name: "Agrospace",
    location: "Dewas, Madhya Pradesh",
    cost: "₹3.82 Cr",
    year: 2023,
    status: "Completed",
    category: "Agricultural",
    img: "/project_warehouse.png",
    client: "Agrospace",
    buildingType: "Agricultural Infrastructure",
    area: "5,200 Sqm",
    duration: "8 months",
    scope: ["Polyhouse trimix flooring (5,200 Sqm)", "884 pole foundations", "Structural steel work", "Site development"],
    description: "Large-scale agricultural infrastructure with polyhouse trimix flooring across 5,200 sqm and 884 pole foundations.",
    gallery: { before: [], during: [], after: [] },
  },
  {
    slug: "foods-and-inns-nashik",
    name: "Foods And Inns Ltd",
    location: "At Post Gonde, Sinnar, Nashik",
    cost: "₹12.53 Cr",
    year: 2024,
    status: "Completed",
    category: "Industrial",
    img: "/Foodandins.jpg",
    client: "Foods And Inns Ltd",
    buildingType: "Industrial Campus",
    area: "23,435 Sqm",
    duration: "12 months",
    scope: ["Admin building (1,500 Sqm)", "Factory roads — M35 Trimix (23,435 Sqm)", "Extraction plant with acid-proof tiles (3,200 Sqm)", "Evaporator foundation (350 Cum concrete)", "Boiler shed & chimney foundation (280 Cum)"],
    highlights: ["1,500 Sqm Admin Building", "23,435 SQM Factory Internal Roads — M35 Trimix", "Extraction Plant — 3,200 Sqm with acid proof tiles", "Evaporator Foundation — 350 Cum concrete", "Boiler Shed & Chimney Foundation — 280 Cum"],
    description: "Flagship industrial campus with admin building, factory roads, extraction plant with acid-proof tiling, evaporator and boiler foundations, and heavy-duty machine mounting structures.",
    gallery: { before: [], during: ["/Foodandins2.jpg"], after: ["/Foodandins.jpg", "/Foodandins3.jpg"] },
  },
  {
    slug: "sahyadri-fpc-nanded",
    name: "Sahyadri Farmer Producer Company Ltd",
    location: "Nanded, Maharashtra",
    cost: "₹14.50 Cr",
    year: 2024,
    status: "Completed",
    category: "Agricultural",
    img: "/Sahyadri4.heic",
    client: "Sahyadri Farmer Producer Company Ltd",
    buildingType: "Agricultural Processing Complex",
    area: "12,675 Sqm",
    duration: "14 months",
    scope: ["Farmers facility center (625 Sqm)", "Polyhouse trimix (5,200 Sqm)", "Cold storage (500 Sqm)", "Warehouses (2,800 + 3,000 Sqm)", "Keylime facility (550 Sqm)"],
    highlights: ["Farmers Facility Center — 625 Sqm", "Polyhouse Trimix — 5,200 Sqm", "Cold Storage — 500 Sqm", "Warehouse — 2,800 Sqm + 3,000 Sqm", "Keylime Facility — 550 Sqm"],
    description: "Comprehensive farmer-producer infrastructure including cold storage, warehousing, polyhouse facilities, and keylime processing plant with acid-proof tiling.",
    gallery: { before: [], during: ["/Sahyadri.heic", "/Sahyadri2.heic"], after: ["/Sahyadri3.heic", "/Sahyadri4.heic"] },
  },
  {
    slug: "dnh-secheron-indore",
    name: "D&H Secheron Electrodes Pvt Ltd",
    location: "Indore, Madhya Pradesh",
    cost: "₹5.50 Cr",
    year: 2024,
    status: "Completed",
    category: "Industrial",
    img: "/secheron.jpg",
    client: "D&H Secheron Electrodes Pvt Ltd",
    buildingType: "R&D Facility",
    area: "540 Sqm",
    duration: "6 months",
    scope: ["R&D building construction (540 Sqm)", "280 anchor bolts installation", "21 pedestals", "81 pile foundations"],
    highlights: ["R&D Building — 540 Sqm", "280 Anchor Bolts", "21 Pedestals", "81 Pile Foundations"],
    description: "High-precision R&D facility with pile foundations, precision pedestal work, and specialized anchor bolt installations for electrode manufacturing.",
    gallery: { before: [], during: ["/secheron2.jpg", "/secheron3.jpg"], after: ["/secheron.jpg", "/secheron5.jpg"] },
  },
  {
    slug: "krishnaveni-fpc-bijapur",
    name: "Krishnaveni Farmer Producer Company",
    location: "Tikota, Bijapur",
    cost: "₹1.52 Cr",
    year: 2023,
    status: "Completed",
    category: "Agricultural",
    img: "/project_warehouse.png",
    client: "Krishnaveni Farmer Producer Company",
    buildingType: "Agricultural Storage",
    area: "3,500 Sqft",
    duration: "5 months",
    scope: ["Processing facility", "Storage construction", "Trimix flooring", "Bolt-down structural systems"],
    description: "Agricultural processing and storage facility with trimix flooring and bolt-down structural systems.",
    gallery: { before: [], during: [], after: [] },
  },
  {
    slug: "kratoss-seaworld-nashik",
    name: "Kratoss Seaworld Shipping",
    location: "Sinnar, Nashik",
    cost: "₹6.20 Cr",
    year: 2026,
    status: "In Progress",
    category: "Industrial",
    img: "/projects_hero.png",
    client: "Kratoss Seaworld Shipping",
    buildingType: "Industrial Facility",
    area: "2.5 Acres",
    duration: "Ongoing",
    scope: ["Complete civil works", "Structural steel erection", "Industrial flooring", "Internal roads", "Drainage systems"],
    description: "Turnkey industrial project spanning 2.5 acres with comprehensive civil works, structural steel, and flooring systems.",
    gallery: { before: [], during: [], after: [] },
  },
  {
    slug: "hb-reality-nashik",
    name: "HB Reality (Osiyan Warehousing)",
    location: "Khatwad Phata, Talegaon, Dindori, Nashik",
    cost: "₹7.27 Cr",
    year: 2026,
    status: "In Progress",
    category: "Warehousing",
    img: "/about_hero.png",
    client: "HB Reality",
    buildingType: "Warehousing Complex",
    area: "10,950 Sqm covered + 9,000 Sqm roads",
    duration: "Ongoing (started Feb 2026)",
    scope: ["Warehouse construction (10,950 Sqm)", "Road infrastructure (9,000 Sqm)", "Foundation work", "Structural steel", "Drainage & utilities"],
    description: "Large-scale warehousing development with 10,950 sqm of covered area plus 9,000 sqm of road infrastructure.",
    gallery: { before: [], during: [], after: [] },
  }
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function seed() {
  console.log('Starting seed...');
  
  // First, check if there's any data
  const { data: existing } = await supabase.from('projects').select('id');
  if (existing && existing.length > 0) {
    console.log('Projects table already contains data. Skipping seed.');
    return;
  }

  // To insert we need a valid session because of RLS.
  // We need to sign in with the admin account the user just created!
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'admin@tengates.com',
    password: process.argv[2] // Password passed as argument
  });

  if (authError) {
    console.error('Auth error! Did you create admin@tengates.com? Provide password as argument.');
    console.error(authError.message);
    process.exit(1);
  }

  const { error } = await supabase.from('projects').insert(allProjects);
  
  if (error) {
    console.error('Error seeding data:', error);
  } else {
    console.log('Successfully seeded projects!');
  }
}

seed();

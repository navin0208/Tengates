import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pszfynpyrxibvwgmtgpt.supabase.co';
const supabaseKey = 'sb_publishable_SEwGS1baPZOlN2Xjbup4qg_RkLVLKey';
const supabase = createClient(supabaseUrl, supabaseKey);

const newProjects = [
  {
    slug: "omkar-agro",
    name: "Omkar Agro",
    location: "Nashik, Maharashtra",
    cost: "₹1.80 Cr",
    year: 2024,
    status: "Completed",
    category: "Agricultural",
    img: "https://images.unsplash.com/photo-1586528116311-ad8ed74514fa?auto=format&fit=crop&q=80&w=1200",
    client: "Omkar Agro Industries",
    buildingType: "Agricultural Processing",
    area: "4,500 Sqft",
    duration: "4 months",
    scope: ["Cold storage unit", "Processing shed", "Trimix flooring", "Internal roads"],
    description: "Agricultural processing and cold storage facility with trimix flooring and internal road infrastructure in Nashik.",
    gallery: { before: [], during: [], after: [] }
  },
  {
    slug: "zudio-nashik",
    name: "Zudio",
    location: "Nashik Road, Maharashtra",
    cost: "₹45 Lakh",
    year: 2024,
    status: "Completed",
    category: "Commercial",
    img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=1200",
    client: "Trent Ltd (Zudio)",
    buildingType: "Retail Fit-out",
    area: "3,200 Sqft",
    duration: "45 days",
    scope: ["Interior civil works", "Flooring", "Electrical conduit", "Façade works"],
    description: "Fast-track retail store fit-out for Zudio on Nashik Road, including interior civil works, flooring, and façade installation.",
    gallery: { before: [], during: [], after: [] }
  },
  {
    slug: "swapnil-agro",
    name: "Swapnil Agro",
    location: "Deola, Maharashtra",
    cost: "₹1.20 Cr",
    year: 2023,
    status: "Completed",
    category: "Agricultural",
    img: "https://images.unsplash.com/photo-1586528116311-ad8ed74514fa?auto=format&fit=crop&q=80&w=1200",
    client: "Swapnil Agro Pvt Ltd",
    buildingType: "Agricultural Storage",
    area: "3,800 Sqft",
    duration: "5 months",
    scope: ["Warehouse construction", "Trimix flooring", "Foundation work", "Drainage systems"],
    description: "Agricultural warehouse and storage facility with trimix flooring and comprehensive drainage systems in Deola.",
    gallery: { before: [], during: [], after: [] }
  },
  {
    slug: "avabeach",
    name: "Avabeach",
    location: "Wadi Varhe, Maharashtra",
    cost: "₹2.10 Cr",
    year: 2024,
    status: "In Progress",
    category: "Commercial",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200",
    client: "Avabeach Resorts",
    buildingType: "Hospitality",
    area: "6,000 Sqft",
    duration: "8 months",
    scope: ["Resort civil works", "Swimming pool construction", "Landscaping foundation", "Utility infrastructure"],
    description: "Beachside resort and hospitality project at Wadi Varhe with pool construction, landscaping, and utility infrastructure.",
    gallery: { before: [], during: [], after: [] }
  },
  {
    slug: "maruti-seva",
    name: "Maruti Seva Automobile",
    location: "Nandurbar, Maharashtra",
    cost: "₹3.50 Cr",
    year: 2024,
    status: "Completed",
    category: "Commercial",
    img: "https://images.unsplash.com/photo-1567449303078-57ad995bd329?auto=format&fit=crop&q=80&w=1200",
    client: "Maruti Seva Automobile",
    buildingType: "Automobile Showroom",
    area: "8,500 Sqft",
    duration: "6 months",
    scope: ["Showroom construction", "Service bay flooring", "Office block", "Parking infrastructure"],
    description: "Full-scale automobile showroom and service center construction with office block and parking infrastructure in Nandurbar.",
    gallery: { before: [], during: [], after: [] }
  },
  {
    slug: "ghoti-maruti-seva",
    name: "Ghoti Maruti Seva",
    location: "Ghoti, Maharashtra",
    cost: "₹2.80 Cr",
    year: 2024,
    status: "Completed",
    category: "Commercial",
    img: "https://images.unsplash.com/photo-1567449303078-57ad995bd329?auto=format&fit=crop&q=80&w=1200",
    client: "Maruti Seva Automobile",
    buildingType: "Automobile Showroom",
    area: "7,200 Sqft",
    duration: "5 months",
    scope: ["Showroom construction", "Workshop flooring", "Admin office", "Customer lounge"],
    description: "Automobile showroom and workshop facility with admin office and customer lounge in Ghoti.",
    gallery: { before: [], during: [], after: [] }
  }
];

async function insert() {
  const { data, error } = await supabase
    .from('projects')
    .upsert(newProjects, { onConflict: 'slug' });
  
  if (error) {
    console.error('Error inserting:', error);
  } else {
    console.log('Successfully inserted/upserted projects!');
  }
}

insert();

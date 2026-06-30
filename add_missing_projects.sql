-- Insert missing projects into the Supabase database
INSERT INTO public.projects (
  slug, name, location, cost, year, status, category, img, client, "buildingType", area, duration, scope, description, gallery
) VALUES 
(
  'omkar-agro', 'Omkar Agro', 'Nashik, Maharashtra', '₹1.80 Cr', 2024, 'Completed', 'Agricultural',
  'https://images.unsplash.com/photo-1586528116311-ad8ed74514fa?auto=format&fit=crop&q=80&w=1200',
  'Omkar Agro Industries', 'Agricultural Processing', '4,500 Sqft', '4 months',
  ARRAY['Cold storage unit', 'Processing shed', 'Trimix flooring', 'Internal roads']::text[],
  'Agricultural processing and cold storage facility with trimix flooring and internal road infrastructure in Nashik.',
  '{"before": [], "during": [], "after": []}'::jsonb
),
(
  'zudio-nashik', 'Zudio', 'Nashik Road, Maharashtra', '₹45 Lakh', 2024, 'Completed', 'Commercial',
  'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=1200',
  'Trent Ltd (Zudio)', 'Retail Fit-out', '3,200 Sqft', '45 days',
  ARRAY['Interior civil works', 'Flooring', 'Electrical conduit', 'Façade works']::text[],
  'Fast-track retail store fit-out for Zudio on Nashik Road, including interior civil works, flooring, and façade installation.',
  '{"before": [], "during": [], "after": []}'::jsonb
),
(
  'swapnil-agro', 'Swapnil Agro', 'Deola, Maharashtra', '₹1.20 Cr', 2023, 'Completed', 'Agricultural',
  'https://images.unsplash.com/photo-1586528116311-ad8ed74514fa?auto=format&fit=crop&q=80&w=1200',
  'Swapnil Agro Pvt Ltd', 'Agricultural Storage', '3,800 Sqft', '5 months',
  ARRAY['Warehouse construction', 'Trimix flooring', 'Foundation work', 'Drainage systems']::text[],
  'Agricultural warehouse and storage facility with trimix flooring and comprehensive drainage systems in Deola.',
  '{"before": [], "during": [], "after": []}'::jsonb
),
(
  'avabeach', 'Avabeach', 'Wadi Varhe, Maharashtra', '₹2.10 Cr', 2024, 'In Progress', 'Commercial',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
  'Avabeach Resorts', 'Hospitality', '6,000 Sqft', '8 months',
  ARRAY['Resort civil works', 'Swimming pool construction', 'Landscaping foundation', 'Utility infrastructure']::text[],
  'Beachside resort and hospitality project at Wadi Varhe with pool construction, landscaping, and utility infrastructure.',
  '{"before": [], "during": [], "after": []}'::jsonb
),
(
  'maruti-seva', 'Maruti Seva Automobile', 'Nandurbar, Maharashtra', '₹3.50 Cr', 2024, 'Completed', 'Commercial',
  'https://images.unsplash.com/photo-1567449303078-57ad995bd329?auto=format&fit=crop&q=80&w=1200',
  'Maruti Seva Automobile', 'Automobile Showroom', '8,500 Sqft', '6 months',
  ARRAY['Showroom construction', 'Service bay flooring', 'Office block', 'Parking infrastructure']::text[],
  'Full-scale automobile showroom and service center construction with office block and parking infrastructure in Nandurbar.',
  '{"before": [], "during": [], "after": []}'::jsonb
),
(
  'ghoti-maruti-seva', 'Ghoti Maruti Seva', 'Ghoti, Maharashtra', '₹2.80 Cr', 2024, 'Completed', 'Commercial',
  'https://images.unsplash.com/photo-1567449303078-57ad995bd329?auto=format&fit=crop&q=80&w=1200',
  'Maruti Seva Automobile', 'Automobile Showroom', '7,200 Sqft', '5 months',
  ARRAY['Showroom construction', 'Workshop flooring', 'Admin office', 'Customer lounge']::text[],
  'Automobile showroom and workshop facility with admin office and customer lounge in Ghoti.',
  '{"before": [], "during": [], "after": []}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  location = EXCLUDED.location,
  category = EXCLUDED.category,
  description = EXCLUDED.description;

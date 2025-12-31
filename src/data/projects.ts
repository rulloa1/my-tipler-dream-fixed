export interface Project {
  id: string;
  title: string;
  category: string;
  coverImage: string;
  description: string;
  gallery: string[];
  location: string;
  subtitle?: string;
  role?: string;
  duration?: string;
  sqft?: string;
  gallons?: string;
  bedrooms?: string;
  baths?: string;
  earthMoved?: string;
  retainingWalls?: string;
  decking?: string;
  lotSize?: string;
  poolSize?: string;
  projectArea?: string;
  processView?: {
    beforeImage: string;
    afterImage: string;
    beforeLabel: string;
    afterLabel: string;
  };
}

export const projects: Project[] = [
  // 1. Beachfront Estate
  {
    id: "beachfront-estate",
    title: "Beachfront Estate",
    subtitle: "Residence",
    category: "Residential • Development • Construct",
    location: "Abaco, Bahamas",
    description: "We developed a 2.5-acre beachfront estate, creating a 6,800 sq ft main residence that embodies luxury Caribbean living. This premier property features 180 feet of private beach frontage and is fortified with Category 5 hurricane-resistant construction. The estate is a self-sufficient oasis, with an infinity pool, guest cottage, dock facilities, solar power backup, and rainwater collection systems. This is more than a home; it is a legacy property on the shores of the Atlantic.",
    coverImage: "/projects/beachfront_estate/beachfront-1.jpg",
    gallery: [
      "/projects/beachfront_estate/beachfront-1.jpg",
      "/projects/beachfront_estate/beachfront-2.jpg",
      "/projects/beachfront_estate/beachfront-3.jpg",
      "/projects/beachfront_estate/beachfront-4.jpg",
      "/projects/beachfront_estate/beachfront-5.jpg",
      "/projects/beachfront_estate/beachfront-6.jpg",
      "/projects/beachfront_estate/beachfront-7.jpg",
      "/projects/beachfront_estate/Whisk_063db5aec58ad9db29e44f785c5f8954eg.jpg",
      "/projects/beachfront_estate/Whisk_cdbe2863291f901a0e0430c0610d75f0eg.jpg"
    ],
    sqft: "6,800",
    lotSize: "2.5 Acres",
    role: "Project Manager in a Foreign Country for US Owners",
  },
  // 2. Development Civil Construction
  {
    id: "development-civil-construction",
    title: "Development Civil Construction",
    subtitle: "Civil Construction",
    category: "Residential • Development • Civil Construction",
    location: "SE Texas",
    description: "Comprehensive civil construction and development project in Southeast Texas, involving extensive infrastructure work, site preparation, and utility installation for residential development.",
    coverImage: "/projects/Civil Engineering/Civil001 COVER.jpg", // Using Civil Engineering cover as placeholder/best guess
    gallery: [
      "/projects/Civil Engineering/Civil001 COVER.jpg",
      "/projects/Civil Engineering/Civil002.JPG"
    ],
    role: "Civil Construction Manager",
  },
  // 3. New Residential in Historic Neighborhood (Pacific Grove)
  {
    id: "pacific-grove",
    title: "New Residential",
    subtitle: "in Historic Neighborhood",
    category: "Residential Design/Build",
    location: "Central Coast, CA",
    description: "Custom residential construction in the beautiful Pacific Grove area, respecting the historic character of the neighborhood while introducing modern living standards.",
    coverImage: "/projects/pacific-grove/001 COVER.JPG",
    gallery: [
      "/projects/pacific-grove/001 COVER.JPG",
      "/projects/pacific-grove/0010.JPG",
      "/projects/pacific-grove/0011.JPG",
      "/projects/pacific-grove/002.JPG",
      "/projects/pacific-grove/003.png",
      "/projects/pacific-grove/004.png",
      "/projects/pacific-grove/005.JPG",
      "/projects/pacific-grove/006.JPG",
      "/projects/pacific-grove/007.JPG",
      "/projects/pacific-grove/008.JPG",
      "/projects/pacific-grove/009.JPG"
    ]
  },
  // 4. Carmel Forest to Ocean View
  {
    id: "carmel-forest-ocean",
    title: "Carmel Forest to Ocean View",
    subtitle: "Custom Addition",
    category: "Residential Construction",
    location: "Carmel By the Sea, CA",
    description: "This project is a celebration of its stunning location, a coastal home that harmonizes with the natural beauty of the Carmel coastline. Our focus was on refined craftsmanship and thoughtful design, creating a space that feels both luxurious and deeply connected to its environment. The result is a home that is more than a structure; it is a serene retreat.",
    coverImage: "/projects/Carmel Forest to Ocean View/Carmel001 COVER.JPG",
    gallery: [
      "/projects/Carmel Forest to Ocean View/Carmel001 COVER.JPG",
      "/projects/Carmel Forest to Ocean View/Carmel002.JPG",
      "/projects/Carmel Forest to Ocean View/Carmel003.JPG",
      "/projects/Carmel Forest to Ocean View/Carmel004.JPG",
      "/projects/Carmel Forest to Ocean View/Carmel005.JPG",
      "/projects/Carmel Forest to Ocean View/Carmel006.JPG"
    ],
    role: "Designer, Builder, Project Manager",
  },
  // 5. Hillside Restoration
  {
    id: "hillside-cleanup",
    title: "Hillside Stabilization",
    subtitle: "Restoration & Environmental Clean Up",
    category: "Civil • Residential",
    location: "Carmel, CA",
    description: "Restoration and environmental cleanup of hillside properties to improve safety, aesthetics, and ecological balance.",
    coverImage: "/projects/hillside-cleanup/001 COVER.jpg",
    gallery: [
      "/projects/hillside-cleanup/001 COVER.jpg",
      "/projects/hillside-cleanup/0010.JPG",
      "/projects/hillside-cleanup/0011.jpg",
      "/projects/hillside-cleanup/0012.jpg",
      "/projects/hillside-cleanup/0013.JPG",
      "/projects/hillside-cleanup/0014.jpg",
      "/projects/hillside-cleanup/0015.jpg",
      "/projects/hillside-cleanup/0016.jpg",
      "/projects/hillside-cleanup/002.JPG",
      "/projects/hillside-cleanup/003.JPG",
      "/projects/hillside-cleanup/004.JPG",
      "/projects/hillside-cleanup/005.JPG",
      "/projects/hillside-cleanup/006.jpg",
      "/projects/hillside-cleanup/007.jpg",
      "/projects/hillside-cleanup/008.JPG",
      "/projects/hillside-cleanup/009.JPG"
    ]
  },
  // 6. Laguna Grande
  {
    id: "laguna-grande",
    title: "Laguna Grande",
    subtitle: "Spanish Revival Commercial",
    category: "Design/Build • Commercial",
    location: "Seaside, CA",
    description: "A comprehensive design-build project showcasing integrated architectural and landscape solutions in the Spanish Revival style.",
    coverImage: "/projects/laguna-grande/6.0 Laguna Grande Design Build_001_COVER.jpg",
    gallery: [
      "/projects/laguna-grande/6.0 Laguna Grande Design Build_001_COVER.jpg",
      "/projects/laguna-grande/6.0 Laguna Grande Design Build_002_(2).jpg",
      "/projects/laguna-grande/6.0 Laguna Grande Design Build_003.jpg",
      "/projects/laguna-grande/6.0 Laguna Grande Design Build_004.100.png",
      "/projects/laguna-grande/6.0 Laguna Grande Design Build_004.png",
      "/projects/laguna-grande/6.0 Laguna Grande Design Build_005.png",
      "/projects/laguna-grande/6.0 Laguna Grande Design Build_006.png"
    ]
  },





  // 12. South Coast Renovation
  {
    id: "south-coast-renovation",
    title: "South Coast Renovation",
    subtitle: "Complete Remodel",
    category: "Design/Build",
    location: "Big Sur, CA",
    description: "This 3,800 sq ft residence was completely reimagined through our design-build process. Over 16 months, we opened up the home to panoramic ocean views with new floor-to-ceiling windows and custom skylights. The interior transformation features white oak flooring, a gourmet kitchen with waterfall quartzite countertops, and spa-quality bathrooms with radiant heat. We undertook a complete structural renovation, culminating in a home that is as solid as it is beautiful, a true sanctuary on the Big Sur coast.",
    coverImage: "/design/southcoast/11 Kitchen AFTER.jpg",
    gallery: [
      "/design/southcoast/11 Kitchen AFTER.jpg",
      "/design/southcoast/12 Kitchen After.jpg",
      "/design/southcoast/13 Kitchen After.jpg",
      "/design/southcoast/18 Living Rm AFTER.JPG",
      "/design/southcoast/20 Living Dining AFTER.jpg",
      "/design/southcoast/22 Living After.JPG",
      "/design/southcoast/24 Living After.JPG",
      "/design/southcoast/35 AFTER.JPG",
      "/design/southcoast/36 AFTER.JPG",
      "/design/southcoast/37 AFTER.jpg",
      "/design/southcoast/38 AFTER.jpg",
      "/design/southcoast/39 AFTER.jpg",
      "/design/southcoast/40 AFTER.jpg",
      "/design/southcoast/41 AFTER.jpg",
      "/design/southcoast/42 AFTER.jpg",
      "/design/southcoast/43 AFTER.jpg",
      "/design/southcoast/44 AFTER.JPG",
      "/design/southcoast/45 AFTER.JPG",
      "/design/southcoast/46 AFTER.JPG",
      "/design/southcoast/47 AFTER.JPG"
    ],
    sqft: "3,800",
    role: "Project Manager, Owner Representative, Designer, Int. Designer, Builder, Property Manager, Owner Assignee - During Photo Ad Campaign and Cinema Movie Shoots",
  },
  // 13. Carmel Valley New
  {
    id: "carmel-valley-new",
    title: "Carmel Valley New",
    subtitle: "Custom Residence",
    category: "Design/Build • Civil",
    location: "Carmel Valley, CA",
    description: "In the heart of Carmel Valley, we crafted a 4,800 sq ft custom residence that is a dialogue between architecture and nature. This 20-month design-build project features exposed steel beams and floor-to-ceiling glass walls that frame the oak-studded landscape. We integrated the home with its surroundings through extensive site work and native habitat restoration, creating a dwelling that is both a part of and a tribute to the natural beauty of the valley.",
    coverImage: "/projects/carmel-valley-new/carmel_valley_new1 cover.jpg",
    gallery: [
      "/projects/carmel-valley-new/carmel_valley_new1 cover.jpg",
      "/projects/carmel-valley-new/carmel_valley_new2.jpg",
      "/projects/carmel-valley-new/carmel_valley_new3.jpg",
      "/projects/carmel-valley-new/carmel_valley_new4.jpg",
      "/projects/carmel-valley-new/carmel_valley_new5.png"
    ],
    sqft: "4,800",
    role: "Designer, Builder, Project Manager, Civil Engineering Contractor",
  },
  // 14. North Florida Renovation/Addition
  {
    id: "north-florida-renovation",
    title: "North Florida Renovation/Addition",
    category: "Owners Rep • Estate Management",
    location: "N. Florida",
    description: "We revitalized this 3,600 sq ft home with a 1,200 sq ft addition over a 10-month period. Our comprehensive approach included a new roof, impact windows, and updated electrical and plumbing systems. The interior was completely refreshed, and our estate management services ensured a seamless coordination of all trades. The result is a home that is not only more spacious and modern but also fortified and meticulously detailed.",
    coverImage: "/projects/north-florida/NIMG_9178.jpg",
    gallery: [
      "/projects/north-florida/NIMG_9178.jpg",
      "/projects/north-florida/NIMG_9179.jpg",
      "/projects/north-florida/NIMG_9180.jpg",
      "/projects/north-florida/NIMG_9182.jpg",
      "/projects/north-florida/NIMG_9184.jpg",
      "/projects/north-florida/NIMG_9185.jpg",
      "/projects/north-florida/NIMG_9890.jpg",
      "/projects/north-florida/NIMG_9892.jpg",
      "/projects/north-florida/NIMG_9893.jpg",
      "/projects/north-florida/NIMG_9894.jpg",
      "/projects/north-florida/NIMG_9895.jpg",
      "/projects/north-florida/NScreenshot 2025-10-30 001316.jpg",
      "/projects/north-florida/NScreenshot 2025-10-31 222048.jpg",
      "/projects/north-florida/Whisk_72f44c7b40df232ab864604015867196eg.jpg",
      "/projects/north-florida/Whisk_ef1f91428014bfe97d74741115951e53dr.jpg",
      "/projects/north-florida/27437780b0f39fc6f1d17c7310ca5be8l-m1rd-w1280_h960.webp",
      "/projects/north-florida/27437780b0f39fc6f1d17c7310ca5be8l-m2rd-w1280_h960.webp"
    ],
    sqft: "3,600 (Orig) / 1,200 (Add)",
    role: "Contractor",
  },
  // 15. Abaco Luxe Boat House
  {
    id: "abaco-luxe-boat-house",
    title: "Abaco Luxe Boat House",
    subtitle: "Construction",
    category: "Residential Construction",
    location: "Abaco, Bahamas",
    description: "On the pristine shores of the Abaco Islands, we constructed an 1,800 sq ft luxury boat house in just six months. Built to withstand the Caribbean climate, this waterfront structure features hurricane-resistant construction and premium marine-grade finishes. Custom mahogany millwork and covered dock access provide a touch of elegance, creating a functional and beautiful gateway to the open water.",
    coverImage: "/projects/Abaco Luxe Boat House/Homes Built BoatHouse Style at Bakers Bay.jpg",
    gallery: [
      "/projects/Abaco Luxe Boat House/Homes Built BoatHouse Style at Bakers Bay.jpg",
      "/projects/Abaco Luxe Boat House/bahamas1.png",
      "/projects/Abaco Luxe Boat House/Whisk_d1a02c96626dfbeb9a54986f4fa3fd4ddr.jpeg"
    ],
    sqft: "1,800",
    role: "Project Manager in a Foreign Country for US Owners",
  },
  // 16. Coastal Mountain Residence
  {
    id: "coastal-mountain-residence",
    title: "Coastal Mountain Resid",
    subtitle: "Civil Site Work",
    category: "Civil • Residential",
    location: "Big Sur, CA",
    description: "Over 11 months, we reshaped a 1.2-acre mountain site in Big Sur, a project that required both heavy machinery and a delicate touch. We moved over 3,000 cubic yards of earth, constructed 320 linear feet of retaining walls, and built a 900 sq ft custom garage and workshop. Our work focused on erosion control and drainage systems, all while preserving the property's stunning ocean views and protecting the natural landscape.",
    coverImage: "/projects/Coastal_Mountain_Residence/001 COVER.JPG",
    gallery: [
      "/projects/Coastal_Mountain_Residence/001 COVER.JPG",
      "/projects/Coastal_Mountain_Residence/002.JPG",
      "/projects/Coastal_Mountain_Residence/003.JPG",
      "/projects/Coastal_Mountain_Residence/004.JPG",
      "/projects/Coastal_Mountain_Residence/005.JPG",
      "/projects/Coastal_Mountain_Residence/006.JPG",
      "/projects/Coastal_Mountain_Residence/007.jpg",
      "/projects/Coastal_Mountain_Residence/008.jpg",
      "/projects/Coastal_Mountain_Residence/009.JPG",
      "/projects/Coastal_Mountain_Residence/010.JPG",
      "/projects/Coastal_Mountain_Residence/011.JPG",
      "/projects/Coastal_Mountain_Residence/012.jpg",
      "/projects/Coastal_Mountain_Residence/013.jpg",
      "/projects/Coastal_Mountain_Residence/014.JPG",
      "/projects/Coastal_Mountain_Residence/015.JPG",
      "/projects/Coastal_Mountain_Residence/016.JPG"
    ],
    earthMoved: "3,000 cu yds",
    retainingWalls: "320 ln ft",
    role: "Owner Representative, Designer, Builder, Project Manager, Permit Procurement",
  },
  // 17. Carmel Knolls
  {
    id: "carmel-knolls",
    title: "Carmel Knolls",
    subtitle: "More Than Lipstick on an Old Lady!",
    category: "Residential • Civil • Design/Build",
    location: "Carmel, CA",
    description: "This was more than a remodel; it was a complete transformation. Over 12 months, we took a 2,200 sq ft house and revitalized it from the ground up. The project included a new roofline, foundation repairs, 18 energy-efficient windows, and 1,400 sq ft of new composite decking. We also undertook extensive site work, including 200 linear feet of retaining walls and a complete landscape renovation, proving that with the right vision, any property can be reborn.",
    coverImage: "/projects/carmel-knolls/001 Cover Carmel Knolls, CA Remodel, Before & After.jpg",
    gallery: [
      "/projects/carmel-knolls/001 Cover Carmel Knolls, CA Remodel, Before & After.jpg",
      "/projects/carmel-knolls/001.10 COVER.jpg",
      "/projects/carmel-knolls/0010.JPG",
      "/projects/carmel-knolls/0011.JPG",
      "/projects/carmel-knolls/0012.JPG",
      "/projects/carmel-knolls/0013.JPG",
      "/projects/carmel-knolls/0014.JPG",
      "/projects/carmel-knolls/0015.JPG",
      "/projects/carmel-knolls/0016.JPG",
      "/projects/carmel-knolls/0017.JPG",
      "/projects/carmel-knolls/0018.JPG",
      "/projects/carmel-knolls/0019.JPG",
      "/projects/carmel-knolls/002.JPG",
      "/projects/carmel-knolls/0020.JPG",
      "/projects/carmel-knolls/0021.JPG",
      "/projects/carmel-knolls/0022.JPG",
      "/projects/carmel-knolls/0023.JPG",
      "/projects/carmel-knolls/0024.JPG",
      "/projects/carmel-knolls/0025.JPG",
      "/projects/carmel-knolls/0026.JPG",
      "/projects/carmel-knolls/003.JPG",
      "/projects/carmel-knolls/004.JPG",
      "/projects/carmel-knolls/005.JPG",
      "/projects/carmel-knolls/006.JPG",
      "/projects/carmel-knolls/007.JPG",
      "/projects/carmel-knolls/008.JPG",
      "/projects/carmel-knolls/009.JPG"
    ],
    sqft: "2,200",
    decking: "1,400 sq ft",
    role: "Designer, Int. Designer, Builder, Project Manager, Permit Procurement",
  },
  // 18. Coastal Restoration
  {
    id: "coastal-restoration",
    title: "Coastal Restoration",
    subtitle: "Erosion Repair",
    category: "Civil",
    location: "Monterey Peninsula, CA",
    description: "Faced with a dramatically eroded coastal property, we undertook a nine-month restoration project to preserve this spectacular oceanfront site. We moved over 2,500 cubic yards of material, installed 180 linear feet of engineered retaining walls, and performed comprehensive foundation work. This project was a battle against the elements, a successful effort to stabilize and restore a piece of the California coastline for generations to come.",
    coverImage: "/projects/coastal-restoration/001 COVER.JPG",
    gallery: [
      "/projects/coastal-restoration/001 COVER.JPG",
      "/projects/coastal-restoration/002.JPG",
      "/projects/coastal-restoration/003.JPG",
      "/projects/coastal-restoration/004.JPG",
      "/projects/coastal-restoration/005.JPG",
      "/projects/coastal-restoration/006.JPG",
      "/projects/coastal-restoration/007.JPG",
      "/projects/coastal-restoration/008.JPG",
      "/projects/coastal-restoration/009.JPG",
      "/projects/coastal-restoration/0010.JPG",
      "/projects/coastal-restoration/0011.JPG",
      "/projects/coastal-restoration/0012.JPG",
      "/projects/coastal-restoration/0013.JPG",
      "/projects/coastal-restoration/0014.JPG",
      "/projects/coastal-restoration/0015.jpg",
      "/projects/coastal-restoration/0016.jpg"
    ],
    earthMoved: "2,500 cu yds",
    retainingWalls: "180 ln ft",
    role: "Civil Engineering Contractor, Builder, Permit Procurement (Emergency Construction Permit)",
  },
  // 19. Civil Engineering
  {
    id: "civil-engineering",
    title: "Civil Eng. & Infrastructure",
    subtitle: "Infrastructure Projects",
    category: "Civil",
    location: "CA, TX, NM, CO, MT",
    description: "Our civil engineering portfolio is a testament to our ability to tackle complex infrastructure challenges across five states. From 2015 to 2024, we have moved over 50,000 cubic yards of earth, installed more than 2,500 linear feet of retaining walls, and executed numerous coastal restoration and hillside stabilization projects. Our expertise in heavy construction and infrastructure development allows us to deliver exceptional results, even in the most challenging terrains.",
    coverImage: "/projects/Civil Engineering/Civil001 COVER.jpg",
    gallery: [
      "/projects/Civil Engineering/Civil001 COVER.jpg",
      "/projects/Civil Engineering/Civil0010.jpg",
      "/projects/Civil Engineering/Civil0011.jpg",
      "/projects/Civil Engineering/Civil0012.jpg",
      "/projects/Civil Engineering/Civil0013.jpg",
      "/projects/Civil Engineering/Civil0014.jpg",
      "/projects/Civil Engineering/Civil0015.jpg",
      "/projects/Civil Engineering/Civil0016.jpg",
      "/projects/Civil Engineering/Civil0017.jpg",
      "/projects/Civil Engineering/Civil0018.jpg",
      "/projects/Civil Engineering/Civil0019.jpg",
      "/projects/Civil Engineering/Civil002.JPG",
      "/projects/Civil Engineering/Civil0020.jpg",
      "/projects/Civil Engineering/Civil0021.jpg",
      "/projects/Civil Engineering/Civil0022.jpg",
      "/projects/Civil Engineering/Civil003.JPG",
      "/projects/Civil Engineering/Civil004.JPG",
      "/projects/Civil Engineering/Civil005.JPG",
      "/projects/Civil Engineering/Civil006.JPG",
      "/projects/Civil Engineering/Civil007.JPG",
      "/projects/Civil Engineering/Civil008.JPG",
      "/projects/Civil Engineering/Civil009.JPG"
    ],
    role: "Civil Engineering, Contractor/Builder",
  }
];

export const getProjectById = (id: string) => {
  return projects.find((project) => project.id === id);
};

export const categories = ["All", ...new Set(projects.map((project) => project.category))];

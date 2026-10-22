export interface BeforeAfterItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'epoxy' | 'commercial' | 'residential';
  categoryLabel: string;
  location: string;
  beforeImage: string;
  beforeAlt: string;
  beforeWidth: number;
  beforeHeight: number;
  beforeLabel: string;
  afterImage: string;
  afterAlt: string;
  afterWidth: number;
  afterHeight: number;
  afterLabel: string;
  prepSpec: string;
  coatingSpec: string;
  turnaround: string;
  storyHook: string;
  storyBody: string;
  defaultSliderPos?: number;
}

export interface StoryChapter {
  id: string;
  chapterNumber: string;
  badge: string;
  title: string;
  kicker: string;
  narrative: string;
  proTip: string;
  steps: {
    stepNumber: string;
    label: string;
    title: string;
    description: string;
    image: string;
    alt: string;
    width: number;
    height: number;
    isVideo?: boolean;
  }[];
}

export interface FlakeSystemPreset {
  id: string;
  name: string;
  tagline: string;
  sector: 'Residential & Showroom' | 'Heavy Commercial & Warehouse' | 'Auto Bay & High-Gloss' | 'Exterior Architectural';
  swatches: string[];
  gradientCss: string;
  textureType: 'flake' | 'liquid-glass' | 'stucco-shield' | 'cedar-stain';
  specs: {
    prep: string;
    baseCoat: string;
    topCoat: string;
    lifespan: string;
  };
  previewImage: string;
  previewAlt: string;
}

export const BUSINESS_INFO = {
  name: 'AAC Painters Inc.',
  legalName: 'AAC Painters Inc.',
  slogan: 'Coloring Your Dream',
  secondarySlogan: 'Transform Your Concrete Into a Masterpiece',
  president: 'Alex Delgadillo',
  license: '1039849',
  licenseDisplay: 'CSLB Lic #1039849 • Fully Insured',
  phone: '(209) 485-5103',
  phoneHref: 'tel:+12094855103',
  smsHref: 'sms:+12094855103?&body=Hi%20Alex%2C%20I%27d%20like%20a%20free%20quote%20from%20AAC%20Painters%20Inc.!',
  website: 'https://www.aacpaintersinc.com',
  instagramHandle: '@aac_painters_inc',
  instagramUrl: 'https://www.instagram.com/aac_painters_inc/',
  facebookName: 'AAC PAINTERS INC',
  facebookUrl: 'https://www.facebook.com/search/top?q=AAC%20PAINTERS%20INC',
  serviceAreas: [
    'Merced',
    'Modesto',
    'Turlock',
    'Atwater',
    'Stockton',
    'Manteca',
    'Tracy',
    'Los Banos',
    'Ceres',
    'Oakdale',
    'Livingston',
    'Chowchilla',
  ],
  counties: ['Merced County', 'Stanislaus County', 'San Joaquin County', 'Madera County'],
};

export const BEFORE_AFTER_GALLERY: BeforeAfterItem[] = [
  {
    id: 'auto-service-bay',
    title: 'Rotary Lift Auto Service Bay',
    subtitle: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    category: 'epoxy',
    categoryLabel: 'Industrial Epoxy & Polish',
    location: 'Central Valley, CA (209)',
    beforeImage: '/images/projects/auto-shop-floor-before.png',
    beforeAlt: 'Before: Auto service shop floor before transformation',
    beforeWidth: 450,
    beforeHeight: 600,
    beforeLabel: 'Before Transformation',
    afterImage: '/images/projects/auto-shop-epoxy-floor-after.png',
    afterAlt: 'After: Finished auto service shop floor',
    afterWidth: 600,
    afterHeight: 340,
    afterLabel: 'After Transformation',
    prepSpec: 'Lorem ipsum dolor sit amet',
    coatingSpec: 'Lorem ipsum dolor sit amet consectetur',
    turnaround: '4 Days',
    storyHook: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    storyBody:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    defaultSliderPos: 48,
  },
  {
    id: 'commercial-warehouse-flake',
    title: 'Distribution Warehouse Facility',
    subtitle: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    category: 'epoxy',
    categoryLabel: 'Warehouse Flake System',
    location: '209 Industrial Corridor, CA',
    beforeImage: '/images/projects/warehouse-floor-before.jpeg',
    beforeAlt: 'Before: Commercial warehouse floor before transformation',
    beforeWidth: 450,
    beforeHeight: 600,
    beforeLabel: 'Before Transformation',
    afterImage: '/images/projects/warehouse-flake-epoxy-after.png',
    afterAlt: 'After: Finished commercial warehouse floor',
    afterWidth: 450,
    afterHeight: 600,
    afterLabel: 'After Transformation',
    prepSpec: 'Lorem ipsum dolor sit amet',
    coatingSpec: 'Lorem ipsum dolor sit amet consectetur',
    turnaround: '3 Days',
    storyHook: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    storyBody:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    defaultSliderPos: 52,
  },
  {
    id: 'mcauley-landmark-restoration',
    title: 'Commercial Landmark Building',
    subtitle: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    category: 'commercial',
    categoryLabel: 'Commercial Exterior Overhaul',
    location: 'Merced / Central Valley, CA',
    beforeImage: '/images/projects/mcauley-building-before.png',
    beforeAlt: 'Before: Commercial building before painting',
    beforeWidth: 600,
    beforeHeight: 450,
    beforeLabel: 'Before Transformation',
    afterImage: '/images/projects/mcauley-building-after.png',
    afterAlt: 'After: Finished commercial building exterior',
    afterWidth: 600,
    afterHeight: 450,
    afterLabel: 'After Transformation',
    prepSpec: 'Lorem ipsum dolor sit amet',
    coatingSpec: 'Lorem ipsum dolor sit amet consectetur',
    turnaround: '5 Days',
    storyHook: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    storyBody:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    defaultSliderPos: 50,
  },
  {
    id: 'residential-garage-masterpiece',
    title: '2-Car Residential Garage',
    subtitle: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    category: 'residential',
    categoryLabel: 'Residential Garage Epoxy',
    location: 'Central Valley Homeowner',
    beforeImage: '/images/projects/residential-garage-before.png',
    beforeAlt: 'Before: Residential garage floor before transformation',
    beforeWidth: 600,
    beforeHeight: 450,
    beforeLabel: 'Before Transformation',
    afterImage: '/images/projects/residential-garage-flake-epoxy-after.png',
    afterAlt: 'After: Finished residential garage floor',
    afterWidth: 450,
    afterHeight: 600,
    afterLabel: 'After Transformation',
    prepSpec: 'Lorem ipsum dolor sit amet',
    coatingSpec: 'Lorem ipsum dolor sit amet consectetur',
    turnaround: '1–2 Days',
    storyHook: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    storyBody:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    defaultSliderPos: 46,
  },
  {
    id: 'mcdonalds-696-refresh',
    title: 'Commercial Storefront Canopy',
    subtitle: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    category: 'commercial',
    categoryLabel: 'Storefront Repaint',
    location: 'Central Valley, CA',
    beforeImage: '/images/projects/mcdonalds-696-awning-before.png',
    beforeAlt: 'Before: Commercial canopy before painting',
    beforeWidth: 600,
    beforeHeight: 450,
    beforeLabel: 'Before Transformation',
    afterImage: '/images/projects/mcdonalds-696-awning-after.png',
    afterAlt: 'After: Finished commercial canopy',
    afterWidth: 600,
    afterHeight: 450,
    afterLabel: 'After Transformation',
    prepSpec: 'Lorem ipsum dolor sit amet',
    coatingSpec: 'Lorem ipsum dolor sit amet consectetur',
    turnaround: '1–2 Days',
    storyHook: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    storyBody:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    defaultSliderPos: 50,
  },
  {
    id: 'catalyst-industrial-exterior',
    title: 'Commercial Facility Exterior',
    subtitle: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    category: 'commercial',
    categoryLabel: 'Facility Painting',
    location: 'Central Valley, CA',
    beforeImage: '/images/projects/catalyst-commercial-before.png',
    beforeAlt: 'Before: Commercial building exterior before painting',
    beforeWidth: 600,
    beforeHeight: 450,
    beforeLabel: 'Before Transformation',
    afterImage: '/images/projects/catalyst-commercial-after-trailer.png',
    afterAlt: 'After: Finished commercial building exterior',
    afterWidth: 600,
    afterHeight: 450,
    afterLabel: 'After Transformation',
    prepSpec: 'Lorem ipsum dolor sit amet',
    coatingSpec: 'Lorem ipsum dolor sit amet consectetur',
    turnaround: '4 Days',
    storyHook: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    storyBody:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    defaultSliderPos: 50,
  },
  {
    id: 'residential-cedar-fence',
    title: 'Backyard Wood Fence Revival',
    subtitle: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    category: 'residential',
    categoryLabel: 'Staining & Wood Restoration',
    location: 'Central Valley Residence',
    beforeImage: '/images/projects/wood-fence-before.png',
    beforeAlt: 'Before: Wooden privacy fence before staining',
    beforeWidth: 450,
    beforeHeight: 600,
    beforeLabel: 'Before Transformation',
    afterImage: '/images/projects/wood-fence-stained-after.png',
    afterAlt: 'After: Finished stained wooden privacy fence',
    afterWidth: 450,
    afterHeight: 600,
    afterLabel: 'After Transformation',
    prepSpec: 'Lorem ipsum dolor sit amet',
    coatingSpec: 'Lorem ipsum dolor sit amet consectetur',
    turnaround: '1 Day',
    storyHook: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    storyBody:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    defaultSliderPos: 50,
  },
];

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'auto-shop-odyssey',
    chapterNumber: 'CHAPTER 01',
    badge: '4-STAGE FLOOR PROCESS',
    title: 'Lorem Ipsum Dolor Sit Amet',
    kicker: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    narrative:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    proTip:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.',
    steps: [
      {
        stepNumber: '01',
        label: 'PHASE 01',
        title: 'Lorem Ipsum Dolor',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
        image: '/images/projects/auto-shop-floor-before.png',
        alt: 'Stage 1: Floor before preparation',
        width: 450,
        height: 600,
      },
      {
        stepNumber: '02',
        label: 'PHASE 02',
        title: 'Consectetur Adipiscing',
        description:
          'Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.',
        image: '/images/projects/auto-shop-floor-grinding.png',
        alt: 'Stage 2: Surface mechanical preparation',
        width: 450,
        height: 600,
      },
      {
        stepNumber: '03',
        label: 'PHASE 03',
        title: 'Integer Nec Odio',
        description:
          'Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.',
        image: '/images/projects/auto-shop-floor-patched.png',
        alt: 'Stage 3: Substrate patching and joint detailing',
        width: 450,
        height: 600,
      },
      {
        stepNumber: '04',
        label: 'PHASE 04',
        title: 'Sed Cursus Ante',
        description:
          'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.',
        image: '/images/projects/auto-shop-epoxy-floor-after.png',
        alt: 'Stage 4: Completed floor finish',
        width: 600,
        height: 340,
      },
    ],
  },
  {
    id: 'landmark-exterior-odyssey',
    chapterNumber: 'CHAPTER 02',
    badge: '4-STAGE EXTERIOR PROCESS',
    title: 'Consectetur Adipiscing Elit',
    kicker: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    narrative:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    proTip:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.',
    steps: [
      {
        stepNumber: '01',
        label: 'PHASE 01',
        title: 'Vestibulum Lacinia',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
        image: '/images/projects/mcauley-building-awning-removal.png',
        alt: 'Stage 1: Exterior demolition and masking',
        width: 600,
        height: 450,
      },
      {
        stepNumber: '02',
        label: 'PHASE 02',
        title: 'Duis Sagittis Ipsum',
        description:
          'Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.',
        image: '/images/projects/mcauley-building-prep.png',
        alt: 'Stage 2: Masonry surface equalization',
        width: 600,
        height: 450,
      },
      {
        stepNumber: '03',
        label: 'PHASE 03',
        title: 'Fusce Nec Tellus',
        description:
          'Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.',
        image: '/images/projects/mcauley-building-after.png',
        alt: 'Stage 3: Architectural facade coating',
        width: 600,
        height: 450,
      },
      {
        stepNumber: '04',
        label: 'PHASE 04',
        title: 'Class Aptent Taciti',
        description:
          'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.',
        image: '/images/projects/commercial-8-bay-doors-angle.png',
        alt: 'Stage 4: Trim and commercial detailing',
        width: 600,
        height: 450,
      },
    ],
  },
];

export const FLAKE_PRESETS: FlakeSystemPreset[] = [
  {
    id: 'granite-showroom',
    name: 'Tuxedo Granite Flake',
    tagline: 'Our #1 Residential Garage & Home Gym System',
    sector: 'Residential & Showroom',
    swatches: ['#1F242B', '#7D848D', '#D9DDE2', '#F5F7FA'],
    gradientCss:
      'radial-gradient(circle at 20% 30%, #ffffff 0 3px, transparent 4px), radial-gradient(circle at 75% 25%, #11151c 0 4px, transparent 5px), radial-gradient(circle at 40% 70%, #9ca3af 0 5px, transparent 6px), radial-gradient(circle at 80% 80%, #e5e7eb 0 3px, transparent 4px), radial-gradient(circle at 15% 85%, #1f2937 0 4px, transparent 5px), linear-gradient(135deg, #4b5563 0%, #374151 50%, #1f2937 100%)',
    textureType: 'flake',
    specs: {
      prep: 'Diamond Grind + Crack Repair + Stem Walls',
      baseCoat: '100% Solids Moisture-Vapor Epoxy Base',
      topCoat: 'UV-Stable Polyaspartic Clear (Hot-Tire Proof)',
      lifespan: '15–20+ Years Residential',
    },
    previewImage: '/images/projects/residential-garage-flake-epoxy-after.png',
    previewAlt: 'Tuxedo Granite decorative flake epoxy garage floor installed by AAC Painters Inc.',
  },
  {
    id: 'warehouse-cobalt',
    name: 'Industrial Cobalt & Slate Flake',
    tagline: 'Built for Forklifts, Pallet Jacks & High-Traffic Bays',
    sector: 'Heavy Commercial & Warehouse',
    swatches: ['#1E3A8A', '#475569', '#94A3B8', '#E2E8F0'],
    gradientCss:
      'radial-gradient(circle at 25% 25%, #3b82f6 0 4px, transparent 5px), radial-gradient(circle at 65% 35%, #cbd5e1 0 3px, transparent 4px), radial-gradient(circle at 45% 75%, #1e3a8a 0 5px, transparent 6px), radial-gradient(circle at 85% 65%, #64748b 0 4px, transparent 5px), linear-gradient(135deg, #334155 0%, #1e293b 55%, #0f172a 100%)',
    textureType: 'flake',
    specs: {
      prep: 'Heavy Planetary Scarifying + Joint Rebuilding',
      baseCoat: 'High-Build Industrial Epoxy Body Coat',
      topCoat: 'Chemical & Abrasion Resistant Polyaspartic',
      lifespan: 'Heavy-Duty Commercial Rating',
    },
    previewImage: '/images/projects/warehouse-flake-epoxy-after.png',
    previewAlt: 'Industrial Cobalt and Slate decorative flake epoxy floor in commercial warehouse',
  },
  {
    id: 'champagne-liquid-glass',
    name: 'Liquid-Glass Champagne Polish',
    tagline: 'Maximum Light Reflectivity for Auto Shops & Showrooms',
    sector: 'Auto Bay & High-Gloss',
    swatches: ['#D6C5B3', '#B8A38E', '#EFE6DD', '#8C7A6B'],
    gradientCss:
      'linear-gradient(125deg, #cbb8a3 0%, #e6d8c8 28%, #b8a28b 54%, #f3ece4 76%, #a38d76 100%)',
    textureType: 'liquid-glass',
    specs: {
      prep: 'CSP-3 Diamond Grind + Oil Extraction & Patching',
      baseCoat: 'Self-Leveling 100% Solids Pigmented Epoxy',
      topCoat: 'Automotive-Grade Aliphatic Urethane Gloss',
      lifespan: 'Skylight-Reflecting Mirror Finish',
    },
    previewImage: '/images/projects/auto-shop-epoxy-floor-after.png',
    previewAlt: 'High-gloss champagne epoxy floor in auto service shop with Rotary Lifts',
  },
  {
    id: 'architectural-bronze-shield',
    name: 'Commercial Bronze & Espresso Shield',
    tagline: 'Weatherproof Stucco, Brick & Roll-Up Door Package',
    sector: 'Exterior Architectural',
    swatches: ['#6E5D4F', '#3A322D', '#F4F1EA', '#FFB703'],
    gradientCss:
      'linear-gradient(135deg, #6e5d4f 0%, #52453a 52%, #2c2520 100%)',
    textureType: 'stucco-shield',
    specs: {
      prep: '4,000 PSI Wash + Stucco Resurfacing + DTM Prime',
      baseCoat: 'Breathable High-Build Elastomeric Masonry Coat',
      topCoat: 'UV-Armored Industrial Acrylic & Urethane Trim',
      lifespan: '10+ Year Central Valley Sun Protection',
    },
    previewImage: '/images/projects/mcauley-building-after.png',
    previewAlt: 'Commercial building painted in architectural bronze elastomeric coating',
  },
];

export const SERVICES_LIST = [
  {
    id: 'epoxy-flooring',
    slug: '/services/epoxy-flooring',
    badge: 'SIGNATURE SPECIALTY',
    title: 'Epoxy, Polyaspartic & Decorative Flake Floors',
    shortDesc:
      'Showroom-grade residential garages, pool decks, auto service bays, and forklift-ready commercial warehouses—prepped with industrial planetary diamond grinders.',
    icon: 'epoxy',
    accentColor: '#E63946',
    features: [
      'Full-Broadcast Decorative Vinyl Flake Systems',
      '1-Day Fast-Cure UV-Stable Polyaspartic Topcoats',
      'Self-Leveling High-Gloss Metallic & Solid Epoxy',
      'Concrete Grinding, Crack Chasing & Grind-and-Seal',
      'Pool Deck, Patio & Wood Deck Floor Coatings',
    ],
    image: '/images/projects/residential-garage-flake-epoxy-after.png',
    imageAlt: 'Showroom decorative flake epoxy garage floor by AAC Painters Inc.',
  },
  {
    id: 'commercial-painting',
    slug: '/services/commercial-painting',
    badge: 'COMMERCIAL & INDUSTRIAL',
    title: 'Commercial, Franchise & Industrial Painting',
    shortDesc:
      'Zero-downtime exterior and interior painting for franchises, warehouses, HOA communities, hotels, apartment complexes, historic downtown brick buildings, and multi-bay commercial centers.',
    icon: 'commercial',
    accentColor: '#1D70B8',
    features: [
      'Elastomeric Stucco, Tilt-Up Concrete & Masonry Coatings',
      'Historic Brick Restoration & High-Reach Ladder/Lift Work',
      'Direct-to-Metal (DTM) Awnings, Canopies & 8+ Roll-Up Doors',
      'Night & Weekend Scheduling for Zero Business Disruption',
      'HOA Community, Hotel & Apartment Complex Repaints',
    ],
    image: '/images/projects/mcdonalds-696-awning-after.png',
    imageAlt: 'McDonald’s #696 commercial exterior awning painted by AAC Painters Inc.',
  },
  {
    id: 'residential-painting',
    slug: '/services/residential-painting',
    badge: 'HOMEOWNERS & ESTATES',
    title: 'Residential Interior, Exterior & Wood Staining',
    shortDesc:
      'Crisp cut lines, obsessive masking, sun-proof exterior house painting, cabinet & trim enamels, popcorn ceiling removal, pressure washing, and deep-penetrating wood fence & deck staining.',
    icon: 'residential',
    accentColor: '#2A9D8F',
    features: [
      'Complete Exterior Stucco, Siding & Fascia Repaints',
      'Interior Walls, Ceilings, Baseboards & Doors',
      'Cedar & Redwood Fence Restoration & Penetrating Stains',
      'Patio Concrete Staining, Sealing & Garage Makeovers',
      'Cabinet Painting & Fine-Finish Trim Enamels',
      'Stairwell, Railing & Banister Painting',
      'Popcorn Ceiling Removal & Re-Texturing',
      'Pressure Washing & Exterior Surface Prep',
    ],
    image: '/images/projects/wood-fence-stained-after.png',
    imageAlt: 'Restored and stained residential cedar wood fence by AAC Painters Inc.',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'Why does AAC Painters diamond-grind concrete instead of using an acid wash?',
    answer:
      'Acid etching leaves moisture and chemical salts trapped in the slab and rarely opens the concrete pores evenly—which is why DIY and budget epoxy floors peel under hot tires within a year. We use heavy industrial planetary diamond grinders with HEPA vacuum collection (often pulling 5–6+ bags of concrete dust off a warehouse floor) to create a true CSP-2/CSP-3 mechanical profile so the base coat fuses permanently with your slab.',
  },
  {
    question: 'What is the difference between Epoxy and a Polyaspartic topcoat?',
    answer:
      'We combine the best of both chemistries: a deep-penetrating 100% solids epoxy primer/base coat provides unmatched adhesion and moisture vapor protection against the concrete, while a UV-stable Polyaspartic topcoat provides 4x the abrasion resistance, cures rapidly, and will never amber or turn yellow in the Central Valley sun.',
  },
  {
    question: 'Do you handle both residential homes and large commercial properties?',
    answer:
      'Yes! AAC Painters Inc. (CA License #1039849, Fully Insured) is equipped for everything from a homeowner’s 2-car garage, backyard fence, or full house repaint to national franchises (like McDonald’s), historic multi-story brick buildings, auto dealerships, and 20,000+ sq. ft. industrial warehouses.',
  },
  {
    question: 'Can you paint our commercial building without shutting down our business or drive-thru?',
    answer:
      'Absolutely. When we refreshed McDonald’s #696, Catalyst, and downtown retail storefronts, we staged safety perimeters, worked in phased zones, and utilized fast-cure industrial coatings so customers and staff experienced zero operational downtime.',
  },
  {
    question: 'What areas in the 209 & Central Valley do you serve?',
    answer:
      'Based in the 209 area code, Alex Delgadillo and the AAC Painters Inc. crew serve Merced, Modesto, Turlock, Atwater, Stockton, Manteca, Tracy, Los Banos, Ceres, Oakdale, Livingston, Chowchilla, and surrounding Central Valley communities.',
  },
  {
    question: 'How fast can I get an accurate quote?',
    answer:
      'Use our interactive Quote Builder on this page or call/text Alex directly at (209) 485-5103. Most residential and commercial walk-through estimates are scheduled within 24–48 hours with a transparent, itemized scope of prep and materials.',
  },
];


export interface BeforeAfterPair {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  duration: string;
  beforeImage: string;
  beforeAlt: string;
  afterImage: string;
  afterAlt: string;
  story: string;
  finishSystem: string;
}

export const brand = {
  name: BUSINESS_INFO.name,
  president: BUSINESS_INFO.president,
  presidentTitle: 'President & Lead Estimator',
  phoneDisplay: BUSINESS_INFO.phone,
  phoneHref: BUSINESS_INFO.phoneHref,
  phoneE164: '+12094855103',
  license: 'CSLB #1039849',
  insurance: 'Fully Insured & Bonded',
  domain: BUSINESS_INFO.website,
  instagramUrl: BUSINESS_INFO.instagramUrl,
  facebookSearchUrl: BUSINESS_INFO.facebookUrl
};

export const seoServiceAreas = BUSINESS_INFO.serviceAreas;

export const beforeAfterGallery: BeforeAfterPair[] = BEFORE_AFTER_GALLERY.map((item) => ({
  id: item.id,
  title: item.title,
  subtitle: item.subtitle,
  category:
    item.category === 'epoxy'
      ? 'Epoxy Flooring'
      : item.category === 'commercial'
        ? 'Commercial'
        : 'Residential',
  duration: item.turnaround,
  beforeImage: item.beforeImage,
  beforeAlt: item.beforeAlt,
  afterImage: item.afterImage,
  afterAlt: item.afterAlt,
  story: `${item.storyHook} ${item.storyBody}`,
  finishSystem: item.coatingSpec
}));

export const autoShopStory = {
  title: STORY_CHAPTERS[0].title,
  Tagline: 'FLOOR PROCESS',
  summary: STORY_CHAPTERS[0].narrative,
  stages: STORY_CHAPTERS[0].steps.map((s) => ({
    stepLabel: s.label,
    title: s.title,
    caption: s.description,
    image: s.image,
    alt: s.alt
  }))
};

export const commercialExteriorStory = {
  title: STORY_CHAPTERS[1].title,
  Tagline: 'EXTERIOR PROCESS',
  summary: STORY_CHAPTERS[1].narrative,
  stages: STORY_CHAPTERS[1].steps.map((s) => ({
    stepLabel: s.label.replace('8-BAY ', ''),
    title: s.title.replace('8 ', 'Multi-Bay '),
    caption: s.description,
    image: s.image,
    alt: s.alt
  }))
};

export const dustBagsProof = {
  image: '/images/projects/warehouse-floor-grinding-dust.png',
  alt: 'Six full bags of diamond-ground concrete dust extracted from a commercial floor before epoxy application',
  headline: '6 Heavy Bags of Diamond-Ground Concrete Dust Extracted Before Drop One',
  caption:
    'Look closely at our warehouse floor prep photo: six full bags of concrete laitance and ground dust pulled from the slab before any epoxy primer is mixed.'
};

export const flakePalettes = FLAKE_PRESETS.map((p) => ({
  id: p.id,
  name: p.name,
  category: p.sector,
  tagline: p.tagline,
  description: `${p.specs.prep} • ${p.specs.baseCoat} • ${p.specs.topCoat}`,
  bestFor: p.specs.lifespan,
  previewImage: p.previewImage,
  cssGradient: p.gradientCss
}));

export const videoShowcase = [
  {
    id: 'video-ladder-action',
    src: '/videos/historic-brick-schut-in-action.mp4',
    poster: '/images/projects/historic-brick-schut-before.png',
    badge: 'LOREM IPSUM • DOLOR SIT',
    title: 'Lorem Ipsum Dolor Sit Amet',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 'video-brick-after',
    src: '/videos/historic-brick-schut-after.mp4',
    poster: '/images/projects/mcauley-building-after.png',
    badge: 'LOREM IPSUM • CONSECTETUR',
    title: 'Consectetur Adipiscing Elit',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  }
];

export const interiorCraftGallery = [
  {
    tag: 'RESIDENTIAL GARAGE SHOWROOM',
    title: 'Full-Broadcast Tuxedo Granite Garage Floor',
    description:
      'Diamond-ground residential garage slab with coated stem walls and a hot-tire-proof polyaspartic topcoat.',
    image: '/images/projects/residential-garage-flake-epoxy-after.png',
    alt: 'Finished residential garage floor with granite flake epoxy by AAC Painters Inc.'
  },
  {
    tag: 'EXTERIOR WOOD RESTORATION',
    title: 'Deep-Penetrating Warm Cedar Fence Revival',
    description:
      'Sun-grayed backyard privacy fence restored with wood brightener and UV-blocking warm cedar penetrating oil stain.',
    image: '/images/projects/wood-fence-stained-after.png',
    alt: 'Stained warm cedar wooden privacy fence by AAC Painters Inc.'
  },
  {
    tag: 'COMMERCIAL 8-BAY WING',
    title: 'Multi-Bay Commercial Doors & Stucco Package',
    description:
      'Eight commercial steel roll-up doors refinished in satin espresso bronze against breathable desert-taupe masonry.',
    image: '/images/projects/commercial-8-bay-doors-wide.png',
    alt: 'Eight freshly painted commercial roll-up doors and stucco facade by AAC Painters Inc.'
  }
];

export const faqItems = FAQ_ITEMS;

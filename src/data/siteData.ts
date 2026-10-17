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
    subtitle: 'Oil-Soaked Shop Slab → Liquid-Glass Champagne Epoxy Mirror',
    category: 'epoxy',
    categoryLabel: 'Industrial Epoxy & Polish',
    location: 'Central Valley, CA (209)',
    beforeImage: '/images/projects/auto-shop-floor-before.png',
    beforeAlt: 'Before: Worn, oil-stained auto mechanic shop concrete floor with red paint peeling around Rotary Lift columns',
    beforeWidth: 450,
    beforeHeight: 600,
    beforeLabel: 'Peeling Red Coating & Oil Stains',
    afterImage: '/images/projects/auto-shop-epoxy-floor-after.png',
    afterAlt: 'After: Seamless mirror-gloss champagne epoxy floor in auto service bay reflecting overhead skylights and Rotary Lift posts',
    afterWidth: 600,
    afterHeight: 340,
    afterLabel: 'High-Build Mirror Epoxy Finish',
    prepSpec: 'Planetary Diamond Grind (CSP-3) + Crack Chasing',
    coatingSpec: '100% Solids Moisture-Mitigating Primer + High-Build Pigmented Epoxy + Chemical-Resistant Urethane Topcoat',
    turnaround: '4 Days',
    storyHook: 'When brake fluid, hydraulic oil, and 10,000-lb lifts are your daily reality, hardware-store paint doesn’t stand a chance.',
    storyBody:
      'We stripped decades of failing red floor paint down to raw, open-pore concrete with our heavy planetary diamond grinder, rebuilt every control joint and spall, and poured a self-leveling champagne epoxy system that reflects the shop skylights like glass.',
    defaultSliderPos: 48,
  },
  {
    id: 'commercial-warehouse-flake',
    title: 'Distribution Warehouse Facility',
    subtitle: 'Cracked Forklift Slab → Seamless Cobalt & Slate Flake System',
    category: 'epoxy',
    categoryLabel: 'Warehouse Flake System',
    location: '209 Industrial Corridor, CA',
    beforeImage: '/images/projects/warehouse-floor-before.jpeg',
    beforeAlt: 'Before: Patched, cracked industrial warehouse concrete floor with yellow safety bollards and pallet racking',
    beforeWidth: 450,
    beforeHeight: 600,
    beforeLabel: 'Cracked & Patched Forklift Slab',
    afterImage: '/images/projects/warehouse-flake-epoxy-after.png',
    afterAlt: 'After: Full-broadcast blue and grey decorative flake epoxy floor spanning the commercial warehouse bay',
    afterWidth: 450,
    afterHeight: 600,
    afterLabel: 'Full-Broadcast Industrial Flake',
    prepSpec: 'HEPA Scarifying & 6 Bags of Diamond-Ground Dust Removed',
    coatingSpec: 'Polyurea Joint Fill + Deep-Penetrating Epoxy + 100% Broadcast Vinyl Flake + UV Polyaspartic Seal',
    turnaround: '3 Days',
    storyHook: 'Six heavy bags of diamond-ground concrete dust came off this floor before a single drop of resin touched it.',
    storyBody:
      'Forklift traffic punishes weak prep. By mechanically profiling every square foot around active pallet racking and yellow safety bollards, we locked in an impact-resistant full-broadcast flake floor that brightens the entire warehouse and cleans in minutes.',
    defaultSliderPos: 52,
  },
  {
    id: 'mcauley-landmark-restoration',
    title: 'Historic McAuley Dealership Corner',
    subtitle: 'Ghost Signage & Torn Awning → Modern Architectural Bronze',
    category: 'commercial',
    categoryLabel: 'Commercial Exterior Overhaul',
    location: 'Merced / Central Valley, CA',
    beforeImage: '/images/projects/mcauley-building-before.png',
    beforeAlt: 'Before: Weathered gray commercial corner building with faded McAuley Ford ghost lettering and AAC Painters trailer parked outside',
    beforeWidth: 600,
    beforeHeight: 450,
    beforeLabel: 'Ghost Signage & Weathering Stucco',
    afterImage: '/images/projects/mcauley-building-after.png',
    afterAlt: 'After: Fully restored commercial showroom building with smooth architectural bronze stucco and crisp white window mullions',
    afterWidth: 600,
    afterHeight: 450,
    afterLabel: 'Architectural Bronze Elastomeric',
    prepSpec: 'Awning Demo + Stucco Patching + Alkali-Resistant Masonry Primer',
    coatingSpec: '2-Coat High-Build Elastomeric Masonry System + Crisp Anodized Trim Finish',
    turnaround: '5 Days',
    storyHook: 'Everyone in town recognized the old ghost lettering on this corner—for all the wrong reasons.',
    storyBody:
      'Our crew dismantled the mangled blue metal awning, resurfaced the scarred stucco where decades-old dealership signs once hung, and wrapped the entire landmark + its 8-bay service wing in a rich, UV-armored architectural bronze.',
    defaultSliderPos: 50,
  },
  {
    id: 'residential-garage-masterpiece',
    title: '2-Car Residential Garage Transformation',
    subtitle: 'Stained Raw Concrete → Granite Showroom Flake Floor',
    category: 'residential',
    categoryLabel: 'Residential Garage Epoxy',
    location: 'Central Valley Homeowner',
    beforeImage: '/images/projects/residential-garage-before.png',
    beforeAlt: 'Before: Stained, dusty residential two-car garage concrete floor during masking and surface preparation',
    beforeWidth: 600,
    beforeHeight: 450,
    beforeLabel: 'Stained & Pitted Garage Slab',
    afterImage: '/images/projects/residential-garage-flake-epoxy-after.png',
    afterAlt: 'After: Glossy granite-blend decorative flake epoxy floor with coated stem walls in a residential 2-car garage',
    afterWidth: 450,
    afterHeight: 600,
    afterLabel: 'Polyaspartic Granite Flake System',
    prepSpec: 'Diamond Grinding + Stem Wall Detailing + Moisture Vapor Primer',
    coatingSpec: 'Full-Broadcast 1/4" Tuxedo/Granite Flake + Fast-Cure UV-Stable Polyaspartic Topcoat',
    turnaround: '1–2 Days',
    storyHook: 'Why let the largest room in your home look like a highway overpass?',
    storyBody:
      'We masked the homeowner’s appliances, diamond-ground the oil stains and concrete spalling right out of the slab, coated the perimeter stem walls, and sealed the floor in a hot-tire-proof polyaspartic topcoat that stays glossy for decades.',
    defaultSliderPos: 46,
  },
  {
    id: 'mcdonalds-696-refresh',
    title: 'McDonald’s #696 Franchise Exterior',
    subtitle: 'Sun-Bleached Chalky Canopy → Iconic Golden Arches Yellow',
    category: 'commercial',
    categoryLabel: 'National Franchise Repaint',
    location: 'Store #696 • Central Valley, CA',
    beforeImage: '/images/projects/mcdonalds-696-awning-before.png',
    beforeAlt: 'Before: Faded, sun-bleached beige metal storefront awning on McDonald’s restaurant #696 with painter ladder',
    beforeWidth: 600,
    beforeHeight: 450,
    beforeLabel: 'Sun-Bleached Chalky Metal Canopy',
    afterImage: '/images/projects/mcdonalds-696-awning-after.png',
    afterAlt: 'After: Vibrant, high-gloss golden yellow metal awning and dark bronze storefront trim on McDonald’s #696',
    afterWidth: 600,
    afterHeight: 450,
    afterLabel: 'Brand-Matched Industrial Urethane',
    prepSpec: 'Degreasing + Scuff Sanding + Direct-to-Metal (DTM) Bonding Primer',
    coatingSpec: '2-Component Aliphatic Urethane in Franchise Spec Golden Yellow & Espresso Fascia',
    turnaround: 'Zero Drive-Thru Downtime',
    storyHook: 'Central Valley sun turns national brand colors into pale chalk—unless you use industrial UV chemistry.',
    storyBody:
      'Working around active restaurant hours with zero drive-thru disruption, we prepped and primed the oxidized metal canopy and upper arch beams, restoring the unmistakable high-gloss McDonald’s gold and deep espresso trim.',
    defaultSliderPos: 50,
  },
  {
    id: 'catalyst-industrial-exterior',
    title: 'Catalyst Commercial Facility Repaint',
    subtitle: 'Patchwork Masonry → Sleek Industrial Cool-Slate',
    category: 'commercial',
    categoryLabel: 'Industrial Facility Painting',
    location: 'Central Valley, CA',
    beforeImage: '/images/projects/catalyst-commercial-before.png',
    beforeAlt: 'Before: Patchy, discolored industrial building exterior with extension ladder and safety perimeter tape',
    beforeWidth: 600,
    beforeHeight: 450,
    beforeLabel: 'Patchy Mismatched Masonry',
    afterImage: '/images/projects/catalyst-commercial-after-trailer.png',
    afterAlt: 'After: Uniform slate-gray commercial building facade with the black AAC Painters Inc. trailer parked in front',
    afterWidth: 600,
    afterHeight: 450,
    afterLabel: 'Uniform Industrial Slate Coating',
    prepSpec: '4,000 PSI Pressure Wash + Masonry Patching + Rust-Inhibitive Metal Prime',
    coatingSpec: 'Commercial Exterior Acrylic-Elastomeric System + Security Grille Enamel',
    turnaround: '4 Days',
    storyHook: 'Old patch jobs and mismatched paint repairs make a high-security commercial building look neglected.',
    storyBody:
      'We pressure-washed, sealed every masonry patch and conduit run, and sprayed a monolithic cool-slate commercial coating from the parapet steel down to the sidewalk line.',
    defaultSliderPos: 50,
  },
  {
    id: 'residential-cedar-fence',
    title: 'Backyard Wood Fence Revival',
    subtitle: 'Silver Sun-Oxidized Pickets → Rich Warm Cedar Penetrating Stain',
    category: 'residential',
    categoryLabel: 'Staining & Wood Restoration',
    location: 'Central Valley Residence',
    beforeImage: '/images/projects/wood-fence-before.png',
    beforeAlt: 'Before: Weathered, gray sun-bleached backyard wooden privacy fence before cleaning and staining',
    beforeWidth: 450,
    beforeHeight: 600,
    beforeLabel: 'UV-Grayed & Thirsty Wood Grain',
    afterImage: '/images/projects/wood-fence-stained-after.png',
    afterAlt: 'After: Deep warm cedar-stained wooden fence with vibrant wood grain over green turf',
    afterWidth: 450,
    afterHeight: 600,
    afterLabel: 'Deep-Penetrating Oil Cedar Stain',
    prepSpec: 'Wood Brightener & Mildew Wash + Low-Pressure Rinse + Dry Moisture Check',
    coatingSpec: 'Penetrating UV-Blocking Oil Wood Stain (Warm Amber Cedar)',
    turnaround: '1 Day',
    storyHook: 'Don’t replace a structurally sound fence just because the California sun turned it silver.',
    storyBody:
      'We stripped the dead gray UV-damaged wood fibers, opened the grain, and saturated every picket in a rich, water-repellent cedar stain that brings the backyard back to life.',
    defaultSliderPos: 50,
  },
];

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'auto-shop-odyssey',
    chapterNumber: 'CHAPTER 01',
    badge: '4-STAGE FLOOR DOCUMENTARY',
    title: 'How We Turned a Beaten Auto Shop Into a Liquid-Glass Showroom',
    kicker: 'Most painters hide their prep photos. We frame ours.',
    narrative:
      'Anyone can roll cheap epoxy over a dirty floor and take a photo while it’s still wet. Six months later, hot tires and floor jacks rip it right up. Here is the exact four-stage transformation inside a working Rotary Lift automotive service bay—from raw mechanical demolition to a mirror finish.',
    proTip:
      'Alex’s Rule #1: If a contractor quotes you an epoxy floor without bringing a planetary diamond grinder off their trailer, keep your checkbook in your pocket.',
    steps: [
      {
        stepNumber: '01',
        label: 'THE RAW REALITY',
        title: 'Decades of Oil, Hydraulic Fluid & Failing Red Paint',
        description:
          'Before we touched the slab, the service bay floor was a battlefield of peeling red enamel, deep hydraulic oil contamination, and hairline structural cracks stretching between the Rotary Lift columns.',
        image: '/images/projects/auto-shop-floor-before.png',
        alt: 'Stage 1: Auto shop concrete floor before work, showing peeling red paint and stains near blue car lifts',
        width: 450,
        height: 600,
      },
      {
        stepNumber: '02',
        label: 'DIAMOND GRINDING',
        title: 'Stripping to Open-Pore Concrete (CSP-3 Profile)',
        description:
          'We rolled in our heavy-duty planetary diamond grinder with industrial HEPA vacuum extraction—chewing through the old coatings and opening the microscopic pores of the concrete so our primer locks in mechanically.',
        image: '/images/projects/auto-shop-floor-grinding.png',
        alt: 'Stage 2: Heavy green planetary diamond concrete grinder stripping old coating off the shop floor',
        width: 450,
        height: 600,
      },
      {
        stepNumber: '03',
        label: 'STRUCTURAL REBUILD',
        title: 'Crack Chasing, Spall Patching & Joint Fill',
        description:
          'Once ground down to clean terracotta-toned substrate, every pit, divot, and expansion joint was chased with diamond blades, vacuumed bone-dry, and rebuilt flush with high-durometer polyurea patching compound.',
        image: '/images/projects/auto-shop-floor-patched.png',
        alt: 'Stage 3: Diamond-ground auto shop floor with white structural epoxy patches and chased control joints',
        width: 450,
        height: 600,
      },
      {
        stepNumber: '04',
        label: 'THE MASTERPIECE',
        title: 'Pouring the High-Build Champagne Mirror System',
        description:
          'Finally, we applied a moisture-mitigating vapor barrier, a high-build self-leveling champagne epoxy body coat, and an abrasion-resistant topcoat. The result reflects the overhead trusses like still water and shrugs off jacks, tools, and chemicals.',
        image: '/images/projects/auto-shop-epoxy-floor-after.png',
        alt: 'Stage 4: Completed mirror-gloss champagne epoxy floor reflecting skylights in the auto service shop',
        width: 600,
        height: 340,
      },
    ],
  },
  {
    id: 'landmark-exterior-odyssey',
    chapterNumber: 'CHAPTER 02',
    badge: 'COMMERCIAL FACADE REVIVAL',
    title: 'Erasing 40 Years of Ghost Signage on a Central Valley Landmark',
    kicker: 'From torn metal awnings & faded McAuley Ford lettering to crisp architectural bronze.',
    narrative:
      'Commercial properties at high-traffic intersections carry their history on their walls—literally. When we pulled up to this iconic corner dealership building and its 8-bay service wing, the metal awning was collapsing and the old "McAuley Ford" ghost outlines bled through every previous coat of paint.',
    proTip:
      'Ghost lettering happens when old signage traps moisture and alters stucco porosity. Paint alone never hides it—you have to equalize the texture and seal with high-build elastomeric primer first.',
    steps: [
      {
        stepNumber: '01',
        label: 'AWNING DEMO & SAFETY',
        title: 'Tearing Down the Failing Blue Metal Canopy',
        description:
          'We taped off a full sidewalk safety perimeter and dismantled the rusted, wind-torn blue aluminum awning panel by panel so we could access the damaged stucco ledger underneath.',
        image: '/images/projects/mcauley-building-awning-removal.png',
        alt: 'AAC Painters crew on ladders removing damaged blue metal awning from commercial building with caution tape perimeter',
        width: 600,
        height: 450,
      },
      {
        stepNumber: '02',
        label: 'SUBSTRATE EQUALIZATION',
        title: 'Stripping Hardware & Sealing Ghost Lettering',
        description:
          'With the old canopy stacked for haul-away, we ground down protruding anchor bolts, patched the stucco voids, and applied high-build masonry surfacer over the old oval dealership emblem.',
        image: '/images/projects/mcauley-building-prep.png',
        alt: 'Removed blue awning on sidewalk with exposed ghost lettering on commercial stucco wall ready for resurfacing',
        width: 600,
        height: 450,
      },
      {
        stepNumber: '03',
        label: 'CORNER-TO-CORNER RECOAT',
        title: 'Monolithic Architectural Bronze & Crisp Storefront Trim',
        description:
          'We sprayed two cross-hatched coats of breathable elastomeric masonry coating in warm architectural bronze, paired with bright white storefront mullions that make the corner building look brand new.',
        image: '/images/projects/mcauley-building-after.png',
        alt: 'Completed corner dealership building painted in smooth architectural bronze with white window frames',
        width: 600,
        height: 450,
      },
      {
        stepNumber: '04',
        label: '8-BAY SERVICE WING',
        title: 'Matching the 8 Roll-Up Commercial Service Bays',
        description:
          'Down the service drive, we refinished all eight commercial roll-up steel doors in deep satin espresso bronze against warm desert-taupe stucco—giving the entire property a cohesive, tenant-ready presence.',
        image: '/images/projects/commercial-8-bay-doors-angle.png',
        alt: 'Commercial building wing with 8 freshly painted dark bronze roll-up garage doors and warm taupe stucco',
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
      'Showroom-grade residential garages, auto service bays, and forklift-ready commercial warehouses—prepped with industrial planetary diamond grinders.',
    icon: 'epoxy',
    accentColor: '#E63946',
    features: [
      'Full-Broadcast Decorative Vinyl Flake Systems',
      '1-Day Fast-Cure UV-Stable Polyaspartic Topcoats',
      'Self-Leveling High-Gloss Metallic & Solid Epoxy',
      'Concrete Grinding, Crack Chasing & Grind-and-Seal',
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
      'Zero-downtime exterior and interior painting for franchises, warehouses, historic downtown brick buildings, and multi-bay commercial centers.',
    icon: 'commercial',
    accentColor: '#1D70B8',
    features: [
      'Elastomeric Stucco, Tilt-Up Concrete & Masonry Coatings',
      'Historic Brick Restoration & High-Reach Ladder/Lift Work',
      'Direct-to-Metal (DTM) Awnings, Canopies & 8+ Roll-Up Doors',
      'Night & Weekend Scheduling for Zero Business Disruption',
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
      'Crisp cut lines, obsessive masking, sun-proof exterior house painting, cabinet & trim enamels, and deep-penetrating wood fence & deck staining.',
    icon: 'residential',
    accentColor: '#2A9D8F',
    features: [
      'Complete Exterior Stucco, Siding & Fascia Repaints',
      'Interior Walls, Ceilings, Baseboards & Doors',
      'Cedar & Redwood Fence Restoration & Penetrating Stains',
      'Patio Concrete Staining, Sealing & Garage Makeovers',
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
  Tagline: 'AUTO SHOP FLOOR DOCUMENTARY',
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
  Tagline: 'COMMERCIAL FACADE REVIVAL',
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
    badge: '40-FT LADDER RIGGING • HISTORIC BRICK',
    title: 'High-Reach Historic Brick Facade Restoration in Action',
    description:
      'Watch our crew on 40-foot extension ladders prepping and coating the upper parapet and brick facade on the historic Schut building.'
  },
  {
    id: 'video-brick-after',
    src: '/videos/historic-brick-schut-after.mp4',
    poster: '/images/projects/mcauley-building-after.png',
    badge: 'COMPLETED REVEAL • DOWNTOWN LANDMARK',
    title: 'Completed Historic Brick & Trim Transformation',
    description:
      'Street-level walkaround of the finished historic brick facade after masonry sealing and architectural trim detailing.'
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

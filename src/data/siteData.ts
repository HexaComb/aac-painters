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
    subtitle: 'A closer look at an auto shop floor before and after coating',
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
    prepSpec: 'Review the slab, surface preparation and repair needs',
    coatingSpec: 'Smooth, light-colored floor coating',
    turnaround: '',
    storyHook: 'The paired views show an auto service bay with a worn floor and a light-colored finished surface.',
    storyBody:
      'For a similar space, discuss vehicle traffic, existing contamination, surface repairs and return-to-service requirements during the estimate.',
    defaultSliderPos: 48,
  },
  {
    id: 'commercial-warehouse-flake',
    title: 'Distribution Warehouse Facility',
    subtitle: 'Warehouse concrete and a decorative flake finish',
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
    prepSpec: 'Assess existing concrete and plan surface preparation',
    coatingSpec: 'Decorative flake floor coating',
    turnaround: '',
    storyHook: 'Compare the warehouse slab with the speckled floor finish shown in the completed view.',
    storyBody:
      'The appropriate coating and work schedule depend on floor condition, moisture, traffic and the way the facility is used.',
    defaultSliderPos: 52,
  },
  {
    id: 'mcauley-landmark-restoration',
    title: 'Commercial Landmark Building',
    subtitle: 'A corner storefront exterior before and after painting',
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
    prepSpec: 'Review exterior surfaces, access and masking needs',
    coatingSpec: 'Exterior wall and trim paint',
    turnaround: '',
    storyHook: 'The exterior views show a change from a light facade to a deeper neutral wall color with dark storefront framing.',
    storyBody:
      'An exterior estimate can address surface condition, repairs, color choices and access around doors and walkways.',
    defaultSliderPos: 50,
  },
  {
    id: 'residential-garage-masterpiece',
    title: '2-Car Residential Garage',
    subtitle: 'Residential garage concrete with a decorative flake finish',
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
    prepSpec: 'Assess the slab and any repair or preparation needs',
    coatingSpec: 'Decorative flake garage floor coating',
    turnaround: '',
    storyHook: 'These garage views show the concrete surface before coating and the textured-looking flake finish afterward.',
    storyBody:
      'Ask about suitable coating options, surface preparation and cure time before moving vehicles or stored items back into the garage.',
    defaultSliderPos: 46,
  },
  {
    id: 'mcdonalds-696-refresh',
    title: 'Commercial Storefront Canopy',
    subtitle: 'A storefront canopy and exterior paint detail',
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
    prepSpec: 'Plan access and protect adjacent storefront surfaces',
    coatingSpec: 'Exterior canopy paint',
    turnaround: '',
    storyHook: 'The storefront images focus on the canopy and its yellow-painted finish.',
    storyBody:
      'For an occupied commercial site, discuss customer access, signage, masking and work hours before the scope is finalized.',
    defaultSliderPos: 50,
  },
  {
    id: 'catalyst-industrial-exterior',
    title: 'Commercial Facility Exterior',
    subtitle: 'Exterior walls and trim on a commercial property',
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
    prepSpec: 'Inspect exterior surfaces and define the repaint scope',
    coatingSpec: 'Commercial exterior paint',
    turnaround: '',
    storyHook: 'The building views show the exterior walls and trim before and after repainting.',
    storyBody:
      'The estimate can identify which surfaces are included, any repairs needed and how access will be coordinated around the property.',
    defaultSliderPos: 50,
  },
  {
    id: 'residential-cedar-fence',
    title: 'Backyard Wood Fence Revival',
    subtitle: 'Weathered wood and a warm-toned stained finish',
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
    prepSpec: 'Evaluate wood condition and preparation needs',
    coatingSpec: 'Exterior wood stain',
    turnaround: '',
    storyHook: 'Compare the weathered gray boards with the warm-toned wood finish shown here.',
    storyBody:
      'Wood species, existing finishes and surface condition help determine the preparation and stain options for a fence or deck.',
    defaultSliderPos: 50,
  },
];

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'auto-shop-odyssey',
    chapterNumber: 'CHAPTER 01',
    badge: '4-STAGE FLOOR PROCESS',
    title: 'From Existing Slab to Finished Floor',
    kicker: 'An overview of floor preparation and coating.',
    narrative:
      'Explore the existing slab, grinding, patching and finished floor shown in these images. The preparation method and coating system for your project should be selected after a site assessment.',
    proTip:
      'Ask which repairs, preparation steps and cure times are included in your written estimate.',
    steps: [
      {
        stepNumber: '01',
        label: 'PHASE 01',
        title: 'Review the Existing Floor',
        description:
          'Start with the condition of the concrete, any existing coatings and how the space will be used.',
        image: '/images/projects/auto-shop-floor-before.png',
        alt: 'Auto service bay concrete floor before preparation',
        width: 450,
        height: 600,
      },
      {
        stepNumber: '02',
        label: 'PHASE 02',
        title: 'Prepare the Surface',
        description:
          'Mechanical preparation is shown here. The required surface profile depends on the selected coating and the slab condition.',
        image: '/images/projects/auto-shop-floor-grinding.png',
        alt: 'Floor grinding equipment preparing the concrete surface',
        width: 450,
        height: 600,
      },
      {
        stepNumber: '03',
        label: 'PHASE 03',
        title: 'Patch and Detail',
        description:
          'Review cracks, joints and damaged areas before coating. Repair materials and methods should suit the specific floor.',
        image: '/images/projects/auto-shop-floor-patched.png',
        alt: 'Prepared floor with patched areas visible',
        width: 450,
        height: 600,
      },
      {
        stepNumber: '04',
        label: 'PHASE 04',
        title: 'Review the Finished Surface',
        description:
          'The final view shows a smooth, light-colored floor. Confirm cure time, cleaning and return-to-service guidance for the selected system.',
        image: '/images/projects/auto-shop-epoxy-floor-after.png',
        alt: 'Finished light-colored auto service bay floor',
        width: 600,
        height: 340,
      },
    ],
  },
  {
    id: 'landmark-exterior-odyssey',
    chapterNumber: 'CHAPTER 02',
    badge: '4-STAGE EXTERIOR PROCESS',
    title: 'Preparing and Painting a Storefront Exterior',
    kicker: 'Exterior views from the existing facade to the finished paintwork.',
    narrative:
      'Follow the storefront through the exterior views shown here. A repaint scope should account for existing surfaces, preparation, color selection and access around the building.',
    proTip:
      'Discuss entrances, pedestrian routes and operating hours when planning exterior work.',
    steps: [
      {
        stepNumber: '01',
        label: 'PHASE 01',
        title: 'Review the Existing Exterior',
        description:
          'Identify the wall, trim and storefront surfaces included in the project before work begins.',
        image: '/images/projects/mcauley-building-before.png',
        alt: 'Corner storefront exterior before repainting',
        width: 600,
        height: 450,
      },
      {
        stepNumber: '02',
        label: 'PHASE 02',
        title: 'Plan Access and Protection',
        description:
          'Coordinate work around awnings, windows and entrances, and determine which areas need protection.',
        image: '/images/projects/mcauley-building-awning-removal.png',
        alt: 'Storefront awning area with ladders and a marked work zone',
        width: 600,
        height: 450,
      },
      {
        stepNumber: '03',
        label: 'PHASE 03',
        title: 'Prepare the Wall Surfaces',
        description:
          'Surface condition determines the cleaning, repairs and priming included in the repaint scope.',
        image: '/images/projects/mcauley-building-prep.png',
        alt: 'Storefront facade during surface preparation',
        width: 600,
        height: 450,
      },
      {
        stepNumber: '04',
        label: 'PHASE 04',
        title: 'Review the Finished Facade',
        description:
          'The finished view shows the wall color and contrasting storefront framing. Review the agreed scope and care guidance at completion.',
        image: '/images/projects/mcauley-building-after.png',
        alt: 'Repainted corner storefront exterior',
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
    tagline: 'A Gray, Black & White Flake Color Direction',
    sector: 'Residential & Showroom',
    swatches: ['#1F242B', '#7D848D', '#D9DDE2', '#F5F7FA'],
    gradientCss:
      'radial-gradient(circle at 20% 30%, #ffffff 0 3px, transparent 4px), radial-gradient(circle at 75% 25%, #11151c 0 4px, transparent 5px), radial-gradient(circle at 40% 70%, #9ca3af 0 5px, transparent 6px), radial-gradient(circle at 80% 80%, #e5e7eb 0 3px, transparent 4px), radial-gradient(circle at 15% 85%, #1f2937 0 4px, transparent 5px), linear-gradient(135deg, #4b5563 0%, #374151 50%, #1f2937 100%)',
    textureType: 'flake',
    specs: {
      prep: 'Discuss Slab Preparation, Repairs & Edge Details',
      baseCoat: 'Confirm the Base Coat for Your Slab',
      topCoat: 'Discuss a Suitable Protective Topcoat',
      lifespan: 'Garage & Home Gym Color Inspiration',
    },
    previewImage: '/images/projects/residential-garage-flake-epoxy-after.png',
    previewAlt: 'Tuxedo Granite decorative flake epoxy garage floor installed by AAC Painters Inc.',
  },
  {
    id: 'warehouse-cobalt',
    name: 'Industrial Cobalt & Slate Flake',
    tagline: 'A Blue & Slate Flake Color Direction',
    sector: 'Heavy Commercial & Warehouse',
    swatches: ['#1E3A8A', '#475569', '#94A3B8', '#E2E8F0'],
    gradientCss:
      'radial-gradient(circle at 25% 25%, #3b82f6 0 4px, transparent 5px), radial-gradient(circle at 65% 35%, #cbd5e1 0 3px, transparent 4px), radial-gradient(circle at 45% 75%, #1e3a8a 0 5px, transparent 6px), radial-gradient(circle at 85% 65%, #64748b 0 4px, transparent 5px), linear-gradient(135deg, #334155 0%, #1e293b 55%, #0f172a 100%)',
    textureType: 'flake',
    specs: {
      prep: 'Assess Concrete, Joints & Existing Coatings',
      baseCoat: 'Confirm a Coating for the Intended Traffic',
      topCoat: 'Discuss Chemical Exposure & Topcoat Options',
      lifespan: 'Commercial Floor Color Inspiration',
    },
    previewImage: '/images/projects/warehouse-flake-epoxy-after.png',
    previewAlt: 'Industrial Cobalt and Slate decorative flake epoxy floor in commercial warehouse',
  },
  {
    id: 'champagne-liquid-glass',
    name: 'Liquid-Glass Champagne Polish',
    tagline: 'A Light, Warm-Toned Floor Color Direction',
    sector: 'Auto Bay & High-Gloss',
    swatches: ['#D6C5B3', '#B8A38E', '#EFE6DD', '#8C7A6B'],
    gradientCss:
      'linear-gradient(125deg, #cbb8a3 0%, #e6d8c8 28%, #b8a28b 54%, #f3ece4 76%, #a38d76 100%)',
    textureType: 'liquid-glass',
    specs: {
      prep: 'Review Surface Preparation & Repair Needs',
      baseCoat: 'Discuss Solid-Color Floor Coating Options',
      topCoat: 'Confirm Sheen & Protective Topcoat',
      lifespan: 'Auto Shop & Showroom Color Inspiration',
    },
    previewImage: '/images/projects/auto-shop-epoxy-floor-after.png',
    previewAlt: 'High-gloss champagne epoxy floor in auto service shop with Rotary Lifts',
  },
  {
    id: 'architectural-bronze-shield',
    name: 'Commercial Bronze & Espresso Shield',
    tagline: 'A Bronze & Espresso Exterior Color Direction',
    sector: 'Exterior Architectural',
    swatches: ['#6E5D4F', '#3A322D', '#F4F1EA', '#FFB703'],
    gradientCss:
      'linear-gradient(135deg, #6e5d4f 0%, #52453a 52%, #2c2520 100%)',
    textureType: 'stucco-shield',
    specs: {
      prep: 'Assess Cleaning, Repairs & Priming Needs',
      baseCoat: 'Select Wall Coatings for the Existing Surface',
      topCoat: 'Discuss Trim Paint & Sheen',
      lifespan: 'Exterior Wall & Trim Color Inspiration',
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
      'Floor coating options for residential garages, pool decks, patios, auto service bays and commercial spaces, with preparation and materials selected for the surface.',
    icon: 'epoxy',
    accentColor: '#E63946',
    features: [
      'Full-Broadcast Decorative Vinyl Flake Systems',
      'Polyaspartic Topcoat Options',
      'Metallic & Solid-Color Epoxy Finishes',
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
      'Interior and exterior painting for storefronts, warehouses, HOA communities, hotels, apartment complexes and other commercial properties.',
    icon: 'commercial',
    accentColor: '#1D70B8',
    features: [
      'Elastomeric Stucco, Tilt-Up Concrete & Masonry Coatings',
      'Brick & Masonry Surface Preparation and Painting',
      'Metal Awnings, Canopies & Roll-Up Door Painting',
      'Work Scheduling & Site Access Coordination',
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
      'Interior and exterior home painting, cabinet and trim painting, popcorn ceiling removal, pressure washing, and wood fence and deck staining.',
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
    question: 'How is concrete prepared for a floor coating?',
    answer:
      'Surface preparation should match the condition of the concrete and the requirements of the selected coating. During an estimate, ask whether grinding, cleaning, repairs or other preparation is needed and how dust will be managed.',
  },
  {
    question: 'What is the difference between Epoxy and a Polyaspartic topcoat?',
    answer:
      'Epoxy and polyaspartic are different coating options and may be used in different layers of a floor system. Ask which products are proposed for your slab, how they suit the intended use, and what their care and cure-time requirements are.',
  },
  {
    question: 'Do you handle both residential homes and large commercial properties?',
    answer:
      'AAC Painters offers residential and commercial painting and floor coating services. Share the property type, location and approximate size so the scope and scheduling can be discussed.',
  },
  {
    question: 'Can you paint our commercial building without shutting down our business or drive-thru?',
    answer:
      'Access and scheduling depend on the property and work involved. Discuss operating hours, entrances, pedestrian routes and any areas that must remain available when planning the work. Any temporary closures should be agreed as part of the scope.',
  },
  {
    question: 'What areas in the 209 & Central Valley do you serve?',
    answer:
      'Based in the 209 area code, Alex Delgadillo and the AAC Painters Inc. crew serve Merced, Modesto, Turlock, Atwater, Stockton, Manteca, Tracy, Los Banos, Ceres, Oakdale, Livingston, Chowchilla, and surrounding Central Valley communities.',
  },
  {
    question: 'How fast can I get an accurate quote?',
    answer:
      'Use the quote form on this page or call/text (209) 485-5103. Include your city, the service you need and a few project details so the next steps and estimate availability can be discussed.',
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
    badge: 'EXTERIOR PAINTING • IN PROGRESS',
    title: 'Working Around a Brick Storefront',
    description:
      'A view of the brick facade during exterior work, with masking and protective covering visible.'
  },
  {
    id: 'video-brick-after',
    src: '/videos/historic-brick-schut-after.mp4',
    poster: undefined,
    badge: 'EXTERIOR PAINTING • FINISHED VIEW',
    title: 'A Closer Look at the Finished Exterior',
    description:
      'The follow-up clip shows the brickwork, windows and ground-floor storefront after the protective coverings are removed.'
  }
];

export const interiorCraftGallery = [
  {
    tag: 'RESIDENTIAL GARAGE SHOWROOM',
    title: 'Full-Broadcast Tuxedo Granite Garage Floor',
    description:
      'Decorative flake finish across the garage floor and surrounding stem walls.',
    image: '/images/projects/residential-garage-flake-epoxy-after.png',
    alt: 'Finished residential garage floor with granite flake epoxy by AAC Painters Inc.'
  },
  {
    tag: 'EXTERIOR WOOD RESTORATION',
    title: 'Warm-Tone Wood Fence Staining',
    description:
      'A wood privacy fence shown with a warm, even stain color.',
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

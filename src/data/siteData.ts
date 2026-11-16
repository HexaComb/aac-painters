export interface BeforeAfterItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'commercial' | 'residential';
  categoryLabel: string;
  location: string;
  projectScope: string;
  documentedResult: string;
  processEvidence?: string;
  serviceHref: string;
  serviceLabel: string;
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
  secondarySlogan: 'Fresh Paint. Thoughtful Surface Preparation.',
  president: 'Alex Delgadillo',
  license: '1039849',
  licenseDisplay: 'CSLB Lic #1039849',
  phone: '(209) 485-5103',
  phoneHref: 'tel:+12094855103',
  smsHref: 'sms:+12094855103?&body=Hi%20Alex%2C%20I%27d%20like%20a%20free%20quote%20from%20AAC%20Painters%20Inc.!',
  website: 'https://www.aacpaintersinc.com',
  instagramHandle: '@aac_painters_inc',
  instagramUrl: 'https://www.instagram.com/aac_painters_inc/',
  facebookName: 'AAC PAINTERS INC',
  facebookUrl: 'https://www.facebook.com/search/top?q=AAC%20PAINTERS%20INC',
  serviceAreas: ['Patterson', 'Bay Area', 'Central Valley'],
  counties: ['Merced County', 'Stanislaus County', 'San Joaquin County', 'Madera County'],
};

export const BEFORE_AFTER_GALLERY: BeforeAfterItem[] = [
  {
    id: 'mcauley-landmark-restoration',
    title: 'Commercial Landmark Building',
    subtitle: 'A corner storefront exterior before and after painting',
    category: 'commercial',
    categoryLabel: 'Commercial Exterior Overhaul',
    location: 'Merced / Central Valley, CA',
    projectScope: 'Corner storefront exterior painting',
    documentedResult: 'A deeper neutral facade and dark storefront framing replace the earlier light-color exterior.',
    processEvidence: 'Additional jobsite photos show the awning area and facade preparation.',
    serviceHref: '/services/commercial-painting/',
    serviceLabel: 'Explore commercial painting',
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
    id: 'mcdonalds-696-refresh',
    title: 'Commercial Storefront Canopy',
    subtitle: 'A storefront canopy and exterior paint detail',
    category: 'commercial',
    categoryLabel: 'Storefront Repaint',
    location: 'Central Valley, CA',
    projectScope: 'Commercial storefront canopy repaint',
    documentedResult: 'Paired images document the canopy and its yellow-painted finish.',
    serviceHref: '/services/commercial-painting/',
    serviceLabel: 'Explore commercial painting',
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
    projectScope: 'Commercial building exterior walls and trim',
    documentedResult: 'The photos compare the existing building exterior with its repainted walls and trim.',
    serviceHref: '/services/commercial-painting/',
    serviceLabel: 'Explore commercial painting',
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
    projectScope: 'Exterior wood privacy fence staining',
    documentedResult: 'Weathered gray fence boards appear with a warm-toned stained finish afterward.',
    serviceHref: '/services/residential-painting/',
    serviceLabel: 'Explore residential painting',
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
    id: 'commercial-painting',
    slug: '/services/commercial-painting/',
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
    slug: '/services/residential-painting/',
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
    question: 'What should I include when requesting a quote?',
    answer:
      'Share your city, the service you need, the approximate size or number of areas, current surface condition, and your preferred timing. Photos can help show existing paint, coatings or damage. Use the form below or call or text (209) 485-5103.',
  },
  {
    question: 'What affects the price and schedule?',
    answer:
      'The work area, surface condition, existing paint or coatings, needed preparation, access and finish choice can all affect a proposal. Share any deadline or access limits early, then confirm the scope and schedule in your quote.',
  },
  {
    question: 'How should I plan for room, cabinet, stairwell or railing painting?',
    answer:
      'List the rooms and surfaces, note existing finishes or damage, and point out areas that are hard to reach. Before work begins, confirm who will move items, remove hardware, protect nearby surfaces and handle cleanup.',
  },
  {
    question: 'What should I share for exterior painting, staining or pressure washing?',
    answer:
      'Describe the siding, fence, deck or other surface, its current paint or stain, and any peeling, weathering or access limits. For an occupied business, mention entrances and operating hours. Confirm cleaning, drying and protection of nearby areas in the proposed scope.',
  },
  {
    question: 'What should I know about popcorn removal and new texture?',
    answer:
      'AAC Painters lists popcorn removal and texture work. Share the approximate ceiling area and any known leaks, damage or prior coatings. Ask how material assessment, containment, the new texture and cleanup will be handled before scheduling.',
  },
  {
    question: 'When can I use the room, deck or garage again?',
    answer:
      'Drying and cure time vary by material, weather and site conditions. Preparation may also limit access. Ask for a project-specific return-to-use plan before work begins rather than relying on a general time estimate.',
  },
  {
    question: 'Where does AAC Painters work, and how do I get started?',
    answer:
      'AAC Painters focuses on Patterson and serves the Bay Area and Central Valley. Share your city and service through the quote form or call or text (209) 485-5103 to discuss the next step.',
  },
];


export interface BeforeAfterPair {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  duration: string;
  projectScope: string;
  documentedResult: string;
  processEvidence?: string;
  serviceHref: string;
  serviceLabel: string;
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
    item.category === 'commercial'
        ? 'Commercial'
        : 'Residential',
  duration: item.turnaround,
  projectScope: item.projectScope,
  documentedResult: item.documentedResult,
  processEvidence: item.processEvidence,
  serviceHref: item.serviceHref,
  serviceLabel: item.serviceLabel,
  beforeImage: item.beforeImage,
  beforeAlt: item.beforeAlt,
  afterImage: item.afterImage,
  afterAlt: item.afterAlt,
  story: `${item.storyHook} ${item.storyBody}`,
  finishSystem: item.coatingSpec
}));


export const commercialExteriorStory = {
  title: STORY_CHAPTERS[0].title,
  Tagline: 'EXTERIOR PROCESS',
  summary: STORY_CHAPTERS[0].narrative,
  stages: STORY_CHAPTERS[0].steps.map((s) => ({
    stepLabel: s.label.replace('8-BAY ', ''),
    title: s.title.replace('8 ', 'Multi-Bay '),
    caption: s.description,
    image: s.image,
    alt: s.alt
  }))
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

export const interiorCraftGallery = [
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

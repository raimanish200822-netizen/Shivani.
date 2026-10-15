import { ProductItem } from '../types';

export const PRODUCTS: ProductItem[] = [
  // ==========================================
  // CUSTOM USER UPLOADED PRODUCT
  // ==========================================
  {
    id: 'user-custom-print-product',
    slug: 'user-custom-print-product',
    title: 'Custom Branded Print & Signage Item',
    subtitle: 'Uploaded via Google Drive · High Definition Offset & Digital',
    featureBadge: 'Custom Upload',
    category: 'custom-promotional',
    categoryLabel: 'Custom Promotional & Merch',
    shortDescription: 'Special custom printed item with high-resolution direct upload from customer Google Drive.',
    detailedDescription: 'Professional high-definition printing service for custom branded items, promotional merchandise, signs, and documents. Uploaded directly from client secure Google Drive files.',
    rating: 5.0,
    reviewCount: 140,
    dispatchTag: '⚡ Same-Day Store Pickup',
    badge: 'Customer Special',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/d/1RE5nts0aR6wiXYZsdvhrELGa2mkO_-x1',
        alt: 'User custom uploaded print product',
        caption: 'Custom High-Definition Print Artwork'
      }
    ],
    specs: [
      { label: 'Print Quality', value: 'High-Resolution CMYK Full Color' },
      { label: 'Turnaround Time', value: 'Same-Day Express Processing' },
      { label: 'Min. Order', value: '1 unit onwards' }
    ],
    config: {
      sizes: [
        { id: 'standard', name: 'Standard Custom Size', priceMultiplier: 1.0, description: 'Custom tailored format' }
      ],
      materials: [
        { id: 'premium-stock', name: 'Premium Commercial Stock', priceMultiplier: 1.0, description: 'High durability material' }
      ],
      finishes: [
        { id: 'gloss-matte', name: 'Professional Gloss / Matte', priceMultiplier: 1.0, description: 'Flawless finish' }
      ],
      sides: [
        { id: 'single', name: 'Single-Sided Print', priceMultiplier: 1.0, description: 'Standard layout' }
      ],
      quantities: [
        { qty: 1, popular: true },
        { qty: 10, popular: false },
        { qty: 50, popular: false },
        { qty: 100, popular: false }
      ]
    }
  },

  {
    id: 'user-custom-print-product-2',
    slug: 'user-custom-print-product-2',
    title: 'Custom Corporate Print & Stationery Set',
    subtitle: 'Uploaded via Google Drive · Premium Full Color Finish',
    featureBadge: 'Custom Upload',
    category: 'paper-documents',
    categoryLabel: 'Paper & Document Printing',
    shortDescription: 'Custom professional corporate print materials uploaded from client Google Drive.',
    detailedDescription: 'High-quality professional commercial printing for custom corporate stationery, flyers, brochures, and marketing collateral based on customer provided artwork.',
    rating: 4.98,
    reviewCount: 165,
    dispatchTag: '⚡ Same-Day Store Pickup',
    badge: 'Customer Special',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/d/1WwH29iYa7QwE44WqoQdROC4o8QN-6a2V',
        alt: 'User custom uploaded print design',
        caption: 'Custom Client Design & Print Material'
      }
    ],
    specs: [
      { label: 'Print Stock', value: '300 GSM Art Card / Glossy Finish' },
      { label: 'Delivery', value: 'Same-Day Express Dispatch' },
      { label: 'Min. Order', value: '10 units onwards' }
    ],
    config: {
      sizes: [
        { id: 'standard', name: 'Standard Format', priceMultiplier: 1.0, description: 'Standard tailored dimensions' }
      ],
      materials: [
        { id: 'art-card', name: '300 GSM Gloss Art Board', priceMultiplier: 1.0, description: 'Premium glossy feel' }
      ],
      finishes: [
        { id: 'gloss', name: 'Gloss Lamination', priceMultiplier: 1.0, description: 'Vibrant shine' }
      ],
      sides: [
        { id: 'single', name: 'Single Sided Print', priceMultiplier: 1.0, description: 'Front face print' }
      ],
      quantities: [
        { qty: 50, popular: true },
        { qty: 100, popular: false },
        { qty: 250, popular: false },
        { qty: 500, popular: false }
      ]
    }
  },

  // ==========================================
  // 1. PAPER & DOCUMENT PRINTING
  // ==========================================

  // 1.1 Document Envelopes
  {
    id: 'document-envelopes',
    slug: 'document-envelopes',
    title: 'Document Envelopes (Office & Window)',
    subtitle: 'Printed in 15-30 Mins · Peel & Seal Adhesive Strip',
    featureBadge: '15-Min Ready',
    category: 'paper-documents',
    categoryLabel: 'Paper & Document Printing',
    shortDescription: 'Official commercial mailing envelopes with full-color logo branding and self-adhesive peel & seal.',
    detailedDescription: 'Professional corporate envelopes designed for invoicing, bank statements, legal agreements, and corporate marketing letters. Available in 100 GSM Maplitho, Executive Bond, or Super Sunshine paper with crisp edge-to-edge offset and digital printing. Choice of standard flap or window envelope for computerized billing addresses.',
    rating: 4.92,
    reviewCount: 380,
    dispatchTag: '⚡ Same-Day Store Pickup',
    badge: 'Office Essential',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
        alt: 'Corporate document envelopes stack',
        caption: '100 GSM Bond Official Envelopes with Peel & Seal Tape'
      }
    ],
    specs: [
      { label: 'Standard Sizes', value: '9.5" × 4.5" (DL), 10" × 12" (A4 Document), 6" × 9"' },
      { label: 'Paper Quality', value: '100 GSM Maplitho / 120 GSM Executive Bond' },
      { label: 'Sealing Style', value: 'Peel-and-Seal Self Adhesive Strip' },
      { label: 'Min. Order', value: '100 envelopes' }
    ],
    config: {
      sizes: [
        { id: 'dl-regular', name: 'DL Flap Envelope (9.5" × 4.5")', priceMultiplier: 1.0, description: 'Standard billing & letter envelope' },
        { id: 'dl-window', name: 'DL Window Envelope (9.5" × 4.5")', priceMultiplier: 1.15, description: 'Clear address transparent window' },
        { id: 'a4-document', name: 'A4 Document Size (10" × 12")', priceMultiplier: 1.6, description: 'Fits full un-folded A4 sheets & files' }
      ],
      materials: [
        { id: 'maplitho-100', name: '100 GSM Premium Maplitho', priceMultiplier: 1.0, description: 'Smooth white commercial grade' },
        { id: 'bond-120', name: '120 GSM Executive Sunshine Bond', priceMultiplier: 1.3, description: 'Thick prestigious corporate texture' }
      ],
      finishes: [
        { id: 'matte', name: 'Standard Smooth Finish', priceMultiplier: 1.0, description: 'Clean crisp printing' },
        { id: 'inside-tint', name: 'Security Tint Inside Pattern', priceMultiplier: 1.1, description: 'Opaque interior protects confidential documents' }
      ],
      sides: [
        { id: 'single', name: 'Front Full Color Printing', priceMultiplier: 1.0, description: 'Logo & company return address' },
        { id: 'double', name: 'Front + Flap Printing', priceMultiplier: 1.25, description: 'Full branded flap & front face' }
      ],
      quantities: [
        { qty: 100, popular: true },
        { qty: 250, popular: false },
        { qty: 500, popular: false },
        { qty: 1000, popular: false }
      ]
    }
  },

  // 1.2 Custom Notebook and Spiral Notebook Printing
  {
    id: 'custom-notebooks-spiral',
    slug: 'custom-notebooks-spiral',
    title: 'Custom Notebook & Spiral Notebook Printing',
    subtitle: 'Hardcover & Wiro Spiral · Ruled or Blank Pages',
    featureBadge: 'Custom Branding',
    category: 'paper-documents',
    categoryLabel: 'Paper & Document Printing',
    shortDescription: 'Custom printed corporate diaries, wire-o spiral notebooks, and hardbound journals for schools & offices.',
    detailedDescription: 'Enhance your brand identity with custom-printed notebooks. Featuring rigid 350 GSM laminated front and back covers or hardcover binding, wire-o metal spiral spine, and 80 GSM natural sunshine lined or dotted inner leaves. Ideal for employee onboarding kits, conferences, student seminars, and corporate gifts.',
    rating: 4.96,
    reviewCount: 520,
    dispatchTag: '⚡ 24-Hour Express Dispatch',
    badge: 'Popular Corporate',
    images: [
      {
        url: 'https://kommodo.ai/i/Ivg3kEpp3DOokw3RRrsu',
        alt: 'Custom spiral notebook with company logo',
        caption: 'Wire-O Metal Spiral with Velvet Laminated Cover'
      }
    ],
    specs: [
      { label: 'Available Sizes', value: 'A5 (148 × 210 mm) / A4 (210 × 297 mm) / Pocket B6' },
      { label: 'Cover Stock', value: '350 GSM Art Card with Soft Matte Thermal Film or Hardcover' },
      { label: 'Inner Pages', value: '80 GSM Natural Sunshine Paper (Ruled, Grid, or Plain)' },
      { label: 'Binding Options', value: 'Double Wire-O Spiral / Hardcase Perfect Bound' }
    ],
    config: {
      sizes: [
        { id: 'a5', name: 'A5 Executive (5.8" × 8.3")', priceMultiplier: 1.0, description: 'Standard handheld desk diary' },
        { id: 'a4', name: 'A4 Large Project Book (8.3" × 11.7")', priceMultiplier: 1.45, description: 'Generous writing area for meetings' }
      ],
      materials: [
        { id: 'pages-100', name: '100 Pages (50 Sheets)', priceMultiplier: 1.0, description: 'Compact & lightweight' },
        { id: 'pages-200', name: '200 Pages (100 Sheets)', priceMultiplier: 1.4, description: 'Full year meeting journal' }
      ],
      finishes: [
        { id: 'matte', name: 'Matte Laminated Softcover', priceMultiplier: 1.0, description: 'Silky smooth anti-scuff protection' },
        { id: 'hardcover', name: 'Rigid Hardbound Book Cover', priceMultiplier: 1.5, description: 'Luxury heavy book spine' }
      ],
      sides: [
        { id: 'spiral', name: 'Double Loop Metal Wire-O Spiral', priceMultiplier: 1.0, description: 'Folds 360-degrees flat easily' }
      ],
      quantities: [
        { qty: 25, popular: false },
        { qty: 50, popular: true },
        { qty: 100, popular: false },
        { qty: 500, popular: false }
      ]
    }
  },

  // 1.3 Visiting Cards & Letterhead Printing
  {
    id: 'visiting-cards-premium',
    slug: 'visiting-cards',
    title: 'Visiting Cards & Letterhead Printing',
    subtitle: 'Ready in 5 Minutes · Velvet Touch & Raised Spot UV',
    featureBadge: '5-Minute Pickup',
    category: 'paper-documents',
    categoryLabel: 'Paper & Document Printing',
    shortDescription: 'Luxury visiting cards and corporate letterheads printed on 350 GSM Art Board and 100 GSM Bond Paper.',
    detailedDescription: 'Make every corporate handshake impactful with high-definition digital visiting cards and matching corporate letterheads. Printed on 350 GSM Art Board or 400 GSM Heavyweight Ivory with micro-precision edge trimming, true Fogra-39 CMYK color fidelity, and anti-scuff protective lamination. Express counter printing available in just 5 minutes at our Mahavir Enclave studio.',
    rating: 4.98,
    reviewCount: 1420,
    dispatchTag: '⚡ 5-Minute Express Store Pickup',
    badge: 'Store Bestseller',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
        alt: 'Visiting cards and executive letterhead printing mockup',
        caption: 'Professional Executive Visiting Cards & Corporate Letterhead Set'
      }
    ],
    specs: [
      { label: 'Card Dimensions', value: '89 mm x 54 mm (3.5 x 2.1 inches)' },
      { label: 'Letterhead Dimensions', value: 'A4 (210 mm x 297 mm)' },
      { label: 'Turnaround Time', value: '5-Minute Express Counter Pickup in Mahavir Enclave' },
      { label: 'Card Stock', value: '350 GSM Art Board / 400 GSM Ivory / Natural Kraft' },
      { label: 'Letterhead Stock', value: '100 GSM Sunshine Bond / 120 GSM Executive Ivory' }
    ],
    config: {
      sizes: [
        { id: 'standard', name: 'Visiting Cards (3.5" × 2.0")', priceMultiplier: 1.0, description: 'Classic corporate pocket profile' },
        { id: 'combo', name: 'Combo: 200 Cards + 100 Letterheads', priceMultiplier: 2.4, description: 'Complete executive identity starter pack' },
        { id: 'letterhead-only', name: 'Letterheads A4 (100 Sheets)', priceMultiplier: 1.3, description: 'Official laser-safe corporate stationery' }
      ],
      materials: [
        { id: 'art-350', name: '350 GSM Premium Art Board', priceMultiplier: 1.0, description: 'Rigid, ultra smooth surface' },
        { id: 'matte-400', name: '400 GSM Super Heavy Ivory', priceMultiplier: 1.25, description: 'Substantial executive weight' }
      ],
      finishes: [
        { id: 'thermal-matte', name: 'Thermal Matte Lamination', priceMultiplier: 1.0, description: 'Fingerprint-proof soft finish' },
        { id: 'velvet-soft', name: 'Velvet Soft-Touch Luxury', priceMultiplier: 1.35, description: 'Suede-like tactile feel' },
        { id: 'spot-uv', name: 'Raised Spot UV + Matte Base', priceMultiplier: 1.5, description: 'Glossy raised embossing' }
      ],
      sides: [
        { id: 'double', name: 'Double-Sided (Front & Back Full Color)', priceMultiplier: 1.28, description: 'Recommended for QR & contact' },
        { id: 'single', name: 'Single-Sided (Front Only)', priceMultiplier: 1.0, description: 'Clean front face' }
      ],
      quantities: [
        { qty: 100, popular: true },
        { qty: 250, popular: false },
        { qty: 500, popular: false },
        { qty: 1000, popular: false }
      ]
    }
  },

  // 1.4 Bill Books & Office File Printing
  {
    id: 'bill-books-office-files',
    slug: 'bill-books-office-files',
    title: 'Bill Books & Office File Printing',
    subtitle: 'NCR Carbonless Paper · Perforated & Hardbound Files',
    featureBadge: 'GST Invoicing',
    category: 'paper-documents',
    categoryLabel: 'Paper & Document Printing',
    shortDescription: 'Official GST billing books, delivery challans, receipt vouchers, and custom heavy-duty office document files.',
    detailedDescription: 'Essential commercial tax accounting books printed with computerized sequential serial numbering. Choice of 1+1 duplicate or 1+2 triplicate on self-copying chemical NCR paper with sharp red/black impressions. Plus custom laminated cobra files, box files, and document folders for legal and corporate storage.',
    rating: 4.94,
    reviewCount: 470,
    dispatchTag: '⚡ Same-Day Delivery in Delhi NCR',
    badge: 'Tax Compliant',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=80',
        alt: 'Duplicate bill books and office file printing',
        caption: 'NCR Carbonless Duplicate Bill Books & Custom Document Files'
      }
    ],
    specs: [
      { label: 'Book Sizes', value: '1/4 Demy (5.5" × 8.5") / A4 (8.25" × 11.75") / 1/8 Demy' },
      { label: 'Paper Type', value: 'Carbonless NCR (White + Pink + Yellow Leaves)' },
      { label: 'Binding Style', value: 'Perforated Tear-off with Cardboard Cover & File Bind' },
      { label: 'Numbering', value: 'Computerized 6-Digit Consecutive Serial Numbering' }
    ],
    config: {
      sizes: [
        { id: 'a5-demy4', name: 'A5 / 1/4 Demy Bill Book (5.5" × 8.5")', priceMultiplier: 1.0, description: 'Most popular retail store invoice size' },
        { id: 'a4-size', name: 'A4 Full Size Bill Book (8.25" × 11.75")', priceMultiplier: 1.5, description: 'Corporate quotation & tax challan format' },
        { id: 'office-file', name: 'Custom Laminated Office Cobra File (Pack of 10)', priceMultiplier: 1.8, description: 'Heavyweight rigid folder with clip mechanism' }
      ],
      materials: [
        { id: 'duplicate', name: '1+1 Duplicate (100 Sets / 200 Pages)', priceMultiplier: 1.0, description: 'White original + Pink customer copy' },
        { id: 'triplicate', name: '1+2 Triplicate (50 Sets / 150 Pages)', priceMultiplier: 1.35, description: 'White + Pink + Yellow accounting copy' }
      ],
      finishes: [
        { id: 'standard', name: 'Hardbound Spine + Perforated', priceMultiplier: 1.0, description: 'Clean tear-out margin line' }
      ],
      sides: [
        { id: 'single', name: 'Single Sided Print', priceMultiplier: 1.0, description: 'Standard billing layout' }
      ],
      quantities: [
        { qty: 5, popular: true },
        { qty: 10, popular: false },
        { qty: 25, popular: false },
        { qty: 50, popular: false }
      ]
    }
  },

  // 1.5 Brochures & Corporate Catalogues (including Folder with Pocket)
  {
    id: 'brochures-catalogues-folder',
    slug: 'brochures-catalogues-folder',
    title: 'Brochures & Corporate Catalogues (Folder with Pocket)',
    subtitle: 'Bi-Fold, Tri-Fold & Pocket Folders with Card Slot',
    featureBadge: 'Luxury Art Paper',
    category: 'paper-documents',
    categoryLabel: 'Paper & Document Printing',
    shortDescription: 'Multi-fold commercial marketing brochures, company catalogues, and presentation pocket folders with business card slits.',
    detailedDescription: 'Present your products and services with high-impact corporate sales collateral. Available as 4-page bi-fold, 6-page tri-fold brochures, multi-page product catalogues, or custom die-cut presentation folders with deep inside pockets and visiting card slots. Printed on 300 GSM art card with thermal velvet matte or glossy UV lamination.',
    rating: 4.95,
    reviewCount: 410,
    dispatchTag: '⚡ 24-Hour Dispatch',
    badge: 'Marketing Bestseller',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
        alt: 'Corporate brochures and presentation folders with pocket',
        caption: 'Presentation Folder with Interior Pocket & Business Card Slot'
      }
    ],
    specs: [
      { label: 'Paper Stock', value: '250 GSM / 300 GSM Art Board / 170 GSM Gloss Paper' },
      { label: 'Brochure Formats', value: 'Bi-Fold (4 Panels), Tri-Fold (6 Panels), Accordion Fold' },
      { label: 'Folder Pocket', value: 'Die-cut pocket fits up to 25 A4 pages with card slot' },
      { label: 'Lamination', value: 'Thermal Matte or Gloss with Spot UV highlights' }
    ],
    config: {
      sizes: [
        { id: 'pocket-folder', name: 'Presentation Folder with Pocket (9" × 12")', priceMultiplier: 1.4, description: 'Includes business card slot & holds A4 papers' },
        { id: 'trifold-a4', name: 'Tri-Fold Brochure (A4 Open, 6 Panels)', priceMultiplier: 1.0, description: 'Standard compact marketing flyer' },
        { id: 'catalogue-8p', name: '8-Page Product Catalogue Booklet', priceMultiplier: 2.2, description: 'Stapled brochure booklet for extensive product line' }
      ],
      materials: [
        { id: 'art-300', name: '300 GSM Heavyweight Art Card', priceMultiplier: 1.0, description: 'Sturdy durable executive feel' },
        { id: 'art-350', name: '350 GSM Extra Rigid Board', priceMultiplier: 1.25, description: 'Maximum durability for client proposals' }
      ],
      finishes: [
        { id: 'matte', name: 'Thermal Matte Anti-Scuff', priceMultiplier: 1.0, description: 'Sophisticated satin reflection' },
        { id: 'gloss', name: 'Ultra Gloss Lamination', priceMultiplier: 1.05, description: 'Vibrant punchy photo contrast' }
      ],
      sides: [
        { id: 'double', name: 'Full Color Both Sides', priceMultiplier: 1.0, description: 'Complete inner and outer panels' }
      ],
      quantities: [
        { qty: 100, popular: true },
        { qty: 250, popular: false },
        { qty: 500, popular: false },
        { qty: 1000, popular: false }
      ]
    }
  },

  // 1.6 Certificates (Printing & Framing)
  {
    id: 'certificates-framing',
    slug: 'certificates-framing',
    title: 'Certificates (Printing & Luxury Framing)',
    subtitle: '300 GSM Textured Parchment · Synthetic Wood Frames',
    featureBadge: 'Luxury Parchment',
    category: 'paper-documents',
    categoryLabel: 'Paper & Document Printing',
    shortDescription: 'Official merit, achievement, and appreciation certificates printed on textured parchment with elegant synthetic wood display frames.',
    detailedDescription: 'Honor achievements, courses, sports tournaments, and corporate excellence. Printed on 300 GSM Italian textured ivory parchment paper with anti-counterfeit micro-borders, metallic gold foil stamping, and personalized variable names. Complete with gallery-ready black or golden synthetic wooden frames with shatter-proof acrylic glass.',
    rating: 4.97,
    reviewCount: 310,
    dispatchTag: '⚡ Ready in 15-30 Minutes',
    badge: 'Prestige Award',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
        alt: 'Merit certificates with luxury wooden display frame',
        caption: 'Parchment Certificate with Golden Foil Border & Glass Frame'
      }
    ],
    specs: [
      { label: 'Paper Quality', value: '300 GSM Heavyweight Textured Ivory Parchment' },
      { label: 'Frame Material', value: 'Faux Teakwood & Polished Synthetic Molding' },
      { label: 'Glass Type', value: '2mm Shatterproof Ultra-Clear Acrylic' },
      { label: 'Foil Details', value: 'Metallic Golden Foil Crest & Stamped Border' }
    ],
    config: {
      sizes: [
        { id: 'cert-framed-a4', name: 'A4 Certificate with Luxury Wooden Frame', priceMultiplier: 1.6, description: 'Ready to hang on wall or stand on desk' },
        { id: 'cert-unframed-a4', name: 'A4 Certificate Paper Only (Unframed)', priceMultiplier: 1.0, description: 'Parchment print ready for folder presentation' }
      ],
      materials: [
        { id: 'textured-ivory', name: '300 GSM Textured Ivory Paper', priceMultiplier: 1.0, description: 'Classic regal diploma feel' },
        { id: 'metallic-pearl', name: '300 GSM Shimmer Metallic Pearl', priceMultiplier: 1.25, description: 'Subtle iridescent sparkle' }
      ],
      finishes: [
        { id: 'gold-foil', name: 'Embossed Metallic Gold Border', priceMultiplier: 1.3, description: 'Official high-prestige emblem' },
        { id: 'standard', name: 'Digital CMYK Full Color', priceMultiplier: 1.0, description: 'Sharp crisp typography' }
      ],
      sides: [
        { id: 'single', name: 'Single-Sided Print', priceMultiplier: 1.0, description: 'Face display' }
      ],
      quantities: [
        { qty: 10, popular: true },
        { qty: 25, popular: false },
        { qty: 50, popular: false },
        { qty: 100, popular: false }
      ]
    }
  },

  // 1.7 Promotional Pamphlets & Flyers
  {
    id: 'promotional-pamphlets',
    slug: 'promotional-pamphlets',
    title: 'Promotional Pamphlets & Advertising Flyers',
    subtitle: 'Printed in 1-2 Hours · A4 & A5 Glossy Art Paper',
    featureBadge: 'Bulk Discount',
    category: 'paper-documents',
    categoryLabel: 'Paper & Document Printing',
    shortDescription: 'High-speed commercial advertising flyers and marketing pamphlets for newspaper distribution, events, and sales campaigns.',
    detailedDescription: 'Distribute your promotions across Delhi NCR with maximum visibility. Printed on industrial high-speed digital and offset sheet presses using 130 GSM or 170 GSM imported gloss paper with vivid, non-fading colors. Fast turnaround available in 1-2 hours.',
    rating: 4.91,
    reviewCount: 650,
    dispatchTag: '⚡ 2-Hour Express Printing',
    badge: 'Marketing Hit',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80',
        alt: 'Stacks of glossy promotional flyers and pamphlets',
        caption: 'High-Density Glossy Flyers for Newspaper & Doorstep Distribution'
      }
    ],
    specs: [
      { label: 'Available Sizes', value: 'A5 (5.8" × 8.3") / A4 (8.3" × 11.7")' },
      { label: 'Paper Stock', value: '130 GSM Gloss Art Paper / 170 GSM Premium Gloss' },
      { label: 'Printing Speed', value: 'Same-day turnaround for up to 10,000 units' },
      { label: 'Min. Order', value: '500 units' }
    ],
    config: {
      sizes: [
        { id: 'a5', name: 'A5 Size (5.8" × 8.3")', priceMultiplier: 1.0, description: 'Standard economical flyer size' },
        { id: 'a4', name: 'A4 Size (8.3" × 11.7")', priceMultiplier: 1.6, description: 'Large menu and educational flyer format' }
      ],
      materials: [
        { id: 'gloss-130', name: '130 GSM Imported Gloss Paper', priceMultiplier: 1.0, description: 'Lightweight flyer for newspaper insertions' },
        { id: 'gloss-170', name: '170 GSM Heavy Gloss Paper', priceMultiplier: 1.3, description: 'Handout brochure with extra substance' }
      ],
      finishes: [
        { id: 'standard', name: 'Gloss Machine Coat', priceMultiplier: 1.0, description: 'Bright reflective shine' }
      ],
      sides: [
        { id: 'single', name: 'Single-Sided Print', priceMultiplier: 1.0, description: 'Front promotion only' },
        { id: 'double', name: 'Double-Sided (Both Sides)', priceMultiplier: 1.45, description: 'Front and back menu/details' }
      ],
      quantities: [
        { qty: 500, popular: true },
        { qty: 1000, popular: false },
        { qty: 2500, popular: false },
        { qty: 5000, popular: false }
      ]
    }
  },

  // ==========================================
  // 2. CARDS & INVITATIONS
  // ==========================================

  // 2.1 Scroll Wedding Cards
  {
    id: 'scroll-wedding-cards',
    slug: 'scroll-wedding-cards',
    title: 'Scroll Wedding Cards (Royal Farman Style)',
    subtitle: 'Handmade Velvet & Gold Tassels · Regal Cylindrical Case',
    featureBadge: 'Royal Farman',
    category: 'cards-invitations',
    categoryLabel: 'Cards & Invitations',
    shortDescription: 'Regal Indian scroll wedding invitations (Farman style) on handmade velvet and parchment with metallic golden rods and tassels.',
    detailedDescription: 'Step into royal tradition with custom-designed Farman scroll wedding invitations. Crafted with rich velvet or handmade ivory parchment, fitted with electroplated golden end-knobs, braided zari tassels, and presented inside a luxury matching hexagonal or cylindrical gift box.',
    rating: 4.99,
    reviewCount: 290,
    dispatchTag: '⚡ 48-Hour Custom Crafting',
    badge: 'Royal Collection',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        alt: 'Royal scroll wedding card with golden tassels and velvet case',
        caption: 'Traditional Farman Scroll with Golden Metallic Rods & Box'
      }
    ],
    specs: [
      { label: 'Scroll Material', value: 'Rich Velvet Cloth / Handmade Ivory Parchment Paper' },
      { label: 'Accessories', value: 'Metallic Golden End Rods with Braided Zari Tassels' },
      { label: 'Packaging Box', value: 'Matching Cylindrical or Hexagonal Hard Case Box' },
      { label: 'Lettering', value: 'Screen Printed Gold / Silver Foil Lettering' }
    ],
    config: {
      sizes: [
        { id: 'scroll-standard', name: 'Royal Scroll (8" × 12") with Box', priceMultiplier: 1.0, description: 'Complete scroll inside decorated presentation case' },
        { id: 'scroll-grand', name: 'Grand Emperor Scroll (10" × 16") with Box', priceMultiplier: 1.45, description: 'Larger royal proclamation style' }
      ],
      materials: [
        { id: 'velvet-maroon', name: 'Imperial Maroon Velvet', priceMultiplier: 1.0, description: 'Traditional royal wedding shade' },
        { id: 'parchment-ivory', name: 'Textured Shimmer Handmade Paper', priceMultiplier: 0.9, description: 'Classic parchment aesthetic' }
      ],
      finishes: [
        { id: 'gold-foil', name: 'Raised Metallic Gold Printing', priceMultiplier: 1.25, description: 'Gleaming golden lettering' }
      ],
      sides: [
        { id: 'single', name: 'Face Proclamation', priceMultiplier: 1.0, description: 'Complete wedding ceremony details' }
      ],
      quantities: [
        { qty: 50, popular: true },
        { qty: 100, popular: false },
        { qty: 200, popular: false }
      ]
    }
  },

  // 2.2 Sticker Invitation Cards
  {
    id: 'sticker-invitation-cards',
    slug: 'sticker-invitation-cards',
    title: 'Sticker Invitation Cards & Seal Labels',
    subtitle: 'Metallic Gold Foil · Self-Adhesive Peeling',
    featureBadge: 'Waterproof Foil',
    category: 'cards-invitations',
    categoryLabel: 'Cards & Invitations',
    shortDescription: 'Self-adhesive sticker invitation cards, sweets box labels, and embossed gold foil wax-look envelope monogram seals.',
    detailedDescription: 'Add a luxurious personalized finishing touch to your wedding envelopes, sweet gift hampers, and ceremony favor boxes. Printed on waterproof vinyl, gold foil paper, or clear transparent sheets with customized couple monograms, auspicious Shloka, and guest RSVP names.',
    rating: 4.93,
    reviewCount: 340,
    dispatchTag: '⚡ Same-Day Delivery in Delhi NCR',
    badge: 'Ceremony Special',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
        alt: 'Sticker invitation cards and golden wax monogram seals',
        caption: 'Embossed Gold Foil Seal Stickers for Wedding Boxes & Envelopes'
      }
    ],
    specs: [
      { label: 'Shapes Available', value: 'Circular (1.5" / 2" / 3"), Rectangular, Custom Die-Cut' },
      { label: 'Sticker Substrate', value: 'Metallic Mirror Gold, Gloss Vinyl, Transparent Clear' },
      { label: 'Adhesive Strength', value: 'Permanent High-Tack Adhesive' },
      { label: 'Min. Order', value: '100 stickers' }
    ],
    config: {
      sizes: [
        { id: 'round-2in', name: 'Round Seal Stickers (2" Diameter)', priceMultiplier: 1.0, description: 'Perfect size for envelope flaps & sweet boxes' },
        { id: 'rect-box', name: 'Invitation Box Sticker (4" × 6")', priceMultiplier: 1.6, description: 'Complete invitation card attached to sweet box' }
      ],
      materials: [
        { id: 'gold-mirror', name: 'Mirror Metallic Gold Sheet', priceMultiplier: 1.25, description: 'Reflective royal gold shine' },
        { id: 'gloss-white', name: 'Waterproof Glossy White Vinyl', priceMultiplier: 1.0, description: 'Vibrant full-color floral printing' }
      ],
      finishes: [
        { id: 'die-cut', name: 'Kiss-Cut Easy Peel Sheet', priceMultiplier: 1.0, description: 'Peels off smoothly without tearing' }
      ],
      sides: [
        { id: 'single', name: 'Front Printed Face', priceMultiplier: 1.0, description: 'One-sided adhesive backing' }
      ],
      quantities: [
        { qty: 100, popular: true },
        { qty: 250, popular: false },
        { qty: 500, popular: false }
      ]
    }
  },

  // 2.3 Traditional Shadi & Ceremony Cards
  {
    id: 'wedding-invitations-custom',
    slug: 'wedding-invitations-custom',
    title: 'Designer Shadi & Ceremony Cards',
    subtitle: 'Printed in 24-48 Hours · Laser Cut & Embossed Motifs',
    featureBadge: 'Designer Box',
    category: 'cards-invitations',
    categoryLabel: 'Cards & Invitations',
    shortDescription: 'Exquisite Indian wedding cards, Mundan ceremony invitations, and Shadi cards with embossed Lord Ganesha and Radha Krishna artwork.',
    detailedDescription: 'Custom-designed ceremonial wedding cards printed on imported handmade textured metallic paper. Complete with custom inserts for Sangeet, Mehendi, Haldi, Reception, and coordinated envelopes with couple initials.',
    rating: 4.96,
    reviewCount: 780,
    dispatchTag: '⚡ 24-48 Hour Turnaround',
    badge: 'Bestselling Invitation',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=1200&q=80',
        alt: 'Indian wedding invitation card with gold foil Ganesha',
        caption: 'Multi-Insert Laser Cut Wedding Card with Matching Envelope'
      }
    ],
    specs: [
      { label: 'Paper Grade', value: '280 GSM Metallic Shimmer / Handmade Textured Paper' },
      { label: 'Printing Type', value: 'Screen Gold Raised Ink / Foil Stamping / UV Print' },
      { label: 'Languages', value: 'Hindi, English, Sanskrit Shlokas & Regional scripts' },
      { label: 'Min. Order', value: '50 cards' }
    ],
    config: {
      sizes: [
        { id: '2-insert', name: '2 Inserts + Envelope', priceMultiplier: 1.0, description: 'Wedding & Reception' },
        { id: '3-insert', name: '3 Inserts + Envelope', priceMultiplier: 1.25, description: 'Mehendi, Sangeet & Main Wedding' }
      ],
      materials: [
        { id: 'metallic-red', name: 'Royal Red Shimmer Board', priceMultiplier: 1.0, description: 'Traditional auspicious tone' },
        { id: 'ivory-gold', name: 'Pearl Ivory & Antique Gold', priceMultiplier: 1.15, description: 'Contemporary elegant aesthetic' }
      ],
      finishes: [
        { id: 'emboss', name: 'Embossed Foil Work', priceMultiplier: 1.0, description: 'Raised tactile details' }
      ],
      sides: [
        { id: 'double', name: 'Printed Inserts', priceMultiplier: 1.0, description: 'Multi-leaf wedding program' }
      ],
      quantities: [
        { qty: 50, popular: false },
        { qty: 100, popular: true },
        { qty: 250, popular: false }
      ]
    }
  },

  // 2.4 Marriage Bio-Data & Kundli
  {
    id: 'marriage-biodata-kundli',
    slug: 'marriage-biodata-kundli',
    title: 'Marriage Bio-Data & Computerized Janam Kundli',
    subtitle: 'Printed in 5-10 Minutes · Glossy Parchment Prints',
    featureBadge: '5-Minute Pickup',
    category: 'cards-invitations',
    categoryLabel: 'Cards & Invitations',
    shortDescription: 'Professional matrimonial bio-data resumes and computerized astrological Janam Kundli printed on glossy parchment in 5 minutes.',
    detailedDescription: 'Matrimonial proposals demand polished presentation. We offer beautifully templated Hindi and English marriage bio-data profiles with high-resolution photo insertion, alongside comprehensive computerized Vedic Janam Kundli charts with planetary positions and Guna Milan.',
    rating: 4.95,
    reviewCount: 620,
    dispatchTag: '⚡ 5-Minute Instant Counter Ready',
    badge: 'Fast Walk-in',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1532012164546-f432f2e37b73?auto=format&fit=crop&w=1200&q=80',
        alt: 'Marriage bio-data sheets and astrological janam kundli',
        caption: 'A4 Glossy Matrimonial Resume & Computerized Janam Kundli'
      }
    ],
    specs: [
      { label: 'Paper Quality', value: '250 GSM High-Gloss Photographic Sheet / Ivory Card' },
      { label: 'Turnaround Time', value: '5-Minute Instant Pickup at Mahavir Enclave counter' },
      { label: 'Format Included', value: 'Full Color Hard Copy + Complimentary PDF copy' },
      { label: 'Lamination', value: 'Optional gloss lamination protects against folds' }
    ],
    config: {
      sizes: [
        { id: 'single-page', name: 'A4 Single Page Format', priceMultiplier: 1.0, description: 'Standard concise profile' },
        { id: 'two-page', name: 'A4 Two Page Detailed Folder', priceMultiplier: 1.45, description: 'Complete family background + horoscope' }
      ],
      materials: [
        { id: 'glossy-250', name: '250 GSM Mirror Gloss Sheet', priceMultiplier: 1.0, description: 'Crystal clear photo print' },
        { id: 'textured-ivory', name: 'Textured Ivory Parchment', priceMultiplier: 1.2, description: 'Elegant traditional look' }
      ],
      finishes: [
        { id: 'unlaminated', name: 'Standard Crisp Print', priceMultiplier: 1.0, description: 'Ready to frame or folder' },
        { id: 'laminated', name: 'Protective Film Laminated', priceMultiplier: 1.25, description: 'Waterproof & spill-resistant' }
      ],
      sides: [
        { id: 'single', name: 'Single-Sided', priceMultiplier: 1.0, description: 'Front print' }
      ],
      quantities: [
        { qty: 5, popular: false },
        { qty: 10, popular: true },
        { qty: 25, popular: false }
      ]
    }
  },

  // ==========================================
  // 3. CUSTOM & PROMOTIONAL PRINTING
  // ==========================================

  // 3.1 Mug Print Services
  {
    id: 'mug-print-services',
    slug: 'mug-print-services',
    title: 'Mug Print Services (Panoramic Ceramic Mugs)',
    subtitle: 'Printed in 10-15 Minutes · Grade-A Microwave Safe',
    featureBadge: '10-Min Pickup',
    category: 'custom-promotional',
    categoryLabel: 'Custom & Promotional Printing',
    shortDescription: 'Custom printed ceramic photo coffee mugs with 360-degree panoramic glossy sublimation printing.',
    detailedDescription: 'Turn your cherished photos, corporate logos, or inspirational quotes into everyday drinkware. Printed using sublimation heat transfer onto Grade-A 330ml ceramic mugs. 100% dishwasher safe, microwave safe, and scratch-resistant. Express 10-minute counter pickup in Mahavir Enclave.',
    rating: 4.96,
    reviewCount: 940,
    dispatchTag: '⚡ 10-Minute Express Store Pickup',
    badge: 'Gift Bestseller',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
        alt: 'Personalised ceramic photo coffee mug with full color print',
        caption: 'Grade-A Ceramic Mug with 360° Panoramic Vibrant Print'
      }
    ],
    specs: [
      { label: 'Capacity', value: '330 ml (11 oz Standard Coffee Mug)' },
      { label: 'Material', value: 'Grade-A Pure White Ceramic' },
      { label: 'Durability', value: '100% Microwave Safe & Dishwasher Safe' },
      { label: 'Turnaround Time', value: '10 Minutes at Mahavir Enclave store' }
    ],
    config: {
      sizes: [
        { id: 'white-classic', name: 'Classic Pure White 11oz Mug', priceMultiplier: 1.0, description: 'Universal corporate & family favorite' },
        { id: 'magic-color', name: 'Magic Heat-Color Changing Mug (Black to Photo)', priceMultiplier: 1.5, description: 'Reveals photo when hot coffee is poured' },
        { id: 'inner-color', name: 'Two-Tone Color Inside Mug (Red/Blue/Yellow)', priceMultiplier: 1.25, description: 'Colored interior with matching handle' }
      ],
      materials: [
        { id: 'ceramic-a', name: 'Grade-A Ceramic with High Gloss Polymer', priceMultiplier: 1.0, description: 'Scratch-resistant ceramic' }
      ],
      finishes: [
        { id: 'glossy', name: 'High-Gloss Panoramic Print', priceMultiplier: 1.0, description: 'Vivid color reproduction' }
      ],
      sides: [
        { id: 'panoramic', name: 'Full Wrap-Around (Both Sides + Center)', priceMultiplier: 1.0, description: 'Continuous panoramic print' }
      ],
      quantities: [
        { qty: 1, popular: true },
        { qty: 5, popular: false },
        { qty: 12, popular: false },
        { qty: 50, popular: false }
      ]
    }
  },

  // 3.1b Beer Mug & Glass Printing
  {
    id: 'beer-mug-printing',
    slug: 'beer-mug-printing',
    title: 'Custom Beer Mugs & Glass Steins',
    subtitle: 'Frosted & Clear Glass · Permanent Sublimation Etch',
    featureBadge: 'Glassware',
    category: 'custom-promotional',
    categoryLabel: 'Custom & Promotional Printing',
    shortDescription: 'Heavy-duty frosted and clear glass beer mugs with custom names, crests, and graphic photo printing.',
    detailedDescription: 'Celebrate milestones and parties with custom-engraved or printed glass beer mugs. Crafted from heavy dishwasher-safe thick glassware with ergonomic handles and permanent high-definition etching.',
    rating: 4.97,
    reviewCount: 410,
    dispatchTag: '⚡ Same-Day Store Pickup',
    badge: 'Party Hit',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?auto=format&fit=crop&w=1200&q=80',
        alt: 'Custom beer mug with frosted crown print',
        caption: 'Heavyweight Glass Beer Stein with Permanent Print'
      }
    ],
    specs: [
      { label: 'Capacity', value: '500 ml Heavyweight Glass Stein' },
      { label: 'Material', value: 'Thick Durable Clear & Frosted Glass' },
      { label: 'Print Type', value: 'Permanent Sublimation / Laser Frost' }
    ],
    config: {
      sizes: [
        { id: 'beer-500ml', name: 'Standard Beer Stein (500ml)', priceMultiplier: 1.0, description: 'Heavy glass mug with handle' }
      ],
      materials: [
        { id: 'clear-glass', name: 'Crystal Clear Glass', priceMultiplier: 1.0, description: 'Glossy transparent finish' }
      ],
      finishes: [
        { id: 'etch', name: 'Permanent Etch / Print', priceMultiplier: 1.0, description: 'Scratch-resistant' }
      ],
      sides: [
        { id: 'single', name: 'Custom Print Face', priceMultiplier: 1.0, description: 'Front design' }
      ],
      quantities: [
        { qty: 1, popular: true },
        { qty: 4, popular: false }
      ]
    }
  },

  // 3.1c Custom Name Labels & School Slips
  {
    id: 'name-labels-notebook-slips',
    slug: 'name-labels-notebook-slips',
    title: 'Custom Name Labels & Notebook Slips',
    subtitle: 'Waterproof Vinyl · Cartoon & Superhero Themes',
    featureBadge: 'School Special',
    category: 'custom-promotional',
    categoryLabel: 'Custom & Promotional Printing',
    shortDescription: 'Personalised waterproof name labels and notebook identification slips with cartoon, superhero, and princess themes.',
    detailedDescription: 'Organize school books and stationery with custom waterproof name labels and notebook slips. Printed on tear-proof vinyl with vibrant Disney, Spiderman, Avengers, and Unicorn graphics.',
    rating: 4.95,
    reviewCount: 530,
    dispatchTag: '⚡ Ready in 15 Mins',
    badge: 'Kids Favorite',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
        alt: 'Custom waterproof notebook name labels and slips',
        caption: 'Waterproof Glossy Name Labels & Notebook Slips Sheet'
      }
    ],
    specs: [
      { label: 'Sheet Size', value: 'A4 Waterproof Vinyl Sticker Sheet' },
      { label: 'Durability', value: '100% Waterproof, Tear-Proof & Scratch-Proof' }
    ],
    config: {
      sizes: [
        { id: 'sheet-a4', name: 'A4 Sticker Sheet (Set of 32 Labels)', priceMultiplier: 1.0, description: 'Assorted sizes for books & bottles' }
      ],
      materials: [
        { id: 'vinyl', name: 'Glossy Waterproof Vinyl', priceMultiplier: 1.0, description: 'Durable adhesive' }
      ],
      finishes: [
        { id: 'die-cut', name: 'Die-Cut Easy Peel', priceMultiplier: 1.0, description: 'Ready to peel and stick' }
      ],
      sides: [
        { id: 'single', name: 'Full Color Sheet', priceMultiplier: 1.0, description: 'Vibrant print' }
      ],
      quantities: [
        { qty: 1, popular: true },
        { qty: 5, popular: false }
      ]
    }
  },

  // 3.2 T-Shirt Printing
  {
    id: 'tshirt-printing-custom',
    slug: 'tshirt-printing-custom',
    title: 'T-Shirt Printing (DTF / Screen Cotton Merch)',
    subtitle: 'Printed in 20-30 Mins · 180 GSM Bio-Washed Cotton',
    featureBadge: 'DTF Technology',
    category: 'custom-promotional',
    categoryLabel: 'Custom & Promotional Printing',
    shortDescription: 'Custom printed round-neck and polo t-shirts in 100% bio-washed cotton with high-density DTF graphics.',
    detailedDescription: 'Dress your team or event in style. Premium 180 GSM pre-shrunk combed cotton t-shirts printed with state-of-the-art Direct-to-Film (DTF) graphics that will not crack, peel, or fade even after 50+ machine washes. Available in sizes XS to 3XL in Black, White, Navy, Maroon, and Grey.',
    rating: 4.95,
    reviewCount: 880,
    dispatchTag: '⚡ Same-Day Pickup in Delhi NCR',
    badge: 'Merch Favorite',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1200&q=80',
        alt: 'Custom printed cotton t-shirts on hangers',
        caption: '180 GSM Bio-Washed Cotton T-Shirt with High-Density DTF Print'
      }
    ],
    specs: [
      { label: 'Fabric Composition', value: '100% Combed Bio-Washed Cotton (180 GSM)' },
      { label: 'Printing Method', value: 'Industrial High-Definition DTF / Screen Print' },
      { label: 'Wash Care', value: 'Machine Washable, Anti-Pilling, Fade-Resistant' },
      { label: 'Sizes Available', value: 'XS, S, M, L, XL, XXL, 3XL' }
    ],
    config: {
      sizes: [
        { id: 'round-neck', name: 'Round Neck Casual T-Shirt', priceMultiplier: 1.0, description: 'Comfortable everyday wear' },
        { id: 'polo-collar', name: 'Polo Collar Corporate T-Shirt (Matty Cotton)', priceMultiplier: 1.45, description: 'Formal executive collared t-shirt' }
      ],
      materials: [
        { id: 'black', name: 'Jet Black (180 GSM)', priceMultiplier: 1.0, description: 'Deep rich black cotton' },
        { id: 'white', name: 'Classic Pure White (180 GSM)', priceMultiplier: 1.0, description: 'Bright summer white cotton' },
        { id: 'navy', name: 'Navy Blue (180 GSM)', priceMultiplier: 1.0, description: 'Corporate navy tone' }
      ],
      finishes: [
        { id: 'dtf-hd', name: 'High-Density DTF Print', priceMultiplier: 1.0, description: 'Photographic full-color details' }
      ],
      sides: [
        { id: 'front-only', name: 'Front Chest Print Only', priceMultiplier: 1.0, description: 'Clean chest emblem or artwork' },
        { id: 'front-back', name: 'Front Chest + Full Back Print', priceMultiplier: 1.35, description: 'Logo on front + campaign/sponsor on back' }
      ],
      quantities: [
        { qty: 1, popular: true },
        { qty: 5, popular: false },
        { qty: 25, popular: false },
        { qty: 100, popular: false }
      ]
    }
  },

  // 3.3 Stamps, Rubber Stamps, and Stump Pads
  {
    id: 'stamps-rubber-pads',
    slug: 'stamps-rubber-pads',
    title: 'Stamps, Rubber Stamps, and Stamp Pads',
    subtitle: 'Ready in 15-30 Mins · Self-Inking Automated Seals',
    featureBadge: '15-Min Ready',
    category: 'custom-promotional',
    categoryLabel: 'Custom & Promotional Printing',
    shortDescription: 'Automated self-inking rubber stamps, director seals, dater stamps, and official banking stamp pads made in 15 minutes.',
    detailedDescription: 'Authorize company paperwork, GST invoices, and banking cheques instantly. Precision laser-engraved rubber stamps housed in smooth spring-action self-inking mechanisms. Clean, smudge-free impressions lasting over 10,000 stamps before needing an ink refill. Pre-inked stamp pads and dater stamps available.',
    rating: 4.97,
    reviewCount: 710,
    dispatchTag: '⚡ 15-Minute Instant Counter Pickup',
    badge: 'Store Essential',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=1200&q=80',
        alt: 'Self-inking rubber stamps and official stamping pad',
        caption: 'Automated Self-Inking Rubber Stamp (10,000+ Clean Impressions)'
      }
    ],
    specs: [
      { label: 'Stamp Technology', value: 'Laser-Engraved Polymer & Self-Inking Cartridge' },
      { label: 'Ink Colors Available', value: 'Blue, Black, Red, Green, Violet' },
      { label: 'Turnaround Time', value: '15-30 Minutes at Mahavir Enclave counter' },
      { label: 'Ink Refillable', value: 'Yes, easily refillable cartridge' }
    ],
    config: {
      sizes: [
        { id: 'rect-address', name: 'Rectangle Address/Firm Stamp (58 × 22 mm)', priceMultiplier: 1.0, description: 'Proprietor, Director, GSTIN & Address' },
        { id: 'round-seal', name: 'Circular Official Seal (38 mm Diameter)', priceMultiplier: 1.25, description: 'Company circular emblem seal with outer ring' },
        { id: 'pocket-stamp', name: 'Slim Mobile Pocket Stamp (Portable)', priceMultiplier: 1.35, description: 'Fits in pocket, pop-out seal mechanism' },
        { id: 'stamp-pad-only', name: 'Heavy-Duty Stamp Ink Pad (Blue/Black)', priceMultiplier: 0.5, description: 'Metal case ink pad for manual wooden stamps' }
      ],
      materials: [
        { id: 'blue-ink', name: 'Official Royal Blue Ink', priceMultiplier: 1.0, description: 'Standard banking & GST document ink' },
        { id: 'black-ink', name: 'Jet Black Ink', priceMultiplier: 1.0, description: 'Formal crisp documentation' },
        { id: 'red-ink', name: 'Auditor Red Ink', priceMultiplier: 1.0, description: 'Audit & verification stamping' }
      ],
      finishes: [
        { id: 'self-inking', name: 'Automated Spring Self-Inker', priceMultiplier: 1.0, description: 'Built-in ink pad' }
      ],
      sides: [
        { id: 'single', name: 'Standard Impression', priceMultiplier: 1.0, description: 'Clean crisp stamp face' }
      ],
      quantities: [
        { qty: 1, popular: true },
        { qty: 2, popular: false },
        { qty: 5, popular: false }
      ]
    }
  },

  // 3.4a Dedicated Section: Custom Mugs & Magic Coffee Mugs
  {
    id: 'custom-mugs-section',
    slug: 'custom-mugs-section',
    title: 'Custom Photo Mugs & Magic Coffee Mugs',
    subtitle: 'Printed in 10 Mins · Grade-A Ceramic & Heat-Sensitive',
    featureBadge: 'Mugs Collection',
    category: 'custom-promotional',
    categoryLabel: 'Custom & Promotional Printing',
    shortDescription: 'Personalised ceramic coffee mugs, color-changing magic mugs, and couple mugs with vibrant 360-degree sublimation printing.',
    detailedDescription: 'Transform your daily coffee routine or gift cherished memories with premium ceramic mugs. Featuring grade-A glossy white polymer coating, dishwasher safety, and magical heat-sensitive color-changing mugs that reveal hidden photos when hot beverages are poured.',
    rating: 4.98,
    reviewCount: 1120,
    dispatchTag: '⚡ 10-Minute Express Store Pickup',
    badge: 'Mugs Bestseller',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
        alt: 'Personalised ceramic coffee mug with couple photo',
        caption: 'Grade-A Ceramic Mug with 360° Panoramic Sublimation Print'
      }
    ],
    specs: [
      { label: 'Capacity', value: '330 ml (11 oz Standard Ceramic)' },
      { label: 'Material', value: 'Pure White Grade-A Microwave-Safe Ceramic' },
      { label: 'Turnaround Time', value: '10 Minutes at Mahavir Enclave store counter' }
    ],
    config: {
      sizes: [
        { id: 'white-mug', name: 'Classic White Ceramic Mug (11oz)', priceMultiplier: 1.0, description: 'Universal photo and logo coffee mug' },
        { id: 'magic-mug', name: 'Heat-Sensitive Magic Mug (Black to Photo)', priceMultiplier: 1.45, description: 'Reveals photo magically upon pouring hot liquid' },
        { id: 'inner-color-mug', name: 'Two-Tone Inner Color Mug (Red/Blue/Pink)', priceMultiplier: 1.2, description: 'Matching handle and vibrant inner glaze' }
      ],
      materials: [
        { id: 'ceramic', name: 'Grade-A Glossy Ceramic', priceMultiplier: 1.0, description: 'Scratch-resistant polymer coating' }
      ],
      finishes: [
        { id: 'gloss', name: 'High-Gloss Sublimation Print', priceMultiplier: 1.0, description: 'Vibrant non-fading colors' }
      ],
      sides: [
        { id: 'wrap', name: '360-Degree Panoramic Wrap', priceMultiplier: 1.0, description: 'Full wrap-around design' }
      ],
      quantities: [
        { qty: 1, popular: true },
        { qty: 5, popular: false },
        { qty: 10, popular: false }
      ]
    }
  },

  // 3.4b Dedicated Section: Personalized Keychains
  {
    id: 'personalized-keychains-section',
    slug: 'personalized-keychains-section',
    title: 'Personalized Metal & Hexagon Keychains',
    subtitle: 'Printed in 15 Mins · Double-Sided Crystal Photo Inserts',
    featureBadge: 'Keychains Collection',
    category: 'custom-promotional',
    categoryLabel: 'Custom & Promotional Printing',
    shortDescription: 'Custom photo keychains in hexagon, square, and metal alloy shapes with crystal-clear scratchproof photo inserts.',
    detailedDescription: 'Carry your favorite memories everywhere or gift branded corporate keychains. Crafted with sturdy metal alloy rings, polished acrylic or wooden backing, and ultra-glossy high-definition photo printing on both sides.',
    rating: 4.94,
    reviewCount: 680,
    dispatchTag: '⚡ 15-Minute Express Store Pickup',
    badge: 'Keychain Favorite',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1629814491321-99f2b87ff74d?auto=format&fit=crop&w=1200&q=80',
        alt: 'Custom hexagon and metal photo keychains',
        caption: 'Double-Sided Crystal Photo Keychain with Sturdy Ring'
      }
    ],
    specs: [
      { label: 'Shapes', value: 'Hexagon, Rectangle, Circular, Heart' },
      { label: 'Material', value: 'Brushed Metal Alloy / Heavy Acrylic / Wood' },
      { label: 'Turnaround Time', value: '15 Minutes at Mahavir Enclave store' }
    ],
    config: {
      sizes: [
        { id: 'hexagon-keychain', name: 'Hexagon Custom Photo Keychain', priceMultiplier: 1.0, description: 'Modern geometric shape with double-sided photo' },
        { id: 'metal-keychain', name: 'Executive Metal Alloy Keychain', priceMultiplier: 1.25, description: 'Heavyweight metallic keyring with laser engraving' }
      ],
      materials: [
        { id: 'acrylic-gloss', name: 'Glossy Crystal Acrylic', priceMultiplier: 1.0, description: 'Crystal clarity with protective resin' }
      ],
      finishes: [
        { id: 'double-sided', name: 'Double-Sided Photo Insert', priceMultiplier: 1.0, description: 'Different photo on front & back' }
      ],
      sides: [
        { id: 'front-back', name: 'Both Sides Printed', priceMultiplier: 1.0, description: 'Full color' }
      ],
      quantities: [
        { qty: 1, popular: true },
        { qty: 2, popular: false },
        { qty: 5, popular: false }
      ]
    }
  },

  // 3.4c Dedicated Section: Heart Pillows & Satin Cushions
  {
    id: 'heart-pillows-cushions-section',
    slug: 'heart-pillows-cushions-section',
    title: 'Heart Pillows & Romantic Satin Cushions',
    subtitle: 'Printed in 20 Mins · Soft Microfiber & Glossy Satin',
    featureBadge: 'Heart Pillows',
    category: 'custom-promotional',
    categoryLabel: 'Custom & Promotional Printing',
    shortDescription: 'Romantic heart-shaped pillows and square silky satin cushions with custom couple photo printing and soft fiber filling.',
    detailedDescription: 'Express your love with custom-printed heart pillows and plush satin cushions. Crafted from ultra-soft glossy white satin fabric with a hidden zipper, plush microfiber stuffing, and vibrant couple photo sublimation.',
    rating: 4.97,
    reviewCount: 540,
    dispatchTag: '⚡ 20-Minute Express Store Pickup',
    badge: 'Romantic Gift',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=80',
        alt: 'Heart-shaped satin pillow and photo cushion',
        caption: '14" x 14" Heart Pillow & Satin Cushion with Microfiber Fill'
      }
    ],
    specs: [
      { label: 'Shape & Size', value: 'Heart Shape (14" × 14") or Square (16" × 16")' },
      { label: 'Fabric', value: 'Silky Gloss Satin Cover with Plush Microfiber Filler' },
      { label: 'Turnaround Time', value: '20 Minutes at Mahavir Enclave store counter' }
    ],
    config: {
      sizes: [
        { id: 'heart-pillow', name: 'Romantic Heart-Shaped Pillow (14" × 14")', priceMultiplier: 1.1, description: 'Includes heart satin cover + soft filling' },
        { id: 'square-cushion', name: 'Square Satin Couple Cushion (16" × 16")', priceMultiplier: 1.0, description: 'Classic square throw pillow with photo' },
        { id: 'magic-sequin-pillow', name: 'Heart Magic Sequin Pillow (Swipe to Reveal)', priceMultiplier: 1.5, description: 'Reversible glitter sequin heart pillow' }
      ],
      materials: [
        { id: 'satin-fabric', name: 'Silky White Gloss Satin', priceMultiplier: 1.0, description: 'Luxurious soft touch' }
      ],
      finishes: [
        { id: 'sublimation-soft', name: 'Permanent Sublimation Print', priceMultiplier: 1.0, description: 'Washable and fade-free' }
      ],
      sides: [
        { id: 'front', name: 'Couple Photo Front Print', priceMultiplier: 1.0, description: 'Personalized face' }
      ],
      quantities: [
        { qty: 1, popular: true },
        { qty: 2, popular: false }
      ]
    }
  },

  // 3.5 50 Passport Size Photos (5-Min Express Studio)
  {
    id: 'passport-size-photos',
    slug: 'passport-size-photos',
    title: '50 Passport Size Photos (5-Min Express Studio)',
    subtitle: 'Printed in 5 Minutes · Fuji Photographic Paper',
    featureBadge: '5-Minute Pickup',
    category: 'custom-promotional',
    categoryLabel: 'Custom & Promotional Printing',
    shortDescription: 'Studio portrait photography and instant passport photo printing on authentic Fuji crystal photographic paper.',
    detailedDescription: 'Ready in just 5 minutes while you wait at our Mahavir Enclave counter. We capture and process 50 passport size photos with digital skin retouching, background tinting (White, Light Blue, or Grey), and exact passport/visa dimensions.',
    rating: 4.98,
    reviewCount: 1650,
    dispatchTag: '⚡ 5-Minute Instant Counter Ready',
    badge: 'Counter Champion',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
        alt: 'Official passport size photos sheet with white background',
        caption: 'Sheet of 50 Studio Passport Photos with Digital Blemish Retouching'
      }
    ],
    specs: [
      { label: 'Photo Paper', value: 'Genuine Fuji Crystal Photographic Archival Paper' },
      { label: 'Standard Dimensions', value: '35 mm x 45 mm (Standard Passport / Visa)' },
      { label: 'Turnaround Time', value: '5 Minutes at Mahavir Enclave Studio counter' },
      { label: 'Included Compliment', value: 'High-Res Digital Passport Softcopy via WhatsApp' }
    ],
    config: {
      sizes: [
        { id: 'pack-50', name: 'Pack of 50 Passport Photos', priceMultiplier: 1.0, description: 'Instant print sheet ready to cut' },
        { id: 'pack-100', name: 'Pack of 100 Passport Photos (Value Deal)', priceMultiplier: 1.5, description: 'Ideal for school/college admissions & visas' }
      ],
      materials: [
        { id: 'glossy-fuji', name: 'Fuji High-Gloss Photo Paper', priceMultiplier: 1.0, description: 'Ultra sharp photographic definition' }
      ],
      finishes: [
        { id: 'retouch', name: 'Digital Retouching & Clean Background', priceMultiplier: 1.0, description: 'Official compliance guarantee' }
      ],
      sides: [
        { id: 'single', name: 'Single-Sided Photo Print', priceMultiplier: 1.0, description: 'Archival quality print' }
      ],
      quantities: [
        { qty: 1, popular: true }
      ]
    }
  },

  // 3.6 Photo Frames with Photo Print (5-Min Ready)
  {
    id: 'photo-frame-with-photo',
    slug: 'photo-frame-with-photo',
    title: 'Photo Frames with Photo Print (5-Min Ready)',
    subtitle: 'Printed & Framed in 5 Mins · Synthetic Wood Frames',
    featureBadge: '5-Minute Pickup',
    category: 'custom-promotional',
    categoryLabel: 'Custom & Promotional Printing',
    shortDescription: 'Synthetic wooden gallery photo frames with instant photographic prints inserted in 5 minutes at the store counter.',
    detailedDescription: 'Walk in with a phone photo, walk out in 5 minutes with a framed gift. Includes studio high-gloss photographic print inserted into synthetic wooden frames with shatter-proof acrylic glass and tabletop kickstand + wall mount hooks.',
    rating: 4.97,
    reviewCount: 890,
    dispatchTag: '⚡ 5-Minute Instant Store Pickup',
    badge: 'Instant Gift Hit',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
        alt: 'Black gallery photo frame with family photo print',
        caption: 'Ready-in-5-Minutes Studio Photo Frame with Table Stand & Wall Hook'
      }
    ],
    specs: [
      { label: 'Available Sizes', value: '4" × 6", 5" × 7", 8" × 10", 8" × 12" (A4), 12" × 18"' },
      { label: 'Frame Molding', value: 'Synthetic Molded Wood (Black, Walnut, Gold, White)' },
      { label: 'Glass Face', value: 'Shatter-Resistant Optical Grade Acrylic Glass' },
      { label: 'Turnaround Time', value: '5 Minutes at Mahavir Enclave counter' }
    ],
    config: {
      sizes: [
        { id: 'size-6x8', name: '6" × 8" Frame with Photo Print', priceMultiplier: 1.0, description: 'Ideal bedside table and desk display' },
        { id: 'size-8x12', name: '8" × 12" (A4) Frame with Photo Print', priceMultiplier: 1.45, description: 'Most popular living room wall frame' },
        { id: 'size-12x18', name: '12" × 18" Large Wall Gallery Frame', priceMultiplier: 2.1, description: 'Large portrait format for family portraits' }
      ],
      materials: [
        { id: 'frame-black', name: 'Matte Jet Black Synthetic Wood', priceMultiplier: 1.0, description: 'Contemporary minimalist frame' },
        { id: 'frame-walnut', name: 'Walnut Teakwood Grain Finish', priceMultiplier: 1.15, description: 'Warm organic wooden texture' }
      ],
      finishes: [
        { id: 'glossy-print', name: 'Studio Gloss Photo Print Included', priceMultiplier: 1.0, description: 'Crisp vivid colors' }
      ],
      sides: [
        { id: 'single', name: 'Mounted Face', priceMultiplier: 1.0, description: 'Dual wall hook & easel stand' }
      ],
      quantities: [
        { qty: 1, popular: true },
        { qty: 2, popular: false },
        { qty: 5, popular: false }
      ]
    }
  },

  // ==========================================
  // 4. SIGNAGE & LARGE FORMAT / VINYL WORK
  // ==========================================

  // 4.1 Flex Printing & Flex/Banner Boards
  {
    id: 'flex-printing-banner-boards',
    slug: 'flex-printing-banner-boards',
    title: 'Flex Printing & Flex / Banner Boards',
    subtitle: 'Printed in 1-2 Hours · Weatherproof Star Flex & Metal Frames',
    featureBadge: '1-Hour Pickup',
    category: 'signage-vinyl',
    categoryLabel: 'Signage & Large Format / Vinyl',
    shortDescription: 'Heavy-duty 340 GSM Star Flex banners with welded edges and eyelets, plus metal-framed outdoor flex banner boards.',
    detailedDescription: 'Maximize storefront visibility with large-format outdoor flex printing. Printed on 340 GSM heavy-duty Star Flex or 440 GSM Blackout Flex with UV solvent inks. Complete with folded welded hem borders and rust-proof brass eyelets, or mounted onto sturdy iron square-pipe frames for outdoor storefront signage boards.',
    rating: 4.96,
    reviewCount: 920,
    dispatchTag: '⚡ 2-Hour Express Printing',
    badge: 'Signage Leader',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
        alt: 'Outdoor vinyl flex banner printing and shop advertising board',
        caption: 'Heavy-Duty 340 GSM Star Flex Banner with Iron Frame & Eyelets'
      }
    ],
    specs: [
      { label: 'Flex Substrate', value: '340 GSM Star Flex / 440 GSM Blackout Heavyweight Flex' },
      { label: 'Inks Used', value: 'Weather-Proof Eco-Solvent / UV Inks (2+ Year Anti-Fade)' },
      { label: 'Finishing Options', value: 'Heat-Welded Borders, Brass Eyelets Every 2 Ft, Pole Pockets' },
      { label: 'Iron Frame Board', value: 'Available with 1-inch square iron pipe frame mounting' }
    ],
    config: {
      sizes: [
        { id: 'size-6x3', name: '6 ft × 3 ft Flex Banner (18 Sq. Ft)', priceMultiplier: 1.0, description: 'Standard storefront banner' },
        { id: 'size-8x4', name: '8 ft × 4 ft Flex Banner (32 Sq. Ft)', priceMultiplier: 1.65, description: 'Prominent shop board size' },
        { id: 'board-frame-8x4', name: '8 ft × 4 ft Metal-Framed Flex Board', priceMultiplier: 3.2, description: 'Complete with rigid iron pipe frame ready to install' }
      ],
      materials: [
        { id: 'star-340', name: '340 GSM Star Flex', priceMultiplier: 1.0, description: 'Smooth bright outdoor surface' },
        { id: 'blackout-440', name: '440 GSM Blackout Star Flex', priceMultiplier: 1.35, description: 'Opaque backing prevents backlight shadows' }
      ],
      finishes: [
        { id: 'welded-eyelets', name: 'Folded Hemmed Borders + Brass Eyelets', priceMultiplier: 1.0, description: 'Easy rope/nail mounting' }
      ],
      sides: [
        { id: 'single', name: 'Single-Sided Print', priceMultiplier: 1.0, description: 'Outdoor front facing' }
      ],
      quantities: [
        { qty: 1, popular: true },
        { qty: 2, popular: false },
        { qty: 5, popular: false }
      ]
    }
  },

  // 4.2 Plotter Sticker Cutting & Precision Vinyl Decals
  {
    id: 'plotter-sticker-cutting',
    slug: 'plotter-sticker-cutting',
    title: 'Plotter Sticker Cutting & Precision Vinyl Decals',
    subtitle: 'Cut in 15-30 Mins · Precision Computerized Plotters',
    featureBadge: 'Plotter Precision',
    category: 'signage-vinyl',
    categoryLabel: 'Signage & Large Format / Vinyl',
    shortDescription: 'Precision computerized plotter die-cut vinyl stickers, frosted glass privacy film, vehicle lettering, and wall decals.',
    detailedDescription: 'Create razor-sharp logos and lettering without background borders. Our high-precision Roland and Graphtec digital plotters cut self-adhesive cast vinyl sheets with millimeter accuracy. Ideal for retail glass doors, vehicle branding, cafe windows, and industrial machine labeling.',
    rating: 4.94,
    reviewCount: 510,
    dispatchTag: '⚡ Same-Day Delivery in Delhi NCR',
    badge: 'Precision Cutting',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
        alt: 'Plotter cut vinyl decals and stickers on glass window',
        caption: 'Precision Computerized Plotter Vinyl Cutting with Transfer Tape'
      }
    ],
    specs: [
      { label: 'Cutting Width', value: 'Up to 48 inches continuous roll length' },
      { label: 'Vinyl Brand', value: 'Avery Dennison / Oracal 651 High-Tack Cast Vinyl' },
      { label: 'Durability', value: 'Waterproof, UV-Resistant & Weatherproof (3-5 Years)' },
      { label: 'Application Tape', value: 'Includes transparent transfer application tape for easy installation' }
    ],
    config: {
      sizes: [
        { id: 'small-decal', name: 'Medium Cut Vinyl Decal (Up to 2 Sq. Ft)', priceMultiplier: 1.0, description: 'Door logos, timings & vehicle decals' },
        { id: 'large-decal', name: 'Large Cut Vinyl Decal (Up to 10 Sq. Ft)', priceMultiplier: 2.8, description: 'Storefront glass lettering & large wall logos' }
      ],
      materials: [
        { id: 'gloss-vinyl', name: 'High-Gloss Colored Vinyl (Red/White/Black/Yellow)', priceMultiplier: 1.0, description: 'Vibrant solid color finish' },
        { id: 'frosted-glass', name: 'Frosted Dusted Crystal Glass Film', priceMultiplier: 1.35, description: 'Elegant etched glass privacy look for cabins' },
        { id: 'reflective', name: 'Commercial Reflective Safety Vinyl', priceMultiplier: 1.6, description: 'Glows brightly when headlights hit at night' }
      ],
      finishes: [
        { id: 'transfer-taped', name: 'Pre-Masked with Clear Transfer Tape', priceMultiplier: 1.0, description: 'Ready to peel, stick and reveal' }
      ],
      sides: [
        { id: 'single', name: 'Precision Die-Cut Shape', priceMultiplier: 1.0, description: 'Contour cut without background' }
      ],
      quantities: [
        { qty: 1, popular: true },
        { qty: 5, popular: false },
        { qty: 20, popular: false }
      ]
    }
  },

  // 4.3 Acrylic & Branch Sign Boards (ACP Boards, Glow Sign Boards)
  {
    id: 'acrylic-branch-sign-boards',
    slug: 'acrylic-branch-sign-boards',
    title: 'Acrylic & Branch Sign Boards (ACP Boards, Glow Sign Boards)',
    subtitle: 'Custom Fabricated in 24-48 Hours · 3D Letters & LED Modules',
    featureBadge: '3D LED Glow',
    category: 'signage-vinyl',
    categoryLabel: 'Signage & Large Format / Vinyl',
    shortDescription: 'Premium 3D acrylic embossed letter boards, aluminum composite panel (ACP) storefront signs, and LED backlit glow sign boxes.',
    detailedDescription: 'Give your business an unmistakable premium presence on the main road. We fabricate heavy-duty ACP (Aluminum Composite Panel) facade boards with laser-cut 3D acrylic raised letters, illuminated by high-lumen waterproof Samsung LED modules. Complete structural durability engineered for years of outdoor weather resistance.',
    rating: 4.98,
    reviewCount: 380,
    dispatchTag: '⚡ Site Survey & Installation Support',
    badge: 'Premium Facade',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80',
        alt: '3D acrylic illuminated store sign board on ACP panel',
        caption: 'Outdoor 3D Acrylic Letter Board with Backlit Waterproof LEDs'
      }
    ],
    specs: [
      { label: 'Base Panel', value: '3mm / 4mm Exterior Grade Aluminum Composite Panel (ACP)' },
      { label: '3D Lettering', value: 'Laser-Cut 3mm to 10mm Cast Acrylic Sheet with Beveled Edges' },
      { label: 'Lighting', value: 'High-Efficiency Waterproof IP67 LED Modules + Meanwell SMPS' }
    ],
    config: {
      sizes: [
        { id: 'acp-board-compact', name: 'ACP Sign Board (4 ft × 2.5 ft)', priceMultiplier: 1.0, description: 'Clinic, office branch or boutique board' },
        { id: 'acp-board-medium', name: 'ACP Sign Board (8 ft × 3 ft)', priceMultiplier: 2.2, description: 'Standard commercial market storefront' },
        { id: 'led-glow-sign', name: 'LED Glow Sign Backlit Box (6 ft × 3 ft)', priceMultiplier: 1.7, description: 'Uniform backlit glowing sign box' }
      ],
      materials: [
        { id: 'acp-3mm', name: '3mm Exterior Grade ACP + Cast Acrylic', priceMultiplier: 1.0, description: 'Weatherproof aluminum panel' },
        { id: 'acp-mirror', name: 'Mirror Golden / Silver Finish ACP Panel', priceMultiplier: 1.35, description: 'Ultra luxury aesthetic' }
      ],
      finishes: [
        { id: 'led-backlit', name: '3D Raised Acrylic Letters with Internal LED', priceMultiplier: 1.4, description: 'Luminescent night glow' },
        { id: 'non-lit', name: '3D Raised Acrylic Letters (Non-Lit)', priceMultiplier: 1.0, description: 'Daytime elegance' }
      ],
      sides: [
        { id: 'single', name: 'Front Wall Mount', priceMultiplier: 1.0, description: 'Mounting brackets included' }
      ],
      quantities: [
        { qty: 1, popular: true }
      ]
    }
  },

  // 4.4 Roll-Up Exhibition Standees
  {
    id: 'rollup-exhibition-standee',
    slug: 'rollup-exhibition-standee',
    title: 'Roll-Up Exhibition Standees (Aluminium Base)',
    subtitle: 'Printed in 1 Hour · Non-Tearable Matte & Twin Base Feet',
    featureBadge: '1-Hour Pickup',
    category: 'signage-vinyl',
    categoryLabel: 'Signage & Large Format / Vinyl',
    shortDescription: 'Portable 6x3 ft retractable roll-up exhibition banner standees with sturdy aluminium twin-feet base and padded nylon carry bag.',
    detailedDescription: 'The ultimate portable marketing tool for exhibitions, retail promotions, corporate lobbies, conferences, and event receptions. Printed on non-tearable matte poly-film that stays perfectly flat without edge curling. Retracts smoothly into an aluminum cassette base and packs away into an included padded carry bag in seconds.',
    rating: 4.97,
    reviewCount: 640,
    dispatchTag: '⚡ 1-Hour Express Store Pickup',
    badge: 'Exhibition Essential',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
        alt: 'Roll-up exhibition standee banner with aluminium base in corporate hall',
        caption: 'Retractable 6x3 ft Roll-Up Standee with Padded Carry Bag'
      }
    ],
    specs: [
      { label: 'Display Dimensions', value: '6 ft (Height) × 2.5 ft or 3 ft (Width)' },
      { label: 'Banner Media', value: '240 Micron Non-Tearable Matte Poly-Film (Zero Edge Curl)' },
      { label: 'Stand Hardware', value: 'Heavy-Gauge Silver Aluminum Base with Twin Swivel Feet' },
      { label: 'Included Accessory', value: 'Reinforced Nylon Travel Shoulder Bag' }
    ],
    config: {
      sizes: [
        { id: 'size-6x2.5', name: '6 ft × 2.5 ft Roll-Up Standee with Base & Bag', priceMultiplier: 1.0, description: 'Compact display for store counters & tight booths' },
        { id: 'size-6x3', name: '6 ft × 3 ft Roll-Up Standee with Base & Bag', priceMultiplier: 1.18, description: 'Standard corporate exhibition format' }
      ],
      materials: [
        { id: 'non-tear', name: 'Non-Tearable Matte Poly-Film (Anti-Curl)', priceMultiplier: 1.0, description: 'Glare-free satin finish under halogen lights' }
      ],
      finishes: [
        { id: 'high-def', name: 'Ultra-High 1440 DPI Eco-Solvent Print', priceMultiplier: 1.0, description: 'Sharp micro-typography reproduction' }
      ],
      sides: [
        { id: 'single', name: 'Single Sided Retractable Roll', priceMultiplier: 1.0, description: 'Standard exhibition stand' }
      ],
      quantities: [
        { qty: 1, popular: true },
        { qty: 2, popular: false },
        { qty: 5, popular: false }
      ]
    }
  },

  // ==========================================
  // 5. FINISHING & BINDING SERVICES
  // ==========================================

  // 5.1 Binding Services, Lamination, and Creasing
  {
    id: 'binding-lamination-creasing',
    slug: 'binding-lamination-creasing',
    title: 'Binding Services, Lamination, and Creasing',
    subtitle: 'Spiral, Wiro, Hard Binding · Thermal & Cold Lamination',
    featureBadge: '15-Min Ready',
    category: 'finishing-binding',
    categoryLabel: 'Finishing & Binding Services',
    shortDescription: 'Professional document spiral binding, wire-o metal binding, golden hard thesis binding, roll lamination, and score creasing.',
    detailedDescription: 'Turn loose project sheets, training manuals, student dissertations, and corporate presentations into polished bound volumes. We provide on-the-spot spiral binding, double-loop wiro binding, thermal lamination (Matte & Gloss), and digital creasing for menus and greeting cards that fold without cracking.',
    rating: 4.96,
    reviewCount: 580,
    dispatchTag: '⚡ 15-Minute Instant Counter Binding',
    badge: 'Quick Counter',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
        alt: 'Spiral wire-o binding and laminated document presentation',
        caption: 'Spiral Binding, Wiro Binding & Golden Embossed Thesis Hard Binding'
      }
    ],
    specs: [
      { label: 'Binding Formats', value: 'Plastic Spiral / Wire-O Metal / Golden Hardbound Thesis' },
      { label: 'Capacity', value: 'Binds from 10 pages up to 500 pages in single volume' },
      { label: 'Protective Covers', value: 'Transparent Polycarbonate OHP Sheet + Sand Texture Back' },
      { label: 'Turnaround Time', value: '15-30 Minutes at Mahavir Enclave counter' }
    ],
    config: {
      sizes: [
        { id: 'spiral-standard', name: 'Spiral Binding with Transparent Cover (Up to 150 pgs)', priceMultiplier: 1.0, description: 'Flexible plastic coil with clear protective sheet' },
        { id: 'wiro-metal', name: 'Double Loop Metal Wire-O Binding', priceMultiplier: 1.35, description: 'Executive 360-degree flat presentation' },
        { id: 'hard-thesis', name: 'Golden Foil Embossed Hard Thesis Binding', priceMultiplier: 2.8, description: 'University approved navy/black hardcase with gold title' }
      ],
      materials: [
        { id: 'lamination-matte', name: 'Thermal Matte Lamination (Roll Finish)', priceMultiplier: 1.0, description: 'Velvety smooth protection against water & tears' },
        { id: 'lamination-gloss', name: 'Thermal Gloss Lamination (Roll Finish)', priceMultiplier: 1.0, description: 'Bright vibrant shine' }
      ],
      finishes: [
        { id: 'creased', name: 'Spine Scoring & Creasing Included', priceMultiplier: 1.0, description: 'Folds smoothly without paper cracking' }
      ],
      sides: [
        { id: 'double', name: 'Complete Document Volume', priceMultiplier: 1.0, description: 'Full book finishing' }
      ],
      quantities: [
        { qty: 1, popular: true },
        { qty: 5, popular: false },
        { qty: 20, popular: false }
      ]
    }
  },

  // 5.2 Die Pouching & Thermal Lamination
  {
    id: 'die-pouching-lamination',
    slug: 'die-pouching-lamination',
    title: 'Die Pouching & Thermal Lamination',
    subtitle: 'Heavy-Duty 250 Micron · Waterproof Document Protection',
    featureBadge: '5-Minute Pickup',
    category: 'finishing-binding',
    categoryLabel: 'Finishing & Binding Services',
    shortDescription: 'Industrial heat-seal die pouching and heavy thermal lamination for certificates, ID badges, luggage tags, and legal deeds.',
    detailedDescription: 'Protect your irreplaceable documents from moisture, tearing, oil stains, and age deterioration. Using 125 to 250-micron heavy-gauge thermal lamination pouches with rounded safety corners and optional slot hole punching for lanyards or clips.',
    rating: 4.95,
    reviewCount: 430,
    dispatchTag: '⚡ 5-Minute Instant Store Pickup',
    badge: 'Protection Essential',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
        alt: 'Thermal pouch lamination for ID cards and certificates',
        caption: '250 Micron Heat-Seal Die Pouching with Rounded Corners'
      }
    ],
    specs: [
      { label: 'Pouch Thickness', value: '125 Micron / 175 Micron / 250 Micron Heavy Duty' },
      { label: 'Available Sizes', value: 'Identity Card (65 × 95 mm), A4 (216 × 303 mm), A3 (303 × 426 mm)' },
      { label: 'Edge Treatment', value: 'Safe Rounded Corners & Water-Tight Hermetic Seal' },
      { label: 'Turnaround Time', value: '5 Minutes at Mahavir Enclave counter' }
    ],
    config: {
      sizes: [
        { id: 'pouch-a4', name: 'A4 Certificate Die Pouch (250 Micron)', priceMultiplier: 1.0, description: 'Rigid waterproof preservation for degree/marksheet' },
        { id: 'pouch-a3', name: 'A3 Large Document Die Pouch', priceMultiplier: 1.8, description: 'Maps, architectural plans & land registry deeds' },
        { id: 'pouch-id', name: 'ID Card / Badge Pouch with Slot (Pack of 5)', priceMultiplier: 0.7, description: 'Includes punched slot for lanyard clips' }
      ],
      materials: [
        { id: 'micron-250', name: '250 Micron Heavy Rigid Film', priceMultiplier: 1.0, description: 'Maximum bend resistance & waterproofing' }
      ],
      finishes: [
        { id: 'rounded-corners', name: 'Precision Die-Cut Rounded Corners', priceMultiplier: 1.0, description: 'Smooth snag-free safety edges' }
      ],
      sides: [
        { id: 'double', name: 'Dual Face Sealed Encapsulation', priceMultiplier: 1.0, description: '100% moisture sealed edges' }
      ],
      quantities: [
        { qty: 1, popular: true },
        { qty: 5, popular: false },
        { qty: 25, popular: false }
      ]
    }
  },

  // 5.3 PVC Aadhaar & Smart ID Cards (with Satin Lanyard)
  {
    id: 'pvc-aadhaar-smart-card',
    slug: 'pvc-aadhaar-smart-card',
    title: 'PVC Aadhaar & Smart ID Cards (with Satin Lanyard)',
    subtitle: 'Printed in 5 Minutes · 800-Micron Rigid ATM Grade',
    featureBadge: '5-Minute Pickup',
    category: 'finishing-binding',
    categoryLabel: 'Finishing & Binding Services',
    shortDescription: 'ATM-grade rigid PVC Aadhaar cards, school/corporate staff ID cards, and custom sublimated satin neck lanyards.',
    detailedDescription: 'Upgrade flimsy paper Aadhaar cards into durable, waterproof 800-micron ATM-grade smart cards with razor-sharp scannable QR codes. We also manufacture custom student ID cards, visitor passes, and 16mm/20mm satin neck lanyards with customized company printing and metal dog hooks.',
    rating: 4.99,
    reviewCount: 1580,
    dispatchTag: '⚡ 5-Minute Instant Counter Pickup',
    badge: 'Daily Favorite',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
        alt: 'Rigid PVC smart card and printed satin lanyard',
        caption: '800-Micron Rigid PVC Smart Card with Scannable QR & Satin Dori'
      }
    ],
    specs: [
      { label: 'Card Dimensions', value: '85.6 mm x 54 mm (CR80 Standard ATM Size)' },
      { label: 'Thickness', value: '800 Micron Rigid Polyvinyl Chloride (PVC)' },
      { label: 'Durability', value: '100% Waterproof, Scratch-Resistant & Non-Fading' },
      { label: 'Lanyard Option', value: '16mm/20mm Sublimated Satin Ribbon with Metal Hook' }
    ],
    config: {
      sizes: [
        { id: 'pvc-single', name: 'PVC Smart Card Only', priceMultiplier: 1.0, description: 'Standard ATM-thickness card' },
        { id: 'pvc-with-dori', name: 'PVC Card + Custom Printed Satin Lanyard Dori', priceMultiplier: 1.45, description: 'Complete ID card kit ready to wear' }
      ],
      materials: [
        { id: 'pvc-800', name: '800-Micron Rigid Polyvinyl Chloride', priceMultiplier: 1.0, description: 'High-density plastic core' }
      ],
      finishes: [
        { id: 'glossy-uv', name: 'Gloss UV Laminated Surface', priceMultiplier: 1.0, description: 'Protects magnetic stripe & QR' }
      ],
      sides: [
        { id: 'double', name: 'Double-Sided Full Color Print', priceMultiplier: 1.0, description: 'Front photo/ID + Back address & QR' }
      ],
      quantities: [
        { qty: 1, popular: true },
        { qty: 10, popular: false },
        { qty: 50, popular: false },
        { qty: 200, popular: false }
      ]
    }
  },

  // 5.4 Large Format Panoramic Digital Prints (13x40 to A3)
  {
    id: 'large-format-prints-13x40',
    slug: 'large-format-prints-13x40',
    title: 'Large Format Panoramic Digital Prints (13x40 to A3)',
    subtitle: 'Printed in 15 Mins · Heavy Art Card up to 13 × 40 Inches',
    featureBadge: '13x40 Panoramic',
    category: 'finishing-binding',
    categoryLabel: 'Finishing & Binding Services',
    shortDescription: 'Extra-large panoramic commercial digital color prints up to 13 x 40 inches on 300 GSM photographic and textured art paper.',
    detailedDescription: 'Break free from standard A4/A3 size limits. Our digital sheet presses handle wide continuous sheets up to 13 × 40 inches (330 mm × 1016 mm). Perfect for panoramic architectural drawings, landscape photographic prints, long fold-out brochures, book dust jackets, and event posters.',
    rating: 4.96,
    reviewCount: 390,
    dispatchTag: '⚡ Same-Day Store Pickup',
    badge: 'Panoramic Special',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
        alt: 'Extra wide panoramic digital color print on heavy art card',
        caption: '13" x 40" Panoramic Digital Print with Wide Color Gamut'
      }
    ],
    specs: [
      { label: 'Maximum Sheet Size', value: '13 inches × 40 inches (330 × 1016 mm)' },
      { label: 'Paper Stock Options', value: '170 GSM Gloss / 250 GSM Matte / 300 GSM Art Card' },
      { label: 'Print Resolution', value: '2400 × 2400 DPI Ultra High-Definition' },
      { label: 'Turnaround Time', value: '15-30 Minutes at Mahavir Enclave studio' }
    ],
    config: {
      sizes: [
        { id: 'size-13x40', name: '13" × 40" Full Panoramic Sheet', priceMultiplier: 1.0, description: 'Extra-long continuous print' },
        { id: 'size-13x19', name: '13" × 19" Super A3+ Sheet', priceMultiplier: 0.65, description: 'Posters and calendar leaves' }
      ],
      materials: [
        { id: 'art-300', name: '300 GSM Heavy Art Card', priceMultiplier: 1.0, description: 'Sturdy gallery print weight' },
        { id: 'gloss-250', name: '250 GSM Mirror Gloss Paper', priceMultiplier: 0.95, description: 'Maximum photographic contrast' }
      ],
      finishes: [
        { id: 'matte', name: 'Thermal Matte Laminated', priceMultiplier: 1.25, description: 'Reflection-free panoramic display' },
        { id: 'standard', name: 'Unlaminated Pure Paper', priceMultiplier: 1.0, description: 'Natural fine art feel' }
      ],
      sides: [
        { id: 'single', name: 'Single-Sided Panoramic Print', priceMultiplier: 1.0, description: 'Full face print' }
      ],
      quantities: [
        { qty: 1, popular: true },
        { qty: 5, popular: false },
        { qty: 25, popular: false }
      ]
    }
  }
];

export const CATEGORIES = [
  { 
    id: 'all', 
    label: 'All Products (25 Items)', 
    iconName: 'Printer', 
    description: 'Explore the complete digital, commercial print, and signage collection at Shivani Graphics.' 
  },
  { 
    id: 'paper-documents', 
    label: 'Paper & Document Printing', 
    iconName: 'FileText', 
    description: 'Document envelopes, custom notebooks, visiting cards, letterheads, bill books, office files, brochures, catalogues, and certificates.' 
  },
  { 
    id: 'cards-invitations', 
    label: 'Cards & Invitations', 
    iconName: 'Heart', 
    description: 'Royal scroll wedding cards, sticker invitation cards, designer shadi cards, and marriage bio-data/kundli prints.' 
  },
  { 
    id: 'custom-promotional', 
    label: 'Custom & Promotional Printing', 
    iconName: 'Gift', 
    description: 'Custom ceramic photo mugs, t-shirt printing, self-inking rubber stamps, cushions, keychains, passport photos, and photo frames.' 
  },
  { 
    id: 'signage-vinyl', 
    label: 'Signage & Large Format / Vinyl Work', 
    iconName: 'Megaphone', 
    description: 'Outdoor flex printing, banner boards, plotter sticker cutting, acrylic ACP sign boards, LED glow signs, and roll-up standees.' 
  },
  { 
    id: 'finishing-binding', 
    label: 'Finishing & Binding Services', 
    iconName: 'Layers', 
    description: 'Spiral, wiro & hard binding, lamination, creasing, die pouching, PVC smart cards, and 13x40 panoramic digital prints.' 
  }
];

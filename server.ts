import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const DB_FILE = path.resolve(process.cwd(), 'db.json');

const INITIAL_PRODUCTS = [
  {
    id: 'user-custom-print-product',
    slug: 'user-custom-print-product',
    title: 'Custom Branded Print & Signage Item',
    subtitle: 'Uploaded via Google Drive · High Definition Offset & Digital',
    featureBadge: 'Custom Upload',
    category: 'custom-promotional',
    categoryLabel: 'Custom Promotional & Merch',
    shortDescription: 'Special custom printed item with high-resolution direct upload from customer Google Drive.',
    detailedDescription: 'Professional high-definition printing service for custom branded items, promotional merchandise, signs, and documents.',
    rating: 5.0,
    reviewCount: 140,
    dispatchTag: '⚡ Same-Day Store Pickup',
    badge: 'Customer Special',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
        alt: 'Custom printed product',
        caption: 'Custom High-Definition Print Artwork'
      }
    ],
    specs: [
      { label: 'Print Quality', value: 'High-Resolution CMYK Full Color' },
      { label: 'Turnaround Time', value: 'Same-Day Express Processing' },
      { label: 'Min. Order', value: '1 unit onwards' }
    ],
    config: {
      sizes: [{ id: 'standard', name: 'Standard Custom Size', priceMultiplier: 1.0, description: 'Custom tailored format' }],
      materials: [{ id: 'premium-stock', name: 'Premium Commercial Stock', priceMultiplier: 1.0, description: 'High durability material' }],
      finishes: [{ id: 'gloss-matte', name: 'Professional Gloss / Matte', priceMultiplier: 1.0, description: 'Flawless finish' }],
      sides: [{ id: 'single', name: 'Single-Sided Print', priceMultiplier: 1.0, description: 'Standard layout' }],
      quantities: [{ qty: 1, popular: true }, { qty: 10 }, { qty: 50 }, { qty: 100 }]
    },
    basePrice: 299,
    minQuantity: 1
  },
  {
    id: 'visiting-cards-premium',
    slug: 'visiting-cards-premium',
    title: 'Executive Matt Finish Visiting Cards',
    subtitle: '350 GSM Art Card with Velvet Soft Touch & Spot UV',
    featureBadge: 'Bestseller',
    category: 'paper-documents',
    categoryLabel: 'Paper & Document Printing',
    shortDescription: 'Make a lasting first impression with premium 350 GSM velvet touch business cards.',
    detailedDescription: 'Crafted on heavy 350 GSM art card stock with optional velvet soft-touch lamination and raised spot UV highlights.',
    rating: 4.9,
    reviewCount: 382,
    dispatchTag: '⚡ Ready in 2 Hours',
    badge: 'Popular',
    images: [
      { url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80', alt: 'Visiting Cards', caption: 'Executive Visiting Cards' }
    ],
    specs: [
      { label: 'Paper Stock', value: '350 GSM Imported Art Card' },
      { label: 'Finish', value: 'Velvet Soft-Touch & Spot UV' },
      { label: 'Standard Box', value: '100 Cards per Hard Plastic Case' }
    ],
    config: {
      sizes: [{ id: 'std', name: 'Standard (3.5 x 2 inches)', priceMultiplier: 1.0, description: 'Standard business card size' }],
      materials: [{ id: '350gsm', name: '350 GSM Velvet Matt', priceMultiplier: 1.0, description: 'Ultra thick luxury feel' }],
      finishes: [{ id: 'spot-uv', name: 'Spot UV Highlights', priceMultiplier: 1.2, description: 'Glossy raised highlights' }],
      sides: [{ id: 'both', name: 'Double-Sided Full Color', priceMultiplier: 1.1, description: 'Print on front & back' }],
      quantities: [{ qty: 100, popular: true }, { qty: 200 }, { qty: 500 }, { qty: 1000 }]
    },
    basePrice: 349,
    minQuantity: 100
  },
  {
    id: 'flex-banner-outdoor',
    slug: 'flex-banner-outdoor',
    title: 'Heavy Duty Flex Banner (Star / Eco)',
    subtitle: 'All-Weather Waterproof Outdoor Advertising & Hoardings',
    featureBadge: 'Outdoor HD',
    category: 'signage-displays',
    categoryLabel: 'Signage & Displays',
    shortDescription: 'High durability 340 GSM Star Flex banners with vibrant solvent printing for shops and events.',
    detailedDescription: 'Weatherproof flex banners with metal eyelets (grommets) for easy hanging on shops, events, and hoardings.',
    rating: 4.8,
    reviewCount: 215,
    dispatchTag: '⚡ Same-Day Delivery',
    badge: 'Top Seller',
    images: [
      { url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80', alt: 'Flex Banner', caption: 'Outdoor Flex Hoarding' }
    ],
    specs: [
      { label: 'Material', value: '340 GSM Star Flex Vinyl' },
      { label: 'Durability', value: 'Waterproof & UV Fade Resistant (2+ Years)' },
      { label: 'Finishing', value: 'Folded Edges with Brass Eyelets' }
    ],
    config: {
      sizes: [{ id: '3x2', name: '3 ft x 2 ft', priceMultiplier: 1.0, description: 'Small shop notice board' }],
      materials: [{ id: 'star-flex', name: '340 GSM Star Flex', priceMultiplier: 1.0, description: 'Heavy duty matte/gloss' }],
      finishes: [{ id: 'eyelets', name: 'Eyelets & Rope Included', priceMultiplier: 1.0, description: 'Ready to hang' }],
      sides: [{ id: 'single', name: 'Single Sided Print', priceMultiplier: 1.0, description: 'Outdoor banner' }],
      quantities: [{ qty: 1, popular: true }, { qty: 3 }, { qty: 5 }, { qty: 10 }]
    },
    basePrice: 180,
    minQuantity: 1
  }
];

function loadDb() {
  if (fs.existsSync(DB_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
      if (!data.products || data.products.length === 0) {
        data.products = INITIAL_PRODUCTS;
      }
      return data;
    } catch (e) {
      console.error('Error reading db.json', e);
    }
  }
  const defaultDb = {
    products: INITIAL_PRODUCTS,
    categories: [
      { id: 'paper-documents', title: 'Paper & Document Printing', subtitle: 'Visiting cards, letterheads, spiral notebooks & flyers', imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80' },
      { id: 'signage-displays', title: 'Signage & Outdoor Displays', subtitle: 'Flex banners, vinyl stickers, acrylic boards & standees', imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80' },
      { id: 'marketing-materials', title: 'Marketing & Corporate Collateral', subtitle: 'Brochures, flyers, catalogs, posters & menu cards', imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80' },
      { id: 'corporate-gifts', title: 'Corporate Gifts & Merch', subtitle: 'Branded t-shirts, coffee mugs, diaries, pens & bottles', imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80' }
    ],
    banners: [
      { id: 'b-1', title: 'Same Day Express Printing', subtitle: 'Visiting cards, flex banners & flyers ready in 2 hours!', imageUrl: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1200&q=80', link: '/products' },
      { id: 'b-2', title: 'Outdoor Flex & Acrylic LED Boards', subtitle: 'Best quality Star Flex banners and 3D acrylic signs in Delhi NCR', imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80', link: '/products' }
    ],
    reviews: [
      { id: 'rev-1', name: 'Rohan Sharma', rating: 5, review: 'Amazing quality visiting cards ready in just 5 minutes at Mahavir Enclave store!', date: '2026-10-06', approved: true },
      { id: 'rev-2', name: 'Neha Gupta', rating: 5, review: 'Best flex banner printing in Delhi NCR. Very prompt service.', date: '2026-10-07', approved: true }
    ],
    orders: [],
    quotes: [],
    inventory: [
      { id: 'inv-1', item: '350 GSM Art Card Reams', sku: 'PAPER-350GSM', currentStock: 45, minStock: 10, unit: 'Reams' },
      { id: 'inv-2', item: 'Star Flex Vinyl Roll 340 GSM', sku: 'FLEX-340GSM', currentStock: 12, minStock: 3, unit: 'Rolls' },
      { id: 'inv-3', item: 'Matte Lamination Roll', sku: 'LAM-MATTE', currentStock: 8, minStock: 2, unit: 'Rolls' }
    ],
    coupons: [],
    images: [
      { id: 'img-1', title: 'Homepage Hero Main', section: 'Hero', url: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1200&q=80', alt: 'Visiting Cards', enabled: true, sortOrder: 1 },
      { id: 'img-2', title: 'Outdoor Flex Banner', section: 'Hero', url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80', alt: 'Flex Banners', enabled: true, sortOrder: 2 }
    ],
    content: {
      heroHeading: 'Shivani Graphics · Printo-Style Commercial Printing',
      heroSubtitle: 'Premium digital printing, visiting cards, flex banners, 3D acrylic LED boards & corporate merch in Delhi NCR.',
      phone: '+91-9266944315',
      whatsapp: '919266944315',
      email: 'shivanidigitalprints@gmail.com',
      address: 'D3/50, Gali No. 8A, Mahavir Enclave, New Delhi, Delhi 110045',
      businessName: 'Shivani Graphics'
    }
  };
  fs.writeFileSync(DB_FILE, JSON.stringify(defaultDb, null, 2));
  return defaultDb;
}

function saveDb(data: any) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '50mb' }));

  // API Routes
  app.get('/api/db', (req, res) => {
    res.json(loadDb());
  });

  app.post('/api/gemini/chat', async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Invalid messages array' });
      }

      const contents = messages.map((msg: any) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: contents,
        config: {
          systemInstruction: 'You are Shivani AI, the expert customer support and print advisor assistant for Shivani Graphics (a premier Printo-style commercial printing service in Delhi NCR). You help customers with visiting cards, flex banners, corporate gifts, signage, document printing, file uploads, bulk quotes, and store pickups in Mahavir Enclave, New Delhi. Be polite, professional, and helpful.'
        }
      });

      res.json({ text: response.text || 'Sorry, I could not generate a response.' });
    } catch (err: any) {
      console.error('Gemini chat error:', err);
      res.status(500).json({ error: err.message || 'AI service error' });
    }
  });

  app.all('/api/:collection/:id?', (req, res) => {
    const { collection, id } = req.params;
    const db = loadDb();
    if (!db[collection]) {
      if (collection === 'content') {
        return res.json(db.content || {});
      }
      db[collection] = [];
    }

    if (req.method === 'GET') {
      if (collection === 'content') {
        return res.json(db.content || {});
      }
      if (id) {
        const item = db[collection].find((x: any) => x.id === id || x.firebaseId === id);
        if (item) return res.json(item);
        return res.status(404).json({ error: 'Not found' });
      }
      return res.json(db[collection]);
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      const payload = req.body;
      if (collection === 'content') {
        db.content = { ...db.content, ...payload };
        saveDb(db);
        return res.json({ success: true, item: db.content });
      }

      const itemId = id || payload.id || 'item_' + Math.random().toString(36).substring(2, 9);
      payload.id = itemId;

      if (!Array.isArray(db[collection])) {
        db[collection] = [];
      }

      const index = db[collection].findIndex((x: any) => x.id === itemId || x.firebaseId === itemId);
      if (index >= 0) {
        db[collection][index] = { ...db[collection][index], ...payload };
      } else {
        db[collection].push(payload);
      }
      saveDb(db);
      return res.json({ success: true, item: payload });
    }

    if (req.method === 'DELETE') {
      const targetId = id || req.body.id;
      db[collection] = db[collection].filter((x: any) => x.id !== targetId && x.firebaseId !== targetId);
      saveDb(db);
      return res.json({ success: true });
    }
  });

  // Vite development middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Custom local DB server running on http://localhost:${PORT}`);
  });
}

startServer();

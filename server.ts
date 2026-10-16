import 'dotenv/config';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

let genAIClient: GoogleGenAI | null = null;
function getGenAI() {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    genAIClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return genAIClient;
}

const DB_FILE = path.resolve(process.cwd(), 'db.json');

import { PRODUCTS, CATEGORIES } from './src/data/products';

function loadDb() {
  let db: any = null;
  if (fs.existsSync(DB_FILE)) {
    try {
      db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    } catch (e) {
      console.error('Error reading db.json', e);
    }
  }

  if (!db || typeof db !== 'object') {
    db = {};
  }

  // Ensure products list is populated with full catalog if empty or minimal
  if (!Array.isArray(db.products) || db.products.length < 5) {
    db.products = PRODUCTS;
  }

  if (!Array.isArray(db.categories) || db.categories.length === 0) {
    db.categories = CATEGORIES;
  }

  if (!Array.isArray(db.banners) || db.banners.length === 0) {
    db.banners = [
      { id: 'b-1', title: 'Same Day Express Printing', section: 'Hero', subtitle: 'Visiting cards, flex banners & flyers ready in 2 hours!', url: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1200&q=80', enabled: true, sortOrder: 1 },
      { id: 'b-2', title: 'Outdoor Flex & Acrylic LED Boards', section: 'Hero', subtitle: 'Best quality Star Flex banners and 3D acrylic signs in Delhi NCR', url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80', enabled: true, sortOrder: 2 }
    ];
  }

  if (!Array.isArray(db.reviews) || db.reviews.length === 0) {
    db.reviews = [
      { id: 'rev-1', name: 'Rohan Sharma', rating: 5, review: 'Amazing quality visiting cards ready in just 5 minutes at Mahavir Enclave store!', date: '2026-10-06', approved: true },
      { id: 'rev-2', name: 'Neha Gupta', rating: 5, review: 'Best flex banner printing in Delhi NCR. Very prompt service.', date: '2026-10-07', approved: true }
    ];
  }

  if (!Array.isArray(db.orders)) db.orders = [];
  if (!Array.isArray(db.quotes)) db.quotes = [];
  if (!Array.isArray(db.invoices)) db.invoices = [];
  if (!Array.isArray(db.customers)) db.customers = [];
  if (!Array.isArray(db.faqs)) db.faqs = [];
  if (!Array.isArray(db.about_us)) db.about_us = [];
  if (!Array.isArray(db.coupons)) db.coupons = [];
  if (!Array.isArray(db.inventory) || db.inventory.length === 0) {
    db.inventory = [
      { id: 'inv-1', item: '350 GSM Art Card Reams', sku: 'PAPER-350GSM', currentStock: 45, minStock: 10, unit: 'Reams' },
      { id: 'inv-2', item: 'Star Flex Vinyl Roll 340 GSM', sku: 'FLEX-340GSM', currentStock: 12, minStock: 3, unit: 'Rolls' },
      { id: 'inv-3', item: 'Matte Lamination Roll', sku: 'LAM-MATTE', currentStock: 8, minStock: 2, unit: 'Rolls' }
    ];
  }

  if (!db.content) {
    db.content = {
      heroHeading: 'Shivani Graphics · Printo-Style Commercial Printing',
      heroSubtitle: 'Premium digital printing, visiting cards, flex banners, 3D acrylic LED boards & corporate merch in Delhi NCR.',
      phone: '+91-9266944315',
      whatsapp: '919266944315',
      email: 'shivanidigitalprints@gmail.com',
      address: 'D3/50, Gali No. 8A, Mahavir Enclave, New Delhi, Delhi 110045',
      businessName: 'Shivani Graphics'
    };
  }

  if (!db.settings) {
    db.settings = {
      branding: { url: '/logo.jpg' },
      launch_countdown: { enabled: false }
    };
  }

  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
  } catch (err) {
    console.error('Error writing initial db.json', err);
  }
  return db;
}

function saveDb(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing db.json', err);
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Ensure public/uploads directory exists
  const UPLOADS_DIR = path.resolve(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }

  // Statically serve uploads with long caching headers
  app.use('/uploads', express.static(UPLOADS_DIR, {
    maxAge: '30d',
    immutable: true
  }));

  // Permanent image upload endpoint
  app.post('/api/upload', (req, res) => {
    try {
      const { image, filename } = req.body;
      if (!image) {
        return res.status(400).json({ error: 'No image data provided' });
      }

      // If already a valid URL or uploaded path, return it directly
      if (typeof image === 'string' && (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('/uploads/'))) {
        return res.json({ success: true, url: image });
      }

      // Handle data URL prefix if present (e.g. data:image/jpeg;base64,...)
      const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      let buffer: Buffer;
      let ext = 'jpg';

      if (matches && matches.length === 3) {
        const mimeType = matches[1];
        if (mimeType.includes('png')) ext = 'png';
        else if (mimeType.includes('webp')) ext = 'webp';
        else if (mimeType.includes('svg')) ext = 'svg';
        else ext = 'jpg';
        buffer = Buffer.from(matches[2], 'base64');
      } else {
        buffer = Buffer.from(image, 'base64');
      }

      const cleanFilename = (filename || 'photo')
        .replace(/[^a-zA-Z0-9_.-]/g, '_')
        .replace(/\.[^/.]+$/, '');
      const uniqueName = `${cleanFilename}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
      const filePath = path.join(UPLOADS_DIR, uniqueName);

      fs.writeFileSync(filePath, buffer);

      // If production dist exists, copy there too
      const distUploads = path.resolve(process.cwd(), 'dist', 'uploads');
      if (fs.existsSync(distUploads)) {
        try {
          fs.copyFileSync(filePath, path.join(distUploads, uniqueName));
        } catch {}
      }

      const publicUrl = `/uploads/${uniqueName}`;
      return res.json({ success: true, url: publicUrl, size: buffer.length });
    } catch (err: any) {
      console.error('[Upload Error]', err);
      return res.status(500).json({ error: err.message || 'Failed to save image' });
    }
  });

  // API Routes
  app.get('/api/db', (req, res) => {
    res.json(loadDb());
  });

  app.post('/api/products/reset', (req, res) => {
    const db = loadDb();
    db.products = PRODUCTS;
    saveDb(db);
    return res.json({ success: true, products: db.products });
  });

  app.post('/api/gemini/chat', async (req, res) => {
    try {
      if (!process.env.GEMINI_API_KEY) {
        return res.status(503).json({
          error: 'GEMINI_API_KEY is not configured on the server. Please configure it in your environment.'
        });
      }

      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Invalid messages array' });
      }

      const contents = messages.map((msg: any) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      const ai = getGenAI();
      if (!ai) {
        return res.status(500).json({ error: 'Failed to initialize Gemini client' });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
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
    let { collection, id } = req.params;
    if (collection === 'images') collection = 'banners';

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

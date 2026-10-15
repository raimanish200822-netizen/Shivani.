import { CartItem } from '../types';

export const WHATSAPP_PRIMARY = '919266944315';
export const PHONE_PRIMARY = '919266944315';
export const PHONE_SECONDARY = '919810157695';
export const PHONE_HELPLINE = '919266944315';
export const SUPPORT_EMAIL = 'shivanidigitalprints@gmail.com';

// Official Registered Business Credentials
export const BUSINESS_TRADE_NAME = 'Shivani Graphics';
export const BUSINESS_LEGAL_NAME = 'Shivani Graphics';
export const BUSINESS_GSTIN = '07AGJPR4456J1ZW';
export const BUSINESS_OWNER = 'Ranjan';
export const BUSINESS_OWNER_FULL = 'Ranjan Roy';
export const BUSINESS_TYPE = 'Proprietorship';
export const PRINCIPAL_ADDRESS = 'RZC 1/98B C1 Block, Vinod Puri, Vijay Enclave, South Delhi, Delhi - 110045';
export const STORE_ADDRESS = 'D3/50, Gali No. 8A, Mahavir Enclave, New Delhi, Delhi 110045';
export const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/ikQBMVPFCSfpzAjG9?g_st=ac';
export const INSTAGRAM_URL = 'https://www.instagram.com/shivanigraphics_?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==';

export interface WhatsAppOrderPayload {
  productTitle: string;
  size: string;
  material: string;
  finish: string;
  sides: string;
  quantity: number;
  hasArtwork: boolean;
  notes?: string;
  customerName?: string;
  customerCity?: string;
}

export function generateWhatsAppOrderUrl(payload: WhatsAppOrderPayload): string {
  const lines = [
    `*NEW QUOTE INQUIRY - SHIVANI GRAPHICS*`,
    `--------------------------------------`,
    `*Product:* ${payload.productTitle}`,
    `*Dimensions / Size:* ${payload.size}`,
    `*Paper / Media:* ${payload.material}`,
    `*Finish / Lamination:* ${payload.finish}`,
    `*Printing Sides:* ${payload.sides}`,
    `*Quantity Required:* ${payload.quantity} units`,
    `--------------------------------------`,
    `*Artwork File Status:* ${payload.hasArtwork ? '✅ Print-ready PDF/CDR ready to share' : '🎨 Need Shivani Design Support'}`,
  ];

  if (payload.customerName) {
    lines.push(`*Customer Name:* ${payload.customerName}`);
  }
  if (payload.customerCity) {
    lines.push(`*Delivery Destination / City:* ${payload.customerCity}`);
  }
  if (payload.notes && payload.notes.trim()) {
    lines.push(`*Special Instructions:* ${payload.notes.trim()}`);
  }

  lines.push(`--------------------------------------`);
  lines.push(`_Store: ${STORE_ADDRESS}_`);
  lines.push(`_Direct Lines: +91-9266944315 / +91-9810157695_`);
  lines.push(`Please provide your best quotation, digital proof preview, and delivery schedule.`);

  const message = lines.join('\n');
  return `https://wa.me/${WHATSAPP_PRIMARY}?text=${encodeURIComponent(message)}`;
}

export function generateEmailOrderUrl(payload: WhatsAppOrderPayload): string {
  const subject = encodeURIComponent(`Quote Inquiry: ${payload.productTitle} (${payload.quantity} units) - Shivani Graphics`);
  const body = encodeURIComponent(
    `Hello Shivani Graphics Team,\n\n` +
    `I would like to request a quotation for:\n` +
    `Product: ${payload.productTitle}\n` +
    `Size: ${payload.size}\n` +
    `Material: ${payload.material}\n` +
    `Finish: ${payload.finish}\n` +
    `Sides: ${payload.sides}\n` +
    `Quantity: ${payload.quantity} units\n` +
    `Artwork: ${payload.hasArtwork ? 'Ready to attach PDF/CDR' : 'Need Design Support'}\n` +
    `Customer Name: ${payload.customerName || 'N/A'}\n` +
    `Delivery Location: ${payload.customerCity || 'Delhi NCR / Pan-India'}\n` +
    `Notes: ${payload.notes || 'None'}\n\n` +
    `Please reply with your quotation & delivery timeline.\n`
  );
  return `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
}

export function generateMultiCartWhatsAppUrl(items: CartItem[], customerName?: string, city?: string, notes?: string): string {
  const lines = [
    `*MULTI-ITEM QUOTE INQUIRY - SHIVANI GRAPHICS*`,
    `--------------------------------------`,
    `Total Selected Items: ${items.length}`,
  ];

  if (customerName) lines.push(`*Customer Name:* ${customerName}`);
  if (city) lines.push(`*Delivery Destination:* ${city}`);

  lines.push(`--------------------------------------`);
  lines.push(`*SELECTED ITEMS SPECIFICATIONS:*`);

  items.forEach((item, index) => {
    lines.push(
      `\n${index + 1}. *${item.productTitle}*`,
      `   • Specs: ${item.sizeLabel} | ${item.materialLabel}`,
      `   • Finish: ${item.finishLabel} | Sides: ${item.sideLabel}`,
      `   • Quantity: ${item.config.quantity} units`,
      `   • Artwork: ${item.config.hasArtwork ? 'Print-ready file' : 'Need Design Support'}`
    );
  });

  if (notes && notes.trim()) {
    lines.push(`\n--------------------------------------`);
    lines.push(`*Customer Notes:* ${notes.trim()}`);
  }
  lines.push(`--------------------------------------`);
  lines.push(`_Store: ${STORE_ADDRESS}_`);
  lines.push(`Please provide an itemized corporate quotation and express dispatch details.`);

  return `https://wa.me/${WHATSAPP_PRIMARY}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export function generateQuickChatUrl(messageType: 'general' | 'urgent' | 'bulk' | 'artwork', customText?: string): string {
  let defaultText = 'Hello Shivani Graphics! I am looking for custom printing services and would like a quotation.';
  
  if (messageType === 'urgent') {
    defaultText = 'Hello Shivani Graphics! I have an URGENT printing requirement needed today in Delhi NCR. Could you please let me know your fastest express turnaround time?';
  } else if (messageType === 'bulk') {
    defaultText = 'Hello Shivani Graphics! I represent a company and need a bulk corporate quotation with GST invoice for marketing & office stationery.';
  } else if (messageType === 'artwork') {
    defaultText = 'Hello Shivani Graphics! I have a CDR / PDF design file ready and would like to get a print proof and price check.';
  }

  const finalMsg = customText && customText.trim() ? `${defaultText}\n\nNote: ${customText.trim()}` : defaultText;
  return `https://wa.me/${WHATSAPP_PRIMARY}?text=${encodeURIComponent(finalMsg)}`;
}

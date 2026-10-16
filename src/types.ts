export interface ProductOption {
  id: string;
  name: string;
  priceMultiplier?: number;
  priceAdd?: number;
  description?: string;
}

export interface ProductConfigSchema {
  sizes: ProductOption[];
  materials: ProductOption[];
  finishes: ProductOption[];
  sides: ProductOption[];
  quantities: {
    qty: number;
    unitPrice?: number;
    popular?: boolean;
    discountPercent?: number;
    label?: string;
  }[];
}

export type ProductCategory = 
  | 'paper-documents'
  | 'cards-invitations'
  | 'custom-promotional'
  | 'signage-vinyl'
  | 'finishing-binding'
  | 'business-cards' 
  | 'standees-banners' 
  | 'apparel' 
  | 'photo-gifts' 
  | 'stamps-seals' 
  | 'stationery' 
  | 'packaging' 
  | 'invitation-cards'
  | 'id-cards'
  | 'binding-prints'
  | 'all'
  | string;

export interface ProductItem {
  id: string;
  slug: string;
  title: string;
  category: ProductCategory;
  categoryLabel: string;
  shortDescription: string;
  detailedDescription: string;
  rating: number;
  reviewCount: number;
  dispatchTag: string;
  minPrice?: number;
  basePrice?: number;
  badge?: string;
  subtitle?: string;
  featureBadge?: string;
  images: {
    url: string;
    alt: string;
    caption: string;
  }[];
  specs: {
    label: string;
    value: string;
  }[];
  config: ProductConfigSchema;
}

export interface SelectedConfig {
  sizeId: string;
  materialId: string;
  finishId: string;
  sideId: string;
  quantity: number;
  customNotes?: string;
  hasArtwork: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  productTitle: string;
  config: SelectedConfig;
  sizeLabel: string;
  materialLabel: string;
  finishLabel: string;
  sideLabel: string;
  imageUrl: string;
}

export interface FaqItem {
  id: string;
  category: 'artwork' | 'ordering' | 'delivery' | 'corporate';
  question: string;
  answer: string;
}

export interface AboutUsItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  sectionKey: string;
  imageUrl?: string;
  order: number;
}

export type OrderStatus = 
  | 'Received & Verified' 
  | 'Digital Proof Approved' 
  | 'In High-Speed Production' 
  | 'Lamination & Quality Check' 
  | 'Dispatched / Ready for Pickup';

export interface OrderRecord {
  id: string; // e.g. SG-842910
  customerName: string;
  customerPhone: string;
  customerCity?: string;
  productTitle: string;
  quantity: number;
  specsSummary: string;
  status: OrderStatus;
  createdAt: string;
  notes?: string;
}

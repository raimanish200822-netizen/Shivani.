export const DEFAULT_RECENT_IDS = [
  'visiting-cards-premium',
  'pvc-aadhaar-smart-card',
  'round-neck-tshirt',
  'self-inking-stamp'
];

export const getRecentlyViewedIds = (): string[] => {
  try {
    const item = localStorage.getItem('shivani_recent_views');
    if (!item) return DEFAULT_RECENT_IDS;
    const parsed = JSON.parse(item);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_RECENT_IDS;
  } catch {
    return DEFAULT_RECENT_IDS;
  }
};

export const addRecentlyViewedId = (productId: string): string[] => {
  try {
    const current = getRecentlyViewedIds();
    const filtered = current.filter(id => id !== productId);
    const updated = [productId, ...filtered].slice(0, 8);
    localStorage.setItem('shivani_recent_views', JSON.stringify(updated));
    return updated;
  } catch {
    return DEFAULT_RECENT_IDS;
  }
};

import { CategoryId, Source } from '@/types/listing';

export interface CategoryMeta {
  id: CategoryId;
  label: string;
  /** Material symbol / android icon name used by SymbolView. */
  icon: string;
  /** Accent color for chips and category cards. */
  color: string;
}

/**
 * Display metadata for each category. Order here is the order shown in the UI.
 */
export const CATEGORIES: CategoryMeta[] = [
  { id: 'furniture', label: 'Furniture', icon: 'chair', color: '#b45309' },
  { id: 'electronics', label: 'Electronics', icon: 'devices', color: '#2563eb' },
  { id: 'appliances', label: 'Appliances', icon: 'kitchen', color: '#0891b2' },
  { id: 'baby_kids', label: 'Baby & Kids', icon: 'stroller', color: '#db2777' },
  { id: 'clothing', label: 'Clothing', icon: 'checkroom', color: '#7c3aed' },
  { id: 'household', label: 'Household', icon: 'home', color: '#65a30d' },
  { id: 'tools', label: 'Tools', icon: 'build', color: '#ea580c' },
  { id: 'garden', label: 'Garden & Outdoor', icon: 'yard', color: '#16a34a' },
  { id: 'sports', label: 'Sports', icon: 'sports_basketball', color: '#dc2626' },
  { id: 'books_media', label: 'Books & Media', icon: 'menu_book', color: '#9333ea' },
  { id: 'pets', label: 'Pets', icon: 'pets', color: '#ca8a04' },
  { id: 'food', label: 'Free Food', icon: 'restaurant', color: '#e11d48' },
  { id: 'other', label: 'Other', icon: 'category', color: '#64748b' },
];

export const CATEGORY_BY_ID: Record<CategoryId, CategoryMeta> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<CategoryId, CategoryMeta>;

/** Short display labels + brand-ish colors for each source. */
export const SOURCE_META: Record<Source, { label: string; color: string }> = {
  craigslist: { label: 'Craigslist', color: '#5b21b6' },
  freecycle: { label: 'Freecycle', color: '#15803d' },
  buynothing: { label: 'Buy Nothing', color: '#0d9488' },
  offerup: { label: 'OfferUp', color: '#16a34a' },
  facebook: { label: 'Facebook', color: '#1877f2' },
  nextdoor: { label: 'Nextdoor', color: '#00b246' },
};

/**
 * Listings data layer (PLACEHOLDER).
 *
 * This file is the single seam between the UI and wherever listings actually
 * come from. Right now it returns mock data with a simulated network delay.
 *
 * To switch to a real backend later: keep `fetchListings`'s signature the same
 * and replace its body with a real request. Nothing in the UI, the
 * `useListings` hook, or the components needs to change.
 *
 * Genres are assigned by the auto-tagger in `categorize.ts` — even the
 * placeholder data below is run through it, so the tagging pipeline is exercised
 * exactly as real scraped data would be.
 */

import { categorize } from './categorize';

/**
 * The category chips shown above the grid.
 * `explore` is the generic "show everything" view — it is NOT a genre an item
 * can be tagged with. Every other entry is a real genre.
 */
export const CATEGORIES = [
  { id: 'explore', label: 'Explore' },
  { id: 'furniture', label: 'Furniture' },
  { id: 'technology', label: 'Technology' },
  { id: 'clothing', label: 'Clothing' },
  { id: 'food', label: 'Food' },
  { id: 'books', label: 'Books' },
  { id: 'toys', label: 'Toys' },
  { id: 'tools', label: 'Tools' },
  { id: 'other', label: 'Other' },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]['id'];
/** Genres an individual item can be tagged with (everything except the generic view). */
export type ItemCategoryId = Exclude<CategoryId, 'explore'>;


export type Listing = {
  id: string;
  title: string;
  description: string;
  category: ItemCategoryId;
  neighborhood: string;
  distanceMi: number;
  postedAt: string;
  thumbnailColor: string; // Keep for fallback
  /** Real scraped fields */
  imageUrl?: string;
  listingUrl?: string;
  sellerName?: string;
  price: string; // "Free" or "$0"
  city: string;
  state: string;
};

/** A single page of results plus a cursor to the next page (null = end). */
export type Page<T> = {
  items: T[];
  nextPage: number | null;
};

// --- Placeholder content pools -------------------------------------------

/**
 * Raw "scraped" samples — title + description only, NO genre. This mirrors what
 * we'd get from Facebook/Nextdoor. The genre is derived by `categorize()` below.
 */
const RAW_SAMPLES: { title: string; description: string }[] = [
  { title: 'Oak coffee table', description: 'Solid wood table, minor scratches.' },
  { title: 'Office desk chair', description: 'Adjustable chair, works great.' },
  { title: 'Old laptop', description: 'Computer boots fine, charger included.' },
  { title: 'Bluetooth speaker', description: 'Portable speaker, good battery.' },
  { title: 'Winter jacket bundle', description: 'Warm coats and a hoodie.' },
  { title: 'Running shoes', description: 'Lightly used shoes, size 10.' },
  { title: 'Garden tomatoes', description: 'Fresh produce from the backyard.' },
  { title: 'Pantry food box', description: 'Canned goods and snacks.' },
  { title: 'Sci-fi paperbacks', description: 'A box of novels and a few comics.' },
  { title: 'Kids textbook set', description: 'Gently used school books.' },
  { title: 'LEGO bin', description: 'Big tub of blocks and a puzzle.' },
  { title: 'Board games lot', description: 'Family games, all pieces included.' },
  { title: 'Cordless drill', description: 'Power tool with two batteries.' },
  { title: 'Garden tools', description: 'Rake, shovel, and a hand saw.' },
  { title: 'Bookshelf', description: 'Tall wooden shelf, easy to move.' },
  { title: 'LED monitor', description: '24 inch screen, no dead pixels.' },
  { title: 'Mystery box', description: 'A little bit of everything.' }, // -> 'other'
];

const NEIGHBORHOODS = [
  'Downtown', 'Riverside', 'Oak Park', 'The Heights',
  'Westside', 'Old Town', 'Lakeview', 'Midtown',
];

/** Thumbnail tint per genre, so the grid reads as color-coded placeholders. */
const CATEGORY_COLORS: Record<ItemCategoryId, string> = {
  furniture: '#FDBA74',
  technology: '#93C5FD',
  clothing: '#F9A8D4',
  food: '#86EFAC',
  books: '#C4B5FD',
  toys: '#FCD34D',
  tools: '#FCA5A5',
  other: '#D4D4D8',
};

/** Deterministically generate a large pool of fake listings, tagged via categorize(). */
const ALL_LISTINGS: Listing[] = Array.from({ length: 240 }, (_, i) => {
  const sample = RAW_SAMPLES[i % RAW_SAMPLES.length];
  // The genre is assigned by the auto-tagger, exactly like real scraped data.
  const category = categorize(sample);

  return {
    id: `listing-${i}`,
    title: sample.title,
    description: sample.description,
    category,
    neighborhood: NEIGHBORHOODS[i % NEIGHBORHOODS.length],
    distanceMi: Math.round((((i * 37) % 100) / 10) * 10) / 10,
    postedAt: new Date(Date.now() - i * 3_600_000).toISOString(),
    thumbnailColor: CATEGORY_COLORS[category],
  };
});

const PAGE_SIZE = 10;

/**
 * Fetch one page of listings, optionally filtered by genre.
 * Simulates network latency so loading/footer states are exercised.
 */
export async function fetchListings(params: {
  category: CategoryId;
  page: number;
}): Promise<Page<Listing>> {
  const { category, page } = params;

  await new Promise((resolve) => setTimeout(resolve, 600));

  const filtered =
    category === 'explore'
      ? ALL_LISTINGS
      : ALL_LISTINGS.filter((listing) => listing.category === category);

  const start = page * PAGE_SIZE;
  const items = filtered.slice(start, start + PAGE_SIZE);
  const hasMore = start + PAGE_SIZE < filtered.length;

  return { items, nextPage: hasMore ? page + 1 : null };
}

/**
 * Fetch a single listing by id (for the detail page). Returns null if not found.
 * Same seam as `fetchListings` — swap the body for a real request later.
 */
export async function fetchListingById(id: string): Promise<Listing | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return ALL_LISTINGS.find((listing) => listing.id === id) ?? null;
}

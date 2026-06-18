/**
 * Core data model for the app. This is intentionally source-agnostic: every
 * collector (Craigslist, Freecycle, OfferUp, etc.) normalizes its results into
 * a `Listing` so the UI never has to care where an item came from.
 */

/** Where a listing was collected from. Add a value here when adding a collector. */
export type Source =
  | 'craigslist'
  | 'freecycle'
  | 'buynothing'
  | 'offerup'
  | 'facebook'
  | 'nextdoor';

/** Top-level categories the auto-tagger assigns each listing to. */
export type CategoryId =
  | 'furniture'
  | 'electronics'
  | 'appliances'
  | 'baby_kids'
  | 'clothing'
  | 'household'
  | 'tools'
  | 'garden'
  | 'sports'
  | 'books_media'
  | 'pets'
  | 'food'
  | 'other';

export interface Listing {
  id: string;
  title: string;
  description: string;
  /** Single primary category, assigned by the auto-tagger. */
  category: CategoryId;
  /** Free-form tags, also auto-generated (e.g. "wood", "needs-cleaning"). */
  tags: string[];
  source: Source;
  /** Deep link back to the original post on the source site. */
  sourceUrl: string;
  imageUrl?: string;
  /** ISO 8601 timestamp of when the item was posted on the source. */
  postedAt: string;
  distanceMiles: number;
  location: { city: string; state: string; zip: string };
  /** True once the item is marked gone/claimed on the source. */
  isClaimed?: boolean;
}

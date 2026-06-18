/**
 * Auto-tagging / categorization (PLACEHOLDER).
 *
 * When listings are scraped from Facebook Marketplace, Nextdoor, etc., they
 * arrive as free text (a title + description) with no genre. `categorize()`
 * assigns each one to a single genre so it shows under the right category chip
 * — e.g. a "computer" lands in Technology.
 *
 * This implementation is a simple keyword matcher: good enough to demo the
 * pipeline and to tag the placeholder data. It is the SEAM for smarter tagging
 * later — replace the body with an ML model or an LLM call (returning the same
 * `ItemCategoryId`) and nothing else in the app needs to change.
 */

import type { ItemCategoryId } from './listings.data';

/** Keywords that map raw listing text to a genre. Order doesn't matter; the
 *  genre with the most keyword hits wins. Unmatched items fall back to 'other'. */
const KEYWORDS: Record<Exclude<ItemCategoryId, 'other'>, string[]> = {
  technology: [
    'computer', 'laptop', 'pc', 'desktop', 'phone', 'iphone', 'android', 'tablet',
    'ipad', 'tv', 'television', 'monitor', 'console', 'xbox', 'playstation', 'camera',
    'headphones', 'speaker', 'charger', 'router', 'printer', 'keyboard', 'mouse',
  ],
  furniture: [
    'table', 'chair', 'desk', 'sofa', 'couch', 'bed', 'mattress', 'dresser', 'shelf',
    'bookshelf', 'lamp', 'cabinet', 'stool', 'wardrobe', 'nightstand',
  ],
  clothing: [
    'jacket', 'coat', 'shirt', 'jeans', 'pants', 'shoes', 'boots', 'sweater', 'dress',
    'clothes', 'clothing', 'hat', 'socks', 'hoodie',
  ],
  food: [
    'food', 'tomatoes', 'bread', 'herbs', 'produce', 'canned', 'snacks', 'groceries',
    'vegetables', 'fruit', 'pantry', 'meals',
  ],
  books: [
    'book', 'books', 'paperback', 'hardcover', 'novel', 'textbook', 'comic', 'magazine',
    'cookbook', 'manga',
  ],
  toys: [
    'toy', 'toys', 'lego', 'puzzle', 'game', 'games', 'doll', 'stuffed', 'rc', 'figure',
    'blocks',
  ],
  tools: [
    'drill', 'saw', 'hammer', 'wrench', 'tool', 'tools', 'toolbox', 'paint', 'ladder',
    'screwdriver', 'sander', 'garden',
  ],
};

/**
 * Classify a raw listing into one genre using keyword matching.
 * Returns 'other' when nothing matches.
 */
export function categorize(input: { title: string; description?: string }): ItemCategoryId {
  const text = `${input.title} ${input.description ?? ''}`.toLowerCase();

  let best: ItemCategoryId = 'other';
  let bestScore = 0;

  for (const [category, words] of Object.entries(KEYWORDS)) {
    const score = words.reduce((hits, word) => (text.includes(word) ? hits + 1 : hits), 0);
    if (score > bestScore) {
      bestScore = score;
      best = category as ItemCategoryId;
    }
  }

  return best;
}

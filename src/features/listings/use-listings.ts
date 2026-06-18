import { useCallback, useEffect, useState } from 'react';

import { CategoryId, fetchListings, Listing } from './listings.data';

/**
 * Owns the paginated, category-filtered listings state for a screen.
 *
 * - Resets and refetches from page 0 whenever `category` changes.
 * - `loadMore` appends the next page; safe to call repeatedly (it no-ops while
 *   a fetch is in flight or once the end is reached).
 */
export function useListings(category: CategoryId) {
  const [items, setItems] = useState<Listing[]>([]);
  const [nextPage, setNextPage] = useState<number | null>(0);
  // Starts true because the effect below fetches the first page on mount.
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(
    async (page: number, replace: boolean) => {
      setLoading(true);
      try {
        const result = await fetchListings({ category, page });
        setItems((prev) => (replace ? result.items : [...prev, ...result.items]));
        setNextPage(result.nextPage);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [category],
  );

  // Reset whenever the category filter changes.
  useEffect(() => {
    setItems([]);
    setNextPage(0);
    load(0, true);
  }, [load]);

  const loadMore = useCallback(() => {
    if (loading || nextPage === null) return;
    load(nextPage, false);
  }, [loading, nextPage, load]);

  const refresh = useCallback(() => {
    if (refreshing) return;
    setRefreshing(true);
    load(0, true);
  }, [refreshing, load]);

  return {
    items,
    loadMore,
    refresh,
    /** True while any fetch is in flight (initial, paging, or refresh). */
    loading,
    refreshing,
    /** True once there are no more pages to load. */
    reachedEnd: nextPage === null,
  };
}

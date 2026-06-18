import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { CategoryChips, CategoryId, ListingCard, Listing, useListings } from '@/features/listings';

export default function HomeScreen() {
  const router = useRouter();
  const [category, setCategory] = useState<CategoryId>('explore');
  const { items, loadMore, refresh, loading, refreshing, reachedEnd } = useListings(category);

  return (
    <ThemedView style={styles.container}>
      <CategoryChips selected={category} onSelect={setCategory} />

      <FlatList<Listing>
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListingCard
              listing={item}
              onPress={(l) => router.push({ pathname: '/listing/[id]', params: { id: l.id } })}
            />
          )}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
          ListEmptyComponent={
            // Spinner during the initial/category-switch load; message once empty.
            loading ? (
              <ActivityIndicator style={styles.empty} />
            ) : (
              <ThemedText themeColor="textSecondary" style={styles.empty}>
                No listings here yet.
              </ThemedText>
            )
          }
          ListFooterComponent={
            loading && items.length > 0 ? (
              <ActivityIndicator style={styles.footer} />
            ) : reachedEnd && items.length > 0 ? (
              <ThemedText type="small" themeColor="textSecondary" style={styles.footerText}>
                You&apos;ve reached the end.
              </ThemedText>
            ) : null
          }
        />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Space the category slider from the grid below it.
    gap: Spacing.three,
  },
  listContent: {
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.six,
    gap: Spacing.three,
  },
  row: {
    gap: Spacing.three,
  },
  empty: {
    textAlign: 'center',
    marginTop: Spacing.five,
  },
  footer: {
    paddingVertical: Spacing.four,
  },
  footerText: {
    textAlign: 'center',
    paddingVertical: Spacing.four,
  },
});

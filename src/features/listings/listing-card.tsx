import { Pressable, StyleSheet, View } from 'react-native';

import { Listing } from './listings.data';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

type ListingCardProps = {
  listing: Listing;
  onPress?: (listing: Listing) => void;
};

export function ListingCard({ listing, onPress }: ListingCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={listing.title}
      onPress={() => onPress?.(listing)}
      style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]}>
      <ThemedView type="backgroundElement" style={styles.card}>
        {/* Placeholder thumbnail until real images exist. */}
        <View style={[styles.thumbnail, { backgroundColor: listing.thumbnailColor }]} />
        <ThemedText type="smallBold" numberOfLines={1} style={styles.title}>
          {listing.title}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
          {listing.neighborhood} · {listing.distanceMi} mi
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // `flex: 1` lets two cards share a row evenly inside FlatList's numColumns={2}.
  wrapper: {
    flex: 1,
  },
  card: {
    borderRadius: Spacing.three,
    padding: Spacing.two,
    gap: Spacing.one,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: Spacing.two,
    marginBottom: Spacing.one,
  },
  title: {
    marginTop: Spacing.half,
  },
  pressed: {
    opacity: 0.7,
  },
});

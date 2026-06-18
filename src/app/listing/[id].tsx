import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { fetchListingById, Listing } from '@/features/listings';

export default function ListingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();

  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchListingById(id).then((result) => {
      if (!active) return;
      setListing(result);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [id]);

  return (
    <ThemedView style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Back"
        hitSlop={Spacing.two}
        onPress={() => router.back()}
        style={({ pressed }) => [styles.back, pressed && styles.pressed]}>
        <Ionicons name="chevron-back" size={24} color={theme.text} />
        <ThemedText type="small">Back</ThemedText>
      </Pressable>

      {loading ? (
        <ActivityIndicator style={styles.center} />
      ) : !listing ? (
        <ThemedText themeColor="textSecondary" style={styles.center}>
          Listing not found.
        </ThemedText>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={[styles.thumbnail, { backgroundColor: listing.thumbnailColor }]} />

          <ThemedText type="title">{listing.title}</ThemedText>

          <ThemedView type="backgroundElement" style={styles.badge}>
            <ThemedText type="smallBold" themeColor="textSecondary">
              {listing.category}
            </ThemedText>
          </ThemedView>

          <ThemedText type="default" themeColor="textSecondary">
            {listing.neighborhood} · {listing.distanceMi} mi away
          </ThemedText>

          <ThemedText type="default">{listing.description}</ThemedText>

          <ThemedText type="small" themeColor="textSecondary">
            Posted {new Date(listing.postedAt).toLocaleDateString()}
          </ThemedText>
        </ScrollView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.half,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  pressed: {
    opacity: 0.6,
  },
  center: {
    flex: 1,
    textAlign: 'center',
    marginTop: Spacing.six,
  },
  content: {
    padding: Spacing.four,
    gap: Spacing.three,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: Spacing.three,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.five,
  },
});

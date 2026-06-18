import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** Placeholder rows — wire these to real screens later. */
const SECTIONS: { title: string; items: { label: string; icon: keyof typeof Ionicons.glyphMap }[] }[] = [
  {
    title: 'Account',
    items: [
      { label: 'Profile', icon: 'person-outline' },
      { label: 'Saved listings', icon: 'bookmark-outline' },
      { label: 'Location', icon: 'location-outline' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { label: 'Notifications', icon: 'notifications-outline' },
      { label: 'Appearance', icon: 'color-palette-outline' },
    ],
  },
  {
    title: 'About',
    items: [
      { label: 'Help & support', icon: 'help-circle-outline' },
      { label: 'Privacy policy', icon: 'lock-closed-outline' },
    ],
  },
];

export default function SettingsScreen() {
  const router = useRouter();
  const theme = useTheme();

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

      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title">Settings</ThemedText>

        {SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <ThemedText type="smallBold" themeColor="textSecondary">
              {section.title.toUpperCase()}
            </ThemedText>

            <ThemedView type="backgroundElement" style={styles.card}>
              {section.items.map((item, index) => (
                <Pressable
                  key={item.label}
                  accessibilityRole="button"
                  accessibilityLabel={item.label}
                  style={({ pressed }) => [
                    styles.row,
                    index > 0 && { borderTopWidth: 1, borderTopColor: theme.border },
                    pressed && styles.pressed,
                  ]}>
                  <Ionicons name={item.icon} size={20} color={theme.text} />
                  <ThemedText type="default" style={styles.rowLabel}>
                    {item.label}
                  </ThemedText>
                  <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
                </Pressable>
              ))}
            </ThemedView>
          </View>
        ))}

        <ThemedText type="small" themeColor="textSecondary" style={styles.version}>
          Free Things Nearby · v1.0.0 (placeholder)
        </ThemedText>
      </ScrollView>
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
  content: {
    padding: Spacing.four,
    gap: Spacing.four,
  },
  section: {
    gap: Spacing.two,
  },
  card: {
    borderRadius: Spacing.three,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
  },
  rowLabel: {
    flex: 1,
  },
  version: {
    textAlign: 'center',
    marginTop: Spacing.two,
  },
});

import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { CATEGORIES, CategoryId } from './listings.data';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type CategoryChipsProps = {
  selected: CategoryId;
  onSelect: (category: CategoryId) => void;
};

export function CategoryChips({ selected, onSelect }: CategoryChipsProps) {
  const theme = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      // ScrollViews default to flex-shrink:1 on web, which lets the grid below
      // crush this bar to ~0 height. Pin it so it keeps its natural height.
      style={styles.scroller}
      contentContainerStyle={styles.content}>
      {CATEGORIES.map((category) => {
        const isSelected = category.id === selected;
        return (
          <Pressable
            key={category.id}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onSelect(category.id)}
            style={({ pressed }) => [
              styles.chip,
              {
                backgroundColor: isSelected ? theme.tint : theme.backgroundElement,
                borderColor: isSelected ? theme.tint : theme.border,
              },
              pressed && styles.pressed,
            ]}>
            <ThemedText
              type="smallBold"
              themeColor={isSelected ? 'tintText' : 'textSecondary'}>
              {category.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroller: {
    flexGrow: 0,
    flexShrink: 0,
  },
  content: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    gap: Spacing.two,
  },
  chip: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.five,
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.7,
  },
});

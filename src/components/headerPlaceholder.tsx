import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type HeaderProps = {
  title?: string;
  onPressSettings?: () => void;
  onPressSearch?: () => void;
};

export default function Header({
  title = 'Devv & Lily and Cassie',
  onPressSettings,
  onPressSearch,
}: HeaderProps) {
  const theme = useTheme();

  return (
    <ThemedView type="backgroundElement" style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Settings"
        hitSlop={Spacing.two}
        onPress={onPressSettings}
        style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
        <Ionicons name="settings-outline" size={24} color={theme.text} />
      </Pressable>

      <ThemedText type="subtitle" numberOfLines={1} style={styles.title}>
        {title}
      </ThemedText>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Search"
        hitSlop={Spacing.two}
        onPress={onPressSearch}
        style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
        <Ionicons name="search" size={24} color={theme.text} />
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  iconButton: {
    padding: Spacing.one,
  },
  pressed: {
    opacity: 0.6,
  },
});

import { DarkTheme, DefaultTheme, Stack, ThemeProvider, useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '@/components/headerPlaceholder';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* Single-screen app: header on top, then the screen (which owns the genre
          nav chips + listings). Stack (header hidden) gives the screen a proper
          flex:1 container so the grid fills the height instead of collapsing. */}
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <Header onPressSettings={() => router.push('/settings')} />
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </ThemeProvider>
  );
}

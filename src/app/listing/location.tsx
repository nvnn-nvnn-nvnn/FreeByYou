import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { zipToCoordinates } from '@/utils/geo';

export default function LocationScreen() {
  const router = useRouter();
  const [zip, setZip] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const save = async () => {
    if (!zip.match(/^\d{5}(-\d{4})?$/)) {
      setError('Enter a valid 5-digit zip');
      return;
    }
    setLoading(true);
    const coords = await zipToCoordinates(zip);
    setLoading(false);
    
    if (!coords) {
      setError('Could not find that location');
      return;
    }
    
    await AsyncStorage.setItem('user_zip', zip);
    await AsyncStorage.setItem('user_coords', JSON.stringify(coords));
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter zip code"
        keyboardType="number-pad"
        maxLength={5}
        value={zip}
        onChangeText={setZip}
      />
      {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}
      <Pressable onPress={save} disabled={loading}>
        <ThemedText>{loading ? 'Verifying...' : 'Save Location'}</ThemedText>
      </Pressable>
    </ThemedView>
  );
}
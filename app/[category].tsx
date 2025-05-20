import React from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { messages } from '../constants/messages';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function MessagesScreen() {
  const { category } = useLocalSearchParams();
  const categoryName = category as string;
  const data = messages[categoryName] || [];
  const { isDark } = useTheme();
  const router = useRouter();

  const copyToClipboard = (msg: string) => {
    Clipboard.setStringAsync(msg);
    Alert.alert('Copied!', 'Message copied to clipboard.');
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#111' : '#fff' },
      ]}
    >
      <StatusBar
        backgroundColor={isDark ? '#111' : '#fff'}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={isDark ? '#fff' : '#FF6F91'} />
        </TouchableOpacity>
        <Text style={[styles.heading, { color: isDark ? '#fff' : '#FF6F91' }]}>
          {categoryName} Messages 💌
        </Text>
      </View>

      <FlatList
        data={data}
        contentContainerStyle={{ paddingBottom: 20 }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => copyToClipboard(item)}
            style={[
              styles.card,
              { backgroundColor: isDark ? '#222' : '#ffe0f0' },
            ]}
          >
            <Text style={[styles.text, { color: isDark ? '#fff' : '#333' }]}>
              {index + 1}. {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  card: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  text: {
    fontSize: 18,
  },
});

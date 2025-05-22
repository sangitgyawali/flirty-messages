import React from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  Pressable,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { categories } from '../constants/messages';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

const categoryEmojis: Record<string, string> = {
  Sweet: '🍭',
  Cheeky: '😏',
  Bold: '🔥',
  Funny: '😂',
  Romantic: '💖',
  Passionate: '💘',
  Supportive: '🌿',
  Longing: '🌙',
  Grateful: '🙏',
  Playful: '🎉',
};

export default function Home() {
  const router = useRouter();
  const { isDark } = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#111' : '#fff0f5' },
      ]}
    >
      <StatusBar
        backgroundColor={isDark ? '#111' : '#fff0f5'}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />

      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#FF6F91' }]}>
          💘 FlirtBuzz
        </Text>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <Ionicons
            name="settings-outline"
            size={26}
            color={isDark ? '#fff' : '#FF6F91'}
          />
        </TouchableOpacity>
      </View>

      <Text
        style={[
          styles.subtitle,
          { color: isDark ? '#ccc' : '#666' },
        ]}
      >
        Pick your mood 😏
      </Text>

      <FlatList
        data={categories}
        contentContainerStyle={{ paddingVertical: 10 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/${item.title}`)}
            style={({ pressed }) => [
              styles.cardWrapper,
              pressed && { transform: [{ scale: 0.96 }] },
            ]}
          >
            <LinearGradient
              colors={getGradientForCategory(item.title)}
              style={styles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.cardText}>
                {categoryEmojis[item.title] || '💬'} {item.title}
              </Text>
            </LinearGradient>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

import type { ColorValue } from 'react-native';

const getGradientForCategory = (
  title: string
): readonly [ColorValue, ColorValue] => {
  switch (title) {
    case 'Sweet':
      return ['#ff9a9e', '#fad0c4'];
    case 'Cheeky':
      return ['#fbc2eb', '#a6c1ee'];
    case 'Bold':
      return ['#f6d365', '#fda085'];
    case 'Funny':
      return ['#84fab0', '#8fd3f4'];
    case 'Romantic':
      return ['#ffdde1', '#ee9ca7'];
    case 'Passionate':
      return ['#c2e9fb', '#a1c4fd'];
    case 'Supportive':
      return ['#fc5c7d', '#6a82fb'];
    case 'Longing':
      return ['#d3cce3', '#e9e4f0'];
    case 'Grateful':
      return ['#fbc2eb', '#a6c1ee'];
    case 'Playful':
      return ['#ff758c', '#ff7eb3'];
    default:
      return ['#f0c27b', '#4b1248'];
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  cardWrapper: {
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 20,
  },
  card: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  cardText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

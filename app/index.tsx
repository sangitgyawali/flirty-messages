import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { categories } from '../constants/messages';

export default function Home() {
  const router = useRouter();

  return (
    <FlatList
      data={categories}
      contentContainerStyle={{ padding: 20 }}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.card, { backgroundColor: item.color }]}
          onPress={() => router.push(`/${item.title}`)}
        >
          <Text style={styles.text}>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 30,
    marginBottom: 15,
    borderRadius: 10,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
});

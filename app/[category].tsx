import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { messages } from '../constants/messages';
import { Ionicons } from '@expo/vector-icons';

export default function MessagesScreen() {
  const { category } = useLocalSearchParams();
  const categoryName = category as string;
  const data = messages[categoryName] || [];

  const router = useRouter();

  const copyToClipboard = (msg: string) => {
    Clipboard.setStringAsync(msg);
    Alert.alert('Copied!', 'Message copied to clipboard.');
  };

  return (
    <View style={styles.container}>
      {/* 👇 Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#black" />
        </TouchableOpacity>
        <Text style={styles.heading}>{categoryName} Messages 💌</Text>
      </View>

      <FlatList
        data={data}
        contentContainerStyle={{ paddingBottom: 20 }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => copyToClipboard(item)} style={styles.card}>
            <Text style={styles.text}>
              {index + 1}. {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF6F91',
  },
  card: {
    backgroundColor: '#ffe0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

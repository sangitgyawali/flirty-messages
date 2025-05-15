import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { messages } from '../constants/messages';

export default function MessagesScreen() {
  const { category } = useLocalSearchParams();

  const data = messages[category as string] || [];

  const copyToClipboard = (msg: string) => {
    Clipboard.setStringAsync(msg);
    Alert.alert('Copied!', 'Message copied to clipboard.');
  };

  return (
    <FlatList
      data={data}
      contentContainerStyle={{ padding: 20 }}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => copyToClipboard(item)} style={styles.card}>
          <Text style={styles.text}>{item}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
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

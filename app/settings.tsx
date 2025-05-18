import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Switch,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const router = useRouter();

  const handleLangChange = (lang: string) => {
    setLanguage(lang);
    // Set locale here if using i18n
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff0f5" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FF6F91" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 24 }} /> {/* Spacer */}
      </View>

      {/* Dark Mode Toggle */}
      <View style={styles.row}>
        <Ionicons name="moon" size={22} color="#FF6F91" />
        <Text style={styles.label}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
      </View>

      {/* Language Switch */}
      <View style={styles.row}>
        <Ionicons name="language" size={22} color="#FF6F91" />
        <Text style={styles.label}>Language</Text>
        <View style={styles.langSwitch}>
          {['en', 'es', 'hi'].map((lang) => (
            <TouchableOpacity
              key={lang}
              onPress={() => handleLangChange(lang)}
              style={[
                styles.langBtn,
                language === lang && { backgroundColor: '#FF6F91' },
              ]}
            >
              <Text style={{ color: language === lang ? '#fff' : '#FF6F91' }}>
                {lang.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Privacy Policy */}
      <TouchableOpacity
        style={styles.row}
        onPress={() =>
          Linking.openURL('https://your-flirty-buzz-site.com/privacy-policy')
        }
      >
        <Ionicons name="document-text-outline" size={22} color="#FF6F91" />
        <Text style={styles.label}>Privacy Policy</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f5',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6F91',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    gap: 15,
  },
  label: {
    fontSize: 18,
    flex: 1,
    color: '#333',
  },
  langSwitch: {
    flexDirection: 'row',
    gap: 10,
  },
  langBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#FF6F91',
    borderRadius: 8,
  },
});

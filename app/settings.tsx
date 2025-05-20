import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();
  const [language, setLanguage] = useState('en');

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    // Optional: Update i18n.locale here
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#111' : '#fff0f5' }]}>
      <StatusBar backgroundColor={isDark ? '#111' : '#fff0f5'} barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FF6F91" />
        </TouchableOpacity>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#FF6F91' }]}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Dark Mode */}
      <View style={styles.row}>
        <Ionicons name="moon" size={22} color="#FF6F91" />
        <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Dark Mode</Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>

      {/* Language Selection */}
      <View style={styles.row}>
        <Ionicons name="language" size={22} color="#FF6F91" />
        <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Language</Text>
        <View style={styles.langContainer}>
          {['en', 'es', 'hi'].map((lang) => (
            <TouchableOpacity
              key={lang}
              style={[
                styles.langButton,
                language === lang && { backgroundColor: '#FF6F91' },
              ]}
              onPress={() => handleLanguageChange(lang)}
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
          Linking.openURL('https://yourflirtbuzzsite.com/privacy-policy')
        }
      >
        <Ionicons name="document-text-outline" size={22} color="#FF6F91" />
        <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>
          Privacy Policy
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    gap: 15,
  },
  label: {
    flex: 1,
    fontSize: 18,
  },
  langContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  langButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#FF6F91',
    borderRadius: 8,
  },
});

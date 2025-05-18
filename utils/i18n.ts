import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

import en from '../locales/en.json';
import es from '../locales/es.json';
import hi from '../locales/hi.json';

const i18n = new I18n({ en, es, hi });
i18n.defaultLocale = 'en';
i18n.locale = Localization.locale;
i18n.enableFallback = true;

export default i18n;

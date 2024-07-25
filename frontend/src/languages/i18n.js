import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './translationEN.json';
import translationFI from './translationFI.json';
import translationRU from './translationRU.json';

/* Language resources */
const resources = {
	en: {
		translation: translationEN
	},
	fi: {
		translation: translationFI
	},
	ru: {
		translation: translationRU
	}
};

i18n
	.use(initReactI18next)
	.init({
		resources,
		lng: 'en',
		fallbacking: 'en',
		keySeparator: false,
		interpolation: {
			escapeValue: false
		}
	});

export default i18n;
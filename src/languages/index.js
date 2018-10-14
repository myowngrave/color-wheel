import i18n from "i18next";
import {reactI18nextModule} from "react-i18next";
import en from './en.json';
import vi from './vi.json';
import ru from './ru.json';

i18n.use(reactI18nextModule)
  .init({
    resources: {
      en: {
        translation: en
      },
      vi: {
        translation: vi
      },
      ru: {
        translation: ru
      }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import uk from './resources/uk';
import en from './resources/en';
import ru from './resources/ru';

i18n
  .use(initReactI18next)
  .init({
    resources: {uk, en, ru},
    lng: "en",

    keySeparator: true,

    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;
import i18n, { TFunctionKeys } from 'i18next'

import en from './locales/en.json'
import ru from './locales/ru.json'

const resources = { en, ru }

i18n.init({
  lng: 'en',
  debug: false,
  resources,
  fallbackLng: 'en',
  load: 'all',
})

export {
  i18n,
  resources
}
export type I18nLanguages = keyof typeof resources
export type {TFunctionKeys}

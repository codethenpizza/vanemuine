import { TFunctionKeys, TOptions } from 'i18next'
import { i18n, I18nLanguages } from './i18n'

const i18nRu = i18n.cloneInstance({
  lng: 'ru',
})

export type TArgs = {
  key: TFunctionKeys, lng: I18nLanguages, options?: TOptions
}

const t = ({key, lng, options}: TArgs) => {
  if (lng === 'ru') {
    return i18nRu.t(key, options)
  }

  return i18n.t(key, options)
}

export {
  t,
}

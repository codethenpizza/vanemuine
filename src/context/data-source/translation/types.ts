import { TArgs } from '../../../lib/i18n'
import { TelegramId } from '../../../types'

export type UTArgs = Omit<TArgs, 'lng'> & {telegramId: TelegramId}

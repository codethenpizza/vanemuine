import { UserStorage } from "../user-storage"
import { UTArgs } from '../../../services/bot/types'
import { t } from '../../../lib/i18n'

export class Translation {
  private readonly userStorage: UserStorage

  constructor(userStorage: UserStorage) {
    this.userStorage = userStorage
  }

  /* like i18n "t" but with User Translation - "ut" */
  public ut = async ({key, options, telegramId}: UTArgs): Promise<string>  => {
    const lng = await this.userStorage?.getUserLocale(telegramId)
    return t({key, options, lng})
  }
}

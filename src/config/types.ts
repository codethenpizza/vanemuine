import { Env } from '../types'

export type Config = {
  env: Env
  bot: {
    token: string
    port: number
    url: string
    adminId: number
  }
  auth: {
    userInMemoryLifeTime: number
  }
}

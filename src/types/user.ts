import type {User as PrismaUser} from '@prisma/client'
import { Lang } from '@prisma/client'

export type UserMeta = { meta?: Record<string, unknown> }

export type UserScores = { scores?: Record<string, string> } // game name / score

export type User = & PrismaUser & UserScores &
  UserMeta & {lng: Lang}

export type TelegramId = User['telegramId']

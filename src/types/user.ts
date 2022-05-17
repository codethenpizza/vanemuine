import {Language} from "./lang";

export type UserMeta = { meta?: Record<string, unknown> }

export type UserScores = { scores?: Record<string, string> } // game name / score

export type User = {
  id: number,
  telegramId: number,
  lng: Language,
  gamesPlayed: number
} & UserScores & UserMeta

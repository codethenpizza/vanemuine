import {SendMsgArgs} from "../../bot/base-bot-controller";

import {PlayerData, WordList} from "./index";
import {PrismaClient} from "@prisma/client";
import {capitalize} from "../../../helpers/capitalize";


export class WordListBotAdapter extends WordList{
  correctMsgTemplate = (correctAnswer?: string): string => `✅ Все верно, ${correctAnswer} это правильный ответ!`
  incorrectMsgTemplate = (correctAnswer: string, answer?: string, ): string => `🌚 Упс, '${answer}' это не верно. Правильный ответ: '${correctAnswer}'`

  constructor(prisma: PrismaClient) {
    super(prisma)
  }

  public async startGame(playerId: number): Promise<Omit<SendMsgArgs, 'msg'>> {
    const node = await this.setWordList(playerId);
    return this.composeResponse(node)
  }

  public async getGameNextStep(playerId: number): Promise<Omit<SendMsgArgs, 'msg'>> {
    const node = await this.getNext(playerId);
    return this.composeResponse(node)
  }

  public processAnswer(playerId: number, answer?: string): string {
    const [, option] = answer?.split(':') || []
    const {correctAnswer, result } = this.verifyAnswer(playerId, option)
    return result ? this.correctMsgTemplate(option) : this.incorrectMsgTemplate(correctAnswer, option)
  }

  private composeResponse(node: PlayerData['node'] | null): Omit<SendMsgArgs, 'msg'> {
    if (!node) {
      return {
        text: this.endMsgTemplate
      }
    }
    if (!node?.value.translation?.translationDef) {
      return {
        text: 'упс'
      }
    }
    const {wordDef, options} = node.value

    return {
      text: capitalize(wordDef),
      options:  {
        reply_markup: {
          inline_keyboard: options?.map(({text}) => [
            {
              text,
              callback_data: `${this.name}:${text}`
            }]
          ) || [],
        },
      }
    }
  }
}

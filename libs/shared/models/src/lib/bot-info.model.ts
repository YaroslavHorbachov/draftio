import { UserFromGetMe } from 'telegraf/typings/core/types/typegram';

export class BotInfo {
  public readonly id: number;
  public readonly isBot: boolean;
  public readonly username: string;

  constructor(rawInfo: UserFromGetMe) {
    const { id, is_bot, username } = rawInfo;

    this.id = id;
    this.isBot = is_bot;
    this.username = username;
  }
}

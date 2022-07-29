import { BotInfo } from '@draftio/shared/common';
import { Controller, Get } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { BotService } from '../shared/services/bot.service';

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Get('info')
  public getInfo(): Observable<BotInfo> {
    return this.botService.getInfo();
  }

  @Get('messages')
  public getMessages(): Observable<any[]> {
    return from([]);
  }
}

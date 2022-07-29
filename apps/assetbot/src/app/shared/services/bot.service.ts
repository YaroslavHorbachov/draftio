import { BotInfo } from '@draftio/shared/common';
import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { from, map, Observable, switchMap } from 'rxjs';
import { Context, Telegraf } from 'telegraf';
import { Document, Message } from 'telegraf/typings/core/types/typegram';
import { environment } from '../../environments/environment';
import { DocumentsService } from './documents.service';

@Injectable()
export class BotService implements OnModuleInit, OnApplicationShutdown {
  constructor(private readonly documentsService: DocumentsService) {}

  private readonly bot = new Telegraf(environment.botToken);

  public onModuleInit() {
    this.setup();
  }

  public onApplicationShutdown(signal?: string) {
    console.info('Bot Shutdown');

    this.bot.stop(signal);
  }

  public getInfo(): Observable<BotInfo> {
    const me$ = from(this.bot.telegram.getMe());

    return me$.pipe(map((me) => new BotInfo(me)));
  }

  private setup() {
    this.bot.start((ctx) => this.handleStart(ctx));
    this.bot.on('document', (ctx) => {
      this.handleDocument(ctx);
    });

    this.bot.launch();
  }

  private handleStart(ctx: Context) {
    ctx.reply('Hello');
    ctx.reply('Its assets bot. You can upload MTG assets and view them at https://... site');
    ctx.reply('Upload here only csv documents');
  }

  private async handleDocument(ctx: Context) {
    const docMessage = ctx.message as Message.DocumentMessage;

    if (docMessage.document) {
      ctx.reply('Init of proccessing asset ...');

      this.saveDocument(docMessage.document).subscribe(() => {
        ctx.reply('Saved');
      });
    } else {
      ctx.reply('Asset bot accept only document messages');
    }
  }

  private saveDocument(document: Document): Observable<void> {
    return from(this.bot.telegram.getFileLink(document.file_id)).pipe(
      switchMap((fileLinkURL) => {
        const fileLink = fileLinkURL.toString();

        return this.documentsService.save(document.file_name, fileLink);
      })
    );
  }
}

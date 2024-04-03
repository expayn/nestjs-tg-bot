import { Telegraf } from 'telegraf';
import { AppService } from './app.service';
import { Context } from './context.interface';
export declare class AppUpdate {
    private readonly bot;
    private readonly appService;
    constructor(bot: Telegraf<Context>, appService: AppService);
    startCommand(ctx: Context): Promise<void>;
    createTask(ctx: Context): Promise<void>;
    listTask(ctx: Context): Promise<void>;
    doneTask(ctx: Context): Promise<void>;
    editTask(ctx: Context): Promise<void>;
    deleteTask(ctx: Context): Promise<void>;
    getMessage(message: string, ctx: Context): Promise<void>;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppUpdate = void 0;
const nestjs_telegraf_1 = require("nestjs-telegraf");
const telegraf_1 = require("telegraf");
const app_buttons_1 = require("./app.buttons");
const app_service_1 = require("./app.service");
const app_utils_1 = require("./app.utils");
let AppUpdate = class AppUpdate {
    constructor(bot, appService) {
        this.bot = bot;
        this.appService = appService;
    }
    async startCommand(ctx) {
        await ctx.reply('Hi! Friend 👋');
        await ctx.reply('Что ты хочешь сделать?', (0, app_buttons_1.actionButtons)());
    }
    async createTask(ctx) {
        ctx.session.type = 'create';
        await ctx.reply('Опиши задачу: ');
    }
    async listTask(ctx) {
        const todos = await this.appService.getAll();
        await ctx.reply((0, app_utils_1.showList)(todos));
    }
    async doneTask(ctx) {
        ctx.session.type = 'done';
        await ctx.deleteMessage();
        await ctx.reply('Напиши ID задачи: ');
    }
    async editTask(ctx) {
        ctx.session.type = 'edit';
        await ctx.deleteMessage();
        await ctx.replyWithHTML('Напиши ID и новое название задачи: \n\n' +
            'В формате - <b>1 | Новое название</b>');
    }
    async deleteTask(ctx) {
        ctx.session.type = 'remove';
        await ctx.deleteMessage();
        await ctx.reply('Напиши ID задачи: ');
    }
    async getMessage(message, ctx) {
        if (!ctx.session.type)
            return;
        if (ctx.session.type === 'create') {
            const todos = await this.appService.createTask(message);
            await ctx.reply((0, app_utils_1.showList)(todos));
        }
        if (ctx.session.type === 'done') {
            const todos = await this.appService.doneTask(Number(message));
            if (!todos) {
                await ctx.deleteMessage();
                await ctx.reply('Задачи с таким ID не найдено!');
                return;
            }
            await ctx.reply((0, app_utils_1.showList)(todos));
        }
        if (ctx.session.type === 'edit') {
            const [taskId, taskName] = message.split(' | ');
            const todos = await this.appService.editTask(Number(taskId), taskName);
            if (!todos) {
                await ctx.deleteMessage();
                await ctx.reply('Задачи с таким ID не найдено!');
                return;
            }
            await ctx.reply((0, app_utils_1.showList)(todos));
        }
        if (ctx.session.type === 'remove') {
            const todos = await this.appService.deleteTask(Number(message));
            if (!todos) {
                await ctx.deleteMessage();
                await ctx.reply('Задачи с таким ID не найдено!');
                return;
            }
            await ctx.reply((0, app_utils_1.showList)(todos));
        }
    }
};
__decorate([
    (0, nestjs_telegraf_1.Start)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "startCommand", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)('⚡️ Создать задачу'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "createTask", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)('📋 Список задач'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "listTask", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)('✅ Завершить'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "doneTask", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)('✏️ Редактирование'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "editTask", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)('❌ Удаление'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "deleteTask", null);
__decorate([
    (0, nestjs_telegraf_1.On)('text'),
    __param(0, (0, nestjs_telegraf_1.Message)('text')),
    __param(1, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "getMessage", null);
AppUpdate = __decorate([
    (0, nestjs_telegraf_1.Update)(),
    __param(0, (0, nestjs_telegraf_1.InjectBot)()),
    __metadata("design:paramtypes", [telegraf_1.Telegraf,
        app_service_1.AppService])
], AppUpdate);
exports.AppUpdate = AppUpdate;
//# sourceMappingURL=app.update.js.map
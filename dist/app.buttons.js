"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionButtons = void 0;
const telegraf_1 = require("telegraf");
function actionButtons() {
    return telegraf_1.Markup.keyboard([
        telegraf_1.Markup.button.callback('⚡️ Создать задачу', 'create'),
        telegraf_1.Markup.button.callback('📋 Список задач', 'list'),
        telegraf_1.Markup.button.callback('✅ Завершить', 'done'),
        telegraf_1.Markup.button.callback('✏️ Редактирование', 'edit'),
        telegraf_1.Markup.button.callback('❌ Удаление', 'delete')
    ], {
        columns: 2
    });
}
exports.actionButtons = actionButtons;
//# sourceMappingURL=app.buttons.js.map
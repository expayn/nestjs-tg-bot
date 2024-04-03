"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showList = void 0;
const showList = todos => `Твой список задач: \n\n${todos
    .map(todo => (todo.isCompleted ? '✅' : '🔘') + ' ' + todo.name + '\n\n')
    .join('')}`;
exports.showList = showList;
//# sourceMappingURL=app.utils.js.map
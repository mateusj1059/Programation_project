"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const mongodb_1 = require("mongodb");
const tasks_repository_1 = require("./tasks.repository");
class TasksService {
    constructor() {
        this.repository = new tasks_repository_1.TasksRepository();
    }
    create(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const now = new Date();
            const subtasks = ((_a = data.subtasks) !== null && _a !== void 0 ? _a : []).map((subtask) => {
                var _a;
                return ({
                    _id: new mongodb_1.ObjectId(),
                    title: subtask.title,
                    isDone: (_a = subtask.isDone) !== null && _a !== void 0 ? _a : false,
                    assignedTo: subtask.assignedTo ? new mongodb_1.ObjectId(subtask.assignedTo) : undefined,
                });
            });
            const task = {
                title: data.title,
                description: data.description,
                projectId: new mongodb_1.ObjectId(data.projectId),
                assignedTo: data.assignedTo ? new mongodb_1.ObjectId(data.assignedTo) : undefined,
                createdBy: new mongodb_1.ObjectId(userId),
                status: (_b = data.status) !== null && _b !== void 0 ? _b : "pending",
                priority: (_c = data.priority) !== null && _c !== void 0 ? _c : "medium",
                dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
                subtasks,
                isActive: true,
                createdAt: now,
                updatedAt: now,
            };
            return yield this.repository.create(task);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findAll();
        });
    }
    findById(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.repository.findById(taskId);
            if (!task) {
                throw new Error("La tarea no existe");
            }
            return task;
        });
    }
    findByProject(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findByProject(projectId);
        });
    }
    findByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findByUser(userId);
        });
    }
    delete(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.repository.findById(taskId);
            if (!task) {
                throw new Error("La tarea no existe");
            }
            yield this.repository.delete(taskId);
        });
    }
}
exports.TasksService = TasksService;

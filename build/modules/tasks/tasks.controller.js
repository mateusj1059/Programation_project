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
exports.TasksController = void 0;
const tasks_service_1 = require("./tasks.service");
const tasks_schema_1 = require("./tasks.schema");
class TasksController {
    constructor() {
        this.tasksService = new tasks_service_1.TasksService();
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const data = tasks_schema_1.createTaskSchema.parse(req.body);
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub;
                if (!userId) {
                    return res.status(401).json({
                        message: "Usuario no autenticado",
                    });
                }
                const task = yield this.tasksService.create(data, userId);
                return res.status(201).json(task);
            }
            catch (error) {
                next(error);
            }
        });
        this.findAll = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield this.tasksService.findAll();
                return res.status(200).json(tasks);
            }
            catch (error) {
                next(error);
            }
        });
        this.findById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const task = yield this.tasksService.findById(id);
                return res.status(200).json(task);
            }
            catch (error) {
                next(error);
            }
        });
        this.findByProject = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const projectId = req.params.projectId;
                const tasks = yield this.tasksService.findByProject(projectId);
                return res.status(200).json(tasks);
            }
            catch (error) {
                next(error);
            }
        });
        this.findByUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub;
                if (!userId) {
                    return res.status(401).json({
                        message: "Usuario no autenticado",
                    });
                }
                const tasks = yield this.tasksService.findByUser(userId);
                return res.status(200).json(tasks);
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield this.tasksService.delete(id);
                return res.status(200).json({
                    message: "Tarea eliminada correctamente",
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.TasksController = TasksController;

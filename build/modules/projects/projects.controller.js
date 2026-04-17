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
exports.ProjectsController = void 0;
const projects_service_1 = require("./projects.service");
const projects_schema_1 = require("./projects.schema");
class ProjectsController {
    constructor() {
        this.projectsService = new projects_service_1.ProjectsService();
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const data = projects_schema_1.createProjectSchema.parse(req.body);
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub;
                if (!userId) {
                    return res.status(401).json({
                        message: "Usuario no autenticado",
                    });
                }
                const project = yield this.projectsService.create(data, userId);
                return res.status(201).json(project);
            }
            catch (error) {
                next(error);
            }
        });
        this.findAll = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield this.projectsService.findAll();
                return res.status(200).json(projects);
            }
            catch (error) {
                next(error);
            }
        });
        this.findById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const project = yield this.projectsService.findById(id);
                return res.status(200).json(project);
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
                const projects = yield this.projectsService.findByUser(userId);
                return res.status(200).json(projects);
            }
            catch (error) {
                next(error);
            }
        });
        this.findByIdAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const project = yield this.projectsService.findByIdAll(id);
                if (!project) {
                    return res.status(404).json({
                        message: "El proyecto no existe",
                    });
                }
                return res.status(200).json(project);
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield this.projectsService.delete(id);
                return res.status(200).json({
                    message: "Proyecto eliminado correctamente",
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ProjectsController = ProjectsController;

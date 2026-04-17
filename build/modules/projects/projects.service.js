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
exports.ProjectsService = void 0;
const mongodb_1 = require("mongodb");
const projects_repository_1 = require("./projects.repository");
class ProjectsService {
    constructor() {
        this.repository = new projects_repository_1.ProjectsRepository();
    }
    create(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            const ownerId = new mongodb_1.ObjectId(userId);
            const project = {
                name: data.name,
                description: data.description,
                owner: ownerId,
                members: [ownerId],
                isActive: true,
                createdAt: now,
                updatedAt: now,
            };
            return yield this.repository.create(project);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findAll();
        });
    }
    findById(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield this.repository.findById(projectId);
            if (!project) {
                throw new Error("El proyecto no existe");
            }
            return project;
        });
    }
    findByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findByUser(userId);
        });
    }
    findByIdAll(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield this.repository.findByIdWithUsers(projectId);
            if (!project) {
                throw new Error("El proyecto no existe");
            }
            return project;
        });
    }
    delete(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield this.repository.findById(projectId);
            if (!project) {
                throw new Error("El proyecto no existe");
            }
            yield this.repository.delete(projectId);
        });
    }
}
exports.ProjectsService = ProjectsService;

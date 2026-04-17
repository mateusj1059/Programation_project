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
exports.TasksRepository = void 0;
const mongodb_1 = require("mongodb");
const database_1 = require("../../config/database");
class TasksRepository {
    collection() {
        return (0, database_1.getDb)().collection('tasks');
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.collection().insertOne(data);
            return Object.assign({ _id: result.insertedId }, data);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection()
                .find({ isActive: true })
                .toArray();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection().findOne({
                _id: new mongodb_1.ObjectId(id),
                isActive: true,
            });
        });
    }
    findByProject(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection()
                .find({
                projectId: new mongodb_1.ObjectId(projectId),
                isActive: true,
            })
                .toArray();
        });
    }
    findByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection()
                .find({
                assignedTo: new mongodb_1.ObjectId(userId),
                isActive: true,
            })
                .toArray();
        });
    }
    update(taskId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection().updateOne({ _id: new mongodb_1.ObjectId(taskId), isActive: true }, {
                $set: Object.assign(Object.assign({}, data), { updatedAt: new Date() }),
            });
        });
    }
    delete(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection().updateOne({ _id: new mongodb_1.ObjectId(taskId) }, {
                $set: {
                    isActive: false,
                    updatedAt: new Date(),
                },
            });
        });
    }
}
exports.TasksRepository = TasksRepository;

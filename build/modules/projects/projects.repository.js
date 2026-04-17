"use strict";
// import { ObjectId } from "mongodb";
// import { getDb } from "../../config/database";
// import { Projects } from "./projects.model";
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
exports.ProjectsRepository = void 0;
// export class ProjectsRepository {
//   private collection() {
//     return getDb().collection<Projects>("projects");
//   }
//   async create(data: Projects): Promise<Projects> {
//     const result = await this.collection().insertOne(data);
//     return {
//       _id: result.insertedId,
//       ...data,
//     };
//   }
//   async findById(id: string): Promise<Projects | null> {
//     return await this.collection().findOne({
//       _id: new ObjectId(id),
//     });
//   }
//   async findAll(): Promise<Projects[]> {
//     return await this.collection().find().toArray();
//   }
//   async findByUser(userId: string): Promise<Projects[]> {
//     return await this.collection()
//       .find({
//         members: new ObjectId(userId),
//         isActive: true
//       })
//       .toArray();
//   }
//   async addMember(projectId: string, userId: string) {
//     return await this.collection().updateOne(
//       { _id: new ObjectId(projectId) },
//       {
//         $addToSet: {
//           members: new ObjectId(userId),
//         },
//         $set: {
//           updatedAt: new Date(),
//         },
//       }
//     );
//   }
//   async update(projectId: string, data: Partial<Projects>) {
//     return await this.collection().updateOne(
//       { _id: new ObjectId(projectId) },
//       {
//         $set: {
//           ...data,
//           updatedAt: new Date(),
//         },
//       }
//     );
//   }
//   async delete(projectId: string) {
//     return await this.collection().updateOne(
//       { _id: new ObjectId(projectId) },
//       {
//         $set: {
//           isActive: false,
//           updatedAt: new Date(),
//         },
//       }
//     );
//   }
// }
const mongodb_1 = require("mongodb");
const database_1 = require("../../config/database");
class ProjectsRepository {
    collection() {
        return (0, database_1.getDb)().collection('projects');
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.collection().insertOne(data);
            return Object.assign({ _id: result.insertedId }, data);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection().findOne({
                _id: new mongodb_1.ObjectId(id),
            });
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection().find().toArray();
        });
    }
    findByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection()
                .find({
                members: new mongodb_1.ObjectId(userId),
                isActive: true,
            })
                .toArray();
        });
    }
    addMember(projectId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection().updateOne({ _id: new mongodb_1.ObjectId(projectId) }, {
                $addToSet: {
                    members: new mongodb_1.ObjectId(userId),
                },
                $set: {
                    updatedAt: new Date(),
                },
            });
        });
    }
    update(projectId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection().updateOne({ _id: new mongodb_1.ObjectId(projectId) }, {
                $set: Object.assign(Object.assign({}, data), { updatedAt: new Date() }),
            });
        });
    }
    delete(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection().updateOne({ _id: new mongodb_1.ObjectId(projectId) }, {
                $set: {
                    isActive: false,
                    updatedAt: new Date(),
                },
            });
        });
    }
    findByIdWithUsers(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const result = yield this.collection()
                .aggregate([
                {
                    $match: {
                        _id: new mongodb_1.ObjectId(projectId),
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "owner",
                        foreignField: "_id",
                        as: "ownerData",
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "members",
                        foreignField: "_id",
                        as: "membersData",
                    },
                },
                {
                    $unwind: {
                        path: "$ownerData",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $project: {
                        name: 1,
                        description: 1,
                        isActive: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        owner: {
                            _id: "$ownerData._id",
                            name: "$ownerData.name",
                            email: "$ownerData.email",
                            avatar: "$ownerData.avatar",
                            role: "$ownerData.role",
                            isActive: "$ownerData.isActive",
                        },
                        members: {
                            $map: {
                                input: "$membersData",
                                as: "member",
                                in: {
                                    _id: "$$member._id",
                                    name: "$$member.name",
                                    email: "$$member.email",
                                    avatar: "$$member.avatar",
                                    role: "$$member.role",
                                    isActive: "$$member.isActive",
                                },
                            },
                        },
                    },
                },
            ])
                .toArray();
            return (_a = result[0]) !== null && _a !== void 0 ? _a : null;
        });
    }
    findAllWithUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection()
                .aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "owner",
                        foreignField: "_id",
                        as: "ownerData",
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "members",
                        foreignField: "_id",
                        as: "membersData",
                    },
                },
                {
                    $unwind: {
                        path: "$ownerData",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $project: {
                        name: 1,
                        description: 1,
                        isActive: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        owner: {
                            _id: "$ownerData._id",
                            name: "$ownerData.name",
                            email: "$ownerData.email",
                            avatar: "$ownerData.avatar",
                            role: "$ownerData.role",
                            isActive: "$ownerData.isActive",
                        },
                        members: {
                            $map: {
                                input: "$membersData",
                                as: "member",
                                in: {
                                    _id: "$$member._id",
                                    name: "$$member.name",
                                    email: "$$member.email",
                                    avatar: "$$member.avatar",
                                    role: "$$member.role",
                                    isActive: "$$member.isActive",
                                },
                            },
                        },
                    },
                },
            ])
                .toArray();
        });
    }
    findByUserWithUsers(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection()
                .aggregate([
                {
                    $match: {
                        members: new mongodb_1.ObjectId(userId),
                        isActive: true,
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "owner",
                        foreignField: "_id",
                        as: "ownerData",
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "members",
                        foreignField: "_id",
                        as: "membersData",
                    },
                },
                {
                    $unwind: {
                        path: "$ownerData",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $project: {
                        name: 1,
                        description: 1,
                        isActive: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        owner: {
                            _id: "$ownerData._id",
                            name: "$ownerData.name",
                            email: "$ownerData.email",
                            avatar: "$ownerData.avatar",
                            role: "$ownerData.role",
                            isActive: "$ownerData.isActive",
                        },
                        members: {
                            $map: {
                                input: "$membersData",
                                as: "member",
                                in: {
                                    _id: "$$member._id",
                                    name: "$$member.name",
                                    email: "$$member.email",
                                    avatar: "$$member.avatar",
                                    role: "$$member.role",
                                    isActive: "$$member.isActive",
                                },
                            },
                        },
                    },
                },
            ])
                .toArray();
        });
    }
}
exports.ProjectsRepository = ProjectsRepository;

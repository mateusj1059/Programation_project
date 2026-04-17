"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskSchema = void 0;
const zod_1 = require("zod");
exports.createTaskSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(3, "El título debe tener mínimo 3 caracteres")
        .max(100, "El título es muy largo"),
    description: zod_1.z
        .string()
        .max(500, "La descripción es muy larga")
        .optional(),
    projectId: zod_1.z.string().min(1, "El projectId es obligatorio"),
    assignedTo: zod_1.z.string().optional(),
    status: zod_1.z
        .enum(["pending", "in_progress", "review", "done"])
        .optional(),
    priority: zod_1.z
        .enum(["low", "medium", "high"])
        .optional(),
    dueDate: zod_1.z.string().datetime("La fecha debe tener formato ISO").optional(),
    subtasks: zod_1.z.array(zod_1.z.object({
        title: zod_1.z
            .string()
            .min(1, "El título de la subtarea es obligatorio")
            .max(100, "El título de la subtarea es muy largo"),
        isDone: zod_1.z.boolean().optional(),
        assignedTo: zod_1.z.string().optional(),
    })).optional(),
});

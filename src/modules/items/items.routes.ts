import { Router } from "express";
import { getItems, createNewItem } from "./items.controller";

const router = Router();

router.get("/", getItems);
router.post("/", createNewItem);

export default router;
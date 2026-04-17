import { Request, Response } from "express";
import { getAllItems, createItem } from "./items.service";

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await getAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo items" });
  }
};

export const createNewItem = async (req: Request, res: Response) => {
  try {
    const newItem = req.body;

    const result = await createItem(newItem);

    res.status(201).json({
      message: "Item creado",
      id: result.insertedId
    });
  } catch (error) {
    res.status(500).json({ message: "Error creando item" });
  }
};
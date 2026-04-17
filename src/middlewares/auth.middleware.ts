import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../libs/jwt"; // ajusta la ruta si cambia

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    
    if (!authHeader) {
      return res.status(401).json({ message: "Token requerido" });
    }

    
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token inválido" });
    }

    
    const payload = verifyToken(token);

    console.log("Payload:", payload); // como mostró el profe

    
    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
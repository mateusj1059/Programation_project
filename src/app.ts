import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';

import v1Routes from "./api/v1/index";
import { errorMiddleware } from "./middlewares/error.middleware";
import itemsRoutes from "./modules/items/items.routes";

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(compression());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Servidor funcionando 🚀",
    api: "Minecraft Items API",
    endpoints: {
      getItems: "/items"
    }
  });
});

app.use("/items", itemsRoutes);
app.use('/api/v1', v1Routes);

// Middleware de errores
app.use(errorMiddleware);

export { app };
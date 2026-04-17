import { app } from "./app";
import { env } from "./config/env";
import { connectDB } from "./config/database";

const bootstrap = async () => {
  try {
    await connectDB();

    app.listen(env.port, () => {
      console.log(`🚀 Servidor corriendo en puerto ${env.port}`);
    });

  } catch (error) {
    console.error("❌ Error iniciando servidor", error);
  }
};

bootstrap();
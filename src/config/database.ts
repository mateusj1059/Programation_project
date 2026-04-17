import { MongoClient } from "mongodb";
import { env } from "./env";

const uri = process.env.MONGO_URI as string;

const client = new MongoClient(uri);

let db: any;

console.log("MONGO URI:", env.mongoUri);

export const connectDB = async () => {
  try {
    await client.connect();
    db = client.db("minecraft_db");
    console.log("✅ MongoDB conectado");
  } catch (error) {
    console.error("❌ Error conectando MongoDB", error);
  }
};


export const getDb = () => {
  if (!db) {
    throw new Error("La base de datos no está conectada");
  }
  return db;
};


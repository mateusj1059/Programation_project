import { getDb } from "../../config/database";

export const getAllItems = async () => {
  return await getDb().collection("items").find().toArray();
};

export const createItem = async (item: any) => {
  return await getDb().collection("items").insertOne(item);
};
import { getDb } from "../../config/database";

export class ItemsRepository {

  private getCollection() {
    return getDb().collection("items");
  }

  async create(item: any) {
    return await this.getCollection().insertOne(item);
  }

  async findAll() {
    return await this.getCollection().find().toArray();
  }
}
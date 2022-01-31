import { Model } from "objection";

class Task extends Model {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
  isPending: boolean;

  static get tableName() {
    return "tasks";
  }
}

export { Task };

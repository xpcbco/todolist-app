import { Task } from "./task.model";

type TaskPayload = {
  success: boolean;
  message: string;
  task: Task;
};

const resolvers = {
  Query: {
    tasks: async (): Promise<Task[]> => {
      const result = await Task.query();
      return result;
    },
    task: async (_: any, { id }: any): Promise<Task> => {
      const result = await Task.query().findById(id);
      return result === undefined ? <Task>{} : result;
    },
  },
  Mutation: {
    addTask: async (_: any, { task }: any): Promise<TaskPayload> => {
      const result = await Task.query().insertAndFetch({
        title: task.title,
        description: task.description,
        isPending: true,
        isDone: false,
      });
      const payload = {
        success: result === undefined ? false : true,
        message:
          result === undefined
            ? "Error al agregar una nueva tarea"
            : "Se ha agregado una nueva tarea",
        task: result,
      };
      return payload;
    },
    updateTask: async (_: any, { id, task }: any): Promise<TaskPayload> => {
      const result = await Task.query().patchAndFetchById(id, {
        title: task.title,
        description: task.description,
      });
      const payload = {
        success: result === undefined ? false : true,
        message:
          result === undefined
            ? "Error al actualizar la tarea"
            : "Se ha actualizado una tarea",
        task: result,
      };
      return payload;
    },
    setTaskAsDone: async (_: any, { id }: any): Promise<TaskPayload> => {
      const result = await Task.query().patchAndFetchById(id, {
        id: id,
        isPending: false,
        isDone: true,
      });
      const payload = {
        success: result === undefined ? false : true,
        message:
          result === undefined
            ? "Error al marcar la tarea"
            : "Se ha marcado la tarea como pendiente",
        task: result,
      };
      return payload;
    },
    setTaskAsPending: async (_: any, { id }: any): Promise<TaskPayload> => {
      const result = await Task.query().patchAndFetchById(id, {
        id: id,
        isPending: true,
        isDone: false,
      });
      const payload = {
        success: result === undefined ? false : true,
        message:
          result === undefined
            ? "Error al marcar la tarea"
            : "Se ha marcado la tarea como finalizada",
        task: result,
      };
      return payload;
    },
    deleteTask: async (_: any, { id }: any): Promise<TaskPayload> => {
      const task = await Task.query().findById(id);
      const result = await Task.query().deleteById(id);
      const payload = {
        success: result === 0 ? false : true,
        message:
          result === 0
            ? "Error al eliminar la tarea"
            : "Se ha eliminado una tarea",
        task: task === undefined ? <Task>{} : task,
      };
      return payload;
    },
  },
};

export { resolvers };

import { types, Instance, createContext } from 'mobx-state-tree';

export const Task = types.model('Task', {
    id: types.identifier,
    title: types.string,
    description: types.string,
    status: types.enumeration(['To Do', 'In Progress', 'Completed']),
  });
  
const RootStore = types
  .model('RootStore', {
    tasks: types.array(Task),
  })
  .actions((self) => ({
    addTask(task: typeof Task.Type) {
      self.tasks.push(task);
    },
    updateTask(updatedTask: typeof Task.Type) {
      const task = self.tasks.find((t) => t.id === updatedTask.id);
      if (task) {
        task.status = updatedTask.status;
        task.description = updatedTask.description;
      }
    },
    deleteTask(taskId: string) {
      const index = self.tasks.findIndex((task) => task.id === taskId);
      if (index !== -1) {
        self.tasks.splice(index, 1);
      }
    },
    replaceTasks(parsedTasks:Task[]) {
          self.tasks.replace(parsedTasks);
      },
    
  }));

export const rootStore = RootStore.create({ tasks: [] });

export type RootStoreType = Instance<typeof RootStore>;
export const RootStoreContext = {
  Provider: ({ children }: { children: React.ReactNode }) => children,
  Consumer: ({ children }: { children: (value: RootStoreType) => React.ReactNode }) =>
    children(rootStore),
};

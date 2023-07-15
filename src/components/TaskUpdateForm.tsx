import { observer } from 'mobx-react';
import { useRootStore } from '../hooks/useRootStore';
import { SetStateAction, useState } from 'react';
import TaskType from "../types/TaskType";
interface TaskUpdateFormProps {
  task: TaskType | undefined;
  closeUpdateForm: () => void;
}

const TaskUpdateForm: React.FC<TaskUpdateFormProps> = observer(({ task, closeUpdateForm }) => {
  const { updateTask, deleteTask } = useRootStore();
  const [status, setStatus] = useState(task && task.status || ''); 
  const [description, setDescription] = useState(task && task.description || ''); 

  const handleStatusChange = (e: any) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  if(task){
    const updatedTask = {
      ...task,
      status,
      description,
    };

    updateTask(updatedTask);
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      const updatedTasks = parsedTasks.map((t: { id: string; }) => {
        if (t.id === task.id) {
          return updatedTask;
        }
        return t;
      });
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  }
    
    closeUpdateForm();
  };



  return (
    <div className="bg-white rounded shadow p-4 sm:p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="description" className="block font-bold mb-2">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded p-2 w-full h-32 resize-none focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block font-bold mb-2">
            Status:
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded p-2 focus:outline-none"
          >
            <option value="">Select Status</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded focus:outline-none">
            Update
          </button>
          <button type="button" onClick={closeUpdateForm} className="px-4 py-2 ml-4 bg-gray-300 text-gray-700 rounded focus:outline-none">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
});

export default TaskUpdateForm;

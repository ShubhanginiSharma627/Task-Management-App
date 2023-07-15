import { useState } from 'react';
import { observer } from 'mobx-react';
import { useRootStore } from '../hooks/useRootStore';

interface TaskFormProps {
  handleClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = observer(({ handleClose }) => {
  const { addTask } = useRootStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === '') {
      return;
    }

    const newTask = {
      id: generateTaskId(),
      title: title.trim(),
      description,
      status,
    };

    addTask(newTask);
    setTitle('');
    setDescription('');
    setStatus('');
    handleClose();
  };

  const generateTaskId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  return (
    <div className="w-72 mx-auto">
      <h3 className="text-xl font-bold mb-4">Add New Task</h3>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="title" className="block font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-bold mb-2">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded p-2 w-full h-40 resize-none"
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
            className="border rounded p-2 w-full"
          >
            <option value="">Select Status</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
});

export default TaskForm;

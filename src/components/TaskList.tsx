import { observer } from 'mobx-react';
import { useRootStore } from '../hooks/useRootStore';
import { useState, useEffect } from 'react';
import TaskForm from './TaskForm';


interface TaskListProps {
  openUpdateForm: (task: TaskType) => void;
}

const TaskList: React.FC<TaskListProps> = observer(({ openUpdateForm }) => {
  const { tasks, deleteTask,replaceTasks } = useRootStore();
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      replaceTasks(parsedTasks);
    }
  }, []);



  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="relative bg-white rounded shadow-sm p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-4">Task List</h2>
      <button
        className="absolute top-2 right-2 flex items-center justify-center bg-blue-500 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 text-lg sm:text-xl focus:outline-none"
        onClick={handleOpenForm}
      >
        +
      </button>
      {tasks.length === 0 ? (
        <p className="text-gray-500 mt-8">No tasks available. Add a task using the &quot;+&quot; button.</p>
      ) : (
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-gray-100 rounded p-4 sm:p-6">
              <h3 className="text-lg font-bold mb-2">{task.title}</h3>
              <p className="mb-2">{task.description}</p>
              <p className="mb-2">Status: {task.status}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded focus:outline-none"
                >
                  Delete
                </button>
                <button
                  onClick={() => openUpdateForm(task)}
                  className="px-4 py-2 bg-blue-500 text-white rounded focus:outline-none"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-4 shadow rounded">
            <TaskForm handleClose={handleCloseForm} />
          </div>
        </div>
      )}
    </div>
  );
});

export default TaskList;

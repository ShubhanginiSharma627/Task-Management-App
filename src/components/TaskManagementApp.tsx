
import { observer } from 'mobx-react';
import { useState } from 'react';
import TaskList from './TaskList';
import TaskUpdateForm from './TaskUpdateForm';
import React from 'react';
import TaskType from "../types/TaskType";

const TaskManagementApp = observer(() => {
    const [isOpen, setIsOpen] = useState(false);
    const [Task, setTask] = useState<TaskType>();
  

    const openUpdateForm = (task:TaskType) => {
      setIsOpen(true);
      setTask(task);
    };

    const closeUpdateForm = () => {
      setIsOpen(false);
      setTask(undefined);
    };
  
    return (
     <div className="flex flex-col items-center">
      <TaskList openUpdateForm={openUpdateForm} />
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-4 shadow rounded">
            <TaskUpdateForm
              task={Task}      
              closeUpdateForm={closeUpdateForm}
            />
          </div>
        </div>
      )}
    </div>
  );
});

export default TaskManagementApp;

import { observer } from 'mobx-react';
import { useRootStore } from '../hooks/useRootStore';
import { useState } from 'react';
import TaskList from './TaskList';
import TaskUpdateForm from './TaskUpdateForm';
import React, { useEffect } from 'react';


const TaskManagementApp = observer(() => {
    const [isOpen, setIsOpen] = useState(false);
    const [Task, setTask] = useState();
  

    const openUpdateForm = (task) => {
      setIsOpen(true);
      setTask(task);
    };

    const closeUpdateForm = () => {
      setIsOpen(false);
      setTask(" ");
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
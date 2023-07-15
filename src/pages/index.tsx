import TaskManagementApp from '../components/TaskManagementApp';
import TaskForm from '../components/TaskForm';
import { useRootStore } from '../hooks/useRootStore';
import '../../app/globals.css'
const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold my-8 text-white">Task Management App</h1>
  
      < TaskManagementApp/>
    </div>
  );
};

export default Home;

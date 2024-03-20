
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSelector, useDispatch } from "react-redux";
import { addTask } from './actions/taskAction'
import { TaskState } from './Store/taskReducer';
import Homepage from './pages/Homepage';

function App() {
  const state = useSelector((state: TaskState) => state);
  const dispatch = useDispatch();
  return (
    <>
      <Homepage/>
    </>
  )
}

export default App

import { useEffect, useState } from "react";
import "./app.css";
import Task from "./Task";
import TaskForm from "./TaskForm";
import TaskHookForm from "./TaskHookForm";
import PeopleForm from "./PeopleForm";
import { initialTasks, initialTeam } from "./data";
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [team, setTeam] = useState(initialTeam);

  const notify = (deger) => toast.success(deger);

  function handleTaskSubmit(yeniTask) {
    setTasks([yeniTask, ...tasks])
    notify(`${yeniTask.title} adlı görev eklenmiştir.`)
  }

  function handlePeopleSubmit(yeniKisi) {
    setTeam([...team, yeniKisi])
    notify(`${yeniKisi} adlı kişi eklendi`);
  }

  function handleComplete(id) {
    const newArray = [...tasks];
    const completedTaskList = newArray.find((item) => item.id === id);
    completedTaskList.status = "yapıldı!";
    setTasks(newArray);
    notify("Görev tamamlandı!");
  }

  useEffect(() => {
    notify("Sayfa başarıyla yüklenmiştir.")
  }, [])

  return (
    <div className="app">
      <div className="formColumn">
        <div className="form-container">
          <h2>Yeni Task</h2>
          {/* <TaskForm kisiler={team} submitFn={handleTaskSubmit} /> */}
          <TaskHookForm kisiler={team} submitFn={handleTaskSubmit} />
        </div>

        <div className="form-container">
          <h2>Yeni Kişi</h2>
          <PeopleForm kisiler={team} submitFn={handlePeopleSubmit} />
        </div>
        <ToastContainer position="bottom-left" theme="colored" transition={Zoom} />
      </div>
      <div className="columns">
        <div className="column">
          <h2 className="column-title">Yapılacaklar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapılacak")
              .map((t) => (
                <Task key={t.id} taskObj={t} onComplete={handleComplete} />
              ))}
          </div>
        </div>
        <div className="column">
          <h2 className="column-title">Tamamlananlar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapıldı")
              .map((t) => (
                <Task key={t.id} taskObj={t} />
              ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;

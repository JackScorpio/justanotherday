import { useState, useEffect } from "react";
import "../button.css";
import Subtodo from "./Subtodo";
import Dropdown from "./Dropdown";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  subTasks: Subtask[];
}

interface Subtask {
  id: string;
  text: string;
  completed: boolean;
}
function TodoList() {
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    const jsonget: string | null = localStorage.getItem("tasks");
    if (jsonget !== null) {
      const loadedTasks = JSON.parse(jsonget);
      setTasks(loadedTasks);
    }
  }, []);

  useEffect(() => {
    const jsonset = JSON.stringify(tasks);
    localStorage.setItem("tasks", jsonset);
  }, [tasks, task]);

  const addTask = (e: any): void => {
    const newTask: Task = {
      id: new Date().getTime().toString(),
      text: task,
      completed: false,
      subTasks: [],
    };
    e.preventDefault();
    if (newTask.text.trim() !== "") {
      setTasks([...tasks].concat(newTask));
      setTask("");
    }
  };

  function onChange(id: string) {
    let updatedTasks = [...tasks].map((task) => {
      if (task.id === id) {
        if (task.completed === false) {
          task.completed = true;
          if (task.subTasks) {
            task.subTasks.map((subTask: Subtask) => {
              if (subTask.completed === false) {
                subTask.completed = true;
              }
              return task;
            });
          }
        } else {
          task.completed = false;
        }
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id: string) {
    const updatedTasks = [...tasks].filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  const options = (filter: String): any => {
    if (filter === "All") {
      return () => true;
    } else if (filter === "Pending") {
      return (t: Task): any => !t.completed;
    } else if (filter === "Done") {
      return (t: Task): any => t.completed;
    }
  };

  return (
    <div className='tasks'>
      <div className='functionArea'>
        <div className='ui stackable centered grid container'>
          <div className='addtaskArea'>
            <form className='ui form' onSubmit={addTask}>
              <div className='ui action input' id='addTaskInput'>
                <input
                  maxLength={50}
                  type='text'
                  onChange={(e) => setTask(e.target.value)}
                  value={task}
                  placeholder='Add Todo card..'
                  required
                ></input>
                <button className='ui blue button'>Add</button>
              </div>
            </form>
          </div>
          <div className='filterContainer'>
            <Dropdown filter={filter} onFilterChange={setFilter} />
          </div>
        </div>
      </div>
      <div className='ui centered grid taskItems' id='taskItems'>
        {tasks !== null &&
          tasks.filter(options(filter)).map((task: Task) => (
            <div key={task.id} className='task' draggable='true'>
              <div className='flex-container'>
                <div className='ui raised card draggable'>
                  <div className='content'>
                    <i
                      className='right floated trash link icon'
                      onClick={() => deleteTask(task.id)}
                    ></i>
                    <div className='header'>
                      <h2>
                        <div className='ui checkbox'>
                          <input
                            type='checkbox'
                            checked={task.completed}
                            id={task.id}
                            onChange={() => onChange(task.id)}
                          />
                          <label className='headerLabel' htmlFor={task.id}>
                            {task.text}
                          </label>
                        </div>
                      </h2>
                    </div>
                  </div>
                  <Subtodo task={task} tasks={tasks} setTasks={setTasks} />
                  {task.completed === false && (
                    <div className='ui negative message'>
                      <div className='taskstatusbar'>This task is pending.</div>
                    </div>
                  )}
                  {task.completed === true && (
                    <div className='ui positive message'>
                      <div className='taskstatusbar'>This task is done.</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TodoList;

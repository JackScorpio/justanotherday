import React, { useEffect, useState } from "react";
import "../button.css";
interface Props {
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}
interface Task {
  id: number;
  text: string;
  completed: boolean;
  subTasks: Subtask[];
}

interface Subtask {
  id: number;
  text: string;
  completed: boolean;
}

const Subtodo: React.FC<Props> = ({ task, tasks, setTasks }) => {
  const [subTasks, setsubTasks] = useState(task.subTasks);
  const [subTask, setsubTask] = useState("");

  useEffect(() => {
    const newtasks = JSON.stringify(tasks);
    localStorage.setItem("tasks", newtasks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, JSON.stringify(subTasks)]);

  const addSubTask = (e: any, task: any) => {
    e.preventDefault();
    const newSubTask = {
      id: new Date().getTime(),
      text: subTask,
      completed: false,
    };

    if (newSubTask.text.trim() !== "") {
      const newSubTasks = task.subTasks.push(newSubTask);

      setsubTasks(newSubTasks);
      setsubTask("");
      task.completed = false;
      setTasks([...tasks]);
    }
  };

  const deleteSubTask = (task: any, id: number) => {
    const newSubTasks = task.subTasks.splice(
      task.subTasks.findIndex((t: any) => t.id === id),
      1
    );
    setsubTasks(newSubTasks);
  };

  function onSubTaskChange(task: any, id: number) {
    const targetIndex = task.subTasks.findIndex((t: any) => t.id === id);

    if (task.subTasks[targetIndex].completed === false) {
      task.subTasks[targetIndex].completed = true;
    } else {
      task.subTasks[targetIndex].completed = false;
      task.completed = false;
    }

    setsubTasks([...task.subTasks]);
    setTasks([...tasks]);
  }

  return (
    <div className='subTask-container'>
      <div className='subTodoList'>
        {task.subTasks.map((subTask: any) => (
          <div key={subTask.id} id='subtask'>
            <div className='ui checkbox'>
              <input
                type='checkbox'
                checked={subTask.completed}
                id={subTask.id}
                onChange={() => onSubTaskChange(task, subTask.id)}
              />
              <label
                className={subTask.completed ? "subTaskDone" : "subTaskUndone"}
                htmlFor={subTask.id}
                id='subtasklabel'
              >
                {subTask.text}
              </label>
            </div>
            <button
              className='ui mini icon button'
              onClick={() => deleteSubTask(task, subTask.id)}
            >
              <i className='x icon'></i>
            </button>
          </div>
        ))}
      </div>
      <form onSubmit={(e) => addSubTask(e, task)}>
        <div className='ui input' id='addsubtask'>
          <input
            className='subtaskInput'
            type='text'
            maxLength={18}
            value={subTask}
            onChange={(e) => setsubTask(e.target.value)}
            placeholder='Add subtask here..'
          />
        </div>
      </form>
    </div>
  );
};

export default Subtodo;

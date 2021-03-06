import React, { useEffect, useState } from "react";
import "../button.css";
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
interface Props {
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Subtodo: React.FC<Props> = ({ task, tasks, setTasks }) => {
  const [subTasks, setsubTasks] = useState(task.subTasks);
  const [subTaskText, setsubTaskText] = useState<Subtask["text"]>("");

  useEffect(() => {
    const newtasks = JSON.stringify(tasks);
    localStorage.setItem("tasks", newtasks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, JSON.stringify(subTasks)]);

  const addSubTask = (e: any, task: Task) => {
    e.preventDefault();
    const newSubTask: Subtask = {
      id: new Date().getTime().toString(),
      text: subTaskText,
      completed: false,
    };

    if (newSubTask.text.trim() !== "") {
      task.subTasks.push(newSubTask);
      setTasks([...tasks]);
      setsubTaskText("");
      task.completed = false;
    }
  };

  const deleteSubTask = (task: Task, id: string) => {
    const newSubTasks = task.subTasks.splice(
      task.subTasks.findIndex((t) => t.id === id),
      1
    );
    setsubTasks(newSubTasks);
  };

  function onSubTaskChange(task: Task, id: string) {
    const targetIndex = task.subTasks.findIndex((t) => t.id === id);
    if (task.subTasks[targetIndex].completed === false) {
      task.subTasks[targetIndex].completed = true;
    } else {
      task.subTasks[targetIndex].completed = false;
      task.completed = false;
    }

    setsubTasks([...task.subTasks]);
    setTasks([...tasks]);

    let allFinished = task.subTasks.every((item: Subtask) => {
      return item.completed === true;
    });

    if (allFinished === true) {
      task.completed = true;
      setTasks([...tasks]);
    }
  }

  return (
    <div className='subTask-container'>
      <div className='subTodoList'>
        {task.subTasks.map((subTask: Subtask) => (
          <div key={subTask.id} className='subtask'>
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
        <div className='ui input addsubtask'>
          <input
            className='subtaskInput'
            type='text'
            maxLength={40}
            value={subTaskText}
            onChange={(e) => setsubTaskText(e.target.value)}
            placeholder='Add subtask here..'
            required
          />
        </div>
      </form>
    </div>
  );
};

export default Subtodo;

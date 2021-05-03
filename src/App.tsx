import "./App.css";
import React, { useState } from "react";
import Timer from "./Components/Timer";
import Clock from "./Components/Clock";
import TodoList from "./Components/Todolist";

function App() {
  // Notification.requestPermission();
  const [taskInit, setTaskInit] = useState(false);

  return (
    <div className='App'>
      <div className='ui stackable three column padded grid headerBar'>
        <div className='column clockContainer'>
          <Clock />
        </div>
        <div className='column startContainer'>
          {!taskInit && (
            <button
              className='ui big green button'
              onClick={() => setTaskInit(true)}
            >
              Start
            </button>
          )}
          {taskInit && (
            <button
              className='ui big red button'
              onClick={() => setTaskInit(false)}
            >
              End
            </button>
          )}
          {taskInit && (
            <div className='timer'>
              <Timer />
            </div>
          )}
        </div>
      </div>
      <TodoList />
    </div>
  );
}

export default App;

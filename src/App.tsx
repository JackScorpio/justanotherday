import "./App.css";
import React, { useState } from "react";
import Timer from "./Components/Timer";
import Clock from "./Components/Clock";
import TodoList from "./Components/Todolist";
import YoutubeApp from "./Components/video_search/youtube_search_App";

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
        <div className='column widgetsContainer'>
          <div className='ui compact menu'>
            <a className='item'>
              <i className='globe icon'></i>
              Translate
            </a>
            <a className='item'>
              <i className='video camera icon'></i>
              Channels
            </a>
            <a className='ui pointing dropdown link item'>
              <i className='external square alternate icon'></i>
              Links
              <i className='dropdown icon'></i>
              <div className='menu'>
                <div className='item'>
                  <i className='dropdown icon'></i>
                  <span className='text'>Categories</span>
                  <div className='menu'>
                    <div className='item'>Unread</div>
                    <div className='item'>Promotions</div>
                    <div className='item'>Updates</div>
                  </div>
                </div>
                <div className='item'>Archive</div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <TodoList />
      <YoutubeApp />
    </div>
  );
}

export default App;

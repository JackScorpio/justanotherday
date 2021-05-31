import "./App.css";
import Timer from "./Components/Timer";
import Clock from "./Components/Clock";
import TodoList from "./Components/Todolist";

function App() {
  // Notification.requestPermission();

  return (
    <div className='App'>
      <div className='ui stackable two column padded grid headerBar'>
        <div className='column clockContainer'>
          <Clock />
        </div>
        <Timer />
      </div>
      <TodoList />
    </div>
  );
}

export default App;

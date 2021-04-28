import React, { useState } from "react";

import Clock from "./Components/Clock";

function App() {
  // Notification.requestPermission();
  const [taskInit, setTaskInit] = useState(false);

  return (
    <div className='App'>
      <Clock />
    </div>
  );
}

export default App;

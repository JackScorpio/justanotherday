import React, { useState, useEffect } from "react";
import "./Clock.css";
function Clock() {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
  }, [currentTime]);

  return <div className='clock'>{currentTime}</div>;
}

export default Clock;

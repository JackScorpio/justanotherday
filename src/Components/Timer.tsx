import React from "react";
import { useState, useEffect } from "react";

const Timer = () => {
  Notification.requestPermission();
  let initialMinute = 45;
  let initialSeconds = 0;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          let notice = new Notification("Time for a break and drink water!", {
            silent: false,
            renotify: false,
            requireInteraction: true,
          });
          notice.onclick = function () {
            window.focus();
            setMinutes(45);
          };
          notice.onclose = function () {
            setMinutes(45);
          };
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div className='message'>
      {minutes === 0 && seconds === 0 ? null : (
        <h1>
          Take a rest in: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      )}
    </div>
  );
};

export default Timer;

import { useState, useEffect } from "react";

const Timer = () => {
  // Notification is not supported on IOS device.

  Notification.requestPermission();
  const [taskInit, setTaskInit] = useState(false);
  let initialMinute = 45;
  let initialSeconds = 0;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    if (taskInit) {
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
    }
    
  }, [taskInit,minutes, seconds]);

  return (
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
          <div className='message'>
            {minutes === 0 && seconds === 0 ? null : (
              <h1>
                Take a rest in: {minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;

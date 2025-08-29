// We will create a custom hook that will return the current time and update it every second
import { useState, useEffect } from "react";
function useTimer() {
  const [time, setTime] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
}

export default useTimer;

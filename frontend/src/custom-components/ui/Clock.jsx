import React, { useState, useEffect } from 'react';

const Clock = ({  }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Format time to 12-hour format with AM/PM
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours.toString().padStart(2, '0')}:${minutes}:${seconds} ${period}`;
  };

  return (
    <div className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      {formatTime(time)}
    </div>
  );
};

export default Clock;

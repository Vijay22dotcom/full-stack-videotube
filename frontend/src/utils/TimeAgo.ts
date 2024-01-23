import { useState, useEffect } from 'react';

export  function useTimeAgo(date: string): string {
    
  const calculateTimeAgo = (timestamp: number): string => {
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - timestamp;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return seconds + ' seconds ago';
    } else if (minutes < 60) {
      return minutes + ' minutes ago';
    } else if (hours < 24) {
      return hours + ' hours ago';
    } else {
      return days + ' days ago';
    }
  };

  const [timeAgo, setTimeAgo] = useState<string>('');

  useEffect(() => {
    const timestamp = new Date(date).getTime();
    // const intervalId = setInterval(() => {
        //   setTimeAgo(calculateTimeAgo(timestamp));
        // }, 1000);
        
          setTimeAgo(calculateTimeAgo(timestamp));

    // return () => clearInterval(intervalId);
  }, [date]);

  return timeAgo;
}
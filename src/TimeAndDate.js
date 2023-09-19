import React, { useEffect, useState } from "react";
import './index.css'; // Import your CSS file

function DateTime() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  // Create custom options for formatting the date
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = dateTime.toLocaleString(undefined, dateOptions);
  const formattedTime = dateTime.toLocaleTimeString();

  return (
    <div className="datetime"> {/* Apply the text-center class */}
      <div>
        <div>{formattedDate}</div>
      </div>
      <div>
        <div>{formattedTime}</div>
      </div>
    </div>
  );
}

export default DateTime;
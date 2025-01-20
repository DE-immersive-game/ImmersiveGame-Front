import { useEffect, useState } from "react";

const Countdown = () => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000); 
      return () => clearTimeout(timer); 
    } else {
      window.location.href = "/sequencies";
    }
  }, [count]);

  return (
    <div style={{ textAlign: "center", fontSize: "48px", color: "blue" }}>
      {count > 0 ? <h1>{count}</h1> : <h1></h1>}
    </div>
  );
};

export default Countdown

import React, { useState, useEffect } from "react";
import "./TasbeehCounter.css";

function TasbeehCounter() {
  const [showCounter, setShowCounter] = useState(false);
  const [count, setCount] = useState(() => {
    return parseInt(localStorage.getItem("tasbeehCount")) || 0;
  });
  const maxCount = 100;

  const handleClick = () => {
    setShowCounter(true);
  };

  const handleTasbeeh = () => {
    if (count < maxCount) {
      setCount(count + 1);
    }
  };

  const resetCounter = () => {
    setCount(0);
  };

  useEffect(() => {
    localStorage.setItem("tasbeehCount", count);
  }, [count]);

  return (
    <div className="tasbeeh-container">
      {!showCounter ? (
        <button className="start-btn" onClick={handleClick}>
          هل سبّحت اليوم؟
        </button>
      ) : (
        <div className="counter-box">
          <p className="count">{count} / {maxCount}</p>
          {count < maxCount ? (
            <button className="tasbeeh-btn" onClick={handleTasbeeh}>سبّح</button>
          ) : (
            <p className="done">✅ ما شاء الله، أنهيت التسبيح اليوم</p>
          )}
          <button className="reset-btn" onClick={resetCounter}>إعادة التصفير</button>
        </div>
      )}
    </div>
  );
}

export default TasbeehCounter;
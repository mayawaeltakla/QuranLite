import React, { useState } from "react";
import "./Azkar.css";

const azkarList = [
  "سبحان الله",
  "الحمد لله",
  "لا إله إلا الله",
  "الله أكبر",
  "أستغفر الله",
  "لا حول ولا قوة إلا بالله",
  "سبحان الله وبحمده سبحان الله العظيم",
];

function Azkar() {
  const [zekr, setZekr] = useState(azkarList[0]);

  const handleClick = () => {
    let newZekr;
    do {
      const random = Math.floor(Math.random() * azkarList.length);
      newZekr = azkarList[random];
    } while (newZekr === zekr); // حتى ما يكرر نفس الذكر
    setZekr(newZekr);
  };

  return (
    <div className="azkar-box shadow-sm border rounded p-4">
      <p className="zekr-text">{zekr}</p>
      <button
        onClick={handleClick}
        className="btn btn-success mt-3"
        aria-label="احصل على ذكر جديد"
      >
        ذكر جديد
      </button>
    </div>
  );
}

export default Azkar;
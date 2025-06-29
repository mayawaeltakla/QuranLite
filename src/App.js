import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SurahPage from "./SurahPage";
import Favorites from "./Favorites";
import PrayerTimes from "./PrayerTimes";
import TasbeehCounter from "./TasbeehCounter";
import { FaMosque } from "react-icons/fa";
import "./App.css";
import Azkar from "./Azkar";

function App() {
  // حالة إظهار/إخفاء أوقات الصلاة
  const [showPrayer, setShowPrayer] = useState(false);

  // ستايل الزر الخاص بأوقات الصلاة
  const prayerButtonStyle = {
    position: "fixed",
    top: "60px",
    right: "10px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "50%",
    cursor: "pointer",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s ease",
  };

  return (
    <Router basename="/quranlite">
      <div className="App">
        {/* زر إظهار/إخفاء أوقات الصلاة */}
        <button
          style={prayerButtonStyle}
          onClick={() => setShowPrayer(prev => !prev)}
          aria-label="Toggle Prayer Times"
          title="Toggle Prayer Times"
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#388e3c")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#4caf50")}
        >
          <FaMosque size={20} />
        </button>

        {/* عرض أوقات الصلاة عند التفعيل */}
        {showPrayer && <PrayerTimes />}

        {/* مسارات التطبيق */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomePage />
                <Azkar />
                <TasbeehCounter />
              </>
            }
          />
          <Route path="/surah/:id" element={<SurahPage />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
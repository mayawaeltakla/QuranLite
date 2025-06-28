import React, { useState, useEffect } from 'react';
import { FaMosque } from 'react-icons/fa';
import './PrayerTimes.css'; // تأكد أنك تجهز ملف CSS الخاص بالتنسيق

const PrayerTimes = () => {
  const [times, setTimes] = useState(null);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState({ city: "دمشق", country: "سوريا" });

  useEffect(() => {
    fetch('https://api.aladhan.com/v1/timingsByCity?city=Damascus&country=SY&method=8')
      .then((response) => response.json())
      .then((data) => {
        setTimes(data.data.timings);
        setDate(data.data.date.hijri.date + " هـ"); // التاريخ الهجري
      });
  }, []);

  if (!times) return <div className="loading">جارٍ تحميل أوقات الصلاة...</div>;

  return (
    <div className="prayer-times-container">
      <h3 className="title"><FaMosque /> أوقات الصلاة - {location.city}, {location.country}</h3>
      <p className="date">{date}</p>
      <ul className="times-list">
        <li><strong>الفجر:</strong> {times.Fajr}</li>
        <li><strong>الشروق:</strong> {times.Sunrise}</li>
        <li><strong>الظهر:</strong> {times.Dhuhr}</li>
        <li><strong>العصر:</strong> {times.Asr}</li>
        <li><strong>المغرب:</strong> {times.Maghrib}</li>
        <li><strong>العشاء:</strong> {times.Isha}</li>
      </ul>
    </div>
  );
};

export default PrayerTimes;
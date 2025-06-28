import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Button, Spinner, Toast } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";


const HomePage = () => {
  const [suras, setSuras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);
  const [playingSura, setPlayingSura] = useState(null);
  const [showToast, setShowToast] = useState({ show: false, message: "" });

  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.quran.gading.dev/surah")
      .then((res) => res.json())
      .then((data) => {
        setSuras(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);


  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);


  const toggleDarkMode = () => setDarkMode((prev) => !prev);


  const addToFavorites = (suraNumber) => {
    if (!favorites.includes(suraNumber)) {
      const updated = [...favorites, suraNumber];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setShowToast({ show: true, message: "تمت إضافة السورة للمفضلة ✅" });
    } else {
      setShowToast({ show: true, message: "السورة موجودة بالمفضلة مسبقًا ⭐️" });
    }
  };


  const handlePlay = (suraNumber) => {
    if (playingSura === suraNumber) {
      audioRef.current.pause();
      setPlayingSura(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }

      const audio = new Audio(
        `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${suraNumber}.mp3`
      );

      audioRef.current = audio;

      audio.play();

      setPlayingSura(suraNumber);

      audio.onended = () => setPlayingSura(null);
    }
  };


  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>جاري تحميل السور...</p>
      </div>
    );
  }


  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <Button variant={darkMode ? "light" : "dark"} onClick={toggleDarkMode}>
          {darkMode ? "الوضع العادي" : "الوضع الليلي"} 🌙
        </Button>

        <h2 className="mb-0">سور القرآن الكريم</h2>

        <div>
          <Link to="/favorites" className="btn btn-outline-warning ms-3">
            ⭐️ المفضلات
          </Link>
        </div>
      </div>

      <Row>
        {suras.map((sura) => (
          <Col key={sura.number} xs={12} md={6} lg={4} className="mb-4">
            <div className="border rounded p-3 shadow-sm h-100 d-flex flex-column justify-content-between">

              <div>
                <h5>{sura.name.long}</h5>
                <p>عدد الآيات: {sura.numberOfVerses}</p>
              </div>

              <div className="d-flex gap-2 flex-wrap">
                <Button
                  variant={playingSura === sura.number ? "danger" : "success"}
                  size="sm"
                  onClick={() => handlePlay(sura.number)}
                >
                  {playingSura === sura.number ? "إيقاف التلاوة" : "تشغيل التلاوة"}
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(`/surah/${sura.number}`)}
                >
                  تفاصيل
                </Button>
<Button
                  variant="warning"
                  size="sm"
                  onClick={() => addToFavorites(sura.number)}
                >
                  ⭐️ أضف للمفضلة
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <Toast
        onClose={() => setShowToast({ show: false, message: "" })}
        show={showToast.show}
        delay={2000}
        autohide
        style={{ position: "fixed", bottom: 20, left: 20, zIndex: 1050 }}
      >
        <Toast.Body>{showToast.message}</Toast.Body>
      </Toast>
    </Container>
  );
};


export default HomePage;
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Spinner, Button, Card, Alert } from "react-bootstrap";

const SurahPage = () => {
  const { id } = useParams();
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [playingAyah, setPlayingAyah] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://api.quran.gading.dev/surah/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSurah(data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("حدث خطأ أثناء تحميل السورة. يرجى المحاولة لاحقًا.");
        setLoading(false);
      });
  }, [id]);

  const playAyah = (audioUrl, ayahNum) => {
    // إذا نفس الآية شغالة، وقفها مع إعادة ضبط الوقت
    if (playingAyah === ayahNum) {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0; // نرجع الصوت لبداية الآية
      }
      setCurrentAudio(null);
      setPlayingAyah(null);
      return;
    }

    // إذا في صوت شغال مختلف، وقف الصوت السابق مع إعادة ضبط الوقت
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const audio = new Audio(audioUrl);
    audio.play();
    setCurrentAudio(audio);
    setPlayingAyah(ayahNum);

    audio.onended = () => {
      setPlayingAyah(null);
      setCurrentAudio(null);
    };
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-2">جاري تحميل السورة...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger" className="text-center">{error}</Alert>
        <div className="text-center">
          <Link to="/" className="btn btn-primary">الرجوع للرئيسية</Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <div className="text-center mb-4">
        <h3>{surah.name.transliteration.ar} - {surah.name.translation.ar}</h3>
        <p>عدد الآيات: {surah.numberOfVerses}</p>
        <Link to="/" className="btn btn-outline-secondary">⬅️ الرجوع للرئيسية</Link>
      </div>

      {surah.verses.map((ayah) => (
        <Card key={ayah.number.inSurah} className="mb-3">
          <Card.Body>
            <Card.Text className="text-end" style={{ fontSize: "1.3rem", fontFamily: "Amiri, serif" }}>
              <strong>﴿ {ayah.text.arab} ﴾</strong>
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <span className="text-muted">الآية {ayah.number.inSurah}</span>
              <Button
                variant={playingAyah === ayah.number.inSurah ? "danger" : "success"}
                size="sm"
                onClick={() => playAyah(ayah.audio.primary, ayah.number.inSurah)}
              >
                {playingAyah === ayah.number.inSurah ? "⏸️ إيقاف" : "🎧 تشغيل الآية"}
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default SurahPage;
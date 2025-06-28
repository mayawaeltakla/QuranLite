import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favoriteSuras, setFavoriteSuras] = useState([]);
  const [allSuras, setAllSuras] = useState([]);

  useEffect(() => {
    fetch("https://api.quran.gading.dev/surah")
      .then((res) => res.json())
      .then((data) => setAllSuras(data.data));

    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteSuras(favs);
  }, []);

  const removeFromFavorites = (number) => {
    const updated = favoriteSuras.filter((n) => n !== number);
    setFavoriteSuras(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const filteredSuras = allSuras
    .filter((sura) => favoriteSuras.includes(sura.number))
    .sort((a, b) => a.number - b.number);

  return (
    <Container className="mt-4">
      <div className="text-center mb-4">
        <h3 className="fw-bold">⭐️ السور المفضلة</h3>
        <Link to="/" className="btn btn-outline-secondary mt-2">⬅️ العودة للرئيسية</Link>
      </div>

      {filteredSuras.length === 0 ? (
        <Alert variant="info" className="text-center">
          لا توجد سور مفضلة حالياً. يمكنك إضافتها من صفحة السور.
        </Alert>
      ) : (
        <Row>
          {filteredSuras.map((sura) => (
            <Col md={6} lg={4} key={sura.number} className="mb-4">
              <div className="border rounded-3 p-4 shadow-sm h-100 bg-light sura-card">
                <h5 className="mb-2">{sura.number}. {sura.name.transliteration.ar}</h5>
                <p className="text-muted">عدد الآيات: {sura.numberOfVerses}</p>
                <div className="d-flex justify-content-between">
                  <Link
                    to={`/surah/${sura.number}`}
                    className="btn btn-sm btn-success"
                  >
                    📖 تفاصيل
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeFromFavorites(sura.number)}
                  >
                    حذف ❌
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Favorites;
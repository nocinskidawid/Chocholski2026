
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const zdjeciaStart = [
  { id: 0, alt: "Tatry", filename: "obraz1.jpg", category: 1, downloads: 35 },
  { id: 1, alt: "Bieszczady", filename: "obraz2.jpg", category: 1, downloads: 43 },
  { id: 2, alt: "Plaża w Łebie", filename: "obraz3.jpg", category: 2, downloads: 12 },
  { id: 3, alt: "Klif w Orzechowie", filename: "obraz4.jpg", category: 2, downloads: 27 },
  { id: 4, alt: "Rynek w Krakowie", filename: "obraz5.jpg", category: 3, downloads: 51 },
  { id: 5, alt: "Spodek w Katowicach", filename: "obraz6.jpg", category: 3, downloads: 19 },
];

function App() {
  const [zdjecia, setZdjecia] = useState(zdjeciaStart);
  const [gory, setGory] = useState(true);
  const [morze, setMorze] = useState(true);
  const [miasto, setMiasto] = useState(true);

  /*****************************************************
   nazwa funkcji:        handlePobierz
   opis funkcji:         Zwiększa o 1 licznik pobrań wybranego zdjęcia.
                         Aktualizuje stan niemutowalnie (map + kopia obiektu).
   parametry:            id - identyfikator zdjęcia do aktualizacji
   zwracany typ i opis:  brak
   autor:                <numer zdającego>
  *****************************************************/
  const handlePobierz = (id) => {
    setZdjecia((prev) =>
      prev.map((z) =>
        z.id === id ? { ...z, downloads: z.downloads + 1 } : z
      )
    );
  };

  const aktywneKategorie = [];
  if (gory) aktywneKategorie.push(1);
  if (morze) aktywneKategorie.push(2);
  if (miasto) aktywneKategorie.push(3);

  const filtrowane = zdjecia.filter((z) =>
    aktywneKategorie.includes(z.category)
  );

  return (
    <div className="container mt-4">
      <h1>Kategorie zdjęć</h1>

      <div className="d-flex gap-4 mb-4">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="gory"
            checked={gory}
            onChange={(e) => setGory(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="gory">
            Góry
          </label>
        </div>

        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="morze"
            checked={morze}
            onChange={(e) => setMorze(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="morze">
            Morze
          </label>
        </div>

        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="miasto"
            checked={miasto}
            onChange={(e) => setMiasto(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="miasto">
            Miasto
          </label>
        </div>
      </div>

      {aktywneKategorie.length === 0 ? (
        <p className="alert alert-warning">Wybierz co najmniej jedną kategorię</p>
      ) : (
        <div className="row">
          {filtrowane.map((z) => (
            <div className="col-md-4 mb-4" key={z.id}>
              <div className="card h-100">
                <img
                  src={`/img/${z.filename}`}
                  className="card-img-top"
                  alt={z.alt}
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src = `https://placehold.co/400x200?text=${encodeURIComponent(z.alt)}`;
                  }}
                />
                <div className="card-body">
                  <h4 className="card-title">Pobrań: {z.downloads}</h4>
                  <button
                    className="btn btn-success"
                    onClick={() => handlePobierz(z.id)}
                  >
                    Pobierz
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
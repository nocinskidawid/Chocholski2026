import { useState } from 'react';

function App() {
  const [zdjecia, setZdjecia] = useState([
    {
      id: 1,
      nazwa: 'Gory',
      kategoria: 1,
      pobrania: 1
    },
    {
      id: 2,
      nazwa: 'Morze',
      kategoria: 1,
      pobrania: 2
    },
    {
      id: 3,
      nazwa: 'Alicja',
      kategoria: 2,
      pobrania: 3
    },
    {
      id: 4,
      nazwa: 'Bob',
      kategoria: 2,
      pobrania: 4
    },
    {
      id: 5,
      nazwa: 'Pies',
      kategoria: 3,
      pobrania: 5
    },
    {
      id: 6,
      nazwa: 'Kot',
      kategoria: 3,
      pobrania: 6
    }
  ]);

  const [krajobrazy, setKrajobrazy] = useState(true);
  const [portrety, setPortrety] = useState(true);
  const [zwierzeta, setZwierzeta] = useState(true);

  const pobierzZdjecie = (id) => {
    setZdjecia(
      zdjecia.map((zdjecie) =>
        zdjecie.id === id
          ? { ...zdjecie, pobrania: zdjecie.pobrania + 1 }
          : zdjecie
      )
    );
  };

  const czyWidocznaKategoria = (kategoria) => {
    if (kategoria === 1) return krajobrazy;
    if (kategoria === 2) return portrety;
    if (kategoria === 3) return zwierzeta;
    return false;
  };

  return (
    <div className="container-fluid">
      <h1>Galeria zdjęć</h1>

      <div className="filtry">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="switchKrajobrazy"
            checked={krajobrazy}
            onChange={() => setKrajobrazy(!krajobrazy)}
          />
          <label className="form-check-label" htmlFor="switchKrajobrazy">
            Krajobrazy
          </label>
        </div>

        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="switchPortrety"
            checked={portrety}
            onChange={() => setPortrety(!portrety)}
          />
          <label className="form-check-label" htmlFor="switchPortrety">
            Portrety
          </label>
        </div>

        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="switchZwierzeta"
            checked={zwierzeta}
            onChange={() => setZwierzeta(!zwierzeta)}
          />
          <label className="form-check-label" htmlFor="switchZwierzeta">
            Zwierzęta
          </label>
        </div>
      </div>

      <div className="galeria">
        {zdjecia.map((zdjecie) => {
          if (!czyWidocznaKategoria(zdjecie.kategoria)) {
            return null;
          }

          return (
            <div className="blok-zdjecia" key={zdjecie.id}>
              <div className="placeholder">
                {zdjecie.nazwa}
              </div>

              <h4>Pobrań: {zdjecie.pobrania}</h4>

              <button
                className="btn btn-primary"
                onClick={() => pobierzZdjecie(zdjecie.id)}
              >
                Pobierz
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const kursy = [
  "Programowanie w C#",
  "Angular dla początkujących",
  "Kurs Django",
  "Tworzenie aplikacji w React",
  "Bazy danych SQL",
];

function App() {
  const [imieNazwisko, setImieNazwisko] = useState("");
  const [numerKursu, setNumerKursu] = useState("");

  /*****************************************************
   nazwa funkcji:        handleZapisz
   opis funkcji:         Obsługuje kliknięcie przycisku zapisu na kurs.
                         Zapobiega przeładowaniu strony, wypisuje imię i nazwisko
                         oraz nazwę kursu (lub komunikat o błędzie) do konsoli.
   parametry:            e - obiekt zdarzenia formularza
   zwracany typ i opis:  brak
   autor:                Daeid Nocinski
  *****************************************************/
  const handleZapisz = (e) => {
    e.preventDefault();
    console.log(imieNazwisko);

    const nr = Number(numerKursu);
    if (nr >= 1 && nr <= kursy.length) {
      console.log(kursy[nr - 1]);
    } else {
      console.log("Nieprawidłowy numer kursu");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Liczba kursów: {kursy.length}</h2>

      <ol>
        {kursy.map((kurs, index) => (
          <li key={index}>{kurs}</li>
        ))}
      </ol>

      <form onSubmit={handleZapisz} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Imię i nazwisko</label>
          <input
            type="text"
            className="form-control"
            value={imieNazwisko}
            onChange={(e) => setImieNazwisko(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Numer kursu</label>
          <input
            type="number"
            className="form-control"
            value={numerKursu}
            onChange={(e) => setNumerKursu(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Zapisz do kursu
        </button>
      </form>
    </div>
  );
}

export default App;
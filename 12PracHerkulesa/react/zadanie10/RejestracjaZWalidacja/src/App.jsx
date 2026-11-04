import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function App() {
  const [form, setForm] = useState({
    login: "",
    email: "",
    haslo: "",
    powtorz: "",
    regulamin: false,
  });
  const [touched, setTouched] = useState({
    login: false,
    email: false,
    haslo: false,
    powtorz: false,
  });
  const [sukces, setSukces] = useState("");

  /*****************************************************
   nazwa funkcji:        waliduj
   opis funkcji:         Sprawdza poprawność pól formularza rejestracji:
                         login (min. 4 znaki, litery i cyfry), e-mail (regex),
                         hasło (min. 8 znaków, wielka litera i cyfra),
                         powtórzenie hasła oraz siłę hasła (4 kryteria).
   parametry:            dane - obiekt stanu formularza { login, email, haslo, powtorz }
   zwracany typ i opis:  obiekt z polami loginOk, emailOk, hasloOk, powtorzOk,
                         sila (0–4), etykieta sily i klasa paska postępu
   autor:                <numer zdającego>
  *****************************************************/
  const waliduj = (dane) => {
    const loginOk = /^[A-Za-z0-9]{4,}$/.test(dane.login);
    const emailOk = emailRegex.test(dane.email);
    const dlugosc = dane.haslo.length >= 8;
    const wielka = /[A-Z]/.test(dane.haslo);
    const cyfra = /\d/.test(dane.haslo);
    const specjalny = /[^A-Za-z0-9]/.test(dane.haslo);
    const hasloOk = dlugosc && wielka && cyfra;
    const powtorzOk = dane.haslo.length > 0 && dane.powtorz === dane.haslo;
    const sila = [dlugosc, wielka, cyfra, specjalny].filter(Boolean).length;

    let etykieta = "słabe";
    let klasaPaska = "bg-danger";
    if (sila >= 4) {
      etykieta = "silne";
      klasaPaska = "bg-success";
    } else if (sila >= 2) {
      etykieta = "średnie";
      klasaPaska = "bg-warning";
    }

    return { loginOk, emailOk, hasloOk, powtorzOk, sila, etykieta, klasaPaska };
  };

  const wynik = waliduj(form);
  const moznaZarejestrowac =
    wynik.loginOk &&
    wynik.emailOk &&
    wynik.hasloOk &&
    wynik.powtorzOk &&
    form.regulamin;

  const zmien = (pole, wartosc) => {
    setSukces("");
    setForm((prev) => ({ ...prev, [pole]: wartosc }));
    if (pole in touched) {
      setTouched((prev) => ({ ...prev, [pole]: true }));
    }
  };

  const klasaPola = (pole, ok) => {
    if (!touched[pole]) return "form-control";
    return `form-control ${ok ? "is-valid" : "is-invalid"}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!moznaZarejestrowac) return;
    console.log({ login: form.login, email: form.email });
    setSukces(`Konto ${form.login} zostało utworzone`);
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card" style={{ maxWidth: "450px", width: "100%" }}>
        <div className="card-body">
          <h2 className="card-title h4 mb-3">Rejestracja</h2>

          {sukces && (
            <div className="alert alert-success" role="alert">
              {sukces}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label" htmlFor="login">
                Login
              </label>
              <input
                id="login"
                type="text"
                className={klasaPola("login", wynik.loginOk)}
                value={form.login}
                onChange={(e) => zmien("login", e.target.value)}
              />
              <div className="invalid-feedback">
                Login musi mieć co najmniej 4 znaki i składać się tylko z liter i cyfr.
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                className={klasaPola("email", wynik.emailOk)}
                value={form.email}
                onChange={(e) => zmien("email", e.target.value)}
              />
              <div className="invalid-feedback">Podaj poprawny adres e-mail.</div>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="haslo">
                Hasło
              </label>
              <input
                id="haslo"
                type="password"
                className={klasaPola("haslo", wynik.hasloOk)}
                value={form.haslo}
                onChange={(e) => zmien("haslo", e.target.value)}
              />
              <div className="invalid-feedback">
                Hasło musi mieć co najmniej 8 znaków, wielką literę i cyfrę.
              </div>

              <div className="mt-2">
                <div className="d-flex justify-content-between">
                  <small>Siła hasła</small>
                  <small className={wynik.sila >= 4 ? "text-success" : wynik.sila >= 2 ? "text-warning" : "text-danger"}>
                    {wynik.etykieta}
                  </small>
                </div>
                <div className="progress" role="progressbar" aria-valuenow={wynik.sila} aria-valuemin={0} aria-valuemax={4}>
                  <div
                    className={`progress-bar ${wynik.klasaPaska}`}
                    style={{ width: `${(wynik.sila / 4) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="powtorz">
                Powtórz hasło
              </label>
              <input
                id="powtorz"
                type="password"
                className={klasaPola("powtorz", wynik.powtorzOk)}
                value={form.powtorz}
                onChange={(e) => zmien("powtorz", e.target.value)}
              />
              <div className="invalid-feedback">Hasła nie są identyczne.</div>
            </div>

            <div className="form-check mb-3">
              <input
                id="regulamin"
                type="checkbox"
                className="form-check-input"
                checked={form.regulamin}
                onChange={(e) => zmien("regulamin", e.target.checked)}
              />
              <label className="form-check-label" htmlFor="regulamin">
                Akceptuję regulamin
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={!moznaZarejestrowac}
            >
              Zarejestruj
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;


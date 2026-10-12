import React, { useState } from 'react';

const App = () => {
  const courses = ["Programowanie w C#", "Angular dla poczatkowych", "Kurs Django", "Tworzenie aplikacji w React", "Bazy danych SQL"];
  const [name, setName] = useState('');
  const [courseNumber, setCourseNumber] = useState('');
  
  // *****************************************************
  // nazwa funkcji: handleSubmit
  // opis funkcji: Obsluguje wysylanie formularza zapisu na kurs, loguje dane do konsoli
  // parametry: e - obiekt zdarzenia
  // zwracany typ i opis: brak
  // autor: 14
  // *****************************************************

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Imie i nazwisko:', name);
    
    const isValidCourse = courseNumber >= 1 && courseNumber <= courses.length;
    if (isValidCourse) {
      console.log('Nazwa kursu:', courses[courseNumber - 1]);
    } else {
      console.log('Nieprawidlowy numer kursu');
    }
  };

  return (
    <div>
      <h2>Liczba kursow: {courses.length}</h2>
      <ol>
        {courses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ol>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Imie i nazwisko</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="courseNumber" className="form-label">Numer kursu</label>
          <input
            type="number"
            id="courseNumber"
            className="form-control"
            value={courseNumber}
            onChange={(e) => setCourseNumber(e.target.value)}
            min="1"
            max={courses.length}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Zapisz do kursu</button>
      </form>
    </div>
  );
};

export default App;

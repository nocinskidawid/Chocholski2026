import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [imie, setImie] = useState("")
  const [numer, setNumer] = useState(0)

  const ksiazki = ["Wiedźmin","Pan Tadeusz","Lalka", "Solaris"]




function funkcja(){

if(numer>0 && numer<ksiazki.length){

console.log("Wypozyczenie: "+imie+ ", ksiazka: " + numer)


}else {
  console.log("Nieprawidlowy numer ksiazki")
}


  }
  return (
    <div style={{padding: 20}}>

    <h2>Dostepne ksiazki: {ksiazki.length}</h2>


    <ol>
    {ksiazki.map((element) => (
      <li>{element}</li>
    ))}
    </ol>



    <div clas="form">
    <label>Imie czytelnika: </label>   <input type="text" id="imie" onChange={(e) => setImie(e.target.value)}/> <br></br>
    <label>Numer ksiazki: </label> <input type="number" id="numer" onChange={(e) => setNumer(e.target.value)}/> <br></br>
    <input type="button" value="Wypozycz" onClick={funkcja}/>


    </div>






    </div>
    
  )
}

export default App

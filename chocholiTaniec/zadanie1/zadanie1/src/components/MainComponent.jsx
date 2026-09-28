import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'

export function MainComponent(props) {

            function Save(){
                const name = document.getElementById("name").value;
                const number = document.getElementById("number").value;
                
                if(number>=1 && number<=props.param1.length){
                    console.log("Zapis: " + name + ", kolko: " + number)
                }
                else{
                    console.log("Nieprawidlowy numer kolka")
                }
                
            }
    return(
            <div style={{padding: 20}} className="Container">
                <h2>Dostepne kolka: {props.param1.length}</h2>

                <ol>
                    {props.param1.map((element) => (
                        <li>{element}</li>
                    ))}
                </ol>


                <form>
                    <div className="form-group row">
                    <label className="col-2 col-form-label"> Imie i nazwisko</label> 
                    <div className="col-10">
                    <input type="text" id="name" className="form-control"/> <br></br>
                    </div>
                    
                    <label className="col-2 col-form-label"> Numer kolka</label>
                    <div className="col-10">
                    <input type="number" id="number" className="form-control"/> <br></br>
                    </div>
                    
                    <div className="d-flex justify-content-center">
                    <input type="button" value={"Zapisz"} onClick={Save} className="btn btn-primary col-1 "/>
                    </div>
                    </div>
                </form>
        </div>
    )
}
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import Todolist from './todolist';


function App() {


  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(false); //este estado se realiza porque la informacion de Fetch demora en llegar.

  const eliminarTarea = () => {

    setLista([])

  }

  useEffect(() => {

    cargarInfo()

  }, []);

  const cargarInfo = () => {
    setLoading(true) //Acá estamos diciendo que está cargando el fetch

    fetch("https://assets.breatheco.de/apis/fake/todos/user/sebastianignacioqa", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }).then(response =>
      response.json())

      .then(data => {

        setLista(data.map(t => t.label));
        setLoading(false);
      })

      .catch(error => console.log(error))
  };


  return (
    <div>
      {loading ? <div className="alert alert-primary" role="alert">
        Cargando la informacion...
      </div> :
        <ul>
          {lista.map((label, indice) => <li key={indice}>{label}</li>)}
        </ul>}
      <button className="btn btn-success" onClick={cargarInfo}>
        Actualizar información
      </button>
      <button className="btn btn-danger" onClick={()=> {eliminarTarea()}}>
        Eliminar tareas
      </button>
      <button className="btn btn-warning" onClick={()=> <Todolist/>}>
      Cargar informacion
      </button>
      
    </div>)

};

export default App;

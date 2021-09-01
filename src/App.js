import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import Todolist from './todolist';


function App() {


  const [lista, setLista] = useState([]);

  const [loading, setLoading] = useState(false); //este estado se realiza porque la informacion de Fetch demora en llegar.

const actualizarLista = () => {   

  fetch('https://assets.breatheco.de/apis/fake/todos/user/sebastianignacioqa', {
    method: "PUT",
    body: JSON.stringify([

        {label: "Probando tareas", done:false},
        
      ]), //Pasamos las tareas
      headers: {
      "Content-Type": "application/json"
    }
  })
  .then(resp => {
      return resp.json(); 
  })
  .then(data => {
      
      console.log(data); 
  })
  .catch(error => {
      
      console.log(error);
  });}

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

  const [tarea, setTarea] = useState ("");

  const handleSubmit = (evento) => {
      
      evento.preventDefault();   
      setTarea(evento.target.value);
      console.log(tarea);
  }
 
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
        <div className="col">
        <input type="text" className="form-control" placeholder="Ingresar tarea aqui" onChange={handleSubmit} value={tarea}/>
        <button type="Submit">Submit</button>
        </div>
        </div>
    </form>

      {loading ? <div className="alert alert-primary" role="alert">
        Cargando la informacion...
      </div> :
        <ul>
          {lista.map((label, indice) => <li key={indice}>{label}</li>)}
          <li>{tarea}</li>
        </ul>}
      <button className="btn btn-success" onClick={cargarInfo}>
        Actualizar información
      </button>
      <button className="btn btn-danger" onClick={()=> {eliminarTarea()}}>
        Eliminar tareas
      </button>
      <button className="btn btn-warning" onClick={()=> {actualizarLista()}} >
        Cargar informacion
      </button>
      
      
    </div>)
    

};

export default App

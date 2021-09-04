import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';


function App() {

  const [lista, setLista] = useState([]);
  const [tarea, setTarea] = useState("");
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    recibirLista()
  }, [])

  useEffect(() => {
    actualizarLista()
  }, []);


  const actualizarLista = () => {
    

    fetch('https://assets.breatheco.de/apis/fake/todos/user/sebastianignacioqa', {
      method: "PUT",
      body: JSON.stringify([
        
        ...lista
      ]), //Pasamos las tareas al fetch
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
      });
  }

  const handleChange = (evento) => {
    setTarea(evento.target.value)
    
  }



  const recibirLista = () => {

    fetch('https://assets.breatheco.de/apis/fake/todos/user/sebastianignacioqa', {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {

        setLista(data);
        setLoading(false)
      })
      .catch(error => {

        console.log(error);
      });
  }




  //const handleKey = (evento) => {
  //let newArray = [
  //...lista, 
  //{label: evento.target.value, done:false},
  //]}

  const handleSubmit = (evento) => {

    evento.preventDefault();
    
  
    const newLista = lista;

    newLista.push({label: tarea, done:false})
    setLista([...newLista])

    console.log(lista)
    setTarea([])
    actualizarLista()

  }

  const eliminarTarea = () => {

    setLista([]);

  }


  return (
    <div className="container">
      <h1>LISTA DE TAREAS</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="col">
            <input type="text" className="form-control" placeholder="Ingresar tarea aqui" onChange={handleChange} value={tarea} />
            
          </div>
        </div>
      </form>

      {loading ? <div className="alert alert-primary" role="alert">
        Cargando la informacion...
      </div> :
        <ul><br></br>
          {lista.map((des, indice) => <li key={indice}>{des.label}</li>)}
        </ul> }
      <button className="btn btn-success" onClick={recibirLista}>
        Actualizar información
      </button>
      <button className="btn btn-danger" onClick={() => { eliminarTarea() }}>
        Eliminar tareas
      </button>
      <button className="btn btn-warning" onClick={() => { actualizarLista() }}  >
        Cargar informacion
      </button>


    </div>)


};

export default App
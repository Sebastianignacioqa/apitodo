import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';


function App() {


  const [lista, setLista] = useState([]);

  useEffect(() => {

    cargarInfo()

  }, []);

    const cargarInfo = () => {

    fetch("https://assets.breatheco.de/apis/fake/todos/user/sebastianignacioqa", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }).then(response =>
      response.json())

      .then(data => 

      setLista(data.map(t => t.label)))

      .catch(error => console.log(error))
    };
  

  return (<ul>
    <li>{lista[0]}</li>
    <li>{lista[1]}</li>
    <li>{lista[2]}</li>
    <li>{lista[3]}</li>
  </ul>)

};

export default App;

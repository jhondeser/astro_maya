import axios from 'axios';
import React, { useEffect, useState } from "react";
import ComponenteHijo from '../Gapur/Gapur'
import "./data.css"

function Data() {
  const path = 'https://api.le-systeme-solaire.net/rest/bodies/'

  const [post, setPost] = React.useState(null);
  const [solar_system_planets,setSolar_system_planets] = useState([]);
  const [sun, setSun] = useState('')

  // hago la petciona  las bases de datos
  useEffect(()=> {
    try {
      const fetchData = async ()=>{
        const result = await axios (
          path
        )
        
        setPost(result.data.bodies)
        
        if (post) {
          console.log(post);
          filtrarYAgregar()
        }
      }
      fetchData();
    } catch (error) {
      console.error('Error al obtener datos de la API', error);
    }
  },[path])

  if (!post) return null;

  //filtro y agrego los nuevos datos

  const filtrarYAgregar = () => {
    // Filtra los elementos según tu criterio
    try {
      console.log(post);

      const criterioFiltro_sun = (elemento) => elemento.englishName == 'Sun';
      const sun = post.filter(criterioFiltro_sun);
      setSun(sun)
      

      const criterioFiltro = (elemento) => elemento.isPlanet == true; // Filtrar planetas
      const solar_system_planets = post.filter(criterioFiltro);

      // Agrega los elementos filtrados al nuevo array
      setSolar_system_planets((prevElementosFiltrados) => [
        ...prevElementosFiltrados,
        ...solar_system_planets,
      ]);

    } catch (error) {
      console.error('Error al filtrar y agregar:', error);
    }
  };

  console.log(solar_system_planets);

  return (
    <div className="Data">
      {solar_system_planets.length > 0 && <ComponenteHijo elementosFiltrados={solar_system_planets} sun={sun}/>}
    </div>
  );
}

export default Data;
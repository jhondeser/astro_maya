import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState,useEffect } from 'react'
import { Canvas, useFrame, ThreeElements} from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import axios from 'axios';

function Group_clicked(){

}

function Moon_data(path) {
  const [moon_data, setmoon_data] = useState('');

  useEffect(()=> {
    try {
      const fetchData = async ()=>{
        const result = await axios (
          path
        )     
        setmoon_data(result.data);
      }

      fetchData();

    } catch (error) {
      console.error('Error al obtener datos de la API', error);
    }
  },[path])

  return moon_data
}

function Box({position, color, args}) {
  const mesh = useRef(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => (mesh.current.rotation.x += delta))

  return (
    <mesh 
      position={position}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <sphereGeometry args={args} />
      <meshStandardMaterial color={hovered ? 'hotpink' : color} />
    </mesh>
  )
}

export default function Gapur({elementosFiltrados, sun}) {

  const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set( 10, 20, 20 );

  const arrayPlanets = elementosFiltrados
  const sun_point = sun[0]

  console.log(sun_point);

  var moon = '';
  var moons = [];
  var actual_moon; 

  // Moon_data(arrayPlanets[1].moons[0].rel)
  

    return (
      <Canvas camera={{position:[7783, 0, 1000000], far: 0x10000000}}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[0, 0, 0]} color = {'yellow'} args={[(sun_point.meanRadius/10), 16, 16]}/>
        {arrayPlanets.map(el => {
          moons = el.moons;

          {console.log(actual_moon)}

          return(
            <group position={el.semimajorAxis/100}>
              {moons != null && (
                moons.map(moon => {
                  moon = Moon_data(moon.rel);
                  if (typeof moon === 'object' && moon !== null) {
                    console.log(moon);
                    return (
                      actual_moon = <Box position={[moon.semimajorAxis/100, 0, 0]} color = {'orange'} args={[moon.meanRadius, 16, 16]}/>
                    )
                  }
                })
              )}
              <Box position={[0, 0, 0]} color = {'blue'} args={[el.meanRadius, 16, 16]}/>
            </group>
          )  
        })}
        <OrbitControls minDistance={500} maxDistance={1000000000}/>
      </Canvas>
    )
}

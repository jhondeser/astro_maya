import * as THREE from 'three'
import React from "react";
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'


export default function Space() {
  return (
    <div className="App">
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <mesh>
          <boxGeometry />
          <dodecahedronGeometry args={[1,2]} />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </div>
  );
}
import React, { useRef , useState, useEffect} from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import {  softShadows, MeshWobbleMaterial,OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import EarthDayMap from "../../assets/textures/8k_earth_specular_map.jpg";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../assets/textures/8k_earth_normal_map.jpg";
import EarthCloudsMap from "../../assets/textures/8k_earth_specular_map.jpg";
import { TextureLoader } from "three";
import axios from "axios";

export function Earth(props) {
  const [ary, setAry] = useState([
    [ 0.009926034333328896, 0.999932588464361, 30998.9366, 'ARSENE' ]
  ])

  useEffect(() => {
    axios.get('https://api-set.onrender.com/location/').then((res) => {setAry(res.data)})
    setInterval(() => {
      axios.get('https://api-set.onrender.com/location/').then((res) => {setAry(res.data)})
    }, 9000)
  }, [])


  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  );
softShadows();

  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  const earthRef = useRef();
  const cloudsRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    earthRef.current.rotation.y = elapsedTime / 150;
    cloudsRef.current.rotation.y = elapsedTime / 150;
  });

  return (
    <>
      <pointLight color="white" position={[2, 0, 2]} intensity={1.2} />
      <ambientLight intensity={1.3} />
      <fog attach="fog" args={['#191920', 90, 90]} />
      <pointLight color="white" position={[2, 9, 30]} intensity={1.2} />
      <mesh ref={cloudsRef} position={[0, 0, 0]}  onPointerOver={(event) => hover(true)} onPointerOut={(event) => hover(false)}>
        <sphereGeometry args={[7, 32, 32]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={hovered ? 0.7: 0.5}
          depthWrite={true}
          transparent={true}
          blur={[600, 100]}
          mixBlur={1}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef} position={[0, 0, 3]}>
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={false}
          zoomSpeed={0.01}
          panSpeed={0.5}
          rotateSpeed={0}
        />
      </mesh>
      {ary.map((data) => {return (
        <mesh ref={specularMap} position={[data[0], data[1], Math.log(data[2], 10)+2]}  onPointerOver={(event) => hover(true)} onPointerOut={(event) => hover(false)}>
        <sphereGeometry args={[0.02, 32, 32]} />
        <meshPhongMaterial
          map={specularMap}
          depthWrite={true}
          color="#FF8080"
          transparent={true}
          blur={[300, 100]}
          mixBlur={1}
          side={THREE.DoubleSide}
        />
      </mesh>
      )})}
      
      {ary.map((data) => {return (
          <mesh ref={specularMap} position={[Math.log10(data[2])+6, data[1],data[0] ]}  onPointerOver={(event) => hover(true)} onPointerOut={(event) => hover(false)}>
          <sphereGeometry args={[0.01, 30, 32]} />
          <meshPhongMaterial
            map={specularMap}
            color="black"
            depthWrite={true}
            transparent={true}
            blur={[300, 100]}
            mixBlur={1}
            side={THREE.DoubleSide}
          />
        </mesh>
      )})}

    {ary.map((data) => {return (
          <mesh ref={specularMap} position={[Math.log10(data[2])+6, data[1]+2,data[0]-3 ]}  onPointerOver={(event) => hover(true)} onPointerOut={(event) => hover(false)}>
          <sphereGeometry args={[0.01, 30, 32]} />
          <meshPhongMaterial
            map={specularMap}
            color="black"
            depthWrite={true}
            transparent={true}
            blur={[300, 100]}
            mixBlur={1}
            side={THREE.DoubleSide}
          />
        </mesh>
      )})}
      {ary.map((data) => {return (
          <mesh ref={specularMap} position={[Math.log10(data[2])+6, data[1]+2,data[0]-1 ]}  onPointerOver={(event) => hover(true)} onPointerOut={(event) => hover(false)}>
          <sphereGeometry args={[0.01, 30, 32]} />
          <meshPhongMaterial
            map={specularMap}
            color="black"
            depthWrite={true}
            transparent={true}
            blur={[300, 100]}
            mixBlur={1}
            side={THREE.DoubleSide}
          />
        </mesh>
      )})}

{ary.map((data) => {return (
          <mesh ref={specularMap} position={[Math.log10(data[2])+5, data[1]-1*Math.random(),data[0]+1 ]}  onPointerOver={(event) => hover(true)} onPointerOut={(event) => hover(false)}>
          <sphereGeometry args={[0.01, 30, 32]} />
          <meshPhongMaterial
            map={specularMap}
            color="black"
            depthWrite={true}
            transparent={true}
            blur={[300, 100]}
            mixBlur={1}
            side={THREE.DoubleSide}
          />
        </mesh>
      )})}


      <mesh ref={specularMap} position={[0, 0, 3]}>
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          zoomSpeed={0.7}
          panSpeed={0.8}
          rotateSpeed={1}
        />
      </mesh>
      
     
    </>
  );
}

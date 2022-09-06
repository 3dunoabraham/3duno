import { useLayoutEffect, useRef, useState } from 'react'

import { useGLTF } from "@react-three/drei";
import { useThree, useFrame } from '@react-three/fiber'

  // maxAzimuthAngle={Math.PI/2}
  //  minAzimuthAngle={-Math.PI/2}
  
const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  // const [mycounter, setCount] = useState(0)
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => {
    // console.log("asd")
    // console.log("asd", camera)
    // setCount(mycounter+1)
    // console.log(mycounter)
    camera.position.z += 0.001
    controls.current.update()
  });
  return (<>
      <orbitControls
        // autoRotate
        ref={controls}
        args={[camera, domElement]}
        enableZoom={true}
        enablePan={false}
        minDistance={4}
        maxDistance={32}
        maxPolarAngle={Math.PI/2 * 1.5}
        minPolarAngle={0}
        />
      </>);
  };

export default CameraControls;
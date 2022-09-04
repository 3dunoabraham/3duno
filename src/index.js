import * as THREE from "three";
import { createRoot } from 'react-dom/client'
import { useRef, useState } from 'react'
import {
	extend,
	Canvas,
	useThree,
	useFrame
} from '@react-three/fiber'
import {
	MeshReflectorMaterial,
	Stars,
	Reflector,
	CameraShake,
	Effects,
	useTexture } from "@react-three/drei";
// import { OrbitControls } from "@react-three/drei";
import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon";
import "./styles.css";

// import AText from "./components/atext";
import { KernelSize } from 'postprocessing'

import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import myFont from "./assets/fonts/helvetiker_bold.typeface.json";

import RenderInBrowser from 'react-render-in-browser';


import { UnrealBloomPass } from 'three-stdlib'



import { EffectComposer, Bloom } from '@react-three/postprocessing'


// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });
extend({ TextGeometry });

extend({ UnrealBloomPass })


function AText() {
	// const [ref,api] = useRef();
    const font = new FontLoader().parse(myFont);

	// useFrame(() => {
	// 	if (!ref.current) {
	// 		return;
	// 	}
	// 	ref.current.rotation.x += 1
	// })

    return(
    <mesh position={[-2,0.15,0]} 
	>
        <textGeometry args={['duno', {font, size:1.2, height: 0.2}]}/>
        <meshLambertMaterial attach='material' color={'gold'}/>
    </mesh>
    )
}

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
		// camera.position.x = Math.sin(mycounter * 0.002 ) * 2
		controls.current.update()
	});
	return (
		<orbitControls
			// autoRotate
		  ref={controls}
		  args={[camera, domElement]}
		  enableZoom={true}
		  minDistance={4}
		  maxDistance={12}
		  maxPolarAngle={Math.PI/2 * 1.5}
		  minPolarAngle={0}
		  />);
	};
	// maxAzimuthAngle={Math.PI/2}
	//  minAzimuthAngle={-Math.PI/2}




		
// function MYText() {
// 	return (
// <mesh position={[0,10,0]}>
//     <textGeometry args={['test', {font, size:5, height: 1}]}/>
//     <meshLambertMaterial attach='material' color={'gold'}/>
// </mesh>
// 	);
// }
function BigBox() {
	const [ref, api] = useBox(() => ({ mass: 0, position: [0, -2, 0], rotation: [0,0,0] }));
	// const [mycounter, setCount] = useState(0)
	// const controls = useRef();

	// useFrame((state) => {
	// 	// console.log("asd")
	// 	// console.log("asd", camera)
	// 	setCount(mycounter+1)
	// 	ref.current.rotation.y = mycounter / 100
	// 	if (controls.current)
	// 		controls.current.update()

	// 	// ref.current.rotation.y = Math.sin(mycounter * 0.002 ) * 2
	// 	// console.log(mycounter)
	// 	// ref.rotation.y = Math.sin(mycounter * 0.002 ) * 2
		
	// });
	return (
		<mesh
			receiveShadow
			ref={ref}
			position={[0, 0, 0]}
		>
			<boxBufferGeometry attach="geometry" args={[3, 1, 3]} />
			<meshStandardMaterial  attach="material" color="#f77b00" />
		</mesh>

	);
}
function Box() {
	const [ref, api] = useBox(() => ({ mass: 1, position: [0, 5, 0], rotation: [0.1, 0.5, 0.11] }));

	// useFrame(() => {
	// 	if (!ref.current) {
	// 		return;
	// 	}
	// 	ref.current.rotation.x += 1
	// })

	return (
		<mesh
			castShadow
			onClick={() => {
				api.velocity.set(0.25, 2, 0.25);
			}}
			ref={ref}
			position={[0, 2, 0]}
		>
			<boxBufferGeometry attach="geometry" />
			<meshStandardMaterial attach="material" color="#14accc" />
		</mesh>
	);
}


function Plane() {
	const [ref] = usePlane(() => ({
		rotation: [-Math.PI / 2, 0, 0],
		position: [0, -10, 0],
	}));
	return (
		<mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}
			receiveShadow
		>
			<planeBufferGeometry attach="geometry" args={[20,20]} />
			<meshStandardMaterial attach="material" color="lightblue" />
		</mesh>
	);
}


const positions = [
	[0, 2, 3],
	[-1, 5, 16],
	[-2, 5, -10],
	[0, 12, 3],
	[-10, 5, 16],
	[8, 5, -10]
  ];
  
  function MyMarble() {
	const [ref] = useSphere(() => ({
	  mass: 10,
	  position: [2, 5, 0]
	}));
  
	return (
	  <mesh ref={ref} castShadow>
		<sphereBufferGeometry
		  attach="geometry"
		  args={[1, 32, 32]}
		></sphereBufferGeometry>
		<meshStandardMaterial color="white" />
	  </mesh>
	);
  }
  
  function MyBox({ position }) {
	const [ref] = useBox(() => ({
	  mass: 10,
	  position: position,
	  args: [2, 2, 2]
	}));
  
	return (
	  <mesh ref={ref} castShadow>
		<boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
		<meshStandardMaterial color="white" />
	  </mesh>
	);
  }
  
  const MyPlane = () => {
	const [ref, api] = usePlane(() => ({
	  mass: 1,
	  position: [0, 0, 0],
	  type: "Static",
	  rotation: [-Math.PI / 2, 0, 0]
	}));
	useFrame(({ mouse }) => {
	  api.rotation.set(-Math.PI / 2 - mouse.y * 0.2, 0 + mouse.x * 0.2, 0);
	});
	return (
	  <mesh scale={200} ref={ref} receiveShadow>
		<planeBufferGeometry />
		<meshStandardMaterial color="white" side={THREE.DoubleSide} />
	  </mesh>
	);
  };
  



createRoot(document.getElementById('root')).render(
	<Canvas shadows>
		{/* <color attach="background" args={["#94ebd8"]} /> */}
		{/* <fog attach="fog" args={["#94ebd8", 0, 40]} /> */}
		{/* <ambientLight intensity={0.1} /> */}
		{/* <directionalLight intensity={0.1} castShadow /> */}
		<spotLight
			castShadow
			intensity={2}
			args={[0xffaa55, 1, 100]}
			position={[3, 4, -3]}
		penumbra={0.5}
		/>
		{/* <spotLight
		castShadow
		intensity={1}
		args={["blue", 1, 100]}
		position={[-1, 4, -1]}
		penumbra={1}
		/> */}



		<mesh
			position={[0, -2, 0]}
		>
			<boxBufferGeometry attach="geometry" args={[5, 1, 5]} />
			<meshStandardMaterial wireframe  attach="material" color="red" />
		</mesh>

          {/* <Bloom kernelSize={3} luminanceThreshold={0} luminanceSmoothing={0.1} intensity={0.3} /> */}


      <RenderInBrowser except chrome>
        <EffectComposer multisampling={4}>
          <Bloom kernelSize={1} luminanceThreshold={0} luminanceSmoothing={0} intensity={0.2} />
        </EffectComposer>
      </RenderInBrowser>


		{/*<EffectComposer multisampling={4}>
          <Bloom kernelSize={1} luminanceThreshold={0} luminanceSmoothing={0} intensity={0.2} />
        </EffectComposer>*/}

{/* <Effects disableGamma>
        <unrealBloomPass threshold={1} strength={1.0} radius={0.5} />
      </Effects> */}

		<CameraControls />
		{/* <OrbitControls /> */}
		<Stars />
		<ambientLight intensity={0.5} />
		{/* <spotLight position={[10, 15, 10]} angle={0.3} /> */}
			{/* <MYText /> */}

		<AText />
		
		<Physics>
			<Box />
			<Plane />
			{/* <APlane /> */}
			<BigBox />
		</Physics>
	</Canvas>
);
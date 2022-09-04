import * as THREE from "three";
import { createRoot } from 'react-dom/client'
import { useRef, useState, useLayoutEffect, Suspense  } from 'react'
import {
	extend,
	Canvas,
	useThree,
	useLoader,
	useFrame
} from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import {
	MeshReflectorMaterial,
	Stars,
	Reflector,
	useGLTF,
	CameraShake,
	Effects,
	useTexture } from "@react-three/drei";
// import { OrbitControls } from "@react-three/drei";
import { Physics, Debug , useBox, usePlane, useSphere } from "@react-three/cannon";
import "./styles.css";

// import AText from "./components/atext";
import { KernelSize } from 'postprocessing'

import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import myFont from "./assets/fonts/helvetiker_bold.typeface.json";

import RenderInBrowser from 'react-render-in-browser';


import { UnrealBloomPass } from 'three-stdlib'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'


import SimpleModal from './components/modal-simple'

import { EffectComposer, Bloom } from '@react-three/postprocessing'

// import Model from './components/aModel'

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });
extend({ TextGeometry });

extend({ UnrealBloomPass })

// function TheObject() {
//   const obj = useLoader(OBJLoader, '/ngirls	.obj')
//   return <primitive object={obj} />
// }

const smallboxes = [
  [-0.7, 25, 0.5],
  [-0.35, 21, 0.26],
  [0.25, 37, 0.6],
  [0.15, 17, 0.1],
  // [-0.7, 15, 0.5],
  // [0.55, 17, 0.6],
];

function BasketballCourt(props) {
  const { scene } = useGLTF('/text.glb')
  useLayoutEffect(() => scene.traverse(o => o.isMesh && (o.receiveShadow = true)), [])


	const [mycounter, setCount] = useState(0)
	const ref = useRef();
	useFrame(() => {
		if (!ref.current) {
			return;
		}
		setCount(mycounter+1)
		// console.log(mycounter)
		// camera.position.x = Math.sin(mycounter * 0.002 ) * 2
		ref.current.rotation.z = Math.cos(mycounter * 0.004 ) / 1.5
	})

  return <primitive ref={ref} position={[0,1,-2]} scale={[0.6,0.6,0.6]} rotation={[3.14/2,0,0]}  object={scene}  {...props} />
}

function AModalButton() {
  const [show, setShow] = useState(false)
  return (
  	<div style={{position:"absolute", zIndex:"999"}} >
  {!show && <button className="btn" type="button" onClick={() => setShow(true)}>
    ?
  </button>}
      <SimpleModal show={show} setShow={setShow}>
        <p style={{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
        	<h3 style={{margin:0,color: "#ffae40"}}>General Artist</h3>
        	<span style={{padding: "0 20px"}}>&</span>
        	<h3 style={{margin:0,color: "#78ced3"}}>Programmer</h3>
    	</p>
        <p>Modeling, Sculpting, Texturing, Rigging & Animation (<small>Characters, Motion Graphics, Real State, Games, Films</small>)</p>
        
        <small> Full-Stack Software Design and 3D Web Development</small>
        <hr/>

        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"flex-end",alignItems:"flex-end",alignSelf:"flex-end",flexDirection:"column"}}>
            <a href="https://duno.vercel.app/" target="_blank">
            	<small>
            		Last Projects
        		</small>
    		</a>

            <a href="https://dunoabraham.artstation.com/" target="_blank">
            	<small>
            		Artstation | <small>@dunoabraham</small>
        		</small>
    		</a>
            <a href="https://www.instagram.com/3duno/" target="_blank">
            	<small>
            		Instagram | <small>@3duno</small>
        		</small>
    		</a>
            <a href="https://www.youtube.com/channel/UC0A0qWopy-2BnqYvFoENkug" target="_blank">
            	<small>
            		Youtube | <small>@3duno</small>
        		</small>
    		</a>
    		<a href="https://abrahamduno.vercel.app/cv.pdf" target="_blank" style={{opacity:"0.35"}}>
            	<small>
        			CV.PDF
        		</small>
    		</a>
  		</div>
      </SimpleModal>
  	</div>
  )
}
function AObject() {
	// const [ref,api] = useRef();
	  const gltf = useLoader(GLTFLoader, './text.glb')

	const [mycounter, setCount] = useState(0)
	const ref = useRef();
	useFrame(() => {
		if (!ref.current) {
			return;
		}
		setCount(mycounter+1)
		// console.log(mycounter)
		// camera.position.x = Math.sin(mycounter * 0.002 ) * 2
		ref.current.rotation.z = Math.cos(mycounter * 0.005 ) / 3
	})

    return(
	    <Suspense fallback={null}>
	      <primitive castShadow receiveShadow ref={ref} object={gltf.scene} position={[0,1,-10]} rotation={[3.14/2,0,0]} scale={[2,2,2]} />
	    </Suspense>
    )
}

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
		  enablePan={false}
		  minDistance={4}
		  maxDistance={32}
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
	const [ref, api] = useBox(() => ({ mass: 0, position: [0, -2, 0], rotation: [0,0,0], args:[2, 1, 2]}));
	// const [mycounter, setCount] = useState(0)
	// const controls = useRef();

	useFrame((state) => {
	// 	// console.log("asd")
	// 	// console.log("asd", camera)
	// 	setCount(mycounter+1)
	// 	ref.current.rotation.y = mycounter / 100
	// 	if (controls.current)
	// 		controls.current.update()

	// 	// ref.current.rotation.y = Math.sin(mycounter * 0.002 ) * 2
	// 	// console.log(mycounter)
	// 	// ref.rotation.y = Math.sin(mycounter * 0.002 ) * 2
		
	});

	return (
		<mesh
			castShadow
			receiveShadow
			ref={ref}
			position={[0, 0, 0]}
			onClick={() => {
				api.rotation.set(0.3, 0, -0.2);
			}}
		>
			<boxBufferGeometry attach="geometry" args={[2, 1, 2]} />
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
			receiveShadow
			castShadow
			onClick={() => {
				api.velocity.set(-0.25, 2, -0.25);
			}}
			ref={ref}
			position={[0, 2, 0]}
		>
			<boxBufferGeometry attach="geometry" />
			<meshStandardMaterial attach="material" color="#14accc" />
		</mesh>
	);
}

function SmallBox() {
	const [ref, api] = useBox(() => ({ mass: 0.1, position: [0, 8, 0], args:[0.5,0.5,0.5] }));

	 useFrame(({ mouse }) => {
	     api.rotation.set(-mouse.y * 0.01, mouse.x * 0.8,0);
	 });
		 // api.velocity.set(0,0,0);
	     // api.position.set(mouse.x,mouse.y,0);
	     // api.rotation.set(-Math.PI / 2 - mouse.y * 0.2, 0 + mouse.x * 0.2, 0);
	// useFrame(() => {
	// 	if (!ref.current) {
	// 		return;
	// 	}
	// 	ref.current.rotation.x += 1
	// })

	return (
		<mesh
			receiveShadow
			castShadow
			onClick={() => {
				api.velocity.set(-0.25, 4, -0.25);
			}}
			ref={ref}
			position={[0, 2, 0]}
		>
			<boxBufferGeometry attach="geometry" args={[0.5,0.5,0.5]} />
			<meshStandardMaterial attach="material" color="#14accc" />
		</mesh>
	);
}
function SmallBox2({position}) {
	const [ref, api] = useBox(() => ({ mass: 0.001, position: position, args:[0.2,0.2,0.2],rotation: position }));

	return (
		<mesh
			receiveShadow
			castShadow
			ref={ref}
			position={position}
		>
			<boxBufferGeometry attach="geometry" args={[0.2,0.2,0.2]} />
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
  
//  const MyPlane = () => {
//  const [ref, api] = usePlane(() => ({
//      mass: 1,
//      position: [0, -20, 0],
//      type: "Static",
//      rotation: [-Math.PI / 2, 0, 0]
//  }));
//  useFrame(({ mouse }) => {
//      api.rotation.set(-Math.PI / 2 - mouse.y * 0.2, 0 + mouse.x * 0.2, 0);
//  });
//  return (
//      <mesh scale={50} ref={ref} receiveShadow>
//    	     <planeBufferGeometry />
//    	     <meshStandardMaterial color="white" side={THREE.DoubleSide} />
//       </mesh>
//  );
//  };
  



createRoot(document.getElementById('root')).render(
	<div >
	<AModalButton />
  
	<Canvas style={{width:"100vw",height:"100vh"}} shadows>
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

		<spotLight
			castShadow
			intensity={0.75}
			args={[0x55aaff, 1, 100]}
			position={[-3, 4, -3]}
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
	    <Suspense fallback={null}>
			{/*<AObject />*/}
	    </Suspense>


	      {/*<TheObject />*/}

		<BasketballCourt/>
		<Physics >

        {smallboxes.map((position, idx) => (
          <SmallBox2 position={position} key={idx} />
        ))}

			<SmallBox />
			<Box />
			{/* <Plane /> */}
			{/* <MyPlane /> */}
			<BigBox />
		</Physics>
	</Canvas>
	</div>
);
import { createRoot } from 'react-dom/client'
import { useRef, useState, Suspense  } from 'react'
import RenderInBrowser from 'react-render-in-browser';

import * as THREE from "three";
import { extend, Canvas, useThree, useLoader, useFrame } from '@react-three/fiber'
import { MeshReflectorMaterial, Stars, Reflector, useGLTF, CameraShake, Effects, useTexture } from "@react-three/drei";
import { Physics, Debug , useBox, usePlane, useSphere } from "@react-three/cannon";
import { UnrealBloomPass } from 'three-stdlib'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { KernelSize } from 'postprocessing'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import TextGLB from './components/text-glb'
import CameraControls from './components/camera-controls'
import PlaneSimple from './components/plane-simple'
import ObjSimple from './components/obj-simple'
import SimpleModal from './components/modal-simple'
import "./styles.css";

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });
extend({ UnrealBloomPass })

function AModalButton() {
  const [show, setShow] = useState(false)
  return (
  	<div style={{position:"absolute", width:"100%", zIndex:"999", }} >

	  {!show && <button style={{boxShadow:"-25px 25px 100px #99000033",borderRadius: "0 0 0 10px",position:"absolute",right:"0",top:"0"}} className="btn" type="button" onClick={() => setShow(true)}>
	    ?
	  </button>}
      <SimpleModal show={show} setShow={setShow}>
        <div style={{paddingBottom:"20px",display:"flex",flexWrap:"wrap",justifyContent:"flex-end",alignItems:"flex-end",alignSelf:"flex-end",flexDirection:"column"}}>
    		{<a href="https://tresweb.vercel.app/cv.pdf" target="_blank" style={{opacity:"0.35"}}>
            	<small>
        			CV.PDF
        		</small>
    		</a>}
  		</div>
      </SimpleModal>
  	</div>
  )
}
function SceneWrapper() {
  const [scene, setScene] = useState("home")
  return (
  	<>
  		<CameraControls />

	    <Suspense fallback={null}>
			<TextGLB/>
	    </Suspense>
  	</>
  )
}

const smallboxes = [
  [-0.7, 29, 0.1],
  [-0.21, 43, 0],
  [0.35, 21, 0.5],
  // [-0.7, 15, 0.5],
  // [0.55, 17, 0.6],
];
	
function BigBox() {

	const smallBox = {
		pos: [-0.1, 16, -0.2],
		args: [0.5,0.5,0.5],
		rot: [0.31,0.2,0.15],
	}
	const box = {
		pos: [0, 5, 0],
		args: [1,1,1],
		rot: [0.1, 0.5, 0.11],
	}
	const bigBox = {
		pos: [0, -2, 0],
		args: [2, 1, 2],
		rot: [0,0,0],
	}
	const [smallref, smallapi] = useBox(() => ({ mass: 150, position: smallBox.pos, args: smallBox.args, rotation: smallBox.rot }));
	const [ref, api] = useBox(() => ({ mass: 1000, position: box.pos, rotation: box.rot, args: box.args, }));
	const [bigref, bigapi] = useBox(() => ({ mass: 0, position: bigBox.pos, args: bigBox.args,rotation: bigBox.rot  }));
	const redframe = useRef();

	// const [mycounter, setCount] = useState(0)

	 useFrame(({ mouse }) => {
	 	if (mouse.x > 0.33 && mouse.y > 0.33)
	 	{
			bigapi.velocity.set(0,(mouse.x+mouse.y)*0.5,0);
			if (redframe.current) redframe.current.rotation.y += (mouse.x+mouse.y)*0.001
	 	} else {
			bigapi.velocity.set(0,0,0);
	 	}
	 	// console.log(mouse.y)
	     // smallapi.rotation.set(0, mouse.x * 0.8,0);
	     // smallapi.rotation.set(-mouse.y * 0.01, mouse.x * 0.8,0);
	     // smallapi.rotation.set(0,0,0);
	 });

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

	return (<>
		<mesh position={[0, -2, 0]} ref={redframe}>
			<boxBufferGeometry attach="geometry" args={[5, 1, 5]} />
			<meshStandardMaterial wireframe  attach="material" color="red" />
		</mesh>
		<mesh
			ref={smallref}
			position={smallBox.pos}
			rotation={smallBox.rot}
			receiveShadow
			castShadow
			onClick={() => {
				smallapi.velocity.set(-0.25, 4, -0.25);
			}}
		>
			<boxBufferGeometry attach="geometry" args={smallBox.args} />
			<meshStandardMaterial attach="material" color="#14accc" />
		</mesh>
		<mesh
			ref={ref}
			position={box.pos}
			rotation={box.rot}
			receiveShadow
			castShadow
			onClick={() => {
				api.velocity.set(-0.25, 2, -0.25);
			}}
		>
			<boxBufferGeometry attach="geometry" />
			<meshStandardMaterial attach="material" color="#14accc" args={box.args}/>
		</mesh>
		<mesh
			ref={bigref}
			position={bigBox.pos}
			rotation={bigBox.rot}
			castShadow
			receiveShadow
			onClick={() => {
				// bigapi.velocity.set(0,10,0);
				// api.rotation.set(0.3, 0, -0.2);
			}}
		>
			<boxBufferGeometry attach="geometry" args={bigBox.args} />
			<meshStandardMaterial  attach="material" color="#f77b00" />
		</mesh>
	</>);
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
			<meshStandardMaterial attach="material" color="#11ce83" />
		</mesh>
	);
}






createRoot(document.getElementById('root')).render(
	<div >
	<AModalButton />
  
	<Canvas style={{width:"100vw",height:"100vh"}} shadows>
		<SceneWrapper />
		

		<Stars />
		{/* <color attach="background" args={["#94ebd8"]} /> */}
		{/* <fog attach="fog" args={["#94ebd8", 0, 40]} /> */}
		<ambientLight intensity={0.5} />
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
	    <RenderInBrowser except chrome>
	        <EffectComposer multisampling={4}>
	            <Bloom kernelSize={1} luminanceThreshold={0} luminanceSmoothing={0} intensity={0.2} />
	        </EffectComposer>
	    </RenderInBrowser>

		<Physics >
		    <Suspense fallback={null}>
		        {smallboxes.map((position, idx) => (
		          <SmallBox2 position={position} key={idx} />
		        ))}
				{/* <PlaneSimple /> */}
	    	</Suspense>
			<BigBox />
		</Physics>
	</Canvas>
	</div>
);
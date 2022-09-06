import { useLayoutEffect, useRef, useState } from 'react'

import { useFrame } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei";

const TextGLB = (props) => {
  const { scene } = useGLTF('/text.glb')
  useLayoutEffect(() => scene.traverse(o => o.isMesh && (o.receiveShadow = true)), [])

  const [mycounter, setCount] = useState(0)
  const ref = useRef();

  // useFrame(({ mouse }) => {
  //    if (mouse.x > 0.33 && mouse.y > 0.33)
  //    {
  //     bigapi.velocity.set(0,(mouse.x+mouse.y)*0.5,0);
  //    } else {
  //     bigapi.velocity.set(0,0,0);
  //    }
  //    // console.log(mouse.y)
  //      // smallapi.rotation.set(0, mouse.x * 0.8,0);
  //      // smallapi.rotation.set(-mouse.y * 0.01, mouse.x * 0.8,0);
  //      // smallapi.rotation.set(0,0,0);
  //  });


  useFrame(({ mouse }) => {
    if (!ref.current) {
      return;
    }
    setCount(mycounter+1)
    // console.log(mycounter)
    // camera.position.x = Math.sin(mycounter * 0.002 ) * 2
    ref.current.rotation.z = ( Math.cos(mycounter * 0.004 ) / 1.5 ) - ( mouse.x * 0.5 )
  })

  return <primitive ref={ref}
            onClick={() => {
              console.log(ref)
            }}
            position={[0,1,-2]}
            scale={[0.6,0.6,0.6]}
            rotation={[3.14/2,0,0]}
            object={scene}
             {...props} 
          />
}

export default TextGLB

import { extend } from '@react-three/fiber'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import myFont from "../assets/fonts/helvetiker_bold.typeface.json";

extend({ TextGeometry })

export default function AText() {
    const font = new FontLoader().parse(myFont);

    return(
    <mesh position={[-2,-0.5,0]}>
        <textGeometry args={['duno', {font, size:1.2, height: 0.2}]}/>
        <meshLambertMaterial attach='material' color={'gold'}/>
    </mesh>
    )
}
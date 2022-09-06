import { useLoader } from "@react-three/fiber";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

function ObjSimple() {
  const obj = useLoader(OBJLoader, '/ngirls  .obj')
  return <primitive object={obj} />
}


export default ObjSimple

import * as THREE from 'three';
import { getMainTextConfig, getTextConfig } from './titlename.js';
import THREE_OBJLOADER from './THREE_OBJLoader.js';

const lerp = (x, y, a) => x * (1 - a) + y * a;

let totalTimeElapsed = 0
let tRate = 0.5
let container;
let camera, scene, raycaster, renderer;

let INTERSECTED;
let CLICKED;
let colors;
let SELECTED;
let light;
let theta = 0;

const pointer = new THREE.Vector2();
const radius = 100;

let orange = false;
let orangeLevel = 0;
let orangeDOM;

let desire = [];

init();
animate();

function init() {
    const THREE_FontLoader = new THREE.FontLoader();
    const THREE_OBJLoader = new THREE_OBJLOADER();


    var closes = document.querySelectorAll('.selfCloseButton')
    closes.forEach(function(adombutton) {
        adombutton.onclick = function(e) {
        console.log("e.currentTarget.parentNode.parentNode",e.currentTarget.parentNode.parentNode.parentNode)
        e.currentTarget.parentNode.parentNode.parentNode.classList.toggle("none")
        }
    })
    var sceness = document.querySelectorAll('.scene-goto')
    sceness.forEach(function(adomscene) {
        adomscene.onclick = function(e) {
            let theIndex = parseInt(e.currentTarget.id.replace("scene",""))
            console.log("CLICKED DOM BUTTON", theIndex)
            SELECTED =  {...scene.children[theIndex+1]}
            CLICKED =   {...scene.children[theIndex+1]}
            INTERSECTED =   {...scene.children[theIndex+1]}
            
            camera.lookAt(
                SELECTED.position.x + colors[theIndex].camera.lookAt[0],
                SELECTED.position.y + colors[theIndex].camera.lookAt[1],
                SELECTED.position.z + colors[theIndex].camera.lookAt[2]
            )

            let indexByZPos = -(Math.floor(CLICKED.position.z/90))
            var sceness = document.querySelectorAll('.amodalscreen')
            sceness.forEach(function(adomscene) {
                if ("modal"+indexByZPos != adomscene.id)
                {
                    adomscene.className += " none"
                } else {
                    // console.log(adomscene)
                }
            })
            if ( document.getElementById("modal"+indexByZPos) )
            {
                document.getElementById("modal"+indexByZPos).classList.toggle("none")
            }
        }
    });


    container = document.createElement( 'div' );
    // orangeDOM = document.createElement( 'div' );
    // orangeDOM.className = "orangeDOM"
    // container.appendChild( orangeDOM );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 120, window.innerWidth / window.innerHeight, 0.1, 10000 );
    // camera.position.y = 30
    camera.position.z = 50
    camera.lookAt(0,0,0)

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x111111 );

    light = new THREE.PointLight( 0xffffff, 1, 100 );
    light.position.set( 0, 10, 20 );
    light.castShadow = true;           
    scene.add( light );

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    colors = [
        {
            img:"./img/wp2100821-1187062037.jpg",
            wireframe:false,
            camera:{pos:[20 ,5,15],lookAt:[0,0,0]},
            box:{pos:[0,0,0],scale:[5,2,1],rot:[0,0,0],},
            color:0xff9999,
        },
        {
            img:"./img/grrrid.jpg",
            wireframe:false,
            camera:{pos:[40 ,5,-27],lookAt:[0,14,0]},
            box:{pos:[22, -14,0],scale:[2,0.1,6],rot:[0,0,(3.14/4)*3],},
            color:0xff9999,
        },
        {
            img:"./img/th-1084040338.jpg",
            wireframe:false,
            camera:{pos:[0 ,-1,0],lookAt:[0,0,0]},
            box:{pos:[0,10,0],scale:[7,7,0.3],rot:[0,0,0],},
            color:0xffcc99,
        },
        {
            img:"./img/th-813177686.jpg",
            wireframe:false,
            camera:{pos:[-25,-15,-10],lookAt:[0,0,0]},
            box:{pos:[0,0,0],scale:[1,2,1],rot:[0.0,0,0],},
            color:0xffff99,
        },
        {
            img:"./img/grad5.jpg",
            wireframe:false,
            camera:{pos:[0,-30,50],lookAt:[0,0,0]},
            box:{pos:[0,40,-50],scale:[7,0.5,4.6],rot:[0,0,0],},
            color:0xccff99,
        },
        {
            img:"./img/grad6.jpg",
            wireframe:false,
            camera:{pos:[0,  50,0],lookAt:[0,0,0]},
            box:{pos:[0,80,0],scale:[1,1,1],rot:[0,0,0],},
            color:0x99ffcc,
        },
    ]

    THREE_OBJLoader.load( './models/camera.obj', function ( object ) {
        object.scale.set(6,6,6)
        object.rotation.x = Math.PI / 8
        object.rotation.y += Math.PI / 4 * 1.6
        object.position.set(-24, -3, -168)
        object.castShadow = true

        object.traverse( function (child)
        {
            if ( child instanceof THREE.Mesh )
            {
                child.material = new THREE.MeshLambertMaterial({ color: 0xffaa00 })
            }
        });
        scene.add( object );
    } );
    THREE_OBJLoader.load( './models/building1.obj', function ( object ) {
        object.scale.set(0.005,0.005,0.005)
        object.position.set(24, -280, -40)
        object.castShadow = true

        object.traverse( function (child)
        {
            if ( child instanceof THREE.Mesh )
            {
                child.material = new THREE.MeshLambertMaterial({ color: 0x666666 })
            }
        });
        scene.add( object );
    } );
    THREE_OBJLoader.load( './models/city1.obj', function ( object ) {
        object.scale.set(0.0015,0.0015,0.0015)
        object.rotation.y -= Math.PI / 3
        object.position.set(-5, 40.5, -410)
        object.castShadow = true

        object.traverse( function (child)
        {
            if ( child instanceof THREE.Mesh )
            {
                child.material = new THREE.MeshLambertMaterial({ color: 0xcccccc })
            }
        })
        scene.add( object );
    } );
    THREE_OBJLoader.load( './models/city1.obj', function ( object ) {
        object.scale.set(0.0015,0.0015,0.0015)
        object.rotation.z -= Math.PI
        object.position.set(-5, 39.5, -410)
        object.castShadow = true

        object.traverse( function (child) { if ( child instanceof THREE.Mesh )
            { child.material = new THREE.MeshLambertMaterial({ color: 0xcccccc }) }
        });
        scene.add( object );
    } );


    THREE_FontLoader.load( 'fonts/helvetiker_bold.typeface.json', function ( font ) {
        let textgeometry = new THREE.TextGeometry( '3duno', getMainTextConfig(font) );
        const textobject = new THREE.Mesh( textgeometry, new THREE.MeshLambertMaterial( { color: 0xffffff } ) );
        textobject.position.set(-20,-5,15)
        scene.add( textobject );
    } );
    THREE_FontLoader.load( 'fonts/helvetiker_bold.typeface.json', function ( font ) {
        let textgeometry = new THREE.TextGeometry( `
            Modeling & Rendering for:

            Characters & People
            Games & Films
            Products & Motion Graphics
            Prototyping & Fashion
            Unbuilt Spaces & Real State`, getTextConfig(font,2.2,0.2));
        const textobject = new THREE.Mesh( textgeometry, new THREE.MeshLambertMaterial( { color: 0xffffff } ) );
        textobject.position.set(-15,12,-42)
        textobject.rotation.y = Math.PI/2
        scene.add( textobject );
    } );
    THREE_FontLoader.load( 'fonts/helvetiker_bold.typeface.json', function ( font ) {
        let textgeometry = new THREE.TextGeometry( `
            We Do:

            Scripting & Storyboard
            Design & Modeling & Sculpting
            Texturing & Lighting & Animation
            Rendering & Compositing
            Audio & Video Editig
            3D Website Development`, getTextConfig(font,1.25,0.2));
        const textobject = new THREE.Mesh( textgeometry, new THREE.MeshLambertMaterial( { color: 0xffffff } ) );
        textobject.position.set(-27,10,-175)
        scene.add( textobject );
    } );
    THREE_FontLoader.load( 'fonts/helvetiker_bold.typeface.json', function ( font ) {
            let textgeometry = new THREE.TextGeometry(
                `
                We use Blender,
                ZBrush & Sculptris
                GIMP, PS, AE
                Mixamo, Cinema 4D,
                Three.js (WebGL)
                React, Vue, Web3`, getTextConfig(font,1.9,0.2));
            const textobject = new THREE.Mesh( textgeometry, new THREE.MeshLambertMaterial( { color: 0xffffff } ) );
            textobject.position.set(-28,-5,-290)
            textobject.rotation.y = -Math.PI/4
            scene.add( textobject );
    } );
    THREE_FontLoader.load( 'fonts/helvetiker_bold.typeface.json', function ( font ) {
        let textgeometry = new THREE.TextGeometry( `
            About Us
            `, getTextConfig(font,3,0.2));
        const textobject = new THREE.Mesh( textgeometry, new THREE.MeshLambertMaterial( { color: 0xffffff } ) );
        textobject.position.set(-50,66,-420)
        scene.add( textobject );
    } );


    for ( let i = 0; i < 5; i ++ ) {
        const geometry = new THREE.BoxGeometry( colors[i].box.scale[0],colors[i].box.scale[1],colors[i].box.scale[2] );
        const object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial({ wireframe: colors[i].wireframe, map: THREE.ImageUtils.loadTexture(colors[i].img) }) );
        object.position.set( colors[i].box.pos[0], colors[i].box.pos[1], (-90*i) + colors[i].box.pos[2] )
        object.rotation.set( colors[i].box.rot[0],colors[i].box.rot[1],colors[i].box.rot[2])
        object.scale.set(10 , (10 - i*2 < 1) ? 1 : 10 - i*2 , 10)
        scene.add( object );

    }

    raycaster = new THREE.Raycaster();

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    document.addEventListener( 'mousemove', onPointerMove );
    window.addEventListener( 'resize', onWindowResize );
}

function onWindowResize()
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onPointerMove( event )
{
    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function animate()
{
    totalTimeElapsed += 1
    requestAnimationFrame( animate );

    render();
}

function render()
{
    if (orange)
    {
        console.log("INTERSECTED raytrace")
        let asd = parseInt(INTERSECTED.id)

        orangeLevel += asd
        // orangeDOM.innerHTML = orangeLevel
    }

    theta += tRate;
    tRate += 0.0001;

    camera.updateMatrixWorld();

    // find intersections
    if (INTERSECTED && INTERSECTED.position.y < 0)
    {
        // INTERSECTED.position.y = INTERSECTED.position.y < 0 ? INTERSECTED.position.y + 0.2  : 0
    }

    raycaster.setFromCamera( pointer, camera );

    const intersects = raycaster.intersectObjects( scene.children, false );
    if ( intersects.length > 0 ) {

        if ( INTERSECTED != intersects[ 0 ].object ) {

            if ( INTERSECTED )
            {
                INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
            }

            INTERSECTED = intersects[ 0 ].object;
            if (INTERSECTED.id > 10 && INTERSECTED.id <= 21)
            {
                orange = true
            }
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex( 0x550000 );
        }
    } else {
        if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
        if (orange)
        {
            orangeLevel -= parseInt(orangeLevel / 2)
            // orangeDOM.innerHTML = orangeLevel
        }
        orange = false
        
        INTERSECTED = null;
    }

    if (SELECTED)
    {
        light.position.z = lerp(light.position.z,SELECTED.position.z+20,0.05)
        camera.position.z = lerp(
            camera.position.z,
            SELECTED.position.z + 26+(colors[-(Math.floor(SELECTED.position.z/90))] ?
            colors[-(Math.floor(SELECTED.position.z/90))].camera.pos[2] : 0 ),
            0.25
        )
        if (colors[-(Math.floor(SELECTED.position.z/90))])
        {
            camera.position.x = lerp(camera.position.x ,colors[-(Math.floor(SELECTED.position.z/90))].camera.pos[0],.05)
            camera.position.y = lerp(camera.position.y ,colors[parseInt(-(Math.floor(SELECTED.position.z/90)))].camera.pos[1],.05)
        }
        camera.lookAt( SELECTED.position.x, SELECTED.position.y+colors[parseInt(-(Math.floor(SELECTED.position.z/90)))].camera.lookAt[1], SELECTED.position.z   );
    }
    camera.position.y = camera.position.y+ Math.sin(totalTimeElapsed/20)/80
    renderer.render( scene, camera );

}

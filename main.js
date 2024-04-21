import * as THREE from 'three';
import vertexShaderSource from './shaders/vertex.glsl';
import fragmentShaderSource from './shaders/fragment.glsl';
import atmosphereFragmentSource from './shaders/atmosphereFragment.glsl';
import atmosphereVertexSource from './shaders/atmosphereVertex.glsl';
import atmosphereGlowFragmentSource from './shaders/atmosphereGlowFragment.glsl';
import atmosphereGlowVertexSource from './shaders/atmosphereGlowVertex.glsl';


document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('mainDeal');
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

    // Set renderer size
    let w = innerWidth;
    let h = innerHeight;
    renderer.setSize(w, h);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create shader material with imported shader sources
    // const shaderMaterial = new THREE.ShaderMaterial({
    //     vertexShader: vertexShaderSource,
    //     fragmentShader: fragmentShaderSource,
    //     uniforms: {
    //         globeTexture: {
    //             value: new THREE.TextureLoader().load('./map/8k_mars.jpg')
    //         }
    //
    //     }
    // });

    // Create a sphere and add it to the scene with the shader material
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50), new THREE.ShaderMaterial({
        vertexShader: vertexShaderSource,
        fragmentShader: fragmentShaderSource,
        uniforms: {
            globeTexture: {
                value: new THREE.TextureLoader().load('./map/8k_earth_daymap.jpg')
            }

        }
    }));

    const sphereAtmosphere = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50), new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexSource,
        fragmentShader: atmosphereFragmentSource,
        uniforms: {
            globeTexture: {
                value: new THREE.TextureLoader().load('./map/8k_earth_clouds.jpg')
            }

        },
        transparent: true,
        opacity: 0.1
    }));

    const sphereAtmosphereGlow = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50), new THREE.ShaderMaterial({
        vertexShader: atmosphereGlowVertexSource,
        fragmentShader: atmosphereGlowFragmentSource,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
    }));


    sphereAtmosphereGlow.scale.set(1.2,1.2,1.2);
    sphereAtmosphere.scale.set(1.01,1.01,1.01);

    scene.add(sphereAtmosphere);
    scene.add(sphere);
    scene.add(sphereAtmosphereGlow);

    const group = new THREE.Group()
    group.add(sphere)
    group.add(sphereAtmosphere)
    scene.add(group)

    // Set camera position
    camera.position.z = 10;

    const mouse = {
        x: undefined,
        y: undefined
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        sphere.rotation.y += 0.0008;
        sphereAtmosphere.rotation.y += 0.001;
        group.rotation.y = mouse.x
        group.rotation.x = mouse.y
    }

    animate();

    addEventListener('mousemove', () => {
        mouse.x = (event.clientX / innerWidth) * 2 - 1
        mouse.y = -(event.clientY / innerHeight) * 2 + 1
        // console.log(mouse)
    })
});

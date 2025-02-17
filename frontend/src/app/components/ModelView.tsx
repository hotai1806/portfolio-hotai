"use client";

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef } from "react";

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default function ModelViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  //   const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Setup scene
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x000000);
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Cam

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.5);
    mainLight.position.set(5, 10, 7.5);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5);
    hemiLight.position.set(0, 25, 0);

    const pointLight = new THREE.PointLight(0xffffff, 1, -10);
    pointLight.position.set(9, 4, 2);
    scene.add(pointLight);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.PCFSoftShadowMap;
    renderer.toneMappingExposure = 2.5;
    document.body.appendChild(renderer.domElement);

    // document.body.appendChild( renderer.domElement );
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const loader = new GLTFLoader();
    let model: THREE.Object3D;

    loader.load(
      "models/delorean_time_machine.glb",
      function (gltf) {
        model = gltf.scene;
        model.traverse((node) => {
          node.castShadow = true;
          node.receiveShadow = true;
        });
        // scene.add(gltf.scene);
        console.log("gltf");
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        scene.add(model);

        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        camera.position.z = maxDim * 1.5;

        model.rotation.y += 200;

        // model.scale.set(0, 0, 0);
        // cancelAnimationFrame(0);
        // anim;
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    function basicAnimate() {
      renderer.render(scene, camera);
      requestAnimationFrame(basicAnimate);
    }
    basicAnimate();

    // function playInitialAnimation() {
    //   if (model) {
    //     gsap.to(model.scale, {
    //       x: 1,
    //       y: 1,
    //       z: 1,
    //       duration: 1.5,
    //       ease: "power4.out",
    //     });
    //   }
    //   model.rotation.y += 50;
    // }
    // playInitialAnimation();
    // requestAnimationFrame(playInitialAnimation);
    function animate() {
      if (model) {
        // gsap.to(model.scale, {
        //   x: 1,
        //   y: 1,
        //   z: 1,
        //   duration: 1.5,
        //   ease: "power4.out",
        // });
        model.rotation.y += 0.01;
      }
    }
    animate();
    renderer.setAnimationLoop(animate);
    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed top-0 left-0 w-full h-full z-10 hieu"
      style={{ pointerEvents: "none" }}
    />
  );
}

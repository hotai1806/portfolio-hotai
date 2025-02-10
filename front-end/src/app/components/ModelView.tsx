"use client";
import React, { useEffect, useRef } from "react";

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default function ModelViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  //   const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Setup scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const loader = new GLTFLoader();

    loader.load(
      "models/delorean_time_machine.glb",
      function (gltf) {
        scene.add(gltf.scene);
        console.log("gltf");
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, -10);
    pointLight.position.set(9, 4, 2);
    scene.add(pointLight);
    camera.position.z = 9;
    camera.position.y = 4;
    camera.position.x = 2;

    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    // document.body.appendChild( renderer.domElement );
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    function animate() {
      renderer.render(scene, camera);
    }
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

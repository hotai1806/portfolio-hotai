import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const SpinningEarth = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Camera position
    camera.position.z = 2;

    // Earth
    const earthGeometry = new THREE.SphereGeometry(1, 64, 64);

    // Earth texture - using a dark material for the base
    // const earthMaterial = new THREE.MeshBasicMaterial({
    //   color: 0x111111,
    //   wireframe: false,
    // });
    const textureLoader = new THREE.TextureLoader();
    const mat = new THREE.MeshStandardMaterial({
      map: textureLoader.load("/images/download.png"),
    });

    const earth = new THREE.Mesh(earthGeometry, mat);
    scene.add(earth);

    // Add points to simulate the dot pattern
    const dotsGroup = new THREE.Group();
    scene.add(dotsGroup);

    // Create dots distribution
    for (let i = 0; i < 1000; i++) {
      const phi = Math.acos(-1 + (2 * i) / 1000);
      const theta = Math.sqrt(1000 * Math.PI) * phi;

      // Random radius between 1.001 and 1.01 to place dots slightly above the sphere
      const radius = 1.001 + Math.random() * 0.009;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const dotGeometry = new THREE.SphereGeometry(0.004, 4, 4);

      // Choose color - occasionally add an orange highlight dot
      let dotColor = 0x444444;
      if (Math.random() > 0.99) {
        dotColor = 0xff6600;
      }

      const dotMaterial = new THREE.MeshBasicMaterial({
        color: dotColor,
      });

      const dot = new THREE.Mesh(dotGeometry, dotMaterial);
      dot.position.set(x, y, z);
      dotsGroup.add(dot);
    }

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate earth
      earth.rotation.y += 0.002;
      dotsGroup.rotation.y += 0.002;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-full">
      <div
        ref={mountRef}
        className="w-64 h-64 md:w-96 md:h-96"
        style={{
          borderRadius: "50%",
          overflow: "hidden",
          background: "linear-gradient(to right, #000000, #080808)",
        }}
      />
    </div>
  );
};

export default SpinningEarth;

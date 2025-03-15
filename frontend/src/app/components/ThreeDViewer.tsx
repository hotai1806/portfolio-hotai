import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from "gsap";

const ThreeDScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  let bee: THREE.Object3D | null = null;
  let mixer: THREE.AnimationMixer | null = null;

  useEffect(() => {
    // Create scene
    const scene = new THREE.Scene();

    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      10,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 13;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current?.appendChild(renderer.domElement);

    // Load 3D model
    const loader = new GLTFLoader();
    loader.load(
      "/demon_bee_full_texture.glb",
      (gltf) => {
        bee = gltf.scene;
        scene.add(bee);

        mixer = new THREE.AnimationMixer(bee);
        mixer.clipAction(gltf.animations[0]).play();
        modelMove();
      },
      undefined,
      (error) => console.error("Error loading model:", error)
    );

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 1);
    topLight.position.set(500, 500, 500);
    scene.add(topLight);

    // Animation loop
    const reRender3D = () => {
      requestAnimationFrame(reRender3D);
      renderer.render(scene, camera);
      if (mixer) mixer.update(0.02);
    };
    reRender3D();

    // Handle window resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  // Function to handle model movement based on scroll position
  const modelMove = () => {
    if (!bee) return;
    const sections = document.querySelectorAll(".section");
    let currentSectionId: string | undefined;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 3) {
        currentSectionId = section.id;
      }
    });

    const arrPositionModel = [
      {
        id: "banner",
        position: { x: 0, y: -1, z: 0 },
        rotation: { x: 0, y: 1.5, z: 0 },
      },
      {
        id: "intro",
        position: { x: 1, y: -1, z: -5 },
        rotation: { x: 0.5, y: -0.5, z: 0 },
      },
      {
        id: "description",
        position: { x: -1, y: -1, z: -5 },
        rotation: { x: 0, y: 0.5, z: 0 },
      },
      {
        id: "contact",
        position: { x: 0.8, y: -1, z: 0 },
        rotation: { x: 0.3, y: -0.5, z: 0 },
      },
    ];

    const newCoordinates = arrPositionModel.find(
      (val) => val.id === currentSectionId
    );

    if (newCoordinates) {
      gsap.to(bee.position, {
        ...newCoordinates.position,
        duration: 3,
        ease: "power1.out",
      });
      gsap.to(bee.rotation, {
        ...newCoordinates.rotation,
        duration: 3,
        ease: "power1.out",
      });
    }
  };

  // Add event listener for scroll
  useEffect(() => {
    const handleScroll = () => modelMove();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div
        ref={containerRef}
        id="container3D"
        style={{ width: "100vw", height: "100vh" }}
      ></div>
      <div
        className="section"
        id="banner"
        style={{ height: "100vh", background: "lightblue" }}
      >
        Banner Section
      </div>
      <div
        className="section"
        id="intro"
        style={{ height: "100vh", background: "lightgreen" }}
      >
        Intro Section
      </div>
      <div
        className="section"
        id="description"
        style={{ height: "100vh", background: "lightcoral" }}
      >
        Description Section
      </div>
      <div
        className="section"
        id="contact"
        style={{ height: "100vh", background: "lightgoldenrodyellow" }}
      >
        Contact Section
      </div>
    </div>
  );
};

export default ThreeDScene;

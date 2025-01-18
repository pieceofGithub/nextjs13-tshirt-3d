"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import TShirtModel from "../components/TshirtModel"; // Assuming you have this component

export default function Home() {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Canvas
        camera={{ position: [0, 4, 8.4], fov: 5 }} // Adjust the camera position and FOV
        style={{ background: "#f0f0f0" }} // Set background color for better contrast
      >
        {/* Ambient light for base lighting */}
        <ambientLight intensity={0.5} />
        {/* Directional light to simulate sunlight */}
        <directionalLight position={[5, 5, 5]} intensity={1} />
        {/* Add the 3D T-shirt model */}
        <TShirtModel />
        {/* OrbitControls for interactive 3D model movement */}
        <OrbitControls target={[0, 0.3, 0]} />
        {/* Set target to make camera look 5 units up on the Y-axis */}
      </Canvas>
    </div>
  );
}

"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import TShirtModel from "../components/TshirtModel";
import ColorPicker from "../components/ColorPicker";
import TextureUploader from "../components/TextureUploader";
import { useState } from "react";

export default function Home() {
  const [showControls, setShowControls] = useState(false);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setShowControls(!showControls)}
        className="fixed z-50 top-4 right-4 md:hidden bg-white p-2 rounded-full shadow-lg"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={
              showControls ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
            }
          />
        </svg>
      </button>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 25 }}
        className="w-full h-full bg-gray-100"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <TShirtModel />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={1.5}
          maxDistance={4}
        />
      </Canvas>

      {/* Controls Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          showControls ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
      >
        <div className="h-full overflow-y-auto p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Customize T-Shirt
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                Color
              </h3>
              <ColorPicker />
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                Textures
              </h3>
              <TextureUploader />
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-sm md:block">
        <h3 className="font-semibold mb-2">Controls:</h3>
        <ul className="text-sm text-gray-600">
          <li>• Rotate: Click and drag</li>
          <li>• Zoom: Scroll wheel</li>
          <li>• Pan: Right click and drag</li>
        </ul>
      </div>
    </div>
  );
}

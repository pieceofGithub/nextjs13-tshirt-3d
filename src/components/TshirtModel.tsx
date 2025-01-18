"use client";

import { useGLTF } from "@react-three/drei";
import { Suspense } from "react";

export default function TShirtModel() {
  const { scene } = useGLTF("euler_tshirt_3mb.glb");

  return (
    <Suspense fallback={<span>Loading...</span>}>
      <primitive object={scene} />
    </Suspense>
  );
}

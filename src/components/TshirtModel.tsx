"use client";

import { useGLTF } from "@react-three/drei";
import { useSnapshot } from "valtio";
import * as THREE from "three";
import { useEffect, useState } from "react";
import state from "../store";

export default function TShirtModel() {
  const snap = useSnapshot(state);
  const { scene, nodes, materials } = useGLTF("/euler_tshirt_3mb.glb");

  // Create a ref for materials to update
  const [materialMap, setMaterialMap] = useState<{
    [key: string]: THREE.Material;
  }>({});

  // Initialize materials
  useEffect(() => {
    const newMaterials: { [key: string]: THREE.Material } = {};
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Clone the material to avoid sharing between instances
        const material = child.material as THREE.MeshStandardMaterial;
        if (material) {
          newMaterials[child.name] = material.clone();
          child.material = newMaterials[child.name];
        }
      }
    });
    setMaterialMap(newMaterials);
  }, [scene]);

  // Update color
  useEffect(() => {
    Object.values(materialMap).forEach((material) => {
      if (material instanceof THREE.MeshStandardMaterial) {
        material.color.set(snap.color);
      }
    });
  }, [materialMap, snap.color]);

  // Update textures
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    Object.entries(snap.textures).forEach(([part, textureUrl]) => {
      if (textureUrl && materialMap[part]) {
        textureLoader.load(textureUrl, (texture) => {
          const material = materialMap[part] as THREE.MeshStandardMaterial;
          material.map = texture;
          material.needsUpdate = true;
        });
      }
    });
  }, [materialMap, snap.textures]);

  return (
    <group dispose={null}>
      <primitive object={scene} scale={1} position={[0, 0, 0]} />
    </group>
  );
}

useGLTF.preload("/euler_tshirt_3mb.glb");

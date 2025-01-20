"use client";

import { useGLTF } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { useEffect, useState } from "react";
import * as THREE from "three";
import state from "../store";

export default function TShirtModel() {
  const snap = useSnapshot(state);

  const gltf = useGLTF("/euler_tshirt_3mb.glb"); // Always call hooks at the top level
  const { scene, nodes, materials: mtt } = gltf;

  if (!scene) {
    console.error("Error: Model could not be loaded.");
    return null;
  }

  console.log(nodes, mtt);

  const [materials, setMaterials] = useState<{ [key: string]: THREE.Material }>(
    {}
  );

  useEffect(() => {
    if (scene) {
      console.log("Model loaded successfully:", scene);
    }
    const newMaterials: { [key: string]: THREE.Material } = {};
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const material = child.material as THREE.MeshStandardMaterial;
        if (material) {
          newMaterials[child.name] = material.clone();
          child.material = newMaterials[child.name];
        }
      }
    });
    setMaterials(newMaterials);
  }, [scene]);

  useEffect(() => {
    Object.values(materials).forEach((material) => {
      if (material instanceof THREE.MeshStandardMaterial) {
        material.color.set(snap.color);
      }
    });
  }, [materials, snap.color]);

  useEffect(() => {
    Object.entries(snap.textures).forEach(([part, textureUrl]) => {
      if (textureUrl && materials[part]) {
        const texture = new THREE.TextureLoader().load(textureUrl);
        const material = materials[part] as THREE.MeshStandardMaterial;
        material.map = texture;
        material.needsUpdate = true;
      }
    });
  }, [materials, snap.textures]);

  return <primitive object={scene} scale={1} />;
}

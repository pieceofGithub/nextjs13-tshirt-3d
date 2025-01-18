"use client";

import dynamic from "next/dynamic";
import { useSnapshot } from "valtio";
import state from "../store";

const DynamicSketchPicker = dynamic(
  () => import("react-color").then((mod) => mod.SketchPicker),
  { ssr: false }
);

const ColorPicker = () => {
  const snap = useSnapshot(state);

  return (
    <div className="w-full">
      <DynamicSketchPicker
        color={snap.color}
        onChange={(color) => (state.color = color.hex)}
        disableAlpha
        className="!w-full"
        styles={{
          default: {
            picker: {
              width: "100%",
              boxShadow: "none",
              border: "1px solid #e2e8f0",
              borderRadius: "0.5rem",
            },
          },
        }}
      />
    </div>
  );
};

export default ColorPicker;

"use client";

import { useCallback, useState } from "react";
import { useSnapshot } from "valtio";
import state from "../store";

type TexturePart = "front" | "back" | "sleeves";

const TextureUploader = () => {
  const snap = useSnapshot(state);
  const [selectedPart, setSelectedPart] = useState<TexturePart>("front");

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert("File size must be less than 5MB.");
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          if (typeof result === "string") {
            state.textures[selectedPart] = result;
          }
        };
        reader.readAsDataURL(file);
      }
    },
    [selectedPart]
  );

  return (
    <div className="w-full space-y-4">
      <select
        value={selectedPart}
        onChange={(e) => setSelectedPart(e.target.value as TexturePart)}
        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
      >
        <option value="front">Front</option>
        <option value="back">Back</option>
        <option value="sleeves">Sleeves</option>
      </select>

      <div className="w-full">
        <label
          htmlFor="texture-upload"
          className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition-colors"
        >
          <svg
            className="w-6 h-6 mr-2 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm font-medium text-gray-600">
            Upload Texture
          </span>
        </label>
        <input
          id="texture-upload"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      <div className="w-full h-32 border border-gray-300 rounded-lg flex items-center justify-center">
        {snap.textures[selectedPart] ? (
          <img
            src={snap.textures[selectedPart]}
            alt={`${selectedPart} preview`}
            className="object-contain max-h-full"
          />
        ) : (
          <span className="text-gray-400">No texture uploaded</span>
        )}
      </div>
    </div>
  );
};

export default TextureUploader;

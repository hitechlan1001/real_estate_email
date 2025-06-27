"use client";
import { useState } from "react";

export function EmailCard({
  agentName,
  address, 
  index,
  preGeneratedVariants = [],
}: {
  agentName: string;
  address: string;
  index: number;
  preGeneratedVariants?: string[];
}) {
  const [selected, setSelected] = useState(0);
  const labels = [
    "Friendlier Email",
    "8th Grade Level",
    "Simplified Email",
    "Wording Variation",
    "Rewritten Email",
    "Alternative Attempt",
  ];
  return (
    <div className="border rounded-xl p-4 shadow text-white">
      <div className="mb-2 font-semibold">
        {index + 1}. {agentName} — {address}
      </div>
      {preGeneratedVariants.length > 0 && (
        <>
          <select
            onChange={(e) => setSelected(+e.target.value)}
            className="mt-2 block w-full text-black py-1 rounded-sm"
          >
            {preGeneratedVariants.map((_, i) => (
              <option key={i} value={i}>
                {labels[i] ?? `Version ${i + 1}`}
              </option>
            ))}
          </select>

          <pre className="bg-gray-100 text-black p-2 mt-2 whitespace-pre-wrap rounded">
            {preGeneratedVariants[selected]}
          </pre>
        </>
      )}
    </div>
  );
}

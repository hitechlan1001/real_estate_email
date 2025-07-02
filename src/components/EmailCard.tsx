"use client";
import { Result } from "@/app/page";

export function EmailCard({
  agentName,
  address,
  index,
  preGeneratedVariants,
}: {
  agentName: string;
  address: string;
  index: number;
  preGeneratedVariants?: Result;
}) {
  return (
    <div className="border rounded-xl p-4 shadow text-white">
      <div className="font-semibold">
        {index + 1}. {agentName} — {address}
      </div>
      {preGeneratedVariants?.content ? (
        <>
          <div>Random AI Prompt : {preGeneratedVariants?.instruction}</div>
          <pre className="bg-gray-100 text-black p-2 mt-2 whitespace-pre-wrap rounded">
            {preGeneratedVariants?.content}
          </pre>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

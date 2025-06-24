"use client";
import { useState } from "react";

export function EmailCard({ agentName, address, offer, email, index }: any) {
  const [variants, setVariants] = useState<string[]>([]);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate-email", {
        method: "POST",
        body: JSON.stringify({ agentName, address, offer }),
      });
      const data = await res.json();
      setVariants(data.emails);
    } catch (err) {
      alert("Failed to generate email.");
    } finally {
      setLoading(false);
    }
  };

  const send = async () => {
    await fetch("/api/send-email", {
      method: "POST",
      body: JSON.stringify({
        to: email,
        subject: `Offer for ${address}`,
        text: variants[selected],
      }),
    });
    alert("Email sent!");
  };

  const labels = [
    "Friendlier Email",
    "8th Grade Level",
    "Simplified Email",
    "Wording Variation",
    "Rewritten Email",
    "Alternative Attempt",
  ];

  return (
    <div className="border rounded-xl p-4 shadow">
      <div className="mb-2 font-semibold">
        {index + 1} {agentName} — {address}
      </div>

      <button
        onClick={generate}
        disabled={loading}
        className={`bg-blue-600 text-white px-3 py-1 rounded ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Generating..." : "Generate Email"}
      </button>

      {variants.length > 0 && (
        <>
          <select
            onChange={(e) => setSelected(+e.target.value)}
            className="mt-2 block w-full text-black py-1 rounded-sm"
          >
            {variants.map((_, i) => (
              <option key={i} value={i}>
                {labels[i] ?? `Version ${i + 1}`}
              </option>
            ))}
          </select>

          <pre className="bg-gray-100 text-black p-2 mt-2 whitespace-pre-wrap rounded">
            {variants[selected]}
          </pre>

          <button
            onClick={send}
            className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
          >
            Send Email
          </button>
        </>
      )}
    </div>
  );
}

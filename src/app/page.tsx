"use client";
import { useEffect, useState } from "react";
import { EmailCard } from "@/components/EmailCard";

export default function Home() {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/fetch-data")
      .then((res) => res.json())
      .then((data) => setRows(data.data));
  }, []);

  return (
    <main className="p-6 space-y-4 bg-gray-900 text-white">
      <h1 className="text-xl font-bold">Real Estate Email Bot</h1>
      {rows.map((r, i) => (
        <EmailCard
          key={i}
          agentName={r[9]}
          address={r[0]}
          offer={r[8]}
          email={r[12]}
          index={i}
        />
      ))}
    </main>
  );
}

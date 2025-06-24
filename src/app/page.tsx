"use client";
import { useEffect, useState } from "react";
import { EmailCard } from "@/components/EmailCard";

export default function Home() {
  const [rows, setRows] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch("/api/fetch-data");
      const data = await res.json();
      setRows(data.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <main className="p-6 space-y-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-xl font-bold">Real Estate Email Bot</h1>

      {loading ? (
        <div className="flex items-center justify-center h-[80svh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          <span className="ml-4">Loading data...</span>
        </div>
      ) : (
        rows.map((r, i) => (
          <EmailCard
            key={i}
            agentName={r[9]}
            address={r[0]}
            offer={r[8]}
            email={r[12]}
            index={i}
          />
        ))
      )}
    </main>
  );
}

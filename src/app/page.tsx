"use client";
import { useEffect, useState } from "react";
import { EmailCard } from "@/components/EmailCard";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Home() {
  const [rows, setRows] = useState<string[][]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingAll, setGeneratingAll] = useState(false);
  const [sendingAll, setSendingAll] = useState(false);
  const [allVariants, setAllVariants] = useState<string[][]>([]); // All email variations
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch("/api/fetch-data");
      const data = await res.json();
      setRows(data.data);
      setAllVariants(new Array(data.data.length).fill([])); // initialize
      setLoading(false);
    };

    fetchData();
  }, []);

  const generateAllEmails = async () => {
    setGeneratingAll(true);

    try {
      const requests = rows.map(async (row, i) => {
        const agentName = row[9];
        const address = row[0];
        const offer = row[8];

        try {
          const res = await fetch("/api/generate-email", {
            method: "POST",
            body: JSON.stringify({ agentName, address, offer }),
          });
          const data = await res.json();
          return data.emails;
        } catch (err) {
          console.error(`❌ Failed to generate for row ${i}`, err);
          return [];
        }
      });

      const results: string[][] = await Promise.all(requests);
      setAllVariants(results);
      router.refresh();
      toast.success("All emails generated.", {
        autoClose: 2000,
      });
    } catch (err) {
      console.error("Unexpected error while generating all emails:", err);
      toast.error(" Something went wrong while generating all emails.", {
        autoClose: 2000,
      });
    } finally {
      setGeneratingAll(false);
    }
  };

  const sendAllEmails = async () => {
    setSendingAll(true);

    try {
      for (let variantIndex = 0; variantIndex < 6; variantIndex++) {
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          const email = row[12];
          const address = row[0];
          const variants = allVariants[i];

          if (!variants || !variants[variantIndex]) continue;

          const fullText = variants[variantIndex];
          const subjectMatch = fullText.match(/^Subject:\s*(.+)$/m);
          const subject = subjectMatch
            ? subjectMatch[1].trim()
            : `Offer for ${address}`;
          const body = fullText.replace(/^Subject:.*\n?/m, "").trim();

          try {
            await fetch("/api/send-email", {
              method: "POST",
              body: JSON.stringify({ to: email, subject, text: body }),
            });

            toast.success(
              `✅ Sent type ${variantIndex + 1} email to ${email}`,
              { autoClose: 2000 }
            );
          } catch (err) {
            console.error(`❌ Failed to send to ${email}`, err);
            toast.error(`Failed to send to ${email}`, {
              autoClose: 2000,
            });
          }

          await new Promise((res) => setTimeout(res, 2000)); // optional delay per email
        }

        await new Promise((res) => setTimeout(res, 3000)); // delay between variants
      }

      alert("✅ All emails (by type) sent successfully.");
    } finally {
      setSendingAll(false);
    }
  };

  return (
    <main className="p-6 space-y-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-xl font-bold">Real Estate Email Bot</h1>

      {loading ? (
        <div className="flex items-center justify-center h-[80svh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          <span className="ml-4">Loading data...</span>
        </div>
      ) : (
        <>
          <div className="flex gap-4 mb-4">
            <button
              onClick={generateAllEmails}
              disabled={generatingAll}
              className={`px-4 py-2 rounded bg-blue-600 text-white ${
                generatingAll ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {generatingAll ? "Generating All..." : "Generate All Emails"}
            </button>
            <button
              onClick={sendAllEmails}
              disabled={
                sendingAll ||
                generatingAll ||
                allVariants.every((v) => v.length === 0)
              }
              className={`px-4 py-2 rounded bg-green-600 text-white ${
                sendingAll ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {sendingAll ? "Sending All..." : "Send All Emails"}
            </button>
          </div>

          {rows.map((r, i) => (
            <EmailCard
              key={i}
              agentName={r[9]}
              address={r[0]}
              index={i}
              preGeneratedVariants={allVariants[i]}
            />
          ))}
        </>
      )}
    </main>
  );
}

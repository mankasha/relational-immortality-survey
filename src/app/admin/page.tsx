"use client";

import { useState } from "react";

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState("");

  const checkCount = async () => {
    setError("");
    const res = await fetch("/api/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret }),
    });
    if (!res.ok) {
      setError("Incorrect password.");
      return;
    }
    const data = await res.json();
    setCount(data.count);
  };

  const downloadCsv = () => {
    window.location.href = `/api/export?secret=${encodeURIComponent(secret)}`;
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] px-4 py-8">
      <div className="mx-auto max-w-md">
        <h1 className="mb-2 text-xl font-semibold">Survey Data Admin</h1>
        <p className="mb-6 text-sm text-[#5a554f]">
          Enter your admin password to view or download responses.
        </p>
        <input
          type="password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="Admin password"
          className="mb-4 w-full rounded-xl border border-[#d4cfc4] bg-white px-4 py-3 text-sm"
        />
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={checkCount}
            className="rounded-xl bg-[#5a7a6a] px-4 py-3 text-sm font-medium text-white"
          >
            Check response count
          </button>
          <button
            type="button"
            onClick={downloadCsv}
            disabled={!secret}
            className="rounded-xl border border-[#5a7a6a] bg-white px-4 py-3 text-sm font-medium text-[#5a7a6a] disabled:opacity-40"
          >
            Download CSV
          </button>
        </div>
        {count !== null && (
          <p className="mt-4 text-sm">
            Total responses stored: <strong>{count}</strong>
          </p>
        )}
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}

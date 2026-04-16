"use client";
import { useState } from "react";

export default function Home() {
  const [inputs, setInputs] = useState<Record<string, string>>({
    "project_name": "",
    "description": "",
    "tech_stack": ""
  });
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (key: string, value: string) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOutput("");
    try {
      const p = README Generator: inputs["project_name"] + " | " + inputs["description"] + " | " + inputs["tech_stack"];
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt: p }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setOutput(data.result || "No output received.");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-400 mb-4">README Generator</h1>
          <p className="text-gray-400">AI-powered media and journalism tool</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800/50 rounded-2xl p-6 border border-indigo-500/40 space-y-4 mb-8">
                              <div><label className="block text-sm font-medium text-gray-300 mb-1">Project Name</label><input type="text" value={inputs["project_name"]} onChange={e => handleChange("project_name", e.target.value)} className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40" /></div>
                    <div><label className="block text-sm font-medium text-gray-300 mb-1">Description</label><input type="text" value={inputs["description"]} onChange={e => handleChange("description", e.target.value)} className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40" /></div>
                    <div><label className="block text-sm font-medium text-gray-300 mb-1">Tech Stack</label><input type="text" value={inputs["tech_stack"]} onChange={e => handleChange("tech_stack", e.target.value)} className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40" /></div>
          <button type="submit" disabled={loading} className={"w-full py-3 px-6 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-colors"}>{loading ? "Generating..." : "Generate"}</button>
        </form>
        {error && <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-4 mb-8"><p className="text-red-300 text-sm">{error}</p></div>}
        {output && <div className="bg-gray-800/50 rounded-2xl p-6 border border-indigo-500/40"><pre className="whitespace-pre-wrap text-gray-300 text-sm font-mono">{output}</pre></div>}
      </div></div>
  );
}

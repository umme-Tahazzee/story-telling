// components/HeadlineStudio.tsx
"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import { Copy, Download, RefreshCw, Sparkles, Upload } from "lucide-react";

type WordStyle = { highlight?: boolean; underline?: boolean; block?: boolean };
type Effects = {
  fadeIn: boolean;
  hoverGlow: boolean;
  perLetter: boolean;
  textShadow: boolean;
  textOutline: boolean;
};
export type HeadlineSettings = {
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  align: "left" | "center" | "right";
  lineHeight: number;
  letterSpacing: number;
  gradientEnabled: boolean;
  gradientDirection: "to-r" | "to-l" | "to-b" | "to-t";
  color1: string;
  color2: string;
  solidColor: string;
  effects: Effects;
  wordStyles: Record<number, WordStyle>;
};

const defaultSettings: HeadlineSettings = {
  text: "Write your legend here",
  fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI",
  fontSize: 72,
  fontWeight: 800,
  align: "center",
  lineHeight: 1.1,
  letterSpacing: 0,
  gradientEnabled: true,
  gradientDirection: "to-r",
  color1: "#f97316",
  color2: "#ef4444",
  solidColor: "#111827",
  effects: {
    fadeIn: true,
    hoverGlow: true,
    perLetter: true,
    textShadow: true,
    textOutline: false,
  },
  wordStyles: {},
};

const FONTS = [
  { label: "Inter (Sans)", value: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI" },
  { label: "Poppins (Sans)", value: "Poppins, ui-sans-serif, system-ui" },
  { label: "Playfair (Serif)", value: '"Playfair Display", ui-serif, Georgia' },
  { label: "Merriweather (Serif)", value: "Merriweather, ui-serif, Georgia" },
  { label: "Mononoki (Mono)", value: "Mononoki, ui-monospace, SFMono-Regular, Menlo, Monaco" },
];

function degForDir(dir: HeadlineSettings["gradientDirection"]) {
  switch (dir) {
    case "to-r":
      return 90;
    case "to-l":
      return 270;
    case "to-b":
      return 180;
    case "to-t":
      return 0;
  }
}

export default function HeadlineStudio() {
  const [s, setS] = useState<HeadlineSettings>(defaultSettings);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const words = useMemo(() => s.text.split(/(\s+)/), [s.text]); // preserve spaces

  const textStyle: React.CSSProperties = useMemo(() => {
    const base: React.CSSProperties = {
      fontFamily: s.fontFamily,
      fontWeight: s.fontWeight as any,
      fontSize: s.fontSize,
      lineHeight: s.lineHeight,
      letterSpacing: `${s.letterSpacing}px`,
      textAlign: s.align as any,
      transition: "all 200ms ease",
      wordBreak: "break-word",
      display: "inline-block",
    };
    if (s.gradientEnabled) {
      base.backgroundImage = `linear-gradient(${degForDir(s.gradientDirection)}deg, ${s.color1}, ${s.color2})`;
      // @ts-ignore
      base.backgroundClip = "text";
      // @ts-ignore
      (base as any).WebkitBackgroundClip = "text";
      base.color = "transparent";
    } else {
      base.color = s.solidColor;
    }
    if (s.effects.textShadow) {
      base.textShadow = "0 1px 0 rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.12)";
    }
    if (s.effects.textOutline) {
      base.textShadow = (base.textShadow ? base.textShadow + "," : "") + "-1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000";
    }
    return base;
  }, [s]);

  const onCopyJSON = async () => {
    const json = JSON.stringify(s, null, 2);
    await navigator.clipboard.writeText(json);
    alert("Settings copied to clipboard.");
  };

  const onDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(s, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "headline-settings.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const onUploadJSON = async (file: File) => {
    const text = await file.text();
    try {
      const obj = JSON.parse(text) as HeadlineSettings;
      setS((prev) => ({ ...prev, ...obj }));
    } catch (e) {
      alert("Invalid JSON settings file");
    }
  };

  const onDownloadPNG = async () => {
    if (!stageRef.current) return;
    const canvas = await html2canvas(stageRef.current as HTMLElement, { backgroundColor: null, scale: 2 });
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "headline.png";
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const generatedReactEmbed = `// Embeddable React snippet (example)
import Headline from "./Headline"; // rename if needed

export default function Example(){
  return (
    <Headline settings={${JSON.stringify(s, null, 2)}} />
  )
}
`;

  return (
    <div className="mx-auto max-w-6xl p-6 grid md:grid-cols-[1.1fr_0.9fr] gap-6">
      {/* Preview */}
      <div className="bg-white dark:bg-[#0b1020] rounded-2xl shadow p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold flex items-center gap-2"><Sparkles className="w-5 h-5" /> Headline Preview</h3>
          <div className="flex gap-2">
            <button onClick={() => setS(defaultSettings)} className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">
              <RefreshCw className="inline w-4 h-4 mr-1" /> Reset
            </button>
            <button onClick={onDownloadPNG} className="px-3 py-1 rounded bg-blue-600 text-white hover:opacity-90">
              <Download className="inline w-4 h-4 mr-1" /> PNG
            </button>
          </div>
        </div>

        <div ref={stageRef} className={`min-h-[220px] grid place-items-center rounded-xl p-8 ${s.effects.hoverGlow ? "hover:shadow-[0_10px_40px_rgba(0,0,0,0.12)]" : ""}`}>
          <motion.div initial={s.effects.fadeIn ? { opacity: 0, y: 12 } : undefined} animate={s.effects.fadeIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <div style={textStyle} className="select-text leading-tight">
              {s.effects.perLetter ? (
                <PerLetterHeadline words={words} s={s} />
              ) : (
                <PerWordHeadline words={words} s={s} />
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-[#0b1020] rounded-2xl shadow p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Headline Text</label>
          <textarea value={s.text} onChange={(e) => setS({ ...s, text: e.target.value })} rows={3} className="w-full border rounded p-2" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Font Family</label>
            <select value={s.fontFamily} onChange={(e) => setS({ ...s, fontFamily: e.target.value })} className="w-full border rounded p-2">
              {FONTS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Font Weight</label>
            <select value={String(s.fontWeight)} onChange={(e) => setS({ ...s, fontWeight: Number(e.target.value) })} className="w-full border rounded p-2">
              {[300,400,500,600,700,800,900].map(w => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Font Size: {s.fontSize}px</label>
          <input type="range" min={24} max={160} value={s.fontSize} onChange={(e) => setS({ ...s, fontSize: Number(e.target.value) })} className="w-full" />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-sm font-medium mb-1">Align</label>
            <select value={s.align} onChange={(e)=>setS({...s, align: e.target.value as any})} className="w-full border rounded p-2">
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Line Height: {s.lineHeight.toFixed(2)}</label>
            <input type="range" min={0.8} max={1.6} step={0.01} value={s.lineHeight} onChange={(e)=>setS({...s, lineHeight: Number(e.target.value)})} className="w-full"/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Letter Spacing: {s.letterSpacing}px</label>
            <input type="range" min={-2} max={8} step={0.5} value={s.letterSpacing} onChange={(e)=>setS({...s, letterSpacing: Number(e.target.value)})} className="w-full"/>
          </div>
        </div>

        <div className="pt-2 border-t" >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={s.gradientEnabled} onChange={(e)=>setS({...s, gradientEnabled: e.target.checked})} />
              <label className="text-sm font-medium">Enable Gradient</label>
            </div>
            <div className="flex gap-1">
              {(["to-l","to-r","to-t","to-b"] as const).map(dir=>(
                <button key={dir} onClick={()=>setS({...s, gradientDirection: dir})} className={`px-2 py-1 text-xs rounded ${s.gradientDirection===dir ? "bg-gray-200" : "bg-gray-100"}`}>{dir.replace("to-","").toUpperCase()}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm mb-1">Color 1</label>
              <input type="color" value={s.color1} onChange={(e)=>setS({...s, color1: e.target.value})} className="w-full h-10 rounded" />
            </div>
            <div>
              <label className="block text-sm mb-1">Color 2</label>
              <input type="color" value={s.color2} onChange={(e)=>setS({...s, color2: e.target.value})} className="w-full h-10 rounded" />
            </div>
            <div>
              <label className="block text-sm mb-1">Solid Color</label>
              <input type="color" value={s.solidColor} onChange={(e)=>setS({...s, solidColor: e.target.value})} className="w-full h-10 rounded" />
            </div>
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center justify-between">
              <span>Fade-in on mount</span>
              <input type="checkbox" checked={s.effects.fadeIn} onChange={(e)=>setS({...s, effects:{...s.effects, fadeIn: e.target.checked}})} />
            </label>
            <label className="flex items-center justify-between">
              <span>Hover glow</span>
              <input type="checkbox" checked={s.effects.hoverGlow} onChange={(e)=>setS({...s, effects:{...s.effects, hoverGlow: e.target.checked}})} />
            </label>

            <label className="flex items-center justify-between">
              <span>Per-letter animation</span>
              <input type="checkbox" checked={s.effects.perLetter} onChange={(e)=>setS({...s, effects:{...s.effects, perLetter: e.target.checked}})} />
            </label>
            <label className="flex items-center justify-between">
              <span>Text shadow</span>
              <input type="checkbox" checked={s.effects.textShadow} onChange={(e)=>setS({...s, effects:{...s.effects, textShadow: e.target.checked}})} />
            </label>

            <label className="flex items-center justify-between col-span-2">
              <span>Outline (stroke)</span>
              <input type="checkbox" checked={s.effects.textOutline} onChange={(e)=>setS({...s, effects:{...s.effects, textOutline: e.target.checked}})} />
            </label>
          </div>
        </div>

        {/* Word styling */}
        <div className="pt-2 border-t">
          <h4 className="font-medium mb-2">Word Styling</h4>
          <div className="flex flex-wrap gap-2">
            {words.map((w, i) => (
              <details key={i} className={`rounded-md ${s.wordStyles[i]?.block ? "bg-gray-100" : ""}`}>
                <summary className="px-2 py-1 cursor-pointer select-none text-sm">{w === " " ? "•" : w}</summary>
                <div className="p-2 space-y-1">
                  <label className="flex items-center justify-between text-sm">
                    <span>Highlight</span>
                    <input type="checkbox" checked={!!s.wordStyles[i]?.highlight} onChange={(e) => setS({ ...s, wordStyles: { ...s.wordStyles, [i]: { ...s.wordStyles[i], highlight: e.target.checked } } })} />
                  </label>
                  <label className="flex items-center justify-between text-sm">
                    <span>Underline</span>
                    <input type="checkbox" checked={!!s.wordStyles[i]?.underline} onChange={(e) => setS({ ...s, wordStyles: { ...s.wordStyles, [i]: { ...s.wordStyles[i], underline: e.target.checked } } })} />
                  </label>
                  <label className="flex items-center justify-between text-sm">
                    <span>Background block</span>
                    <input type="checkbox" checked={!!s.wordStyles[i]?.block} onChange={(e) => setS({ ...s, wordStyles: { ...s.wordStyles, [i]: { ...s.wordStyles[i], block: e.target.checked } } })} />
                  </label>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Export / Import */}
        <div className="pt-2 border-t space-y-2">
          <div className="flex gap-2">
            <button onClick={onCopyJSON} className="px-3 py-1 rounded bg-gray-100"> <Copy className="inline w-4 h-4 mr-1" /> Copy JSON</button>
            <button onClick={onDownloadJSON} className="px-3 py-1 rounded bg-gray-100"> <Download className="inline w-4 h-4 mr-1" /> Download JSON</button>
            <label className="px-3 py-1 rounded bg-gray-100 cursor-pointer inline-flex items-center gap-2">
              <Upload className="w-4 h-4" /> Import JSON
              <input type="file" accept="application/json" className="hidden" onChange={(e)=> e.target.files && onUploadJSON(e.target.files[0])} />
            </label>
          </div>

          <label className="block text-sm font-medium">Embeddable React Snippet</label>
          <pre className="text-xs bg-gray-50 p-2 rounded max-h-40 overflow-auto whitespace-pre-wrap">{generatedReactEmbed}</pre>
        </div>
      </div>
    </div>
  );
}

/* --- helper components for rendering words/letters --- */
function WordSpan({ index, w, s }: { index: number; w: string; s: HeadlineSettings }) {
  const ws = s.wordStyles[index] || {};
  const style: React.CSSProperties = {
    borderRadius: ws.block ? 8 : undefined,
    padding: ws.block ? "0.12em 0.28em" : undefined,
    background: ws.highlight ? "rgba(251,191,36,0.35)" : undefined,
    textDecoration: ws.underline ? "underline" : undefined,
    display: "inline-block",
  };
  return <span style={style}>{w}</span>;
}

function PerWordHeadline({ words, s }: { words: string[]; s: HeadlineSettings }) {
  return (
    <div className="leading-tight">
      {words.map((w, i) => (
        <span key={i} className="inline-block align-baseline">
          <WordSpan index={i} w={w} s={s} />
        </span>
      ))}
    </div>
  );
}

function PerLetterHeadline({ words, s }: { words: string[]; s: HeadlineSettings }) {
  let letterIndex = 0;
  return (
    <div className="leading-tight">
      {words.map((w, wi) => (
        <span key={wi} className="inline-block align-baseline">
          {w.split("").map((ch, ci) => {
            const idx = letterIndex++;
            return ch === " " ? (
              <span key={`${wi}-${ci}`}> </span>
            ) : (
              <motion.span key={`${wi}-${ci}`} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.02 * idx, type: "spring", stiffness: 220, damping: 18 }} className="inline-block">
                <WordSpan index={wi} w={ch} s={s} />
              </motion.span>
            );
          })}
        </span>
      ))}
    </div>
  );
}

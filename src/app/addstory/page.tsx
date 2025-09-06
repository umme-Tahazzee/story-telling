"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const AddStoryPage: React.FC = () => {
  const [headline, setHeadline] = useState<string>("Your Headline Here");
  const [story, setStory] = useState<string>("");

  // Typography
  const [fontSize, setFontSize] = useState<string>("24px");
  const [fontFamily, setFontFamily] = useState<string>("serif");
  const [fontWeight, setFontWeight] = useState<string>("600");

  // Gradient
  const [useGradient, setUseGradient] = useState<boolean>(false);
  const [gradientDirection, setGradientDirection] = useState<string>("to right");
  const [gradientColor1, setGradientColor1] = useState<string>("#F97316");
  const [gradientColor2, setGradientColor2] = useState<string>("#FF5733");

  // Advanced Styling
  const [textDecoration, setTextDecoration] = useState<string>("none"); // underline, line-through, highlight
  const [textEffect, setTextEffect] = useState<string>("none"); // fade, glow, per-letter, shadow
  const [exportData, setExportData] = useState<string>("");

  const router = useRouter();

  // Emoji insertion
  const emojis: string[] = ["😊", "🔥", "✨", "💡", "❤️", "🎉", "🌸", "🚀"];
  const addEmoji = (emoji: string, target: "headline" | "story") => {
    if (target === "headline") setHeadline((prev) => prev + emoji);
    else setStory((prev) => prev + emoji);
  };

  const handleSave = () => {
    if (!story.trim() && !headline.trim()) return;

    const newStory = {
      headline,
      story,
      fontSize,
      fontFamily,
      fontWeight,
      useGradient,
      gradientDirection,
      gradientColor1,
      gradientColor2,
      textDecoration,
      textEffect,
    };

    const savedStories: typeof newStory[] = JSON.parse(localStorage.getItem("stories") || "[]");
    savedStories.unshift(newStory);
    localStorage.setItem("stories", JSON.stringify(savedStories));

    setStory("");
    router.push("/");
  };

  const handleExport = () => {
    const settings = {
      headline,
      fontSize,
      fontFamily,
      fontWeight,
      useGradient,
      gradientDirection,
      gradientColor1,
      gradientColor2,
      textDecoration,
      textEffect,
    };
    setExportData(JSON.stringify(settings, null, 2));
  };

  return (
    <main className="flex flex-col max-w-5xl mx-auto mt-6 p-4 sm:p-6 min-h-screen space-y-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">📝 Write Your Story</h1>

      {/* Headline Editor */}
      <div className="flex flex-col">
        <label className="block mb-2 font-medium">Headline</label>
        <input
          type="text"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />

        {/* Emoji Buttons */}
        <div className="flex flex-wrap gap-2 mt-2">
          {emojis.map((emoji) => (
            <button
              type="button"
              key={emoji}
              onClick={() => addEmoji(emoji, "headline")}
              className="p-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Typography Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block mb-2 font-medium">Font Size</label>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="w-full p-2 border rounded-lg dark:text-white dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="20px">Small</option>
            <option value="24px">Medium</option>
            <option value="32px">Large</option>
            <option value="40px">Extra Large</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Font Family</label>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="w-full p-2 border rounded-lg dark:text-white dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="serif">Serif</option>
            <option value="sans-serif">Sans-serif</option>
            <option value="monospace">Monospace</option>
            <option value="cursive">Cursive</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Font Weight</label>
          <select
            value={fontWeight}
            onChange={(e) => setFontWeight(e.target.value)}
            className="w-full p-2 border rounded-lg dark:text-white dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="400">Normal</option>
            <option value="500">Medium</option>
            <option value="600">Semibold</option>
            <option value="700">Bold</option>
            <option value="900">Extra Bold</option>
          </select>
        </div>
      </div>

      {/* Gradient Toggle */}
      <div className="space-y-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={useGradient}
            onChange={(e) => setUseGradient(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="font-medium">Use Gradient</span>
        </label>

        {useGradient && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div>
              <label className="block mb-2 font-medium">Direction</label>
              <select
                value={gradientDirection}
                onChange={(e) => setGradientDirection(e.target.value)}
                className="w-full p-2 border rounded-lg dark:text-white dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="to right">→ Right</option>
                <option value="to left">← Left</option>
                <option value="to bottom">↓ Down</option>
                <option value="to top">↑ Up</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Color 1</label>
              <input
                type="color"
                value={gradientColor1}
                onChange={(e) => setGradientColor1(e.target.value)}
                className="w-full h-10 p-1 border rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Color 2</label>
              <input
                type="color"
                value={gradientColor2}
                onChange={(e) => setGradientColor2(e.target.value)}
                className="w-full h-10 p-1 border rounded"
              />
            </div>
          </div>
        )}
      </div>

      {/* Advanced Styling */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium">Word/Segment Styling</label>
          <select
            value={textDecoration}
            onChange={(e) => setTextDecoration(e.target.value)}
            className="w-full p-2 border rounded-lg dark:text-white dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="none">None</option>
            <option value="underline">Underline</option>
            <option value="highlight">Highlight</option>
            <option value="background">Background Block</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Modern Effects</label>
          <select
            value={textEffect}
            onChange={(e) => setTextEffect(e.target.value)}
            className="w-full p-2 border rounded-lg dark:text-white dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="none">None</option>
            <option value="fade">Fade-in</option>
            <option value="glow">Hover Glow</option>
            <option value="per-letter">Per-letter Animation</option>
            <option value="shadow">Text Shadow/Outline</option>
          </select>
        </div>
      </div>

      {/* Story Input */}
      <div className="flex flex-col w-full gap-2">
        <Textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="Type your story here..."
          className="h-40"
        />

        <div className="flex flex-wrap gap-2 mt-2">
          {emojis.map((emoji) => (
            <button
              type="button"
              key={emoji}
              onClick={() => addEmoji(emoji, "story")}
              className="p-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {emoji}
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-500">{story.length} / 1000 characters</p>
      </div>

      {/* Live Preview */}
      <div className="p-4 sm:p-6 border rounded-xl bg-gray-50 dark:bg-gray-800">
        <h2
          className={`mb-4 text-xl sm:text-2xl ${
            textEffect === "fade" ? "animate-fade-in" : ""
          } ${textEffect === "glow" ? "hover:text-orange-500 hover:drop-shadow-lg transition" : ""}
          ${textEffect === "shadow" ? "drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]" : ""}`}
          style={{
            fontSize,
            fontFamily,
            fontWeight,
            textDecoration: textDecoration === "underline" ? "underline" : "none",
            background:
              textDecoration === "highlight"
                ? "yellow"
                : textDecoration === "background"
                ? "#fef3c7"
                : useGradient
                ? `linear-gradient(${gradientDirection}, ${gradientColor1}, ${gradientColor2})`
                : "none",
            WebkitBackgroundClip:
              useGradient || textDecoration === "highlight" || textDecoration === "background"
                ? "text"
                : "initial",
            WebkitTextFillColor:
              useGradient ? "transparent" : textDecoration === "highlight" ? "black" : "inherit",
          }}
        >
          {textEffect === "per-letter"
            ? headline.split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block animate-bounce"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {char}
                </span>
              ))
            : headline}
        </h2>
        <p className="whitespace-pre-wrap">{story}</p>
      </div>

      {/* Export JSON */}
      <div className="space-y-2">
        <Button onClick={handleExport} className="bg-blue-500 hover:bg-blue-600">
          Export Headline Settings
        </Button>
        {exportData && (
          <pre className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg text-sm overflow-x-auto">
            {exportData}
          </pre>
        )}
      </div>

      <Button onClick={handleSave} className="mt-6 w-full sm:w-auto bg-orange-500 hover:bg-orange-600">
        Save Story
      </Button>
    </main>
  );
};

export default AddStoryPage;
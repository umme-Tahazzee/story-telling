"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const AddStoryPage = () => {
  const [headline, setHeadline] = useState("Your Headline Here");
  const [story, setStory] = useState("");

  // Typography
  const [fontSize, setFontSize] = useState("24px");
  const [fontFamily, setFontFamily] = useState("serif");
  const [fontWeight, setFontWeight] = useState("600");

  // Gradient
  const [useGradient, setUseGradient] = useState(false);
  const [gradientDirection, setGradientDirection] = useState("to right");
  const [gradientColor1, setGradientColor1] = useState("#F97316");
  const [gradientColor2, setGradientColor2] = useState("#FF5733");

  const router = useRouter();

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
    };

    // Get existing stories
    const savedStories = JSON.parse(localStorage.getItem("stories") || "[]");
    savedStories.unshift(newStory);

    // Save back
    localStorage.setItem("stories", JSON.stringify(savedStories));

    setStory("");
    router.push("/"); // redirect back to home (Hero)
  };

  return (
    <main className="flex flex-col max-w-5xl mt-10 p-6 min-h-screen space-y-8">
      <h1 className="text-3xl font-bold">📝 Write Your Story</h1>

      {/* Headline Editor */}
      <div>
        <label className="block mb-2 font-medium">Headline</label>
        <input
          type="text"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Typography Controls */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block mb-2 font-medium">Font Size</label>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="w-full p-2 border rounded-lg"
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
            className="w-full p-2 border rounded-lg"
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
            className="w-full p-2 border rounded-lg"
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
          />
          <span className="font-medium">Use Gradient</span>
        </label>

        {useGradient && (
          <div className="grid grid-cols-3 gap-4 items-center">
            <div>
              <label className="block mb-2 font-medium">Direction</label>
              <select
                value={gradientDirection}
                onChange={(e) => setGradientDirection(e.target.value)}
                className="w-full p-2 border rounded-lg"
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

      {/* Story Input */}
      <div className="grid w-full gap-2">
        <Textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="Type your story here..."
          className="h-40"
        />
      </div>

      {/* Live Preview */}
      <div className="p-6 border rounded-xl bg-gray-50 dark:bg-gray-800">
        <h2
          className="mb-4"
          style={{
            fontSize,
            fontFamily,
            fontWeight,
            background: useGradient
              ? `linear-gradient(${gradientDirection}, ${gradientColor1}, ${gradientColor2})`
              : "none",
            WebkitBackgroundClip: useGradient ? "text" : "initial",
            WebkitTextFillColor: useGradient ? "transparent" : "inherit",
          }}
        >
          {headline}
        </h2>
        <p className="whitespace-pre-wrap">{story}</p>
      </div>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        className="mt-6 bg-orange-500 hover:bg-orange-600"
      >
        Save Story
      </Button>
    </main>
  );
};

export default AddStoryPage;

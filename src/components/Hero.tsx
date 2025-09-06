"use client";

import TextType from "./TextType";
import React, { useEffect, useState } from "react";
import HeroCard from './HeroCard';

const Hero = () => {
  const [stories, setStories] = useState<any[]>([]);

  useEffect(() => {
    const savedStories = JSON.parse(localStorage.getItem("stories") || "[]");
    setStories(savedStories);
  }, []);

  const handleDelete = (index: number) => {
    const updatedStories = stories.filter((_, i) => i !== index);
    setStories(updatedStories);
    localStorage.setItem("stories", JSON.stringify(updatedStories));
  };

  return (
    <main className="mt-6 flex flex-col  gap-6">
      {/* Typing Text */}
      <div className="text-xl">
        <TextType
          text={["A home for all stories", "Read, dream, enjoy"]}
          textColors={["#F97316", "#FF5733"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
          className="text-orange-500 font-semibold font-serif tracking-widest cursor-pointer"
        />
      </div>
      {/* hero card  */}
      <HeroCard/>
      
      {/* Stories */}
      <div className="w-full ">
       

        {stories.length > 0 ? (
          <div className="space-y-6">
            {stories.map((story, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-2xl border
                 border-gray-200 dark:border-gray-700 relative"
              >
                {/* Headline */}
                <h3
                  className="mb-3"
                  style={{
                    fontSize: story.fontSize,
                    fontFamily: story.fontFamily,
                    fontWeight: story.fontWeight,
                    background: story.useGradient
                      ? `linear-gradient(${story.gradientDirection}, ${story.gradientColor1}, ${story.gradientColor2})`
                      : "none",
                    WebkitBackgroundClip: story.useGradient ? "text" : "initial",
                    WebkitTextFillColor: story.useGradient
                      ? "transparent"
                      : "inherit",
                  }}
                >
                  {story.headline}
                </h3>

                {/* Story body with scroll if too long */}
                <div
                  className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap overflow-y-auto"
                  style={{ maxHeight: "200px" }}
                >
                  {story.story}
                </div>

                {/* Delete button */}
                <button
                  onClick={() => handleDelete(index)}
                  className="absolute top-3 right-3 px-3 py-1 bg-red-500
                   hover:bg-red-600 text-white text-sm rounded-md shadow"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No stories yet. Add one!</p>
        )}
      </div>
    </main>
  );
};

export default Hero;

"use client";

import TextType from "./TextType";
import React, { useEffect, useState } from "react";
import HeroCard from './HeroCard';
import { MdDelete } from "react-icons/md";

// Define a type for each story
interface Story {
  headline: string;
  story: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  useGradient: boolean;
  gradientDirection: string;
  gradientColor1: string;
  gradientColor2: string;
}

const Hero: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const savedStories: Story[] = JSON.parse(localStorage.getItem("stories") || "[]");
    setStories(savedStories);
  }, []);

  const handleDelete = (index: number) => {
    const updatedStories = stories.filter((_, i) => i !== index);
    setStories(updatedStories);
    localStorage.setItem("stories", JSON.stringify(updatedStories));
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <main className="mt-6 flex flex-col pb-10 gap-8">
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

      {/* Hero Card */}
      <HeroCard />

      {/* Stories */}
      <div className="w-full">
        {stories.length > 0 ? (
          <div className="space-y-8">
            {stories.map((story, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <div
                  key={index}
                  className="p-6 sm:p-8 bg-white dark:bg-gray-800 shadow-xl rounded-3xl border border-gray-200 dark:border-gray-700 relative transition-transform hover:-translate-y-1 hover:shadow-2xl"
                >
                  {/* Headline */}
                  <h3
                    className="mb-5 text-2xl sm:text-xl font-extrabold"
                    style={{
                      fontSize: story.fontSize,
                      fontFamily: story.fontFamily,
                      fontWeight: story.fontWeight,
                      background: story.useGradient
                        ? `linear-gradient(${story.gradientDirection}, ${story.gradientColor1}, ${story.gradientColor2})`
                        : "none",
                      WebkitBackgroundClip: story.useGradient ? "text" : "initial",
                      WebkitTextFillColor: story.useGradient ? "transparent" : "inherit",
                    }}
                  >
                    {story.headline}
                  </h3>

                  {/* Story body */}
                  <div
                    className={`text-gray-800 dark:text-gray-100 whitespace-pre-wrap p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-inner overflow-hidden leading-relaxed text-sm sm:text-base transition-all duration-500`}
                    style={{ maxHeight: isExpanded ? "1000px" : "200px" }}
                  >
                    {story.story}
                  </div>

                  {/* See More / See Less button */}
                  {story.story.length > 300 && (
                    <button
                      onClick={() => toggleExpand(index)}
                      className="mt-3 text-blue-500 dark:text-blue-400 font-semibold hover:underline transition-all"
                    >
                      {isExpanded ? "See Less" : "See More"}
                    </button>
                  )}

                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(index)}
                    className="absolute top-4 right-4 px-3 py-1 text-orange-700 cursor-pointer rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    <MdDelete className="w-6 h-6" />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No stories yet. Add one!</p>
        )}
      </div>
    </main>
  );
};

export default Hero;

"use client";

import TextType from "./TextType";
import React, { useEffect, useState } from "react";
import HeroCard from './HeroCard';
import { MdDelete } from "react-icons/md";
import { FaHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { MdOutlineModeComment } from "react-icons/md";
import { BiSolidHide } from "react-icons/bi";
import { GoComment } from "react-icons/go";

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

interface Comment {
  text: string;
  time: string;
}



const Hero: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const [bookmarks, setBookmarks] = useState<{ [key: number]: boolean }>({});
  const [comments, setComments] = useState<{ [key: number]: Comment[] }>({});
  const [newComments, setNewComments] = useState<{ [key: number]: string }>({});

  const [showComments, setShowComments] = useState<{ [key: number]: boolean }>({});

  const toggleComments = (index: number) => {
    setShowComments({ ...showComments, [index]: !showComments[index] });
  };


  useEffect(() => {
    const savedStories: Story[] = JSON.parse(localStorage.getItem("stories") || "[]");
    setStories(savedStories);

    const savedLikes = JSON.parse(localStorage.getItem("likes") || "{}") || {};
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "{}") || {};
    const savedComments = JSON.parse(localStorage.getItem("comments") || "{}") || {};

    setLikes(savedLikes);
    setBookmarks(savedBookmarks);
    setComments(savedComments);
  }, []);

  const handleDelete = (index: number) => {
    const updatedStories = stories.filter((_, i) => i !== index);
    setStories(updatedStories);
    localStorage.setItem("stories", JSON.stringify(updatedStories));
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const toggleLike = (index: number) => {
    const updated = { ...likes, [index]: (likes[index] || 0) + 1 };
    setLikes(updated);
    localStorage.setItem("likes", JSON.stringify(updated));
  };

  const toggleBookmark = (index: number) => {
    const updated = { ...bookmarks, [index]: !bookmarks[index] };
    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  const handleAddComment = (index: number) => {
    if (!newComments[index]) return;
    const updated = {
      ...comments,
      [index]: [...(comments[index] || []), { text: newComments[index], time: new Date().toLocaleString() }]
    };
    setComments(updated);
    setNewComments({ ...newComments, [index]: "" });
    localStorage.setItem("comments", JSON.stringify(updated));
  };

  return (
    <main className="mt-6 flex flex-col pb-10 gap-8">
      {/* Typing Text */}
      <div className="text-xl">
        <TextType
          text={["A home for all stories", "Read, dream, enjoy", "Your Personal Story Canvas"]}
          textColors={["#87CEEB", "#3EB489", "#008000"]}
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
                  className="p-6 sm:p-8 bg-white dark:bg-gray-800 shadow-xl rounded-3xl border
                   border-gray-200 dark:border-gray-700 relative transition-transform hover:-translate-y-1 hover:shadow-2xl"
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

                  {/* Actions and Controls */}
                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    {/* See More / See Less */}
                    {story.story.length > 300 && (
                      <button
                        onClick={() => toggleExpand(index)}
                        className="text-blue-500 dark:text-blue-400 font-semibold hover:underline transition-all"
                      >
                        {isExpanded ? "See Less" : "See More"}
                      </button>
                    )}

                    {/* Like */}
                    <button onClick={() => toggleLike(index)} className="flex items-center gap-1 text-red-500">
                      <FaHeart className="w-5 h-5" /> {likes[index] || 0}
                    </button>

                    {/* Bookmark */}
                    <button onClick={() => toggleBookmark(index)} className="flex items-center gap-1 text-yellow-500">
                      {bookmarks[index] ? <FaBookmark className="w-5 h-5" /> : <FaRegBookmark className="w-5 h-5" />}
                    </button>

                    {/* Toggle Comments */}
                    <button
                      onClick={() => toggleComments(index)}
                      className="text-blue-500 dark:text-blue-400 font-semibold hover:underline transition-all"
                    >
                      {showComments[index] ? <BiSolidHide className="size-6" />: <GoComment className="size-6"  />}
                    </button>
                  </div>

                  {/* Comments Section */}
                  {showComments[index] && (
                    <div className="mt-4 space-y-3">
                      {(comments[index] || []).map((comment, i) => (
                        <div key={i} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg shadow">
                          <p className="text-sm">{comment.text}</p>
                          <span className="text-xs text-gray-500">{comment.time}</span>
                        </div>
                      ))}

                      {/* Add comment */}
                      <div className="mt-2 flex gap-2">
                        <input
                          type="text"
                          value={newComments[index] || ""}
                          onChange={(e) => setNewComments({ ...newComments, [index]: e.target.value })}
                          placeholder="Write a comment..."
                          className="flex-1 px-3 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-600"
                        />
                        <button
                          onClick={() => handleAddComment(index)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                        >
                          Post
                        </button>
                      </div>
                    </div>
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
          <p className="text-gray-500 text-center animate-pulse">✨ No stories yet. Add one and start sharing!</p>
        )}
      </div>
    </main>
  );
};

export default Hero;
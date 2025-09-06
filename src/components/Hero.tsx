"use client";

import TextType from "./TextType";
import React, { useEffect, useState } from "react";
import HeroCard from './HeroCard';
import { MdDelete } from "react-icons/md";
import { FaHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { BsEmojiGrin } from "react-icons/bs";
import { BiSolidHide } from "react-icons/bi";
import { GoComment } from "react-icons/go";
import { Frown } from "lucide-react";
import StoryActions from './StoryActions';

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
  const [haha, setHaha] = useState<{ [key: number]: number }>({});

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

  // Load from localStorage on mount
  useEffect(() => {
    const savedHaha = JSON.parse(localStorage.getItem("Haha") || "{}");
    setHaha(savedHaha);
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



  // Toggle Haha reaction
  const toggleHaha = (index: number) => {
    const updated = { ...haha, [index]: (haha[index] || 0) + 1 };
    setHaha(updated);
    localStorage.setItem("Haha", JSON.stringify(updated));
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
      <div className="text-xl md:text-3xl">
        <TextType
          text={["A home for all stories", "Read, dream, enjoy", "Your Personal Story Canvas"]}
          textColors={["#4F46E5", "#F59E0B", "#10B981"]}
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
      <div className="w-full ">
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



                  {/*  stories.map */}
                  <StoryActions
                    index={index}
                    isExpanded={expandedIndex === index}
                    storyLength={story.story.length}
                    likes={likes[index] || 0}
                    haha={haha[index] || 0}
                    bookmarked={bookmarks[index] || false}
                    showComments={showComments[index] || false}
                    comments={comments[index] || []}
                    newComment={newComments[index] || ""}
                    setNewComment={(value) => setNewComments({ ...newComments, [index]: value })}
                    toggleExpand={toggleExpand}
                    toggleLike={toggleLike}
                    toggleHaha={toggleHaha}
                    toggleBookmark={toggleBookmark}
                    toggleComments={toggleComments}
                    handleAddComment={handleAddComment}
                  />



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
          <p className="text-gray-500 text-center animate-pulse">✨ 
         Let the World Hear Your Voice..
          </p>
        )}
      </div>
    </main>
  );
};

export default Hero;
"use client";

import { MdDelete } from "react-icons/md";
import { FaHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useState, useEffect } from "react";

interface Story {
  title: string;
  text: string;
}

interface Comment {
  text: string;
  time: string;
}

const HeroCards = () => {
  const stories: Story[] = [
    {
      title: "Tahazzee: The Girl Who Wove Dreams into Reality",
      text: `In Chittagong lives a young woman named Umme Tahazzee, a girl with big dreams, quiet strength, and a curious mind. By day, she studies computer science, building projects with patience and persistence. 
By night, she becomes an artist, painting emotions on canvas and weaving stories with her imagination. 
Life often tests her with deadlines, research challenges, and the endless pull of distractions. 
Yet, Tahazzee rises each time, proving her resilience. She is Tahazzee: The Girl Who Wove Dreams into Reality.

She loves experimenting with colors, blending the traditional with the modern. 
Her paintings tell stories words cannot express, capturing the very essence of emotion and thought. 
Tahazzee's journey is one of courage, determination, and passion—a constant reminder that dreams can become reality if pursued with heart and dedication. 

Even when overwhelmed, she finds strength in her faith and family, cherishing each moment and turning challenges into opportunities to grow and inspire others. 
Her story continues to unfold, with each day presenting new lessons and triumphs, making her life a beautiful tapestry of resilience, hope, and creativity.`,
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const [bookmarks, setBookmarks] = useState<{ [key: number]: boolean }>({});
  const [comments, setComments] = useState<{ [key: number]: Comment[] }>({});
  const [newComments, setNewComments] = useState<{ [key: number]: string }>({});
  const [showComments, setShowComments] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem("heroCardLikes") || "{}");
    const savedBookmarks = JSON.parse(localStorage.getItem("heroCardBookmarks") || "{}");
    const savedComments = JSON.parse(localStorage.getItem("heroCardComments") || "{}");

    setLikes(savedLikes);
    setBookmarks(savedBookmarks);
    setComments(savedComments);
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const toggleLike = (index: number) => {
    const updated = { ...likes, [index]: (likes[index] || 0) + 1 };
    setLikes(updated);
    localStorage.setItem("heroCardLikes", JSON.stringify(updated));
  };

  const toggleBookmark = (index: number) => {
    const updated = { ...bookmarks, [index]: !bookmarks[index] };
    setBookmarks(updated);
    localStorage.setItem("heroCardBookmarks", JSON.stringify(updated));
  };

  const toggleComments = (index: number) => {
    setShowComments({ ...showComments, [index]: !showComments[index] });
  };

  const handleAddComment = (index: number) => {
    if (!newComments[index]) return;
    const updated = {
      ...comments,
      [index]: [...(comments[index] || []), { text: newComments[index], time: new Date().toLocaleString() }],
    };
    setComments(updated);
    setNewComments({ ...newComments, [index]: "" });
    localStorage.setItem("heroCardComments", JSON.stringify(updated));
  };

  return (
    <div className="flex flex-col gap-8">
      {stories.map((story, index) => {
        const isExpanded = expandedIndex === index;

        return (
          <div
            key={index}
            className="p-6 sm:p-8 bg-white dark:bg-gray-800 shadow-xl rounded-3xl border
             border-gray-200 dark:border-gray-700 relative transition-transform hover:-translate-y-1 
             hover:shadow-2xl"
          >
            <h3 className="text-2xl sm:text-xl font-bold text-gray-900 dark:text-white mb-5">
              {story.title}
            </h3>

            <div
              className={`text-gray-800 dark:text-gray-100 whitespace-pre-wrap p-6 sm:p-8 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-inner overflow-hidden leading-relaxed text-sm sm:text-base transition-all duration-500`}
              style={{ maxHeight: isExpanded ? "1000px" : "220px" }}
            >
              <p>{story.text}</p>
            </div>

            {/* See More / See Less button */}
            <button
              onClick={() => toggleExpand(index)}
              className="mt-3 text-blue-500 dark:text-blue-400 font-semibold
               hover:underline transition-all"
            >
              {isExpanded ? "See Less" : "See More"}
            </button>

            {/* Actions */}
            <div className="mt-4 flex gap-4 items-center">
              <button onClick={() => toggleLike(index)} className="flex items-center gap-1 text-red-500">
                <FaHeart className="w-5 h-5" /> {likes[index] || 0}
              </button>
              <button onClick={() => toggleBookmark(index)} className="flex items-center gap-1 text-yellow-500">
                {bookmarks[index] ? <FaBookmark className="w-5 h-5" /> : <FaRegBookmark className="w-5 h-5" />}
              </button>
            </div>

            {/* Comments Toggle Button */}
            <div className="mt-3">
              <button
                onClick={() => toggleComments(index)}
                className="text-blue-500 dark:text-blue-400 font-semibold hover:underline transition-all"
              >
                {showComments[index] ? "Hide Comments" : "Show Comments"}
              </button>
            </div>

            {/* Comments Section */}
            {showComments[index] && (
              <div className="mt-3 space-y-3">
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
              className="absolute top-4 right-4 px-3 py-1 text-red-500 cursor-not-allowed rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <MdDelete className="w-6 h-6" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default HeroCards;

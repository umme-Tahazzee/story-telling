"use client";

import React from "react";
import { FaHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { BiSolidHide } from "react-icons/bi";
import { GoComment } from "react-icons/go";

interface Comment {
  text: string;
  time: string;
}

interface StoryActionsProps {
  index: number;
  isExpanded: boolean;
  storyLength: number;
  likes: number;
  haha: number;
  bookmarked: boolean;
  showComments: boolean;
  comments: Comment[];
  newComment: string;
  setNewComment: (value: string) => void;
  toggleExpand: (index: number) => void;
  toggleLike: (index: number) => void;
  toggleHaha: (index: number) => void;
  toggleBookmark: (index: number) => void;
  toggleComments: (index: number) => void;
  handleAddComment: (index: number) => void;
}

const StoryActions: React.FC<StoryActionsProps> = ({
  index,
  isExpanded,
  storyLength,
  likes,
  haha,
  bookmarked,
  showComments,
  comments,
  newComment,
  setNewComment,
  toggleExpand,
  toggleLike,
  toggleHaha,
  toggleBookmark,
  toggleComments,
  handleAddComment,
}) => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* See More / See Less */}
        {storyLength > 300 && (
          <button
            onClick={() => toggleExpand(index)}
            className="text-blue-500 dark:text-blue-400 font-semibold hover:underline transition-all"
          >
            {isExpanded ? "See Less" : "See More"}
          </button>
        )}

        {/* Heart */}
        <button onClick={() => toggleLike(index)} className="flex items-center gap-1 text-red-500">
          <FaHeart className="w-5 h-5" /> {likes}
        </button>

        {/* Haha emoji */}
        <button
          onClick={() => toggleHaha(index)}
          className="flex items-center gap-1 text-yellow-600 hover:text-yellow-800 transition"
        >
          <span className="text-xl">😂</span>
          {haha}
        </button>

        {/* Bookmark */}
        <button onClick={() => toggleBookmark(index)} className="flex items-center gap-1 text-yellow-500">
          {bookmarked ? <FaBookmark className="w-5 h-5" /> : <FaRegBookmark className="w-5 h-5" />}
        </button>

        {/* Toggle Comments */}
        <button
          onClick={() => toggleComments(index)}
          className="text-blue-500 dark:text-blue-400 font-semibold hover:underline transition-all"
        >
          {showComments ? <BiSolidHide className="size-6" /> : <GoComment className="size-6" />}
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 space-y-3">
          {comments.map((comment, i) => (
            <div key={i} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg shadow">
              <p className="text-sm">{comment.text}</p>
              <span className="text-xs text-gray-500">{comment.time}</span>
            </div>
          ))}

          {/* Add comment */}
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
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
    </div>
  );
};

export default StoryActions;

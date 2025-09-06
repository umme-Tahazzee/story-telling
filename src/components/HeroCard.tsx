import { MdDelete } from "react-icons/md";
import { useState } from "react";

const HeroCards = () => {
  const stories = [
  {
    title: "Tahazzee: The Girl Who Wove Dreams into Reality",
    text: `In Chittagong lives a young woman named Umme Tahazzee, a girl with big dreams, quiet strength, and a curious mind. 
By day, she studies computer science, building projects with patience and persistence. 
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


  // State to manage which cards are expanded
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-8">
      {stories.map((story, index) => {
        const isExpanded = expandedIndex === index;

        return (
          <div
            key={index}
            className="p-6 sm:p-8 bg-white dark:bg-gray-800 shadow-xl
             rounded-3xl border border-gray-200 dark:border-gray-700
              relative transition-transform hover:-translate-y-1 hover:shadow-2xl"
          >
            <h3 className="text-2xl sm:text-xl font-bold text-gray-900
             dark:text-white mb-5">
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
              className="mt-3 text-blue-500 dark:text-blue-400 font-semibold hover:underline transition-all"
            >
              {isExpanded ? "See Less" : "See More"}
            </button>

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

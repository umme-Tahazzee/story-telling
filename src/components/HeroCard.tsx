const HeroCards = () => {
  const stories = [
    {
      title: "🌟 Tahazzee: The Girl Who Wove Dreams into Reality 🌟",
      text: `In Chittagong lives a young woman named Umme Tahazzee — a girl with
      big dreams, quiet strength, and a curious mind. By day, she studies
      computer science, building projects with patience and persistence. By
      night, she becomes an artist, painting emotions on canvas and weaving
      stories with her imagination.

      Life often tests her with deadlines, research challenges, and the endless
      pull of distractions. Yet, Tahazzee rises each time, proving her resilience.

      She is Tahazzee: The Girl Who Wove Dreams into Reality.`,
    },
    {
      title: "🚀 The Coder of PCIU 🚀",
      text: `Between lines of HTML, CSS, and React, Tahazzee found her second
      language — code. Debugging late nights at PCIU, she learned that
      patience is the true key to logic.

      Her thesis on monkeypox wasn’t just research — it was proof that
      technology can heal. Each project she built carried one message:
      knowledge becomes powerful when shared.

      To her, coding is not just a skill, but a bridge to tomorrow.`,
    },
    {
      title: "🌸 The Dreaming Scholar 🌸",
      text: `Beyond code and art, Tahazzee carries a fire — to be an Islamic
      scholar. Her dream is to blend faith with modern knowledge, guiding
      others with wisdom and kindness.

      She laughs when plans with her cousins don’t work out, yet she keeps
      planning — because dreaming itself is a form of hope.

      Her journey is not about perfection but growth, faith, and purpose.`,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {stories.map((story, index) => (
        <div
          key={index}
          className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-2xl border
                     border-gray-200 dark:border-gray-700 relative"
        >
          <h3 className="text-2xl text-orange-500 font-bold text-gray-900 dark:text-white mb-3">
            {story.title}
          </h3>

          <div
            className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap 
                       overflow-y-auto leading-relaxed text-sm sm:text-base"
            style={{ maxHeight: "200px" }}
          >
            <p>{story.text}</p>
          </div>

          {/* Delete button */}
          <button
            className="absolute top-3 right-3 px-3 py-1 bg-red-500 cursor-not-allowed
                       hover:bg-red-600 text-white text-sm rounded-md shadow"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default HeroCards;

"use client";

import { useEffect, useState } from "react";
import News from "./News";
import { FaAngleDown } from "react-icons/fa6";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [headlineCount, setHeadlineCount] = useState(3);

  useEffect(() => {
    const fetchHeadlines = async () => {
      const res = await fetch(
        "https://saurav.tech/NewsAPI/everything/cnn.json",
      );

      if (!res.ok) {
        throw new Error("Something wen't wrong while fetching news");
      }

      const data = await res.json();

      setNews(data.articles);
    };

    fetchHeadlines();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex h-auto h-screen flex-col gap-5 rounded-xl bg-neutral-50 px-4 py-8">
        <h2 className="text-xl font-bold text-neutral-600">
          What&apos;s happening?
        </h2>
        {news.slice(0, headlineCount).map((headline) => (
          <News headline={headline} key={headline?.description} />
        ))}

        {news.length > 0 && (
          <div className="flex items-center justify-center gap-2 text-sm font-semibold text-blue-500">
            <button
              className=""
              onClick={() =>
                setHeadlineCount((currentCount) => currentCount + 3)
              }
            >
              Load more
            </button>
            <FaAngleDown />
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsList;

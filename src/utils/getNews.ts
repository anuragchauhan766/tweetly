import { News } from "@/types/news";

export const getNews = async (): Promise<News[]> => {
  try {
    const res = await fetch(
      "https://timesofindia.indiatimes.com/rssfeedstopstories.cms?feedtype=sjson",
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    let news = await res.json();
    news = news.channel.item.slice(0, 5);
    return news;
  } catch (error) {
    throw error;
  }
};

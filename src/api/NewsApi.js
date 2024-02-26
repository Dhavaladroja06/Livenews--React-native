import { newsApiKey } from "./ApiKey";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

const apiBaseUrl = "https://newsapi.org/v2";

const breakingNewsUrl = `${apiBaseUrl}/top-headlines?country=in&apiKey=${newsApiKey}`;

const discoverNewsUrl = (discover) =>
  `${apiBaseUrl}/top-headlines?country=in&category=${discover}&apiKey=${newsApiKey}`;

const newsApiCall = async (endpoints, params) => {
  const options = {
    method: "GET",
    url: endpoints,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const useBreakingNews = () => {
  return useInfiniteQuery({
    queryKey: ["breakingNews"],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await newsApiCall(breakingNewsUrl, { page: pageParam });
      return data.articles;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
};

export const useDiscoverNews = (discover) => {
    return useInfiniteQuery({
      queryKey: ["discoverNews", discover],
      queryFn: async ({ pageParam = 1 }) => {
        const url = discoverNewsUrl(discover); 
        const data = await newsApiCall(url, { discover, page: pageParam });
        return data.articles;
      },
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 0) return undefined;
        return allPages.length + 1;
      },
      initialPageParam: 1,
    });
  };
  

export const useSearchNews = (query) => {
  return useInfiniteQuery(["searchNews", query], async ({ pageParam = 1 }) => {
    const data = await newsApiCall(searchNewsUrl(query, pageParam));
    return data.articles;
  });
};

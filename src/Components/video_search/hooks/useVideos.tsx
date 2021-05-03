import React, { useState, useEffect } from "react";
import youtube from "../apis/youtube";

const useVideos = (defaultSearchTerm: string) => {
  const [videos, setVideos] = useState<any>([]);
  useEffect(() => {
    search(defaultSearchTerm);
  }, [defaultSearchTerm]);
  const search = async (term: any) => {
    const response = await youtube.get("/search", {
      params: {
        q: term,
      },
    });
    setVideos(response.data.items);
  };
  return [videos, search];
};
export default useVideos;

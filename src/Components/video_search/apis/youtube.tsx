import axios from "axios";

const KEY = "AIzaSyAop-Sz_Hoes5vrynwgXX5I-JjhmLJSGpY";

const youtube = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "id,snippet",
    type: "video",
    maxResults: 6,
    key: KEY,
  },
});
export default youtube;
